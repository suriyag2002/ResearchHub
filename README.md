# ResearchHub

Scalable AI-powered research management platform for Ramya Educational and Charitable Fund.

## Current scope (scaffold)

- **Included:** Public website, auth UI/pages, researcher/admin dashboards, journal & publication pages, AI assistant UI, Supabase-ready schema/migrations/RLS, FastAPI backend scaffold, role-based architecture, configurable settings.
- **Not included yet:** **AWS S3 integration** (presigned upload/download, S3 storage pipeline). Document storage/processing hooks are stubbed behind a storage abstraction for later AWS integration.

## Monorepo structure

- `frontend/` – React + Vite + TypeScript + Tailwind CSS + Lucide icons
- `backend/` – FastAPI (REST APIs), service/config stubs
- `supabase/migrations/` – PostgreSQL schema migrations
- `supabase/seed/` – seed data (subjects, optional bootstrap helpers)
- `docs/` – architecture and operations docs
- `infra/` – deployment notes/placeholders

## Quick start

### Frontend
```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

### Backend
```bash
cd backend
python -m venv .venv
# activate venv, then:
pip install -r requirements.txt
cp .env.example .env
uvicorn app.main:app --reload
```

### Supabase
- Create a **development** Supabase project.
- Configure `frontend/.env` and `backend/.env` with project URL and keys (never commit secrets).
- Apply migrations in `supabase/migrations/` (via Supabase CLI or SQL editor in dev).
- Review and apply RLS policies; bootstrap first Super Admin using a secure server-side method (see `docs/architecture.md`).

## Security notes
- Never expose service-role keys in frontend code.
- Roles/permissions must be enforced in backend and database RLS policies.
- AWS S3, AI providers, and processing workers are designed as independently configurable services.
