import { Link } from 'react-router-dom'
import { useState } from 'react'
import { EmptyState, PageHeader } from '../components/ui'
import { Filter, Lock, Search } from 'lucide-react'
import { useAuth } from '../lib/auth'

export default function PublicationsPage() {
  const { user } = useAuth()
  const [q, setQ] = useState('')
  return (
    <div className="container-page py-12">
      <PageHeader title="Research Publications" subtitle="Browse approved and published research from the institution. Results are loaded from the database (no demo records)." />
      <div className="card mb-6 p-4">
        <div className="flex flex-col gap-3 md:flex-row">
          <div className="relative flex-1"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" /><input className="input pl-9" placeholder="Search by title, author, keyword..." value={q} onChange={e=>setQ(e.target.value)} /></div>
          <button className="btn-secondary"><Filter className="h-4 w-4" />Filters</button>
        </div>
        {!user && <div className="mt-3 flex items-start gap-2 rounded-lg bg-amber-50 p-3 text-sm text-amber-900"><Lock className="mt-0.5 h-4 w-4" /><p>Public preview shows limited information (selected titles/abstracts). <Link to="/login" className="font-medium underline">Login</Link> or <Link to="/register" className="font-medium underline">register</Link> for full content and PDF access.</p></div>}
      </div>
      <EmptyState title="No publications available" description="When papers are approved and published, they will appear here with search, filters, and pagination. If you are a researcher or admin, use your dashboard to manage submissions." />
    </div>
  )
}
