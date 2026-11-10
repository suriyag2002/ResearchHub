import { useState } from 'react'
import { PageHeader } from '../components/ui'
import { Bot, FileSearch, Info, Send, Sparkles } from 'lucide-react'
import { useAuth } from '../lib/auth'
import { Link } from 'react-router-dom'

export default function AiAssistantPage({ embedded }: { embedded?: boolean }) {
  const { user } = useAuth()
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<{role:'user'|'assistant'; content:string}[]>([
    { role: 'assistant', content: 'I can help summarize approved papers, explain concepts, extract key findings, and compare documents once the AI/RAG services (Ollama, BGE, Qdrant) are configured and indexed content is available. Ask a question to get started.' }
  ])

  if (!user) return <div className="container-page py-12"><div className="card mx-auto max-w-xl p-8 text-center"><Sparkles className="mx-auto h-10 w-10 text-brand-700" /><h2 className="mt-4 text-2xl font-bold">AI Research Assistant</h2><p className="mt-2 text-slate-600">Sign in to access AI features over the approved research collection.</p><div className="mt-6 flex justify-center gap-3"><Link to="/login" className="btn-primary">Login</Link><Link to="/register" className="btn-secondary">Register</Link></div></div></div>

  const send = () => {
    if (!input.trim()) return
    const q = input.trim()
    setMessages(m => [...m, {role:'user', content:q}, {role:'assistant', content:'AI service is not fully configured in this environment yet. When connected, responses will be grounded in approved research documents with citations/page references where available. (AWS document pipeline deferred; retrieval/indexing configured separately.)'}])
    setInput('')
  }

  const body = (
    <div className={embedded ? '' : 'container-page py-12'}>
      {!embedded && <PageHeader title="AI Research Assistant" subtitle="Ask questions, request summaries, compare papers, and discover related research across the approved collection." />}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="card flex min-h-[520px] flex-col lg:col-span-2">
          <div className="flex-1 space-y-4 overflow-auto p-5">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role==='user'?'justify-end':'justify-start'}`}>
                <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${m.role==='user'?'bg-brand-700 text-white':'bg-slate-100 text-slate-800'}`}>
                  {m.role==='assistant' && <div className="mb-1 flex items-center gap-1 text-xs font-medium text-brand-700"><Bot className="h-3.5 w-3.5" />Assistant</div>}
                  {m.content}
                </div>
              </div>
            ))}
          </div>
          <div className="border-t p-4">
            <div className="flex gap-2">
              <input className="input" value={input} onChange={e=>setInput(e.target.value)} placeholder="e.g. Summarise this paper, compare methods, find related work..." onKeyDown={e=>e.key==='Enter'&&send()} />
              <button className="btn-primary" onClick={send}><Send className="h-4 w-4" /></button>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <div className="card p-5"><h3 className="font-sans text-base font-semibold flex items-center gap-2"><FileSearch className="h-4 w-4 text-brand-700" />Capabilities</h3><ul className="mt-3 space-y-2 text-sm text-slate-600 list-disc pl-5"><li>Short & detailed summaries</li><li>Objectives, methodology, findings</li><li>Question answering with citations</li><li>Semantic search & comparisons</li><li>Related paper recommendations</li></ul></div>
          <div className="card p-5 bg-slate-50"><h3 className="font-sans text-sm font-semibold flex items-center gap-2"><Info className="h-4 w-4" />Grounding & config</h3><p className="mt-2 text-sm text-slate-600">Provider settings (Ollama/external API), embeddings (BGE), and vector store (Qdrant) are environment-configurable. Answers must cite approved sources and avoid fabricated references.</p></div>
        </div>
      </div>
    </div>
  )
  return body
}
