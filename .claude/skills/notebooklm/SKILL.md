---
name: notebooklm
description: จัดการ NotebookLM - สร้าง notebook, เพิ่มแหล่งข้อมูล, query, สร้าง audio/video overview, และอื่นๆ
---

# NotebookLM MCP Tools

เครื่องมือสำหรับจัดการ NotebookLM ผ่าน MCP (Model Context Protocol)

## Authentication

### refresh_auth
Reload auth tokens from disk or run headless re-authentication. Call this after running `notebooklm-mcp-auth` to pick up new tokens, or to attempt automatic re-authentication if Chrome profile has saved login.

### save_auth_tokens
Save NotebookLM cookies (FALLBACK method - try `notebooklm-mcp-auth` first!)
- **IMPORTANT**: First, run `notebooklm-mcp-auth` via Bash/terminal (automated, preferred)
- Only use this tool if the automated CLI fails

## Notebook Management

### notebook_list
List all notebooks
- **Args**: `max_results` (default: 100)

### notebook_create
Create a new notebook
- **Args**: `title` (optional)

### notebook_get
Get notebook details with sources
- **Args**: `notebook_id` (UUID)

### notebook_describe
Get AI-generated notebook summary with suggested topics
- **Args**: `notebook_id` (UUID)
- **Returns**: summary (markdown), suggested_topics list

### notebook_rename
Rename a notebook
- **Args**: `notebook_id` (UUID), `new_title`

### notebook_delete
Delete notebook permanently. **IRREVERSIBLE**
- **Args**: `notebook_id` (UUID), `confirm=True` (required)

## Source Management

### notebook_add_url
Add URL (website or YouTube) as source
- **Args**: `notebook_id` (UUID), `url`

### notebook_add_text
Add pasted text as source
- **Args**: `notebook_id` (UUID), `text`, `title` (optional)

### notebook_add_drive
Add Google Drive document as source
- **Args**: `notebook_id` (UUID), `document_id`, `title`, `doc_type` (doc|slides|sheets|pdf)

### source_describe
Get AI-generated source summary with keyword chips
- **Args**: `source_id` (UUID)
- **Returns**: summary (markdown with **bold** keywords), keywords list

### source_get_content
Get raw text content of a source (no AI processing)
- Much faster than `notebook_query` for content export
- **Args**: `source_id` (UUID)
- **Returns**: content, title, source_type, char_count

### source_list_drive
List sources with types and Drive freshness status
- Use before `source_sync_drive` to identify stale sources
- **Args**: `notebook_id` (UUID)

### source_sync_drive
Sync Drive sources with latest content
- Call `source_list_drive` first to identify stale sources
- **Args**: `source_ids` (array), `confirm=True` (required)

### source_delete
Delete source permanently. **IRREVERSIBLE**
- **Args**: `source_id` (UUID), `confirm=True` (required)

## Query & Chat

### notebook_query
Ask AI about EXISTING sources already in notebook
- **NOT** for finding new sources
- Use `research_start` instead for: deep research, web search, find new sources, Drive search
- **Args**: 
  - `notebook_id` (UUID)
  - `query` (question to ask)
  - `source_ids` (optional, default: all)
  - `conversation_id` (for follow-up questions)
  - `timeout` (seconds, default: 120.0)

### chat_configure
Configure notebook chat settings
- **Args**:
  - `notebook_id` (UUID)
  - `goal`: default|learning_guide|custom
  - `custom_prompt` (required when goal=custom, max 10000 chars)
  - `response_length`: default|longer|shorter

## Research

### research_start
Deep research / fast research: Search web or Google Drive to FIND NEW sources
- **Use for**: "deep research on X", "find sources about Y", "search web for Z", "search Drive"
- **Workflow**: research_start → poll research_status → research_import
- **Args**:
  - `query`: What to search for (e.g. "quantum computing advances")
  - `source`: web|drive
  - `mode`: fast (~30s, ~10 sources) | deep (~5min, ~40 sources, web only)
  - `notebook_id` (optional, creates new if not provided)
  - `title` (for new notebook)

### research_status
Poll research progress. Blocks until complete or timeout
- **Args**:
  - `notebook_id` (UUID)
  - `poll_interval` (default: 30 seconds)
  - `max_wait` (default: 300 seconds, 0=single poll)
  - `compact` (default: true, truncate report to save tokens)
  - `task_id` (optional, for specific research task)

