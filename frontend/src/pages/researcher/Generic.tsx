import { EmptyState, PageHeader, StatusBadge } from '../../components/ui'
import { Upload } from 'lucide-react'

export default function ResearcherGeneric({ title, subtitle, kind }: { title: string; subtitle: string; kind: string }) {
  return (
    <div>
      <PageHeader title={title} subtitle={subtitle} actions={kind==='submissions' ? <button className="btn-primary"><Upload className="h-4 w-4" />Upload paper</button> : undefined} />
      {kind === 'submissions' && (
        <div className="card mb-6 p-5">
          <h3 className="font-sans text-base font-semibold">Submission workflow</h3>
          <div className="mt-3 flex flex-wrap gap-2">{['draft','pending_review','under_review','approved','rejected','published','archived'].map(s => <StatusBadge key={s} status={s} />)}</div>
          <p className="mt-3 text-sm text-slate-600">Upload metadata and PDF via secure flow. <strong>AWS S3 upload integration is currently deferred</strong> (storage provider placeholder) — document records and statuses are still supported by the data model.</p>
        </div>
      )}
      <div className="card p-5"><EmptyState title="Nothing to show yet" description="Data for this section will load from the database when available." /></div>
    </div>
  )
}
