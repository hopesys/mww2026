---
name: generate-quiz
description: สร้าง Quiz/Flashcards จาก NotebookLM
---

# Generate Quiz from NotebookLM

สร้าง Quiz/Flashcards จากเนื้อหาใน NotebookLM แล้วนำมาใช้ในเว็บไซต์

## Instructions

1. ใช้ `studio_create` กับ notebook_id `43b30c78-68f2-42ed-b56b-dfca8f33bbf4` เพื่อสร้าง quiz หรือ flashcards
   - artifact_type: "quiz" หรือ "flashcards"
   - หัวข้อตาม user ระบุ: $ARGUMENTS
   - ต้อง confirm=True หลังได้รับการยืนยันจาก user
2. Poll `studio_status` จนกว่าจะเสร็จ
3. ดาวน์โหลดผลลัพธ์ด้วย `download_artifact`
4. แปลงเป็น React component ที่ interactive ได้
5. ใส่ใน `app/quiz/` directory

## Quiz Topics

- Claude 4 capabilities
- Agentic Coding workflow
- Impact on software engineering
- Prompt Engineering techniques
- AI Safety & Interpretability
