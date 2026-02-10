'use client';

import { useState } from 'react';
import { supabase, type MwwApplication } from '@/lib/supabase';
import { applicationSchema } from '@/schemas/application';
import { uploadFile } from '@/lib/upload';
import { Header, Footer } from '@/components/layout';
import { Button } from '@/components/ui/button';

const initialForm: Omit<MwwApplication, 'id' | 'created_at' | 'updated_at'> = {
  name_th: '',
  name_en: '',
  nickname: '',
  birth_date: '',
  age: undefined,
  weight_kg: undefined,
  height_cm: undefined,
  bust_cm: undefined,
  waist_cm: undefined,
  hip_cm: undefined,
  congenital_disease: '',
  allergies: '',
  address_no: '',
  address_moo: '',
  address_village: '',
  address_soi: '',
  address_road: '',
  address_tambol: '',
  address_amphoe: '',
  address_province: '',
  phone: '',
  email: '',
  line_id: '',
  facebook: '',
  instagram: '',
  tiktok: '',
  emergency_name: '',
  emergency_relation: '',
  emergency_phone: '',
  education_level: '',
  school_name: '',
  occupation: '',
  company: '',
  training_history: '',
  reference_name: '',
  reference_relation: '',
  reference_phone: '',
  contest_experience: '',
  special_skills: '',
  language_skills: '',
  sponsor_info: '',
  duty_amphoe: '',
  duty_province: '',
  video_url: '',
  social_work_images: '',
  photo_self_note: '',
  consent_conditions: false,
  consent_pdpa: false,
  applicant_signature: '',
  application_date: new Date().toISOString().slice(0, 10),
};

function SectionTitle({ children, n }: { children: React.ReactNode; n: number }) {
  return (
    <h3 className="text-xl font-bold text-wellness-green border-b-2 border-wellness-gold pb-2 mb-6">
      ส่วนที่ {n}: {children}
    </h3>
  );
}

function Label({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label className="block text-sm font-medium text-wellness-dark mb-1">
      {children} {required && <span className="text-red-500">*</span>}
    </label>
  );
}

