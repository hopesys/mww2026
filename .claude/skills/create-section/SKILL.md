---
name: create-section
description: สร้างหน้าเว็บ section ใหม่จากเนื้อหา NotebookLM
---

# Create Website Section

สร้างหน้าเว็บ/section ใหม่จากเนื้อหาใน NotebookLM

## Instructions

1. รับหัวข้อ section จาก user: $ARGUMENTS
2. ใช้ `notebook_query` กับ notebook_id `43b30c78-68f2-42ed-b56b-dfca8f33bbf4` เพื่อดึงเนื้อหาเชิงลึกเกี่ยวกับหัวข้อนั้น
3. สร้าง React component ใน `app/` directory ตามโครงสร้าง Next.js App Router
4. ใช้ Tailwind CSS สำหรับ styling
5. เนื้อหาต้องเป็นภาษาไทย ใช้ข้อมูลจริงจาก notebook ไม่ใช้ placeholder
6. ออกแบบ responsive สำหรับ mobile และ desktop

## Available Topics

- `claude-4` - การเปิดตัว Claude Opus 4.6 และตระกูล Claude 4
- `claude-code` - Claude Code และ Agentic Coding workflow
- `impact` - ผลกระทบต่อวิศวกรซอฟต์แวร์
- `integrations` - ฟีเจอร์และการเชื่อมต่อระบบ
- `prompt-engineering` - เทคนิค Prompt Engineering ขั้นสูง
- `interpretability` - Mechanistic Interpretability
- `agent-sdk` - Claude Agent SDK และสถาปัตยกรรม

## Tech Stack

- Next.js 16 (App Router)
- React 19
- Tailwind CSS 4
- TypeScript
