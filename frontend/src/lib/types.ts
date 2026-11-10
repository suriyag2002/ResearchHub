export type Role = 'registered_user' | 'researcher' | 'admin' | 'super_admin'
export type SubmissionStatus = 'draft' | 'pending_review' | 'under_review' | 'approved' | 'rejected' | 'published' | 'archived'

export interface Profile {
  id: string
  email: string
  full_name?: string
  role: Role
}

export interface Subject { id: string; name: string; slug: string; description?: string }
export interface Journal { id: string; title: string; slug: string; description?: string; p_issn?: string; e_issn?: string }
export interface Paper {
  id: string
  title: string
  abstract?: string
  subject?: string
  status?: SubmissionStatus
  authors?: string
  published_at?: string
}