### research_import
Import discovered sources into notebook
- Call after `research_status` shows status="completed"
- **Args**:
  - `notebook_id` (UUID)
  - `task_id` (research task ID)
  - `source_indices` (optional, default: all)

## Studio Content Generation

All studio tools require `confirm=True` after user approval.

### audio_overview_create
Generate audio overview
- **Args**:
  - `notebook_id` (UUID)
  - `source_ids` (optional, default: all)
  - `format`: deep_dive|brief|critique|debate
  - `length`: short|default|long
  - `language`: BCP-47 code (en, es, fr, de, ja, th)
  - `focus_prompt` (optional)
  - `confirm=True` (required)

### video_overview_create
Generate video overview
- **Args**:
  - `notebook_id` (UUID)
  - `source_ids` (optional, default: all)
  - `format`: explainer|brief
  - `visual_style`: auto_select|classic|whiteboard|kawaii|anime|watercolor|retro_print|heritage|paper_craft
  - `language`: BCP-47 code (en, es, fr, de, ja, th)
  - `focus_prompt` (optional)
  - `confirm=True` (required)

### infographic_create
Generate infographic
- **Args**:
  - `notebook_id` (UUID)
  - `source_ids` (optional, default: all)
  - `orientation`: landscape|portrait|square
  - `detail_level`: concise|standard|detailed
  - `language`: BCP-47 code (en, es, fr, de, ja, th)
  - `focus_prompt` (optional)
  - `confirm=True` (required)

### slide_deck_create
Generate slide deck
- **Args**:
  - `notebook_id` (UUID)
  - `source_ids` (optional, default: all)
  - `format`: detailed_deck|presenter_slides
  - `length`: short|default
  - `language`: BCP-47 code (en, es, fr, de, ja, th)
  - `focus_prompt` (optional)
  - `confirm=True` (required)

### report_create
Generate report
- **Args**:
  - `notebook_id` (UUID)
  - `source_ids` (optional, default: all)
  - `report_format`: "Briefing Doc"|"Study Guide"|"Blog Post"|"Create Your Own"
  - `custom_prompt` (required for "Create Your Own")
  - `language`: BCP-47 code (en, es, fr, de, ja, th)
  - `confirm=True` (required)

### flashcards_create
Generate flashcards
- **Args**:
  - `notebook_id` (UUID)
  - `source_ids` (optional, default: all)
  - `difficulty`: easy|medium|hard
  - `confirm=True` (required)

### quiz_create
Generate quiz
- **Args**:
  - `notebook_id` (UUID)
  - `source_ids` (optional, default: all)
  - `question_count` (default: 2)
  - `difficulty` (default: medium)
  - `confirm=True` (required)

### data_table_create
Generate data table
- **Args**:
  - `notebook_id` (UUID)
  - `description` (what data table to create)
  - `source_ids` (optional, default: all)
  - `language` (default: "en")
  - `confirm=True` (required)

### mind_map_create
Generate and save mind map
- **Args**:
  - `notebook_id` (UUID)
  - `source_ids` (optional, default: all)
  - `title` (default: "Mind Map")
  - `confirm=True` (required)

### studio_status
Check studio content generation status and get URLs
- **Args**: `notebook_id` (UUID)

### studio_delete
Delete studio artifact. **IRREVERSIBLE**
- **Args**:
  - `notebook_id` (UUID)
  - `artifact_id` (UUID from studio_status)
  - `confirm=True` (required)

## Common Workflows

### Basic Research Workflow
1. `notebook_create` - สร้าง notebook ใหม่
2. `research_start` - เริ่มค้นหาแหล่งข้อมูล
3. `research_status` - ตรวจสอบความคืบหน้า
4. `research_import` - นำเข้าแหล่งข้อมูลที่พบ
5. `notebook_query` - ถามคำถามเกี่ยวกับเนื้อหา

### Audio Overview Workflow
1. `notebook_get` - ตรวจสอบ sources ใน notebook
2. `audio_overview_create` - สร้าง audio overview (ต้อง confirm)
3. `studio_status` - ตรวจสอบสถานะและรับ URL

### Study Materials Workflow
1. `flashcards_create` - สร้าง flashcards (ต้อง confirm)
2. `quiz_create` - สร้าง quiz (ต้อง confirm)
3. `studio_status` - ดาวน์โหลดผลลัพธ์