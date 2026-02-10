# MWW 2026

Website for **Miss Wellness World** (MWW) — built with Next.js, React 19, and Tailwind CSS 4. Deploys to Vercel via GitHub Actions using Bun.

## Tech stack

- **Next.js 16** (App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS 4**
- **Bun** (package manager & runtime)
- **Supabase** (เก็บข้อมูลใบสมัคร)

## Prerequisites

- [Bun](https://bun.sh) 1.x (recommended) or Node.js 20+

## Getting started

### Install dependencies

```bash
bun install
```

### Run development server

```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000).

### Build for production

```bash
bun run build
```

### Start production server (local)

```bash
bun run start
```

### Lint

```bash
bun run lint
```

## ใบสมัคร (Application form)

ฟอร์มใบสมัครอ้างอิงจาก [NotebookLM โครงการ Miss Wellness World 2025](https://notebooklm.google.com/notebook/09901de1-c37c-47a4-be0f-b81e00c2d213) เก็บข้อมูลลง **Supabase** ที่ `wcdgmtofemhgxpqleoqp.supabase.co`

- **หน้าใบสมัคร:** [http://localhost:3000/apply](http://localhost:3000/apply)
- ปุ่ม "Apply for MWW 2026" / "Apply for MWWT 2026" ในหน้าหลักจะลิงก์ไปที่ `/apply`

### ตั้งค่า Supabase

1. คัดลอก `.env.example` เป็น `.env.local`
2. ใส่ค่าใน [Supabase Dashboard → Project Settings → API](https://supabase.com/dashboard/project/wcdgmtofemhgxpqleoqp/settings/api):
   - `NEXT_PUBLIC_SUPABASE_URL` = Project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = anon public key
3. ตาราง `mww_applications` ถูกสร้างผ่าน migration แล้ว (และมี RLS เปิดอยู่)
4. (Optional) `SUPABASE_SERVICE_ROLE_KEY` สำหรับ Admin อนุมัติสถานะ
5. (Optional) `ADMIN_SECRET` = รหัสผ่านเข้า `/admin`
6. (Optional) `RESEND_API_KEY` + `RESEND_FROM_EMAIL` สำหรับส่งอีเมลยืนยัน + PDF

### MWWT Technical Master Plan (ที่ทำแล้ว)

- **Phase 1 ระบบรับสมัคร:** ฟอร์ม + อัปโหลดรูปครึ่งตัว/เต็มตัว + สลิปโอนเงิน → **Supabase Storage** (bucket `mwwt-uploads`) → บันทึกลง `mww_applications` (status: pending_payment)
- **Contingency 23 ก.พ.:** แนบสลิปโอนเงินในฟอร์ม → Admin ตรวจจาก Dashboard แล้วกด อนุมัติชำระ/อนุมัติ
- **Validation:** Zod schema ใน `schemas/application.ts` (client + ใช้ใน API ได้)
- **Client-side image compression:** `browser-image-compression` ก่อนอัปโหลด (Master Plan §8.4)
- **PDF + Email:** `@react-pdf/renderer` สร้าง PDF ใบสมัคร, **Resend** ส่งอีเมลยืนยัน (ถ้ากรอกอีเมล)
- **Admin Dashboard:** `/admin` — ใส่รหัส (ADMIN_SECRET) → ดูรายชื่อผู้สมัคร, เปลี่ยนสถานะเป็น paid/approved

## Project structure

```
├── app/                 # Next.js App Router
│   ├── admin/           # Admin Dashboard (รายชื่อ + อนุมัติ)
│   ├── api/              # send-confirmation, admin-auth, admin/applications
│   ├── apply/page.tsx   # หน้าใบสมัคร
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/          # React components
│   ├── admin/           # AdminDashboard
│   ├── application/     # ฟอร์มใบสมัคร (5 ส่วน + อัปโหลด)
│   ├── pdf/             # ApplicationPDF (ใบสมัคร PDF)
│   ├── about/           # About MWW, MWWT, Executive Team
│   ├── halloffame/      # Hall of Fame sections
│   ├── Header.tsx
│   ├── HeroSection.tsx
│   ├── Testimonials.tsx
│   ├── ContactSection.tsx
│   ├── Footer.tsx
│   └── BackToTop.tsx
├── lib/supabase.ts      # Supabase client + types
├── lib/upload.ts        # Supabase Storage upload + image compression
├── schemas/application.ts # Zod validation
├── public/              # Static assets (images, etc.)
├── .github/workflows/   # CI/CD
│   └── deploy-vercel.yml
└── demo/                # Standalone HTML demos
```

## Deploy to Vercel

Deployment is automated with **GitHub Actions**. Pushing to `main` or running the workflow manually triggers a deploy.

### 1. Add GitHub secrets

In your repo: **Settings → Secrets and variables → Actions**, add:

| Secret              | Where to get it |
|---------------------|-----------------|
| `VERCEL_TOKEN`      | [Vercel Account → Tokens](https://vercel.com/account/tokens) — create a token (e.g. “GitHub Actions”). |
| `VERCEL_ORG_ID`     | Vercel project → **Settings → General** (or from `.vercel/project.json` after `vercel link`). |
| `VERCEL_PROJECT_ID` | Same as above. |

### 2. Link project (one-time, if needed)

If the repo isn’t linked to a Vercel project yet:

```bash
bunx vercel link
```

Copy `orgId` and `projectId` from `.vercel/project.json` into the GitHub secrets above.

### 3. Push to deploy

```bash
git push origin main
```

Workflow runs at: **Actions → Deploy to Vercel**.

---

[Next.js Docs](https://nextjs.org/docs) · [Vercel](https://vercel.com)
