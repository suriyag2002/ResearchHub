import { FileClock, FileText, FileCheck2, Bell } from 'lucide-react'
import { Link } from 'react-router-dom'
import { EmptyState, PageHeader, StatCard } from '../../components/ui'

export default function ResearcherOverview() {
  const cards = [
    { label: 'My submissions', value: '—', icon: <FileText className="h-5 w-5" /> },
    { label: 'Pending review', value: '—', icon: <FileClock className="h-5 w-5" /> },
    { label: 'Published', value: '—', icon: <FileCheck2 className="h-5 w-5" /> },
    { label: 'Notifications', value: '—', icon: <Bell className="h-5 w-5" /> },
  ]
  return (
    <div>
      <PageHeader title="Researcher Overview" subtitle="Track your submissions, publications, and research activity." actions={<Link to="/researcher/submissions" className="btn-primary">Upload / New submission</Link>} />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{cards.map(c => <StatCard key={c.label} {...c} hint="Loaded from database" />)}</div>
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div><h2 className="mb-3 text-xl font-bold">Recent submissions</h2><EmptyState title="No submissions yet" description="Your drafts and submissions will appear here with status tracking." /></div>
        <div><h2 className="mb-3 text-xl font-bold">Feedback & notifications</h2><EmptyState title="No notifications" description="Review feedback, approval updates, and alerts will appear here." /></div>
      </div>
    </div>
  )
}
