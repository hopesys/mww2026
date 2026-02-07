---
name: sync-content
description: ดึงเนื้อหาล่าสุดจาก NotebookLM มาอัปเดตเว็บ
---

# Sync Content from NotebookLM

ดึงเนื้อหาล่าสุดจาก NotebookLM มาอัปเดตในเว็บไซต์

## Instructions

1. ใช้ `notebook_get` กับ notebook_id `43b30c78-68f2-42ed-b56b-dfca8f33bbf4` เพื่อดูรายการ sources ทั้งหมด
2. ใช้ `notebook_query` เพื่อถามข้อมูลล่าสุดหรือข้อมูลที่ต้องการอัปเดต: $ARGUMENTS
3. เปรียบเทียบกับเนื้อหาปัจจุบันในโปรเจค
4. อัปเดตเนื้อหาที่เปลี่ยนแปลง โดยรักษา structure และ styling เดิม
5. รายงานสรุปสิ่งที่อัปเดต

## Notes

- Notebook มี 37 sources ครอบคลุมข่าว บทความ และเอกสาร Anthropic
- ตรวจสอบ sources ใหม่ที่อาจถูกเพิ่มเข้ามา
- อย่าลบเนื้อหาที่มีอยู่แล้ว ให้เพิ่มหรืออัปเดตเท่านั้น
