---
name: build-landing
description: สร้างหน้า Landing Page จากเนื้อหา NotebookLM
---

# Build Landing Page

สร้างหน้า Landing Page สำหรับเว็บไซต์ "วิวัฒนาการการทำงานด้วย AI ของวิศวกรใน Anthropic"

## Instructions

1. ใช้ `notebook_query` กับ notebook_id `43b30c78-68f2-42ed-b56b-dfca8f33bbf4` เพื่อดึงข้อมูลสรุปภาพรวม
2. สร้าง Landing Page ที่ `app/page.tsx` ประกอบด้วย sections หลัก:

### Sections

- **Hero Section** - หัวข้อหลัก + คำอธิบายสั้น + สถิติสำคัญ (เช่น 90% ของโค้ดเขียนโดย AI)
- **Timeline/Evolution** - ลำดับเหตุการณ์สำคัญจาก Claude 3.5 → Claude 4 → Opus 4.6
- **Key Insights** - 7 หัวข้อหลักในรูปแบบ card layout
- **Statistics** - ตัวเลขสำคัญ (27 PRs/day, 33% ลดการแทรกแซง, 1M token context)
- **Impact Section** - ผลกระทบต่อวิศวกรในรูปแบบ pros/cons
- **Footer** - แหล่งอ้างอิงและ credits

3. ใช้ Tailwind CSS สร้าง modern, dark-theme design
4. Responsive layout
5. เนื้อหาภาษาไทยทั้งหมด ใช้ข้อมูลจาก notebook

## Tech Stack

- Next.js 16 (App Router)
- React 19
- Tailwind CSS 4
- TypeScript
