# ResearchHub Architecture (Scaffold)

## Stack (target)
- **Frontend:** React, Vite, Tailwind CSS, Lucide React
- **Backend:** Python, FastAPI, REST APIs
- **Auth/DB:** Supabase Auth + PostgreSQL + RLS
- **Storage:** AWS S3 private buckets + presigned URLs (**deferred in current scaffold**)
- **AI/RAG:** Ollama, BGE embeddings, Qdrant, PDF extraction/OCR pipeline (**processing integrated later; UI/API scaffolds included**)
- **Deployment:** Netlify/equivalent (FE), VPS/Docker (BE), managed services as configured

## Service boundaries
- Stateless backend APIs where practical; frontend uses anon/public Supabase key only.
- Secrets (service-role, DB admin, S3, AI keys) live in backend/worker environment only.
- Document storage abstracted (`storage_provider`) so S3 can be added without rewriting business logic.

## Roles & permissions
- Roles: `public` (unauthenticated), `registered_user`, `researcher`, `super_admin` (extensible).
- New signups default to `registered_user` via DB trigger/function.
- Role elevation only through super-admin-controlled backend/DB path.
- Enforcement: **RLS policies + backend authorization checks**; frontend guards are UX only.

## Data model (summary)
- Identity: `profiles`, `researcher_profiles`
- Taxonomy: `subjects`, `departments`
- Journals: `journals`, `journal_editorial_board_members`, `journal_volumes`, `journal_issues`
- Research workflow: `research_papers`, `paper_authors`, `paper_submissions`, `paper_versions`, `paper_status_history`
- Documents/jobs: `documents`, `document_processing_jobs` (S3 keys populated when AWS integrated)
- AI/features: `ai_conversations`, `ai_messages`, `bookmarks`, `notifications`, `activity_logs`
- Vectors: Qdrant payload references PostgreSQL IDs and publication/access scope.

## Document flow (target, AWS deferred)
1. Authorized upload request -> backend issues presigned URL (S3) **or** dev storage stub.
2. Metadata recorded in `documents`; processing job queued.
3. Extract/OCR/chunk/embed/index in Qdrant; status tracked.
4. Only approved+published content exposed to public library and public AI corpus.

## First Super Admin bootstrap
- Perform once in a secure environment (SQL with privileged connection or backend admin script using service-role).
- Example approach: create/authenticate user, then set `profiles.role='super_admin'` via controlled migration/script. Never expose this flow in the UI.

## Configurability
- Env-driven: Supabase, storage provider, AI provider/model endpoints, Qdrant, upload/processing limits, feature flags.
- Supports independent migration of FE/BE/DB/storage/AI services.
