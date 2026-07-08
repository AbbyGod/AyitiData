'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import {
  Plus,
  BookOpen,
  Eye,
  Edit,
  Trash2,
  Clock,
  CheckCircle,
  XCircle,
  ChevronLeft,
} from 'lucide-react'

const statusColors: Record<string, { bg: string; color: string; icon: any }> = {
  published: { bg: '#E6F5ED', color: '#1E8A4C', icon: CheckCircle },
  draft: { bg: '#FFF8E1', color: '#E8A020', icon: Clock },
  review: { bg: '#E8F0FC', color: '#1A56A0', icon: Eye },
  rejected: { bg: '#FDE8E8', color: '#C0392B', icon: XCircle },
}

export default function ArticlesPage() {
  const [articles, setArticles] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    async function loadArticles() {
      const supabase = createClient()
      const { data } = await supabase
        .from('articles')
        .select('*, profiles(name)')
        .order('created_at', { ascending: false })
      setArticles(data || [])
      setLoading(false)
    }
    loadArticles()
  }, [])

  async function deleteArticle(id: string) {
    if (!confirm('Are you sure you want to delete this article?')) return
    const supabase = createClient()
    await supabase.from('articles').delete().eq('id', id)
    setArticles(articles.filter(a => a.id !== id))
  }

  const filtered = filter === 'all'
    ? articles
    : articles.filter(a => a.status === filter)

  return (
    <div className="min-h-screen" style={{ background: 'var(--light)' }}>

      {/* HEADER */}
      <div className="bg-white border-b border-gray-100 px-8 py-5">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="flex items-center gap-1 text-sm hover:underline"
              style={{ color: 'var(--muted)' }}>
              <ChevronLeft className="w-4 h-4" /> Dashboard
            </Link>
            <h1 className="font-sora text-xl font-bold" style={{ color: 'var(--navy)' }}>
              Articles
            </h1>
          </div>
          <Link
            href="/admin/articles/new"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white"
            style={{ background: 'var(--navy)' }}
          >
            <Plus className="w-4 h-4" />
            New Article
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-8 py-8">

        {/* FILTER TABS */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {['all', 'published', 'draft', 'review'].map(tab => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className="px-4 py-1.5 rounded-full text-sm font-semibold border transition-all capitalize"
              style={filter === tab
                ? { background: 'var(--navy)', color: 'white', borderColor: 'var(--navy)' }
                : { background: 'white', color: 'var(--muted)', borderColor: 'var(--border)' }
              }
            >
              {tab} {tab === 'all' ? `(${articles.length})` : `(${articles.filter(a => a.status === tab).length})`}
            </button>
          ))}
        </div>

        {/* ARTICLES LIST */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-700 rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-16 text-center">
            <BookOpen className="w-12 h-12 mx-auto mb-4" style={{ color: 'var(--muted)' }} />
            <h3 className="font-sora font-bold text-lg mb-2" style={{ color: 'var(--navy)' }}>
              No articles yet
            </h3>
            <p className="text-sm mb-6" style={{ color: 'var(--muted)' }}>
              Start writing your first data-driven insight.
            </p>
            <Link
              href="/admin/articles/new"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white"
              style={{ background: 'var(--navy)' }}
            >
              <Plus className="w-4 h-4" />
              Write First Article
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {filtered.map(article => {
              const status = statusColors[article.status] || statusColors.draft
              const StatusIcon = status.icon
              return (
                <div
                  key={article.id}
                  className="bg-white rounded-2xl border border-gray-100 p-5 flex items-center gap-4 hover:shadow-sm transition-shadow"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold"
                        style={{ background: status.bg, color: status.color }}
                      >
                        <StatusIcon className="w-3 h-3" />
                        {article.status}
                      </span>
                      {article.category && (
                        <span className="text-xs px-2 py-0.5 rounded-full"
                          style={{ background: 'var(--light)', color: 'var(--muted)' }}>
                          {article.category}
                        </span>
                      )}
                    </div>
                    <h3 className="font-semibold text-sm truncate mb-1" style={{ color: 'var(--navy)' }}>
                      {article.title}
                    </h3>
                    <div className="flex items-center gap-3 text-xs" style={{ color: 'var(--muted)' }}>
                      <span>By {article.profiles?.name || 'Unknown'}</span>
                      <span>·</span>
                      <span>{new Date(article.created_at).toLocaleDateString()}</span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <Eye className="w-3 h-3" /> {article.view_count || 0} views
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Link
                      href={`/admin/articles/${article.id}/edit`}
                      className="p-2 rounded-lg hover:bg-gray-50 transition-colors"
                      style={{ color: 'var(--blue)' }}
                    >
                      <Edit className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => deleteArticle(article.id)}
                      className="p-2 rounded-lg hover:bg-red-50 transition-colors"
                      style={{ color: '#C0392B' }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}