import { useAuth } from '../../lib/auth'
import { PageHeader } from '../../components/ui'

export default function AccountProfile() {
  const { profile, user, configured } = useAuth()
  return (
    <div className="container-page py-12 max-w-4xl">
      <PageHeader title="User Profile" subtitle="Manage your account information and preferences." />
      <div className="grid gap-6 md:grid-cols-3">
        <div className="card p-6 md:col-span-2 space-y-4">
          <div><label className="label">Full name</label><input className="input" defaultValue={profile?.full_name || ''} placeholder="Your name" /></div>
          <div><label className="label">Email</label><input className="input" value={profile?.email || user?.email || ''} disabled /></div>
          <div><label className="label">Role</label><input className="input capitalize" value={profile?.role?.replace('_',' ') || 'Registered user'} disabled /></div>
          <p className="text-xs text-slate-500">Roles are assigned by administrators and enforced by backend/RLS. {!configured && 'Connect Supabase to load and persist profile data.'}</p>
          <button className="btn-primary">Save changes</button>
        </div>
        <div className="card p-6"><h3 className="font-sans text-base font-semibold">Account status</h3><ul className="mt-3 space-y-2 text-sm text-slate-600"><li>Email verification: managed by Supabase Auth</li><li>Session: persistent (when configured)</li><li>Access: based on assigned role</li></ul></div>
      </div>
    </div>
  )
}
