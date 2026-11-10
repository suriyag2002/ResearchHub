import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase, supabaseConfigured } from '../../lib/supabase'

export default function LoginPage() {
  const nav = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [msg, setMsg] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!supabaseConfigured) { setMsg('Supabase is not configured yet. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.'); return }
    setLoading(true); setMsg(null)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)
    if (error) setMsg(error.message); else nav('/')
  }

  return (
    <div className="container-page py-16">
      <div className="mx-auto max-w-md card p-8">
        <h1 className="text-3xl font-bold">Welcome back</h1>
        <p className="mt-2 text-slate-600">Sign in to access your account and research tools.</p>
        <form className="mt-6 space-y-4" onSubmit={submit}>
          <div><label className="label">Email</label><input className="input" type="email" value={email} onChange={e=>setEmail(e.target.value)} required /></div>
          <div><label className="label">Password</label><input className="input" type="password" value={password} onChange={e=>setPassword(e.target.value)} required /></div>
          {msg && <div className="rounded-lg bg-amber-50 p-3 text-sm text-amber-900">{msg}</div>}
          <button className="btn-primary w-full" disabled={loading}>{loading ? 'Signing in...' : 'Login'}</button>
        </form>
        <div className="mt-5 flex items-center justify-between text-sm">
          <Link to="/forgot-password" className="text-brand-700 font-medium">Forgot password?</Link>
          <Link to="/register" className="text-brand-700 font-medium">Create account</Link>
        </div>
      </div>
    </div>
  )
}
