import { EmptyState, PageHeader } from '../../components/ui'
import { Plus } from 'lucide-react'

export default function AdminGeneric({ title, subtitle, entity }: { title: string; subtitle: string; entity: string }) {
  return (
    <div>
      <PageHeader title={title} subtitle={subtitle} actions={<button className="btn-primary"><Plus className="h-4 w-4" />New</button>} />
      <div className="card p-5">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <input className="input max-w-md" placeholder={`Search ${entity}...`} />
          <div className="text-sm text-slate-500">Data source: Supabase (configured via environment). AWS storage integration deferred.</div>
        </div>
        <EmptyState title={`No ${entity} found`} description="Records will appear here from the database. Use actions above to create or manage entries once connected and authorized." />
      </div>
    </div>
  )
}
