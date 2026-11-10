import { Link } from 'react-router-dom'
import { PageHeader } from '../components/ui'
import { ArrowRight, BookOpen } from 'lucide-react'

const areas = [
  { name: 'Computer Science', slug: 'computer-science', desc: 'Research in algorithms, software systems, data science, AI, networks, and emerging computing disciplines.' },
  { name: 'English', slug: 'english', desc: 'Scholarship in literature, linguistics, language studies, pedagogy, and critical cultural analysis.' },
  { name: 'Tamil', slug: 'tamil', desc: 'Research in Tamil language, classical and modern literature, linguistics, and cultural heritage.' },
]

export default function ResearchAreasPage() {
  return (
    <div className="container-page py-12">
      <PageHeader title="Research Areas" subtitle="Explore the institution’s subject areas. These areas are managed dynamically in the database and can expand over time." />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {areas.map(a => (
          <Link key={a.slug} to={`/research-areas/${a.slug}`} className="card group p-7 hover:border-brand-200">
            <div className="inline-flex rounded-xl bg-brand-50 p-3 text-brand-700"><BookOpen className="h-5 w-5" /></div>
            <h2 className="mt-4 text-2xl font-bold group-hover:text-brand-700">{a.name}</h2>
            <p className="mt-2 text-slate-600">{a.desc}</p>
            <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-brand-700">View area <ArrowRight className="h-4 w-4" /></span>
          </Link>
        ))}
      </div>
      <div className="mt-10 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-6 text-sm text-slate-600">Additional subject areas can be added by the Super Admin without frontend code changes (data-driven configuration).</div>
    </div>
  )
}
