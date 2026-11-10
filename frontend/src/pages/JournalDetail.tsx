import { useParams } from 'react-router-dom'
import { EmptyState, PageHeader } from '../components/ui'

export default function JournalDetailPage() {
  const { slug } = useParams()
  return (
    <div className="container-page py-12">
      <PageHeader title="Journal Details" subtitle={`Journal: ${slug || '—'}. Details, editorial board, volumes, issues, and articles are loaded from the database.`} />
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="card p-7 lg:col-span-2 space-y-8">
          <section><h2 className="text-xl font-bold">Aims & Scope</h2><p className="mt-2 text-slate-600">Not available yet.</p></section>
          <section><h2 className="text-xl font-bold">Volumes & Issues</h2><div className="mt-4"><EmptyState title="No issues available" description="Published volumes and issues for this journal will appear here." /></div></section>
        </div>
        <div className="space-y-4">
          <div className="card p-6"><h3 className="font-sans text-base font-semibold">Identifiers</h3><dl className="mt-3 space-y-2 text-sm"><div className="flex justify-between"><dt className="text-slate-500">p-ISSN</dt><dd className="font-medium">—</dd></div><div className="flex justify-between"><dt className="text-slate-500">e-ISSN</dt><dd className="font-medium">—</dd></div></dl></div>
          <div className="card p-6"><h3 className="font-sans text-base font-semibold">Editorial Board</h3><p className="mt-2 text-sm text-slate-600">Information not available yet.</p></div>
        </div>
      </div>
    </div>
  )
}
