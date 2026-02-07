---
name: add-source
description: เพิ่ม source ใหม่เข้า NotebookLM
---

# Add Source to NotebookLM

เพิ่ม source ใหม่เข้า NotebookLM notebook แล้วอัปเดตเนื้อหาในเว็บไซต์

## Instructions

1. รับ URL หรือข้อความจาก user: $ARGUMENTS
2. ใช้ `source_add` กับ notebook_id `43b30c78-68f2-42ed-b56b-dfca8f33bbf4`
   - ถ้าเป็น URL → source_type: "url"
   - ถ้าเป็นข้อความ → source_type: "text"
   - ใช้ wait=True เพื่อรอให้ process เสร็จ
3. ใช้ `source_describe` เพื่อดูสรุปของ source ใหม่
4. แนะนำว่าเนื้อหาใหม่เกี่ยวข้องกับหัวข้อใดในเว็บไซต์
5. ถาม user ว่าต้องการอัปเดตเนื้อหาในเว็บไซต์หรือไม่
