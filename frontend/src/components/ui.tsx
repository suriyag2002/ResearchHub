import { ReactNode } from 'react'
import { AlertCircle, Inbox, Loader2 } from 'lucide-react'

export function PageHeader({ title, subtitle, actions }: { title: string; subtitle?: string; actions?: ReactNode }) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">{title}</h1>
        {subtitle && <p className="mt-2 max-w-3xl text-slate-600">{subtitle}</p>}
      </div>
      {actions && <div className="flex gap-3">{actions}</div>}
    </div>
  )
}

export function StatCard({ label, value, hint, icon }: { label: string; value: string | number; hint?: string; icon?: ReactNode }) {
  return (
    <div className="card p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">{label}</p>
          <p className="mt-2 text-3xl font-semibold text-slate-900">{value}</p>
          {hint && <p className="mt-1 text-xs text-slate-500">{hint}</p>}
        </div>
        {icon && <div className="rounded-xl bg-brand-50 p-3 text-brand-700">{icon}</div>}
      </div>
    </div>
  )
}

export function EmptyState({ title, description }: { title: string; description?: string }) {
  return (
    <div className="card flex flex-col items-center justify-center px-6 py-14 text-center">
      <div className="mb-4 rounded-full bg-slate-100 p-4 text-slate-500"><Inbox className="h-7 w-7" /></div>
      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      {description && <p className="mt-2 max-w-md text-sm text-slate-600">{description}</p>}
    </div>
  )
}

export function LoadingState({ label = 'Loading...' }: { label?: string }) {
  return <div className="flex items-center justify-center gap-3 py-16 text-slate-600"><Loader2 className="h-5 w-5 animate-spin" />{label}</div>
}

export function ErrorState({ message }: { message: string }) {
  return (
    <div className="card border-red-200 bg-red-50 p-5 text-red-800">
      <div className="flex items-start gap-3"><AlertCircle className="mt-0.5 h-5 w-5" /><div><p className="font-medium">Something went wrong</p><p className="text-sm opacity-90">{message}</p></div></div>
    </div>
  )
}

export function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    draft: 'bg-slate-100 text-slate-700', pending_review: 'bg-amber-100 text-amber-800', under_review: 'bg-blue-100 text-blue-800',
    approved: 'bg-emerald-100 text-emerald-800', rejected: 'bg-red-100 text-red-700', published: 'bg-brand-100 text-brand-800', archived: 'bg-slate-200 text-slate-700'
  }
  return <span className={`badge ${map[status] || 'bg-slate-100 text-slate-700'}`}>{status.replace(/_/g, ' ')}</span>
}
