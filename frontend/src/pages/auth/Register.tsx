import { useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase, supabaseConfigured } from '../../lib/supabase'

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [msg, setMsg] = useState<string | null>(null)
  const [ok, setOk] = useState(false)
  const [loading, setLoading] = useState(false)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!supabaseConfigured) { setMsg('Supabase is not configured yet. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.'); return }
    setLoading(true); setMsg(null)
    const { error } = await supabase.auth.signUp({ email: form.email, password: form.password, options: { data: { full_name: form.name } } })
    setLoading(false)
    if (error) setMsg(error.message); else { setOk(true); setMsg('Registration successful. Please check your email to verify your account. New accounts receive the registered-user role by default.') }
  }

  return (
    <div className="container-page py-16">
      <div className="mx-auto max-w-md card p-8">
        <h1 className="text-3xl font-bold">Create your account</h1>
        <p className="mt-2 text-slate-600">Register to access full publications and AI research features.</p>
        <form className="mt-6 space-y-4" onSubmit={submit}>
          <div><label className="label">Full name</label><input className="input" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} required /></div>
          <div><label className="label">Email</label><input className="input" type="email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} required /></div>
          <div><label className="label">Password</label><input className="input" type="password" minLength={8} value={form.password} onChange={e=>setForm({...form, password:e.target.value})} required /></div>
          {msg && <div className={`rounded-lg p-3 text-sm ${ok ? 'bg-emerald-50 text-emerald-900' : 'bg-amber-50 text-amber-900'}`}>{msg}</div>}
          <button className="btn-primary w-full" disabled={loading}>{loading ? 'Creating account...' : 'Register'}</button>
        </form>
        <p className="mt-5 text-sm text-slate-600">Already have an account? <Link to="/login" className="text-brand-700 font-medium">Login</Link></p>
      </div>
    </div>
  )
}
