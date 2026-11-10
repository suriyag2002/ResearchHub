import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { BookOpen, GraduationCap, LayoutDashboard, LogIn, LogOut, Menu, Shield, User, X, Sparkles } from 'lucide-react'
import { useState } from 'react'
import { useAuth } from '../lib/auth'

const nav = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Us' },
  { to: '/research-areas', label: 'Research Areas' },
  { to: '/publications', label: 'Publications' },
  { to: '/journals', label: 'Journals' },
  { to: '/contact', label: 'Contact' },
]

export function PublicLayout() {
  const [open, setOpen] = useState(false)
  const { user, role, signOut } = useAuth()
  const loc = useLocation()
  const dash = role === 'super_admin' || role === 'admin' ? '/admin' : role === 'researcher' ? '/researcher' : user ? '/account/profile' : null
  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur">
        <div className="container-page flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-semibold text-slate-900">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-brand-700 text-white"><BookOpen className="h-5 w-5" /></span>
            <span>ResearchHub</span>
          </Link>
          <nav className="hidden items-center gap-1 md:flex">
            {nav.map(i => <NavLink key={i.to} to={i.to} className={({isActive}) => `rounded-lg px-3 py-2 text-sm font-medium ${isActive ? 'bg-brand-50 text-brand-800' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`}>{i.label}</NavLink>)}
          </nav>
          <div className="hidden items-center gap-2 md:flex">
            {user ? (
              <>
                {dash && <Link to={dash} className="btn-secondary"><LayoutDashboard className="h-4 w-4" />Dashboard</Link>}
                <button onClick={signOut} className="btn-ghost"><LogOut className="h-4 w-4" />Logout</button>
              </>
            ) : (<><Link to="/login" className="btn-ghost"><LogIn className="h-4 w-4" />Login</Link><Link to="/register" className="btn-primary">Register</Link></>)}
          </div>
          <button className="md:hidden btn-ghost p-2" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
        </div>
        {open && <div className="border-t bg-white md:hidden"><div className="container-page flex flex-col py-3">{nav.map(i => <Link key={i.to} to={i.to} onClick={()=>setOpen(false)} className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100">{i.label}</Link>)}<div className="mt-2 flex gap-2 border-t pt-3">{user ? <button onClick={signOut} className="btn-secondary w-full">Logout</button> : <><Link to="/login" onClick={()=>setOpen(false)} className="btn-secondary w-full">Login</Link><Link to="/register" onClick={()=>setOpen(false)} className="btn-primary w-full">Register</Link></>}</div></div></div>}
      </header>
      <main key={loc.pathname} className="flex-1"><Outlet /></main>
      <footer className="border-t border-slate-200 bg-slate-900 text-slate-300">
        <div className="container-page grid gap-8 py-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 text-white font-semibold"><BookOpen className="h-5 w-5" /> ResearchHub</div>
            <p className="mt-3 max-w-md text-sm text-slate-400">A secure, scalable research management platform for Ramya Educational and Charitable Fund — supporting publication workflows, journals, and AI-assisted discovery over approved research.</p>
          </div>
          <div><h4 className="text-sm font-semibold text-white">Explore</h4><ul className="mt-3 space-y-2 text-sm"><li><Link to="/research-areas" className="hover:text-white">Research Areas</Link></li><li><Link to="/publications" className="hover:text-white">Publications</Link></li><li><Link to="/journals" className="hover:text-white">Journals</Link></li></ul></div>
          <div><h4 className="text-sm font-semibold text-white">Account</h4><ul className="mt-3 space-y-2 text-sm"><li><Link to="/login" className="hover:text-white">Login</Link></li><li><Link to="/register" className="hover:text-white">Register</Link></li><li><Link to="/contact" className="hover:text-white">Contact</Link></li></ul></div>
        </div>
        <div className="border-t border-slate-800 py-4 text-center text-xs text-slate-500">© {new Date().getFullYear()} Ramya Educational and Charitable Fund. All rights reserved.</div>
      </footer>
    </div>
  )
}

function DashLink({ to, icon, label }: { to: string; icon: any; label: string }) {
  const Icon = icon
  return <NavLink to={to} end={to.split('/').length<=2} className={({isActive}) => `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium ${isActive ? 'bg-brand-700 text-white' : 'text-slate-300 hover:bg-slate-800 hover:text-white'}`}><Icon className="h-4 w-4" />{label}</NavLink>
}

export function DashboardLayout({ title, links }: { title: string; links: {to:string;label:string;icon:any}[] }) {
  const { profile, signOut } = useAuth()
  return (
    <div className="min-h-screen bg-slate-100 lg:flex">
      <aside className="w-full border-b border-slate-800 bg-slate-950 text-white lg:fixed lg:inset-y-0 lg:w-72 lg:border-b-0 lg:border-r">
        <div className="flex h-full flex-col p-5">
          <Link to="/" className="flex items-center gap-2 font-semibold"><BookOpen className="h-5 w-5 text-brand-400" />ResearchHub</Link>
          <p className="mt-1 text-xs text-slate-400">{title}</p>
          <nav className="mt-8 flex flex-1 flex-col gap-1">{links.map(l => <DashLink key={l.to} {...l} />)}</nav>
          <div className="mt-6 rounded-xl bg-slate-900 p-4 text-sm">
            <p className="font-medium text-white truncate">{profile?.full_name || profile?.email || 'User'}</p>
            <p className="text-xs text-slate-400 capitalize">{profile?.role?.replace('_',' ')}</p>
            <button onClick={signOut} className="mt-3 inline-flex items-center gap-2 text-xs text-slate-300 hover:text-white"><LogOut className="h-3.5 w-3.5" />Sign out</button>
          </div>
        </div>
      </aside>
      <div className="flex-1 lg:pl-72"><div className="container-page py-8"><Outlet /></div></div>
    </div>
  )
}

export function RequireAuth({ roles, children }: { roles?: string[]; children: JSX.Element }) {
  const { user, role, loading } = useAuth()
  if (loading) return <div className="container-page py-20 text-center text-slate-600">Loading...</div>
  if (!user) return <div className="container-page py-20"><div className="card mx-auto max-w-lg p-8 text-center"><Shield className="mx-auto h-10 w-10 text-brand-700" /><h2 className="mt-4 text-2xl font-bold">Sign in required</h2><p className="mt-2 text-slate-600">Please log in to access this area.</p><div className="mt-6 flex justify-center gap-3"><Link to="/login" className="btn-primary">Login</Link><Link to="/register" className="btn-secondary">Register</Link></div></div></div>
  if (roles && !roles.includes(role)) return <div className="container-page py-20"><div className="card mx-auto max-w-lg p-8 text-center"><Shield className="mx-auto h-10 w-10 text-amber-600" /><h2 className="mt-4 text-2xl font-bold">Access restricted</h2><p className="mt-2 text-slate-600">Your account does not have permission to view this page.</p></div></div>
  return children
}
