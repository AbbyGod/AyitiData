'use client'

export const dynamic = 'force-dynamic'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { ChevronLeft, MessageSquare, Check, X, Trash2, Eye } from 'lucide-react'
import Link from 'next/link'

export default function CommentsAdminPage() {
  const [comments, setComments] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('pending')

  useEffect(() => {
    loadComments()
  }, [])

  async function loadComments() {
    const supabase = createClient()
    const { data } = await supabase
      .from('comments')
      .select('*, articles(title, slug)')
      .order('created_at', { ascending: false })
    setComments(data || [])
    setLoading(false)
  }

  async function approveComment(id: string) {
    const supabase = createClient()
    await supabase.from('comments').update({ approved: true }).eq('id', id)
    setComments(comments.map(c => c.id === id ? { ...c, approved: true } : c))
  }

  async function deleteComment(id: string) {
    if (!confirm('Delete this comment?')) return
    const supabase = createClient()
    await supabase.from('comments').delete().eq('id', id)
    setComments(comments.filter(c => c.id !== id))
  }

  const filtered = filter === 'all'
    ? comments
    : filter === 'pending'
      ? comments.filter(c => !c.approved)
      : comments.filter(c => c.approved)

  const pendingCount = comments.filter(c => !c.approved).length
  const approvedCount = comments.filter(c => c.approved).length

  return (
    <div className="min-h-screen" style={{ background: 'var(--light)' }}>
      <div className="bg-white border-b border-gray-100 px-8 py-5">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="flex items-center gap-1 text-sm hover:underline"
              style={{ color: 'var(--muted)' }}>
              <ChevronLeft className="w-4 h-4" /> Dashboard
            </Link>
            <h1 className="font-sora text-xl font-bold" style={{ color: 'var(--navy)' }}>
              Comments
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
        <div className="flex gap-2 mb-6">
          {[
            { key: 'pending', label: `Pending (${pendingCount})` },
            { key: 'approved', label: `Approved (${approvedCount})` },
            { key: 'all', label: `All (${comments.length})` },
          ].map(tab => (
            <button key={tab.key} onClick={() => setFilter(tab.key)}
              className="px-4 py-1.5 rounded-full text-sm font-semibold border transition-all"
              style={filter === tab.key
                ? { background: 'var(--navy)', color: 'white', borderColor: 'var(--navy)' }
                : { background: 'white', color: 'var(--muted)', borderColor: 'var(--border)' }
              }>
              {tab.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-700 rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-16 text-center">
            <MessageSquare className="w-12 h-12 mx-auto mb-4" style={{ color: 'var(--muted)' }} />
            <h3 className="font-sora font-bold text-lg mb-2" style={{ color: 'var(--navy)' }}>
              No {filter === 'all' ? '' : filter} comments
            </h3>
            <p className="text-sm" style={{ color: 'var(--muted)' }}>
              {filter === 'pending' ? 'All comments have been reviewed.' : 'Comments will appear here once readers start engaging.'}
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {filtered.map(comment => (
              <div key={comment.id}
                className={`bg-white rounded-2xl border p-5 transition-shadow hover:shadow-sm ${!comment.approved ? 'border-yellow-200' : 'border-gray-100'}`}>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                        style={{ background: 'var(--navy)' }}>
                        {comment.name?.charAt(0)?.toUpperCase() || '?'}
                      </div>
                      <span className="text-sm font-semibold" style={{ color: 'var(--navy)' }}>{comment.name}</span>
                      {comment.email && <span className="text-xs" style={{ color: 'var(--muted)' }}>{comment.email}</span>}
                      <span className={`ml-auto px-2 py-0.5 rounded-full text-xs font-semibold ${comment.approved ? 'bg-green-50 text-green-700' : 'bg-yellow-50 text-yellow-700'}`}>
                        {comment.approved ? 'Approved' : 'Pending'}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--text)' }}>{comment.text}</p>
                    <div className="flex items-center gap-3 text-xs" style={{ color: 'var(--muted)' }}>
                      <span>{new Date(comment.created_at).toLocaleDateString()}</span>
                      {comment.articles && <><span>·</span><span>On: <strong style={{ color: 'var(--navy)' }}>{comment.articles.title}</strong></span></>}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {comment.articles?.slug && (
                      <Link href={`/insights/${comment.articles.slug}`} target="_blank"
                        className="p-2 rounded-lg hover:bg-gray-50" style={{ color: 'var(--muted)' }}>
                        <Eye className="w-4 h-4" />
                      </Link>
                    )}
                    {!comment.approved && (
                      <button onClick={() => approveComment(comment.id)}
                        className="p-2 rounded-lg hover:bg-green-50" style={{ color: '#1E8A4C' }}>
                        <Check className="w-4 h-4" />
                      </button>
                    )}
                    <button onClick={() => deleteComment(comment.id)}
                      className="p-2 rounded-lg hover:bg-red-50" style={{ color: '#C0392B' }}>
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}