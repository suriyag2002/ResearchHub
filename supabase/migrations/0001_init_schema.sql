-- ResearchHub initial schema (PostgreSQL / Supabase)
-- Apply in development via Supabase CLI or SQL editor. Review before production use.

create extension if not exists pgcrypto;

-- Enums
do $$ begin
  create type public.user_role as enum ('registered_user','researcher','admin','super_admin');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.submission_status as enum ('draft','pending_review','under_review','approved','rejected','published','archived');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.processing_status as enum ('uploaded','queued','extracting','ocr','chunking','embedding','indexed','failed','deleted');
exception when duplicate_object then null; end $$;

-- Profiles (1:1 with auth.users)
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text,
  avatar_url text,
  role public.user_role not null default 'registered_user',
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists idx_profiles_role on public.profiles(role);

-- Researcher extension
create table if not exists public.researcher_profiles (
  profile_id uuid primary key references public.profiles(id) on delete cascade,
  designation text,
  affiliation text,
  bio text,
  orcid text,
  department_id uuid,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Subjects & departments (dynamic)
create table if not exists public.subjects (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique,
  description text,
  is_active boolean not null default true,
  display_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.departments (
  id uuid primary key default gen_random_uuid(),
  subject_id uuid not null references public.subjects(id) on delete restrict,
  name text not null,
  slug text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(subject_id, slug)
);

-- Journals
create table if not exists public.journals (
  id uuid primary key default gen_random_uuid(),
  subject_id uuid references public.subjects(id) on delete set null,
  title text not null,
  slug text not null unique,
  description text,
  publisher_details text,
  editor_in_chief text,
  publication_frequency text,
  aims_scope text,
  policies text,
  p_issn text,
  e_issn text,
  logo_url text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.journal_editorial_board_members (
  id uuid primary key default gen_random_uuid(),
  journal_id uuid not null references public.journals(id) on delete cascade,
  name text not null,
  role_title text,
  affiliation text,
  display_order int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.journal_volumes (
  id uuid primary key default gen_random_uuid(),
  journal_id uuid not null references public.journals(id) on delete cascade,
  volume_label text not null,
  year int,
  created_at timestamptz not null default now(),
  unique(journal_id, volume_label)
);

create table if not exists public.journal_issues (
  id uuid primary key default gen_random_uuid(),
  journal_id uuid not null references public.journals(id) on delete cascade,
  volume_id uuid references public.journal_volumes(id) on delete set null,
  issue_label text not null,
  title text,
  publication_date date,
  status text not null default 'draft',
  issue_pdf_document_id uuid,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Documents & processing (S3 keys nullable until AWS integration)
create table if not exists public.documents (
  id uuid primary key default gen_random_uuid(),
  owner_profile_id uuid references public.profiles(id) on delete set null,
  storage_provider text not null default 'disabled',
  s3_bucket text,
  s3_key text,
  original_filename text,
  mime_type text,
  size_bytes bigint,
  checksum text,
  document_type text,
  visibility_scope text not null default 'private',
  processing_status public.processing_status not null default 'uploaded',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists idx_documents_owner on public.documents(owner_profile_id);

create table if not exists public.document_processing_jobs (
  id uuid primary key default gen_random_uuid(),
  document_id uuid not null references public.documents(id) on delete cascade,
  job_type text not null,
  status text not null default 'queued',
  attempt_count int not null default 0,
  max_attempts int not null default 3,
  last_error text,
  started_at timestamptz,
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Research papers & workflow
create table if not exists public.research_papers (
  id uuid primary key default gen_random_uuid(),
  subject_id uuid references public.subjects(id) on delete set null,
  journal_id uuid references public.journals(id) on delete set null,
  journal_issue_id uuid references public.journal_issues(id) on delete set null,
  title text not null,
  slug text unique,
  abstract text,
  keywords text[],
  doi text,
  is_published boolean not null default false,
  published_at timestamptz,
  created_by_profile_id uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists idx_papers_subject on public.research_papers(subject_id);
create index if not exists idx_papers_published on public.research_papers(is_published, published_at desc);

create table if not exists public.paper_authors (
  id uuid primary key default gen_random_uuid(),
  paper_id uuid not null references public.research_papers(id) on delete cascade,
  author_name text not null,
  profile_id uuid references public.profiles(id) on delete set null,
  affiliation text,
  author_order int not null default 0,
  is_corresponding boolean not null default false
);

create table if not exists public.paper_submissions (
  id uuid primary key default gen_random_uuid(),
  paper_id uuid references public.research_papers(id) on delete set null,
  submitter_profile_id uuid not null references public.profiles(id) on delete cascade,
  status public.submission_status not null default 'draft',
  current_version_id uuid,
  submitted_at timestamptz,
  reviewed_by_profile_id uuid references public.profiles(id) on delete set null,
  reviewed_at timestamptz,
  rejection_reason text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists idx_submissions_submitter on public.paper_submissions(submitter_profile_id);
create index if not exists idx_submissions_status on public.paper_submissions(status);

create table if not exists public.paper_versions (
  id uuid primary key default gen_random_uuid(),
  submission_id uuid not null references public.paper_submissions(id) on delete cascade,
  paper_id uuid references public.research_papers(id) on delete set null,
  version_number int not null default 1,
  title text not null,
  abstract text,
  keywords text[],
  document_id uuid references public.documents(id) on delete set null,
  change_notes text,
  created_by_profile_id uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  unique(submission_id, version_number)
);

create table if not exists public.paper_status_history (
  id uuid primary key default gen_random_uuid(),
  submission_id uuid not null references public.paper_submissions(id) on delete cascade,
  from_status public.submission_status,
  to_status public.submission_status not null,
  actor_profile_id uuid references public.profiles(id) on delete set null,
  reason text,
  created_at timestamptz not null default now()
);

-- AI, bookmarks, notifications, activity
create table if not exists public.ai_conversations (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  scope text not null default 'library',
  paper_id uuid references public.research_papers(id) on delete set null,
  title text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.ai_messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.ai_conversations(id) on delete cascade,
  role text not null,
  content text not null,
  citations jsonb not null default '[]'::jsonb,
  model_meta jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.bookmarks (
  profile_id uuid not null references public.profiles(id) on delete cascade,
  paper_id uuid not null references public.research_papers(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (profile_id, paper_id)
);

create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  recipient_profile_id uuid not null references public.profiles(id) on delete cascade,
  type text not null,
  title text not null,
  body text,
  entity_type text,
  entity_id uuid,
  is_read boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.activity_logs (
  id uuid primary key default gen_random_uuid(),
  actor_profile_id uuid references public.profiles(id) on delete set null,
  action text not null,
  entity_type text,
  entity_id uuid,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

-- updated_at helper
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Auto-create profile on signup (default registered_user)
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, role)
  values (new.id, new.email, coalesce(new.raw_user_meta_data->>'full_name',''), 'registered_user')
  on conflict (id) do update set email = excluded.email;
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
