import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';
import { renderToBuffer } from '@react-pdf/renderer';
import React from 'react';
import ApplicationPDF from '@/components/pdf/ApplicationPDF';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const resendKey = process.env.RESEND_API_KEY;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const applicationId = body.applicationId as string | undefined;
    if (!applicationId) {
      return NextResponse.json({ error: 'applicationId required' }, { status: 400 });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);
    const { data: row, error: fetchError } = await supabase
      .from('mww_applications')
      .select('*')
      .eq('id', applicationId)
      .single();

    if (fetchError || !row) {
      return NextResponse.json({ error: 'Application not found' }, { status: 404 });
    }

    const email = (row as { email?: string }).email?.trim();
    if (!email) {
      return NextResponse.json({ ok: true, skipped: 'No email' });
    }

    if (!resendKey) {
      return NextResponse.json({ ok: true, skipped: 'Resend not configured' });
    }

    const element = React.createElement(ApplicationPDF, { data: row as Record<string, unknown> });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const pdfOutput = await renderToBuffer(element as any);
    const buffer = Buffer.isBuffer(pdfOutput)
      ? pdfOutput
      : Buffer.from(await streamToBuffer(pdfOutput as NodeJS.ReadableStream));

    const resend = new Resend(resendKey);
    const { error: sendError } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'MWWT <onboarding@resend.dev>',
      to: email,
      subject: 'ยืนยันการสมัคร Miss Wellness World Thailand',
      html: '<p>สวัสดีค่ะ ขอบคุณที่สมัคร เรารับข้อมูลของท่านแล้ว แนบไฟล์ PDF ใบสมัครไว้ในอีเมลนี้</p>',
      attachments: [{ filename: 'application.pdf', content: buffer }],
    });

    if (sendError) {
      return NextResponse.json({ error: sendError.message }, { status: 500 });
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : 'Send failed' },
      { status: 500 }
    );
  }
}

function streamToBuffer(stream: NodeJS.ReadableStream): Promise<Uint8Array> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    stream.on('data', (chunk) => chunks.push(Buffer.from(chunk)));
    stream.on('end', () => resolve(Buffer.concat(chunks)));
    stream.on('error', reject);
  });
}
