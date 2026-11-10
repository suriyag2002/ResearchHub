import { EmptyState, PageHeader } from '../components/ui'

export default function JournalsPage() {
  return (
    <div className="container-page py-12">
      <PageHeader title="Journal Information" subtitle="Official journals published by the institution. ISSN identifiers are displayed only when officially assigned and entered by administrators." />
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="card p-6 lg:col-span-2">
          <h2 className="text-xl font-bold">Journals</h2>
          <p className="mt-2 text-sm text-slate-600">Browse journals, aims and scope, editorial boards, volumes, and issues.</p>
          <div className="mt-6"><EmptyState title="No journals published yet" description="Journals created and published by the Super Admin will be listed here with their volumes and issues." /></div>
        </div>
        <div className="card p-6">
          <h3 className="font-sans text-base font-semibold">ISSN & identifiers</h3>
          <ul className="mt-3 space-y-2 text-sm text-slate-600 list-disc pl-5">
            <li>Print ISSN (p-ISSN) and Online ISSN (e-ISSN) are stored per journal when provided.</li>
            <li>Identifiers are admin-entered and not auto-generated.</li>
            <li>ISBN, if applicable, is managed separately for eligible book publications (not journal issues).</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
