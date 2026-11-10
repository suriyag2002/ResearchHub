import { PageHeader } from '../components/ui'
import { Target, Eye, BookOpenCheck, Users } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="container-page py-12">
      <PageHeader title="About Us" subtitle="Ramya Educational and Charitable Fund advances education and research through structured publication, academic integrity, and accessible knowledge." />
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="card p-7 lg:col-span-2">
          <h2 className="text-2xl font-bold">Our Institution</h2>
          <p className="mt-4 leading-relaxed text-slate-700">ResearchHub is the institution’s digital platform for managing research submissions, peer-review workflows, journals, and published scholarship. It is designed to provide a trusted, professional environment for researchers, readers, and administrators while supporting long-term growth in subjects, users, and publications.</p>
          <p className="mt-4 leading-relaxed text-slate-700">The platform emphasizes secure access control, transparent review processes, and responsible AI-assisted discovery grounded in the institution’s approved research collection.</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl bg-slate-50 p-5"><div className="flex items-center gap-2 font-semibold text-slate-900"><Target className="h-5 w-5 text-brand-700" />Mission</div><p className="mt-2 text-sm text-slate-600">Enable high-quality research publication and knowledge dissemination with integrity, accessibility, and modern digital infrastructure.</p></div>
            <div className="rounded-xl bg-slate-50 p-5"><div className="flex items-center gap-2 font-semibold text-slate-900"><Eye className="h-5 w-5 text-brand-700" />Vision</div><p className="mt-2 text-sm text-slate-600">Build a scalable academic ecosystem that supports multidisciplinary research and informed discovery for years to come.</p></div>
          </div>
        </div>
        <div className="space-y-6">
          <div className="card p-6"><BookOpenCheck className="h-6 w-6 text-brand-700" /><h3 className="mt-3 font-sans text-lg font-semibold">Publication Integrity</h3><p className="mt-2 text-sm text-slate-600">Controlled submission, review, approval, and publishing workflows with maintained history.</p></div>
          <div className="card p-6"><Users className="h-6 w-6 text-brand-700" /><h3 className="mt-3 font-sans text-lg font-semibold">Community Roles</h3><p className="mt-2 text-sm text-slate-600">Support for administrators, researchers, registered users, and public visitors with appropriate access levels.</p></div>
        </div>
      </div>
    </div>
  )
}
