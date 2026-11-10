-- Enable RLS and define baseline policies. Review and harden per deployment.

alter table public.profiles enable row level security;
alter table public.researcher_profiles enable row level security;
alter table public.subjects enable row level security;
alter table public.departments enable row level security;
alter table public.journals enable row level security;
alter table public.journal_editorial_board_members enable row level security;
alter table public.journal_volumes enable row level security;
alter table public.journal_issues enable row level security;
alter table public.documents enable row level security;
alter table public.document_processing_jobs enable row level security;
alter table public.research_papers enable row level security;
alter table public.paper_authors enable row level security;
alter table public.paper_submissions enable row level security;
alter table public.paper_versions enable row level security;
alter table public.paper_status_history enable row level security;
alter table public.ai_conversations enable row level security;
alter table public.ai_messages enable row level security;
alter table public.bookmarks enable row level security;
alter table public.notifications enable row level security;
alter table public.activity_logs enable row level security;

-- Helper: check role
create or replace function public.has_role(uid uuid, roles public.user_role[])
returns boolean language sql stable as $$
  select exists (select 1 from public.profiles p where p.id = uid and p.role = any(roles) and p.is_active);
$$;

-- Profiles: users read/update own (but not role escalation); admins can read/manage via controlled paths
create policy "profiles_read_own" on public.profiles for select using (auth.uid() = id);
create policy "profiles_admin_read" on public.profiles for select using (public.has_role(auth.uid(), array['admin','super_admin']::public.user_role[]));
create policy "profiles_update_own" on public.profiles for update using (auth.uid() = id) with check (auth.uid() = id and role = (select role from public.profiles where id = auth.uid()));
-- NOTE: role changes must be performed by super-admin via secure backend/service-role or dedicated RPC; do not allow client role updates.

-- Public readable taxonomy/published content (adjust as needed)
create policy "subjects_public_read" on public.subjects for select using (is_active = true);
create policy "subjects_admin_write" on public.subjects for all using (public.has_role(auth.uid(), array['super_admin','admin']::public.user_role[])) with check (public.has_role(auth.uid(), array['super_admin','admin']::public.user_role[]));

create policy "journals_public_read" on public.journals for select using (is_active = true);
create policy "journals_admin_write" on public.journals for all using (public.has_role(auth.uid(), array['super_admin','admin']::public.user_role[])) with check (public.has_role(auth.uid(), array['super_admin','admin']::public.user_role[]));

create policy "papers_public_read_published" on public.research_papers for select using (is_published = true);
create policy "papers_owner_read" on public.research_papers for select using (created_by_profile_id = auth.uid());
create policy "papers_admin_all" on public.research_papers for all using (public.has_role(auth.uid(), array['super_admin','admin']::public.user_role[])) with check (public.has_role(auth.uid(), array['super_admin','admin']::public.user_role[]));

-- Submissions: owner access; admins/reviewers manage
create policy "submissions_owner_select" on public.paper_submissions for select using (submitter_profile_id = auth.uid());
create policy "submissions_owner_insert" on public.paper_submissions for insert with check (submitter_profile_id = auth.uid());
create policy "submissions_owner_update_draft" on public.paper_submissions for update using (submitter_profile_id = auth.uid()) with check (submitter_profile_id = auth.uid());
create policy "submissions_admin_all" on public.paper_submissions for all using (public.has_role(auth.uid(), array['super_admin','admin']::public.user_role[])) with check (public.has_role(auth.uid(), array['super_admin','admin']::public.user_role[]));

-- AI/bookmarks/notifications: per-user
create policy "ai_conv_owner" on public.ai_conversations for all using (profile_id = auth.uid()) with check (profile_id = auth.uid());
create policy "ai_msg_owner" on public.ai_messages for all using (exists (select 1 from public.ai_conversations c where c.id = conversation_id and c.profile_id = auth.uid())) with check (exists (select 1 from public.ai_conversations c where c.id = conversation_id and c.profile_id = auth.uid()));
create policy "bookmarks_owner" on public.bookmarks for all using (profile_id = auth.uid()) with check (profile_id = auth.uid());
create policy "notifications_owner" on public.notifications for select using (recipient_profile_id = auth.uid());
create policy "notifications_owner_update" on public.notifications for update using (recipient_profile_id = auth.uid()) with check (recipient_profile_id = auth.uid());
create policy "activity_admin_read" on public.activity_logs for select using (public.has_role(auth.uid(), array['super_admin','admin']::public.user_role[]));

-- Additional tables (documents, versions, issues, etc.) should be further restricted in production.
-- For development scaffold, allow owners/admins where applicable and tighten before launch.
create policy "documents_owner_read" on public.documents for select using (owner_profile_id = auth.uid() or public.has_role(auth.uid(), array['super_admin','admin']::public.user_role[]));
create policy "documents_owner_insert" on public.documents for insert with check (owner_profile_id = auth.uid());
create policy "documents_admin_write" on public.documents for all using (public.has_role(auth.uid(), array['super_admin','admin']::public.user_role[])) with check (public.has_role(auth.uid(), array['super_admin','admin']::public.user_role[]));
