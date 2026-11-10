-- Seed initial subject areas (dynamic data, not hardcoded in UI)
insert into public.subjects (name, slug, description, display_order, is_active) values
  ('Computer Science', 'computer-science', 'Computing, systems, data, and intelligent technologies.', 1, true),
  ('English', 'english', 'Language, literature, linguistics, and critical studies.', 2, true),
  ('Tamil', 'tamil', 'Tamil language, literature, and cultural scholarship.', 3, true)
on conflict (slug) do update set name = excluded.name, description = excluded.description, is_active = excluded.is_active;
