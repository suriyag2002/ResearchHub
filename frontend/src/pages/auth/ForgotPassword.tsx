import { useState } from 'react'
import { supabase, supabaseConfigured } from '../../lib/supabase'

export default function ForgotPage() {
  const [email, setEmail] = useState('')
  const [msg, setMsg] = useState<string | null>(null)
  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!supabaseConfigured) { setMsg('Supabase is not configured yet.'); return }
    const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: `${window.location.origin}/reset-password` })
    setMsg(error ? error.message : 'If the email exists, a password reset link has been sent.')
  }
  return (
    <div className="container-page py-16"><div className="mx-auto max-w-md card p-8"><h1 className="text-3xl font-bold">Reset password</h1><p className="mt-2 text-slate-600">Enter your email to receive a reset link.</p>
      <form className="mt-6 space-y-4" onSubmit={submit}><div><label className="label">Email</label><input className="input" type="email" value={email} onChange={e=>setEmail(e.target.value)} required /></div>{msg && <div className="rounded-lg bg-slate-100 p-3 text-sm text-slate-700">{msg}</div>}<button className="btn-primary w-full">Send reset link</button></form>
    </div></div>
  )
}
