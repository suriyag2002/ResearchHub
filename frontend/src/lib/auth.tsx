import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from 'react'
import type { Session, User } from '@supabase/supabase-js'
import { supabase, supabaseConfigured } from './supabase'
import type { Profile, Role } from './types'

interface AuthCtx {
  session: Session | null
  user: User | null
  profile: Profile | null
  role: Role | 'public'
  loading: boolean
  configured: boolean
  signOut: () => Promise<void>
  refreshProfile: () => Promise<void>
}

const Ctx = createContext<AuthCtx | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)

  const loadProfile = async (user: User | null) => {
    if (!user || !supabaseConfigured) { setProfile(null); return }
    const { data } = await supabase.from('profiles').select('id,email,full_name,role').eq('id', user.id).maybeSingle()
    setProfile((data as Profile) || { id: user.id, email: user.email || '', role: 'registered_user' })
  }

  useEffect(() => {
    let mounted = true
    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return
      setSession(data.session)
      loadProfile(data.session?.user ?? null).finally(() => mounted && setLoading(false))
    })
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => {
      setSession(s)
      setLoading(true)
      loadProfile(s?.user ?? null).finally(() => setLoading(false))
    })
    return () => { mounted = false; sub.subscription.unsubscribe() }
  }, [])

  const value = useMemo<AuthCtx>(() => ({
    session,
    user: session?.user ?? null,
    profile,
    role: profile?.role ?? (session ? 'registered_user' : 'public'),
    loading,
    configured: supabaseConfigured,
    signOut: async () => { await supabase.auth.signOut() },
    refreshProfile: async () => { await loadProfile(session?.user ?? null) }
  }), [session, profile, loading])

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useAuth() {
  const v = useContext(Ctx)
  if (!v) throw new Error('useAuth must be used within AuthProvider')
  return v
}
