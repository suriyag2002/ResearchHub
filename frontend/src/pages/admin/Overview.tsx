import { BookOpen, Clock, FileCheck2, Files, FlaskConical, Newspaper, Users } from 'lucide-react'
import { EmptyState, PageHeader, StatCard } from '../../components/ui'

export default function AdminOverview() {
  // Real metrics must come from Supabase/API; show zero/empty state until connected.
  const stats = [
    { label: 'Total registered users', value: '—', icon: <Users className="h-5 w-5" /> },
    { label: 'Total researchers', value: '—', icon: <FlaskConical className="h-5 w-5" /> },
    { label: 'Total research papers', value: '—', icon: <BookOpen className="h-5 w-5" /> },
    { label: 'Pending submissions', value: '—', icon: <Clock className="h-5 w-5" /> },
    { label: 'Published papers', value: '—', icon: <FileCheck2 className="h-5 w-5" /> },
    { label: 'Total journals', value: '—', icon: <Newspaper className="h-5 w-5" /> },
    { label: 'Documents awaiting processing', value: '—', icon: <Files className="h-5 w-5" /> },
  ]
  return (
    <div>
      <PageHeader title="Admin Overview" subtitle="Real-time platform metrics from the database. No demo or fabricated statistics are displayed." />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(s => <StatCard key={s.label} label={s.label} value={s.value} hint="Connect Supabase to load" icon={s.icon} />)}
      </div>
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div><h2 className="mb-3 text-xl font-bold">Recent platform activities</h2><EmptyState title="No activity data" description="Activity logs from the database will appear here once the platform is connected and events are recorded." /></div>
        <div><h2 className="mb-3 text-xl font-bold">Pending actions</h2><EmptyState title="No pending items" description="Submissions awaiting review and documents awaiting processing will be summarized here." /></div>
      </div>
    </div>
  )
}