export default function ApplicationForm() {
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [photoHalf, setPhotoHalf] = useState<File | null>(null);
  const [photoFull, setPhotoFull] = useState<File | null>(null);
  const [paymentSlip, setPaymentSlip] = useState<File | null>(null);

  const update = (key: keyof typeof form, value: string | number | boolean | undefined) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setError(null);
    setFieldErrors((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFieldErrors({});
    setError(null);

    const toValidate = {
      ...form,
      video_url: form.video_url || undefined,
    };
    const parsed = applicationSchema.safeParse(toValidate);
    if (!parsed.success) {
      const issues: Record<string, string> = {};
      parsed.error.issues.forEach((i) => {
        const path = i.path.join('.');
        if (!issues[path]) issues[path] = i.message;
      });
      setFieldErrors(issues);
      setError(parsed.error.issues.map((i) => i.message).join('; '));
      return;
    }

    setSubmitting(true);
    const prefix = `app-${Date.now()}`;
    let photo_half_url: string | null = null;
    let photo_full_url: string | null = null;
    let payment_slip_url: string | null = null;

    try {
      if (photoHalf) photo_half_url = await uploadFile(photoHalf, 'photos', `${prefix}-half`);
      if (photoFull) photo_full_url = await uploadFile(photoFull, 'photos', `${prefix}-full`);
      if (paymentSlip) payment_slip_url = await uploadFile(paymentSlip, 'slips', prefix);
    } catch (upErr) {
      setSubmitting(false);
      setError(upErr instanceof Error ? upErr.message : 'อัปโหลดไฟล์ไม่สำเร็จ');
      return;
    }

    const payload = {
      ...form,
      age: form.age ? Number(form.age) : null,
      weight_kg: form.weight_kg ? Number(form.weight_kg) : null,
      height_cm: form.height_cm ? Number(form.height_cm) : null,
      bust_cm: form.bust_cm ? Number(form.bust_cm) : null,
      waist_cm: form.waist_cm ? Number(form.waist_cm) : null,
      hip_cm: form.hip_cm ? Number(form.hip_cm) : null,
      application_date: form.application_date || new Date().toISOString().slice(0, 10),
      status: 'pending_payment',
      payment_slip_url: payment_slip_url ?? undefined,
      photo_half_url: photo_half_url ?? undefined,
      photo_full_url: photo_full_url ?? undefined,
    };

    const { data: inserted, error: err } = await supabase
      .from('mww_applications')
      .insert(payload)
      .select('id')
      .single();
    setSubmitting(false);
    if (err) {
      setError(err.message || 'เกิดข้อผิดพลาดในการส่งใบสมัคร');
      return;
    }
    if (inserted?.id && form.email?.trim()) {
      try {
        await fetch('/api/send-confirmation', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ applicationId: inserted.id }),
        });
      } catch {
        // non-blocking: success already
      }
    }
    setSuccess(true);
  };

  if (success) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-wellness-light pt-24 pb-16">
          <div className="container mx-auto max-w-2xl px-4 text-center">
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 border border-wellness-green/10">
              <div className="w-16 h-16 bg-wellness-green rounded-full flex items-center justify-center mx-auto mb-6 text-white">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-wellness-green mb-4">ส่งใบสมัครเรียบร้อย</h1>
              <p className="text-wellness-text mb-6">
                ข้อมูลของท่านได้รับการบันทึกแล้ว เราจะติดต่อกลับภายหลัง
              </p>
              <a
                href="/"
                className="inline-block px-8 py-3 bg-wellness-gold text-white font-semibold rounded-full hover:opacity-90"
              >
                กลับหน้าหลัก
              </a>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-wellness-light pt-24 pb-16">
        <div className="container mx-auto max-w-3xl px-4">
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-10 border border-wellness-green/10 mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-wellness-green text-center mb-2">
              ใบสมัครประกวด Miss Wellness World Thailand
            </h1>
            <p className="text-center text-wellness-text mb-8">
              กรอกข้อมูลให้ครบถ้วนตามแบบฟอร์ม (อ้างอิงจาก{' '}
              <a href="https://notebooklm.google.com/notebook/09901de1-c37c-47a4-be0f-b81e00c2d213" target="_blank" rel="noopener noreferrer" className="text-wellness-gold hover:underline">
                NotebookLM โครงการ MWW 2025
              </a>
              )
            </p>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-10">
              {/* ส่วนที่ 1: ประวัติส่วนตัว */}
              <section>
                <SectionTitle n={1}>ประวัติส่วนตัว</SectionTitle>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label required>ชื่อ - นามสกุล (ไทย)</Label>
                    <input
                      type="text"
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-wellness-green focus:border-transparent ${fieldErrors.name_th ? 'border-red-500' : 'border-gray-300'}`}
                      value={form.name_th}
                      onChange={(e) => update('name_th', e.target.value)}
                      required
                    />
                    {fieldErrors.name_th && <p className="mt-1 text-sm text-red-600">{fieldErrors.name_th}</p>}
                  </div>
                  <div>
                    <Label>ชื่อ - นามสกุล (อังกฤษ)</Label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wellness-green focus:border-transparent"
                      value={form.name_en}
                      onChange={(e) => update('name_en', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>ชื่อเล่น (Nickname)</Label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wellness-green focus:border-transparent"
                      value={form.nickname}
                      onChange={(e) => update('nickname', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>วันเดือนปีเกิด (ค.ศ.)</Label>
                    <input
                      type="date"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wellness-green focus:border-transparent"
                      value={form.birth_date}
                      onChange={(e) => update('birth_date', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>อายุ</Label>
                    <input
                      type="number"
                      min={1}
                      max={120}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wellness-green focus:border-transparent"
                      value={form.age ?? ''}
                      onChange={(e) => update('age', e.target.value ? parseInt(e.target.value, 10) : undefined)}
                    />
                  </div>
                  <div>
                    <Label>น้ำหนัก (กก.)</Label>
                    <input
                      type="number"
                      step="0.1"
                      min={0}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wellness-green focus:border-transparent"
                      value={form.weight_kg ?? ''}
                      onChange={(e) => update('weight_kg', e.target.value ? parseFloat(e.target.value) : undefined)}
                    />
                  </div>
                  <div>
                    <Label>ส่วนสูง (ซม.)</Label>
                    <input
                      type="number"
                      min={0}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wellness-green focus:border-transparent"
                      value={form.height_cm ?? ''}
                      onChange={(e) => update('height_cm', e.target.value ? parseInt(e.target.value, 10) : undefined)}
                    />
                  </div>
                  <div className="md:col-span-2 grid grid-cols-3 gap-4">
                    <div>
                      <Label>อก (ซม.)</Label>
                      <input
                        type="number"
                        min={0}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        value={form.bust_cm ?? ''}
                        onChange={(e) => update('bust_cm', e.target.value ? parseInt(e.target.value, 10) : undefined)}
                      />
                    </div>
                    <div>
                      <Label>เอว (ซม.)</Label>
                      <input
                        type="number"
                        min={0}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        value={form.waist_cm ?? ''}
                        onChange={(e) => update('waist_cm', e.target.value ? parseInt(e.target.value, 10) : undefined)}
                      />
                    </div>
                    <div>
                      <Label>สะโพก (ซม.)</Label>
                      <input
                        type="number"
                        min={0}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        value={form.hip_cm ?? ''}
                        onChange={(e) => update('hip_cm', e.target.value ? parseInt(e.target.value, 10) : undefined)}
                      />
                    </div>
                  </div>
                  <div>
                    <Label>โรคประจำตัว</Label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wellness-green focus:border-transparent"
                      value={form.congenital_disease}
                      onChange={(e) => update('congenital_disease', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>ประวัติการแพ้อาหาร/ยา</Label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wellness-green focus:border-transparent"
                      value={form.allergies}
                      onChange={(e) => update('allergies', e.target.value)}
                    />
                  </div>
                </div>
              </section>

              {/* ส่วนที่ 2: ข้อมูลติดต่อ */}
              <section>
                <SectionTitle n={2}>ข้อมูลติดต่อ</SectionTitle>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <Label>ที่อยู่ตามทะเบียนบ้าน</Label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                      <input placeholder="เลขที่" className="px-3 py-2 border rounded-lg" value={form.address_no} onChange={(e) => update('address_no', e.target.value)} />
                      <input placeholder="หมู่ที่" className="px-3 py-2 border rounded-lg" value={form.address_moo} onChange={(e) => update('address_moo', e.target.value)} />
                      <input placeholder="หมู่บ้าน/อาคาร" className="col-span-2 md:col-span-1 px-3 py-2 border rounded-lg" value={form.address_village} onChange={(e) => update('address_village', e.target.value)} />
                      <input placeholder="ซอย" className="px-3 py-2 border rounded-lg" value={form.address_soi} onChange={(e) => update('address_soi', e.target.value)} />
                      <input placeholder="ถนน" className="px-3 py-2 border rounded-lg" value={form.address_road} onChange={(e) => update('address_road', e.target.value)} />
                      <input placeholder="ตำบล/แขวง" className="px-3 py-2 border rounded-lg" value={form.address_tambol} onChange={(e) => update('address_tambol', e.target.value)} />
                      <input placeholder="อำเภอ/เขต" className="px-3 py-2 border rounded-lg" value={form.address_amphoe} onChange={(e) => update('address_amphoe', e.target.value)} />
                      <input placeholder="จังหวัด" className="px-3 py-2 border rounded-lg" value={form.address_province} onChange={(e) => update('address_province', e.target.value)} />
                    </div>
                  </div>
                  <div>
                    <Label required>โทรศัพท์มือถือ</Label>
                    <input
                      type="tel"
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-wellness-green focus:border-transparent ${fieldErrors.phone ? 'border-red-500' : 'border-gray-300'}`}
                      value={form.phone}
                      onChange={(e) => update('phone', e.target.value)}
                      required
                    />
                    {fieldErrors.phone && <p className="mt-1 text-sm text-red-600">{fieldErrors.phone}</p>}
                  </div>
                  <div>
                    <Label>อีเมล (สำหรับส่งใบยืนยัน)</Label>
                    <input
                      type="email"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wellness-green focus:border-transparent"
                      value={form.email}
                      onChange={(e) => update('email', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>Line ID</Label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wellness-green focus:border-transparent"
                      value={form.line_id}
                      onChange={(e) => update('line_id', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>Facebook</Label>
                    <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg" value={form.facebook} onChange={(e) => update('facebook', e.target.value)} />
                  </div>
                  <div>
                    <Label>Instagram</Label>
                    <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg" value={form.instagram} onChange={(e) => update('instagram', e.target.value)} />
                  </div>
                  <div>
                    <Label>TikTok</Label>
                    <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg" value={form.tiktok} onChange={(e) => update('tiktok', e.target.value)} />
                  </div>
                  <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label>บุคคลติดต่อฉุกเฉิน (ชื่อ)</Label>
                      <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg" value={form.emergency_name} onChange={(e) => update('emergency_name', e.target.value)} />
                    </div>
                    <div>
                      <Label>ความเกี่ยวข้อง</Label>
                      <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg" value={form.emergency_relation} onChange={(e) => update('emergency_relation', e.target.value)} />
                    </div>
                    <div>
                      <Label>เบอร์โทร</Label>
                      <input type="tel" className="w-full px-4 py-2 border border-gray-300 rounded-lg" value={form.emergency_phone} onChange={(e) => update('emergency_phone', e.target.value)} />
                    </div>
                  </div>
                </div>
              </section>

              {/* ส่วนที่ 3: การศึกษา การทำงาน การอบรม */}
              <section>
                <SectionTitle n={3}>ประวัติการศึกษา การทำงาน และการอบรม</SectionTitle>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label>ระดับการศึกษาสูงสุด</Label>
                    <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg" value={form.education_level} onChange={(e) => update('education_level', e.target.value)} />
                  </div>
                  <div>
                    <Label>สถานศึกษา</Label>
                    <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg" value={form.school_name} onChange={(e) => update('school_name', e.target.value)} />
                  </div>
                  <div>
                    <Label>อาชีพปัจจุบัน</Label>
                    <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg" value={form.occupation} onChange={(e) => update('occupation', e.target.value)} />
                  </div>
                  <div>
                    <Label>บริษัท/องค์กร</Label>
                    <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg" value={form.company} onChange={(e) => update('company', e.target.value)} />
                  </div>
                  <div className="md:col-span-2">
                    <Label>การอบรม (สัมมนา / Training / Camp ฯลฯ)</Label>
                    <textarea rows={3} className="w-full px-4 py-2 border border-gray-300 rounded-lg" value={form.training_history} onChange={(e) => update('training_history', e.target.value)} />
                  </div>
                  <div>
                    <Label>บุคคลอ้างอิง (ชื่อ)</Label>
                    <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg" value={form.reference_name} onChange={(e) => update('reference_name', e.target.value)} />
                  </div>
                  <div>
                    <Label>ความเกี่ยวข้อง</Label>
                    <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg" value={form.reference_relation} onChange={(e) => update('reference_relation', e.target.value)} />
                  </div>
                  <div className="md:col-span-2">
                    <Label>เบอร์โทรบุคคลอ้างอิง</Label>
                    <input type="tel" className="w-full px-4 py-2 border border-gray-300 rounded-lg" value={form.reference_phone} onChange={(e) => update('reference_phone', e.target.value)} />
                  </div>
                </div>
              </section>

              {/* ส่วนที่ 4: ข้อมูลเพิ่มเติม */}
              <section>
                <SectionTitle n={4}>ข้อมูลเพิ่มเติม</SectionTitle>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <Label>ประสบการณ์ประกวดและรางวัลที่ได้รับ</Label>
                    <textarea rows={3} className="w-full px-4 py-2 border border-gray-300 rounded-lg" value={form.contest_experience} onChange={(e) => update('contest_experience', e.target.value)} />
                  </div>
                  <div className="md:col-span-2">
                    <Label>ความสามารถพิเศษ</Label>
                    <textarea rows={2} className="w-full px-4 py-2 border border-gray-300 rounded-lg" value={form.special_skills} onChange={(e) => update('special_skills', e.target.value)} />
                  </div>
                  <div className="md:col-span-2">
                    <Label>ทักษะภาษาในการสื่อสาร</Label>
                    <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg" value={form.language_skills} onChange={(e) => update('language_skills', e.target.value)} placeholder="เช่น ไทย อังกฤษ" />
                  </div>
                  <div className="md:col-span-2">
                    <Label>ผู้สนับสนุนในการประกวด (ถ้ามี)</Label>
                    <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg" value={form.sponsor_info} onChange={(e) => update('sponsor_info', e.target.value)} />
                  </div>
                  <div>
                    <Label>พื้นที่ปฏิบัติภารกิจนางงาม (อำเภอ)</Label>
                    <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg" value={form.duty_amphoe} onChange={(e) => update('duty_amphoe', e.target.value)} />
                  </div>
                  <div>
                    <Label>จังหวัด</Label>
                    <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg" value={form.duty_province} onChange={(e) => update('duty_province', e.target.value)} />
                  </div>
                  <div className="md:col-span-2">
                    <Label>วิดีโอแนะนำตัว (URL หรือลิงก์ อัปโหลดที่อื่น)</Label>
                    <input type="url" className="w-full px-4 py-2 border border-gray-300 rounded-lg" value={form.video_url} onChange={(e) => update('video_url', e.target.value)} placeholder="ความยาวไม่เกิน 2 นาที" />
                  </div>
                  <div className="md:col-span-2">
                    <Label>ภาพการทำงานเพื่อสังคม/โครงการจิตอาสา (URL หรือหมายเหตุ)</Label>
                    <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg" value={form.social_work_images} onChange={(e) => update('social_work_images', e.target.value)} />
                  </div>
                  <div className="md:col-span-2">
                    <Label>ภาพถ่ายตนเอง (ไม่แต่งหน้า) — หมายเหตุหรือลิงก์</Label>
                    <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg" value={form.photo_self_note} onChange={(e) => update('photo_self_note', e.target.value)} placeholder="หน้าตรง, ด้านข้าง, ครึ่งตัว, เต็มตัว" />
                  </div>
                  <div>
                    <Label>อัปโหลดรูปครึ่งตัว (ไม่แต่งหน้า)</Label>
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      className="w-full text-sm text-wellness-text file:mr-4 file:rounded-full file:border-0 file:bg-wellness-green file:px-4 file:py-2 file:text-white file:font-semibold"
                      onChange={(e) => setPhotoHalf(e.target.files?.[0] ?? null)}
                    />
                  </div>
                  <div>
                    <Label>อัปโหลดรูปเต็มตัว (ไม่แต่งหน้า)</Label>
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      className="w-full text-sm text-wellness-text file:mr-4 file:rounded-full file:border-0 file:bg-wellness-green file:px-4 file:py-2 file:text-white file:font-semibold"
                      onChange={(e) => setPhotoFull(e.target.files?.[0] ?? null)}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label>อัปโหลดสลิปค่าสมัคร (Contingency: โอนเงินแล้วแนบสลิป)</Label>
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp,application/pdf"
                      className="w-full text-sm text-wellness-text file:mr-4 file:rounded-full file:border-0 file:bg-wellness-gold file:px-4 file:py-2 file:text-white file:font-semibold"
                      onChange={(e) => setPaymentSlip(e.target.files?.[0] ?? null)}
                    />
                  </div>
                </div>
              </section>

              {/* ส่วนที่ 5: เงื่อนไข */}
              <section>
                <SectionTitle n={5}>เงื่อนไขในการสมัคร</SectionTitle>
                <div className="space-y-4 text-wellness-text text-sm">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" checked={form.consent_conditions} onChange={(e) => update('consent_conditions', e.target.checked)} className="mt-1 rounded border-gray-300 text-wellness-green focus:ring-wellness-green" />
                    <span>ข้าพเจ้าเข้าใจและยอมรับเงื่อนไขในการปฏิบัติภารกิจนางงาม และกติกาของกองประกวด</span>
                  </label>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" checked={form.consent_pdpa} onChange={(e) => update('consent_pdpa', e.target.checked)} className="mt-1 rounded border-gray-300 text-wellness-green focus:ring-wellness-green" />
                    <span>ข้าพเจ้าตกลงยินยอมให้ผู้จัดการประกวดเก็บรวบรวม ใช้ หรือเปิดเผยข้อมูลของข้าพเจ้าตามที่ระบุในแบบฟอร์ม (PDPA)</span>
                  </label>
                </div>
                <div className="mt-6 grid md:grid-cols-2 gap-4">
                  <div>
                    <Label>ลงชื่อผู้สมัคร</Label>
                    <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg" value={form.applicant_signature} onChange={(e) => update('applicant_signature', e.target.value)} placeholder="ชื่อ-นามสกุล" />
                  </div>
                  <div>
                    <Label>วันเดือนปีที่สมัคร</Label>
                    <input type="date" className="w-full px-4 py-2 border border-gray-300 rounded-lg" value={form.application_date} onChange={(e) => update('application_date', e.target.value)} />
                  </div>
                </div>
                <p className="mt-4 text-wellness-text text-sm italic">ข้าพเจ้าขอยืนยันว่าข้อมูลและเอกสารประกอบการสมัครทั้งหมดเป็นความจริงทุกประการ</p>
              </section>

              <div className="flex flex-col items-center justify-center gap-4 pt-6 sm:flex-row">
                <Button type="submit" disabled={submitting}>
                  {submitting ? 'กำลังส่ง...' : 'ส่งใบสมัคร'}
                </Button>
                <a href="/">
                  <Button type="button" variant="outline">
                    ยกเลิก
                  </Button>
                </a>
              </div>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
