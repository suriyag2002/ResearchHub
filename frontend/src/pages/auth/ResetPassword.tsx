import { useState } from 'react'
import { supabase, supabaseConfigured } from '../../lib/supabase'

export default function ResetPage() {
  const [password, setPassword] = useState('')
  const [msg, setMsg] = useState<string | null>(null)
  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!supabaseConfigured) { setMsg('Supabase is not configured yet.'); return }
    const { error } = await supabase.auth.updateUser({ password })
    setMsg(error ? error.message : 'Password updated. You can now sign in with your new password.')
  }
  return (
    <div className="container-page py-16"><div className="mx-auto max-w-md card p-8"><h1 className="text-3xl font-bold">Set new password</h1>
      <form className="mt-6 space-y-4" onSubmit={submit}><div><label className="label">New password</label><input className="input" type="password" minLength={8} value={password} onChange={e=>setPassword(e.target.value)} required /></div>{msg && <div className="rounded-lg bg-slate-100 p-3 text-sm text-slate-700">{msg}</div>}<button className="btn-primary w-full">Update password</button></form>
    </div></div>
  )
}
