import { useParams, Link } from 'react-router-dom'
import { EmptyState, PageHeader } from '../components/ui'

const meta: Record<string, {title:string; desc:string}> = {
  'computer-science': { title: 'Computer Science', desc: 'Computing research spanning theory, systems, data, and applied technologies.' },
  'english': { title: 'English', desc: 'Research in language, literature, and critical studies.' },
  'tamil': { title: 'Tamil', desc: 'Research in Tamil language, literature, and cultural scholarship.' },
}

export default function SubjectPage() {
  const { slug } = useParams()
  const m = (slug && meta[slug]) || { title: 'Research Area', desc: 'Subject details loaded from configured research areas.' }
  return (
    <div className="container-page py-12">
      <PageHeader title={m.title} subtitle={m.desc} actions={<Link to="/publications" className="btn-secondary">Browse publications</Link>} />
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="card p-7 lg:col-span-2">
          <h2 className="text-xl font-bold">About this area</h2>
          <p className="mt-3 text-slate-600">Published works, journal issues, and featured research for this subject will appear here once available and approved. Public visitors may see limited previews; registered users can access complete permitted content.</p>
          <div className="mt-8"><h3 className="font-sans text-base font-semibold">Recent publications</h3><div className="mt-4"><EmptyState title="No publications yet" description="Approved and published papers in this subject will be listed here from the database." /></div></div>
        </div>
        <div className="space-y-4">
          <div className="card p-6"><h3 className="font-sans text-base font-semibold">Access note</h3><p className="mt-2 text-sm text-slate-600">Some documents and AI features require sign-in. <Link to="/login" className="text-brand-700 font-medium">Login</Link> or <Link to="/register" className="text-brand-700 font-medium">register</Link> for full access.</p></div>
        </div>
      </div>
    </div>
  )
}
