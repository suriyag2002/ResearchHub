import { PageHeader } from '../components/ui'
import { Mail, MapPin, Phone } from 'lucide-react'

export default function ContactPage() {
  return (
    <div className="container-page py-12">
      <PageHeader title="Contact Us" subtitle="Get in touch with Ramya Educational and Charitable Fund for research, publication, or platform inquiries." />
      <div className="grid gap-6 lg:grid-cols-3">
        <form className="card p-7 lg:col-span-2 space-y-4" onSubmit={(e)=>e.preventDefault()}>
          <div className="grid gap-4 sm:grid-cols-2">
            <div><label className="label">Full name</label><input className="input" placeholder="Your name" /></div>
            <div><label className="label">Email</label><input type="email" className="input" placeholder="you@example.com" /></div>
          </div>
          <div><label className="label">Subject</label><input className="input" placeholder="How can we help?" /></div>
          <div><label className="label">Message</label><textarea className="input min-h-[140px]" placeholder="Write your message..." /></div>
          <button className="btn-primary">Send message</button>
          <p className="text-xs text-slate-500">Contact form submission can be wired to backend/email service in deployment configuration.</p>
        </form>
        <div className="space-y-4">
          {[{i:Mail,t:'Email',v:'info@researchhub.org (configure)'},{i:Phone,t:'Phone',v:'+91 — (configure)'},{i:MapPin,t:'Address',v:'Ramya Educational and Charitable Fund (configure address)'}].map(c=> (
            <div key={c.t} className="card p-6"><c.i className="h-5 w-5 text-brand-700" /><h3 className="mt-3 font-sans text-base font-semibold">{c.t}</h3><p className="mt-1 text-sm text-slate-600">{c.v}</p></div>
          ))}
        </div>
      </div>
    </div>
  )
}
