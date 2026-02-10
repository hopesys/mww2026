'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { getSignedUrl } from '@/lib/upload';
import { cn } from '@/lib/utils';

type Row = {
  id: string;
  name_th: string | null;
  nickname: string | null;
  phone: string | null;
  email: string | null;
  status: string;
  created_at: string;
  payment_slip_url: string | null;
  photo_half_url: string | null;
  photo_full_url: string | null;
};

type ModalState = {
  open: boolean;
  loading: boolean;
  title: string;
  halfUrl?: string;
  fullUrl?: string;
  slipUrl?: string;
};

export default function AdminDashboard() {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending_payment' | 'paid' | 'approved'>('all');
  const [modal, setModal] = useState<ModalState>({
    open: false,
    loading: false,
    title: '',
  });

  const fetchList = async () => {
    setLoading(true);
    const res = await fetch('/api/admin/applications');
    if (res.ok) setRows(await res.json());
    setLoading(false);
  };

  useEffect(() => {
    fetchList();
  }, []);

  const setStatus = async (id: string, status: string) => {
    await fetch(`/api/admin/applications/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    fetchList();
  };

  const filteredRows = useMemo(() => {
    const term = search.trim().toLowerCase();
    return rows.filter((r) => {
      if (statusFilter !== 'all' && r.status !== statusFilter) return false;
      if (!term) return true;
      const haystack = [
        r.name_th ?? '',
        r.nickname ?? '',
        r.phone ?? '',
        r.email ?? '',
      ]
        .join(' ')
        .toLowerCase();
      return haystack.includes(term);
    });
  }, [rows, search, statusFilter]);

  const openModal = async (row: Row) => {
    if (!row.payment_slip_url && !row.photo_half_url && !row.photo_full_url) return;
    setModal({
      open: true,
      loading: true,
      title: row.name_th ?? 'ไม่ทราบชื่อ',
    });
    try {
      const [halfUrl, fullUrl, slipUrl] = await Promise.all([
        row.photo_half_url ? getSignedUrl(row.photo_half_url) : Promise.resolve(undefined),
        row.photo_full_url ? getSignedUrl(row.photo_full_url) : Promise.resolve(undefined),
        row.payment_slip_url ? getSignedUrl(row.payment_slip_url) : Promise.resolve(undefined),
      ]);
      setModal((prev) => ({
        ...prev,
        loading: false,
        halfUrl,
        fullUrl,
        slipUrl,
      }));
    } catch {
      setModal((prev) => ({ ...prev, loading: false }));
    }
  };

  const closeModal = () =>
    setModal({
      open: false,
      loading: false,
      title: '',
    });

  return (
    <div className="min-h-screen bg-wellness-light p-4 md:p-6">
      <div className="mx-auto max-w-6xl space-y-4">
        <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
          <div>
            <h1 className="text-xl font-bold text-wellness-green md:text-2xl">
              รายชื่อผู้สมัคร
            </h1>
            <p className="text-sm text-wellness-text">
              ตรวจสลิป อนุมัติสถานะ และค้นหารายชื่อได้จากหน้านี้
            </p>
          </div>
          <Link
            href="/"
            className="text-sm text-wellness-gold underline-offset-2 hover:underline"
          >
            กลับหน้าหลัก
          </Link>
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-3 rounded-lg bg-white p-3 shadow md:flex-row md:items-center md:justify-between">
          <div className="flex-1">
            <input
              type="text"
              placeholder="ค้นหาด้วยชื่อ, ชื่อเล่น, เบอร์โทร, อีเมล"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-wellness-gold focus:outline-none focus:ring-1 focus:ring-wellness-gold"
            />
          </div>
          <div className="flex items-center gap-3">
            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value as typeof statusFilter)
              }
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-wellness-gold focus:outline-none focus:ring-1 focus:ring-wellness-gold"
            >
              <option value="all">สถานะทั้งหมด</option>
              <option value="pending_payment">รอชำระ/ตรวจสลิป</option>
              <option value="paid">ชำระแล้ว</option>
              <option value="approved">อนุมัติแล้ว</option>
            </select>
            <Button
              variant="ghost"
              type="button"
              onClick={() => {
                setSearch('');
                setStatusFilter('all');
              }}
            >
              ล้างตัวกรอง
            </Button>
          </div>
        </div>

        {/* Table */}
        {loading ? (
          <p className="text-wellness-text">กำลังโหลด...</p>
        ) : (
          <div className="overflow-x-auto rounded-lg bg-white shadow">
            <table className="min-w-[900px] w-full text-left text-sm">
              <thead className="border-b bg-wellness-green/10 text-wellness-green">
                <tr>
                  <th className="px-4 py-3">วันที่สมัคร</th>
                  <th className="px-4 py-3">ชื่อ-นามสกุล</th>
                  <th className="px-4 py-3">ชื่อเล่น</th>
                  <th className="px-4 py-3">โทร</th>
                  <th className="px-4 py-3">อีเมล</th>
                  <th className="px-4 py-3">สถานะ</th>
                  <th className="px-4 py-3">สลิป/รูป</th>
                  <th className="px-4 py-3">ดำเนินการ</th>
                </tr>
              </thead>
              <tbody>
                {filteredRows.map((r) => (
                  <tr key={r.id} className="border-b last:border-0">
                    <td className="px-4 py-2">
                      {new Date(r.created_at).toLocaleDateString('th-TH')}
                    </td>
                    <td className="px-4 py-2">{r.name_th ?? '-'}</td>
                    <td className="px-4 py-2">{r.nickname ?? '-'}</td>
                    <td className="px-4 py-2">{r.phone ?? '-'}</td>
                    <td className="px-4 py-2">{r.email ?? '-'}</td>
                    <td className="px-4 py-2">
                      <span
                        className={cn(
                          'rounded px-2 py-0.5 text-xs capitalize',
                          r.status === 'approved'
                            ? 'bg-green-100 text-green-800'
                            : r.status === 'paid'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-gray-100 text-gray-700',
                        )}
                      >
                        {r.status}
                      </span>
                    </td>
                    <td className="px-4 py-2">
                      {r.payment_slip_url || r.photo_half_url || r.photo_full_url ? (
                        <button
                          type="button"
                          onClick={() => openModal(r)}
                          className="text-wellness-gold underline-offset-2 hover:underline"
                        >
                          ดูไฟล์
                        </button>
                      ) : (
                        '-'
                      )}
                    </td>
                    <td className="px-4 py-2">
                      {r.status === 'pending_payment' && (
                        <div className="flex flex-col gap-1 sm:flex-row">
                          <button
                            type="button"
                            onClick={() => setStatus(r.id, 'paid')}
                            className="text-xs text-wellness-gold underline-offset-2 hover:underline"
                          >
                            อนุมัติชำระ
                          </button>
                          <button
                            type="button"
                            onClick={() => setStatus(r.id, 'approved')}
                            className="text-xs text-wellness-green underline-offset-2 hover:underline"
                          >
                            อนุมัติ
                          </button>
                        </div>
                      )}
                      {r.status === 'paid' && (
                        <button
                          type="button"
                          onClick={() => setStatus(r.id, 'approved')}
                          className="text-xs text-wellness-green underline-offset-2 hover:underline"
                        >
                          อนุมัติ
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
                {!filteredRows.length && (
                  <tr>
                    <td
                      className="px-4 py-4 text-center text-sm text-wellness-text"
                      colSpan={8}
                    >
                      ไม่พบข้อมูลที่ตรงกับตัวกรอง
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal แสดงรูป/สลิป */}
      {modal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
          <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-xl bg-white p-4 shadow-lg md:p-6">
            <div className="mb-4 flex items-center justify-between gap-2">
              <h2 className="text-lg font-bold text-wellness-green">
                ไฟล์แนบ — {modal.title}
              </h2>
              <Button variant="ghost" onClick={closeModal}>
                ปิด
              </Button>
            </div>
            {modal.loading ? (
              <p className="text-sm text-wellness-text">กำลังโหลดไฟล์...</p>
            ) : (
              <div className="grid gap-4 md:grid-cols-3">
                {modal.halfUrl && (
                  <div>
                    <p className="mb-2 text-sm font-semibold text-wellness-green">
                      รูปครึ่งตัว
                    </p>
                    <img
                      src={modal.halfUrl}
                      alt="Half body"
                      className="aspect-[3/4] w-full rounded-lg object-cover"
                    />
                  </div>
                )}
                {modal.fullUrl && (
                  <div>
                    <p className="mb-2 text-sm font-semibold text-wellness-green">
                      รูปเต็มตัว
                    </p>
                    <img
                      src={modal.fullUrl}
                      alt="Full body"
                      className="aspect-[3/4] w-full rounded-lg object-cover"
                    />
                  </div>
                )}
                {modal.slipUrl && (
                  <div>
                    <p className="mb-2 text-sm font-semibold text-wellness-green">
                      สลิปโอนเงิน
                    </p>
                    {modal.slipUrl.toLowerCase().endsWith('.pdf') ? (
                      <a
                        href={modal.slipUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center rounded-full bg-wellness-gold px-4 py-2 text-sm font-semibold text-white hover:bg-wellness-gold/90"
                      >
                        เปิดไฟล์ PDF
                      </a>
                    ) : (
                      <img
                        src={modal.slipUrl}
                        alt="Payment slip"
                        className="aspect-[3/4] w-full rounded-lg object-cover"
                      />
                    )}
                  </div>
                )}
                {!modal.halfUrl && !modal.fullUrl && !modal.slipUrl && (
                  <p className="text-sm text-wellness-text">
                    ไม่มีไฟล์แนบสำหรับผู้สมัครคนนี้
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

