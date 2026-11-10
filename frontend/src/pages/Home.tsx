import { Link } from 'react-router-dom'
import { ArrowRight, BookOpen, BrainCircuit, FileCheck2, Globe2, Lock, Search, ShieldCheck } from 'lucide-react'

export default function HomePage() {
  return (
    <div>
      <section className="relative overflow-hidden border-b bg-gradient-to-br from-slate-950 via-brand-950 to-slate-900 text-white">
        <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:28px_28px]" />
        <div className="container-page relative grid gap-10 py-20 lg:grid-cols-2 lg:items-center lg:py-28">
          <div>
            <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-brand-100">Ramya Educational and Charitable Fund</span>
            <h1 className="mt-5 text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">ResearchHub for trusted academic publishing and discovery</h1>
            <p className="mt-5 max-w-xl text-lg text-slate-300">Manage submissions, journals, and publications with secure role-based access — and prepare for AI-assisted research over your institution’s approved collection.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/publications" className="btn-primary bg-white text-brand-900 hover:bg-brand-50"><Search className="h-4 w-4" />Explore Publications</Link>
              <Link to="/register" className="btn border border-white/30 bg-transparent text-white hover:bg-white/10">Create Account <ArrowRight className="h-4 w-4" /></Link>
            </div>
            <p className="mt-4 text-xs text-slate-400">Public visitors can preview selected titles and abstracts. Full access requires registration.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[{i:ShieldCheck,t:'Secure access control',d:'Roles and permissions enforced by backend and RLS policies.'},{i:FileCheck2,t:'Structured review workflow',d:'Draft to publication with approvals, feedback, and history.'},{i:BookOpen,t:'Journal-ready publishing',d:'Journals, volumes, issues, and ISSN metadata management.'},{i:BrainCircuit,t:'AI research assistant',d:'Grounded summaries and Q&A over approved documents (RAG-ready).'}].map(c => (
              <div key={c.t} className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
                <c.i className="h-6 w-6 text-brand-300" />
                <h3 className="mt-3 font-sans text-base font-semibold text-white">{c.t}</h3>
                <p className="mt-1 text-sm text-slate-300">{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-16">
        <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div><h2 className="text-3xl font-bold">Research Areas</h2><p className="mt-2 text-slate-600">Subject areas are managed dynamically from the platform database.</p></div>
          <Link to="/research-areas" className="btn-secondary">View all areas</Link>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {[{name:'Computer Science', slug:'computer-science', desc:'Computing, data, systems, and applied intelligent technologies.', color:'from-blue-600 to-cyan-500'},{name:'English', slug:'english', desc:'Language, literature, linguistics, and critical studies.', color:'from-emerald-600 to-teal-500'},{name:'Tamil', slug:'tamil', desc:'Tamil language, literature, culture, and scholarly research.', color:'from-amber-600 to-orange-500'}].map(s => (
            <Link key={s.slug} to={`/research-areas/${s.slug}`} className="card group overflow-hidden">
              <div className={`h-2 bg-gradient-to-r ${s.color}`} />
              <div className="p-6"><h3 className="text-xl font-bold group-hover:text-brand-700">{s.name}</h3><p className="mt-2 text-sm text-slate-600">{s.desc}</p><span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand-700">Explore <ArrowRight className="h-4 w-4" /></span></div>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-y bg-white">
        <div className="container-page grid gap-10 py-16 lg:grid-cols-3">
          <div className="lg:col-span-1"><h2 className="text-3xl font-bold">Built for growth</h2><p className="mt-3 text-slate-600">A modular architecture designed to scale services independently over 5–10 years, with configurable infrastructure and secure-by-default practices.</p></div>
          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-2">
            {[{i:Globe2,t:'Public + authenticated experiences',d:'Professional public preview with gated full content and AI features.'},{i:Lock,t:'Private document handling',d:'Storage abstraction ready for private AWS S3 and secure access controls (integration in progress).'},{i:Search,t:'Discoverable publications',d:'Searchable, approved-and-published research library with pagination-ready design.'},{i:ShieldCheck,t:'Auditable workflows',d:'Submission history, activity logging, and configurable platform settings.'}].map(f => (
              <div key={f.t} className="rounded-xl border border-slate-200 p-5"><f.i className="h-5 w-5 text-brand-700" /><h3 className="mt-3 font-sans text-base font-semibold">{f.t}</h3><p className="mt-1 text-sm text-slate-600">{f.d}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-16 text-center">
        <div className="card mx-auto max-w-4xl bg-gradient-to-r from-brand-700 to-brand-900 p-10 text-white">
          <h2 className="text-3xl font-bold text-white">Join the ResearchHub community</h2>
          <p className="mx-auto mt-3 max-w-2xl text-brand-100">Register to access complete published research, download permitted documents, and use AI research features over the approved collection.</p>
          <div className="mt-7 flex flex-wrap justify-center gap-3"><Link to="/register" className="btn bg-white text-brand-900 hover:bg-brand-50">Register now</Link><Link to="/contact" className="btn border border-white/30 text-white hover:bg-white/10">Contact us</Link></div>
        </div>
      </section>
    </div>
  )
}
