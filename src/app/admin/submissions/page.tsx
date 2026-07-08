'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { ChevronLeft, Inbox, Check, X, Trash2, ExternalLink, Mail } from 'lucide-react'
import Link from 'next/link'

const statusColors: Record<string, { bg: string; color: string }> = {
  pending: { bg: '#FFF8E1', color: '#E8A020' },
  approved: { bg: '#E6F5ED', color: '#1E8A4C' },
  rejected: { bg: '#FDE8E8', color: '#C0392B' },
}

export default function SubmissionsAdminPage() {
  const [submissions, setSubmissions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('pending')
  const [expanded, setExpanded] = useState<string | null>(null)

  useEffect(() => {
    loadSubmissions()
  }, [])

  async function loadSubmissions() {
    const supabase = createClient()
    const { data } = await supabase
      .from('submissions')
      .select('*')
      .order('created_at', { ascending: false })
    setSubmissions(data || [])
    setLoading(false)
  }

  async function updateStatus(id: string, status: string) {
    const supabase = createClient()
    await supabase.from('submissions').update({ status }).eq('id', id)
    setSubmissions(submissions.map(s => s.id === id ? { ...s, status } : s))
  }

  async function deleteSubmission(id: string) {
    if (!confirm('Delete this submission?')) return
    const supabase = createClient()
    await supabase.from('submissions').delete().eq('id', id)
    setSubmissions(submissions.filter(s => s.id !== id))
  }

  const filtered = filter === 'all'
    ? submissions
    : submissions.filter(s => s.status === filter)

  const pendingCount = submissions.filter(s => s.status === 'pending').length

  return (
    <div className="min-h-screen" style={{ background: 'var(--light)' }}>

      {/* HEADER */}
      <div className="bg-white border-b border-gray-100 px-8 py-5">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="flex items-center gap-1 text-sm hover:underline"
              style={{ color: 'var(--muted)' }}>
              <ChevronLeft className="w-4 h-4" /> Dashboard
            </Link>
            <h1 className="font-sora text-xl font-bold" style={{ color: 'var(--navy)' }}>
              Research Submissions
            </h1>
            {pendingCount > 0 && (
              <span className="px-2 py-0.5 rounded-full text-xs font-bold text-white"
                style={{ background: '#C0392B' }}>
                {pendingCount} pending
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-8 py-8">

        {/* FILTER TABS */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {[
            { key: 'pending', label: `Pending (${submissions.filter(s => s.status === 'pending').length})` },
            { key: 'approved', label: `Approved (${submissions.filter(s => s.status === 'approved').length})` },
            { key: 'rejected', label: `Rejected (${submissions.filter(s => s.status === 'rejected').length})` },
            { key: 'all', label: `All (${submissions.length})` },
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              className="px-4 py-1.5 rounded-full text-sm font-semibold border transition-all"
              style={filter === tab.key
                ? { background: 'var(--navy)', color: 'white', borderColor: 'var(--navy)' }
                : { background: 'white', color: 'var(--muted)', borderColor: 'var(--border)' }
              }
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* SUBMISSIONS LIST */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-700 rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-16 text-center">
            <Inbox className="w-12 h-12 mx-auto mb-4" style={{ color: 'var(--muted)' }} />
            <h3 className="font-sora font-bold text-lg mb-2" style={{ color: 'var(--navy)' }}>
              No {filter === 'all' ? '' : filter} submissions
            </h3>
            <p className="text-sm" style={{ color: 'var(--muted)' }}>
              Research submissions from the public will appear here.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {filtered.map(submission => {
              const status = statusColors[submission.status] || statusColors.pending
              const isExpanded = expanded === submission.id
              return (
                <div
                  key={submission.id}
                  className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-sm transition-shadow"
                >
                  {/* SUBMISSION HEADER */}
                  <div
                    className="p-5 cursor-pointer"
                    onClick={() => setExpanded(isExpanded ? null : submission.id)}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1.5">
                          <span
                            className="px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize"
                            style={{ background: status.bg, color: status.color }}
                          >
                            {submission.status}
                          </span>
                          {submission.category && (
                            <span className="px-2 py-0.5 rounded-full text-xs font-semibold"
                              style={{ background: 'var(--light)', color: 'var(--muted)' }}>
                              {submission.category}
                            </span>
                          )}
                        </div>
                        <h3 className="font-semibold text-sm mb-1" style={{ color: 'var(--navy)' }}>
                          {submission.title}
                        </h3>
                        <div className="flex items-center gap-3 text-xs" style={{ color: 'var(--muted)' }}>
                          <span>{submission.name}</span>
                          <span>·</span>
                          <span>{submission.email}</span>
                          <span>·</span>
                          <span>{new Date(submission.created_at).toLocaleDateString()}</span>
                        </div>
                      </div>

                      {/* ACTIONS */}
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {submission.status === 'pending' && (
                          <>
                            <button
                              onClick={(e) => { e.stopPropagation(); updateStatus(submission.id, 'approved') }}
                              className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-green-50 transition-colors"
                              style={{ color: '#1E8A4C' }}
                            >
                              <Check className="w-3.5 h-3.5" /> Approve
                            </button>
                            <button
                              onClick={(e) => { e.stopPropagation(); updateStatus(submission.id, 'rejected') }}
                              className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-red-50 transition-colors"
                              style={{ color: '#C0392B' }}
                            >
                              <X className="w-3.5 h-3.5" /> Reject
                            </button>
                          </>
                        )}
                        {submission.status !== 'pending' && (
                          <button
                            onClick={(e) => { e.stopPropagation(); updateStatus(submission.id, 'pending') }}
                            className="px-3 py-1.5 rounded-lg text-xs font-semibold border hover:bg-gray-50 transition-colors"
                            style={{ color: 'var(--muted)', borderColor: 'var(--border)' }}
                          >
                            Reset
                          </button>
                        )}
                        <button
                          onClick={(e) => { e.stopPropagation(); deleteSubmission(submission.id) }}
                          className="p-1.5 rounded-lg hover:bg-red-50 transition-colors"
                          style={{ color: '#C0392B' }}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* EXPANDED DETAILS */}
              {isExpanded && (
                    <div className="px-5 pb-5 border-t border-gray-100 pt-4">
                      {submission.abstract && (
                        <div className="mb-4">
                          <h4 className="text-xs font-bold uppercase tracking-wider mb-2"
                            style={{ color: 'var(--muted)' }}>Abstract</h4>
                          <p className="text-sm leading-relaxed" style={{ color: 'var(--text)' }}>
                            {submission.abstract}
                          </p>
                        </div>
                      )}
                      <div className="flex items-center gap-4">
                        {submission.file_url && (
                          
                          <a 
                           href={submission.file_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold border hover:bg-gray-50 transition-colors"
                            style={{ color: 'var(--blue)', borderColor: 'var(--border)' }}
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            View File
                          </a>
                        )}
                        
                         <a href={'mailto:' + submission.email}
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold border hover:bg-gray-50 transition-colors"
                          style={{ color: 'var(--navy)', borderColor: 'var(--border)' }}
                        >
                          <Mail className="w-3.5 h-3.5" />
                          Email Author
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}