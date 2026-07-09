'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import {
  Download, FileText, Database, Calendar,
  ArrowLeft, ChevronRight, ExternalLink, Table
} from 'lucide-react'

const categoryColors: Record<string, { bg: string; color: string }> = {
  Population: { bg: '#E8F0FC', color: '#1A56A0' },
  Education: { bg: '#FFF3E0', color: '#E8A020' },
  Economy: { bg: '#E6F5ED', color: '#1E8A4C' },
  Health: { bg: '#FDE8E8', color: '#C0392B' },
  Agriculture: { bg: '#F3E8FF', color: '#7C3AED' },
  Environment: { bg: '#E0F7F4', color: '#0D9488' },
  Politics: { bg: '#FFF1F2', color: '#E11D48' },
  Other: { bg: '#F4F7FB', color: '#6B7A90' },
}

export default function DatasetPage() {
  const params = useParams()
  const slug = params.slug as string
  const [dataset, setDataset] = useState<any>(null)
  const [relatedArticles, setRelatedArticles] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const supabase = createClient()

      const { data } = await supabase
        .from('datasets')
        .select('*')
        .eq('slug', slug)
        .single()

      if (data) {
        setDataset(data)

        // Load articles that reference this dataset
        const { data: articles } = await supabase
          .from('articles')
          .select('title, slug, category, reading_time, published_at')
          .eq('status', 'published')
          .eq('related_dataset_id', data.id)
          .limit(5)
        setRelatedArticles(articles || [])
      }

      setLoading(false)
    }
    load()
  }, [slug])

  async function handleDownload(format: string) {
    if (!dataset) return
    const supabase = createClient()

    await supabase.from('downloads').insert({
      dataset_id: dataset.id,
      created_at: new Date().toISOString(),
    })

    await supabase
      .from('datasets')
      .update({ download_count: (dataset.download_count || 0) + 1 })
      .eq('id', dataset.id)

    const url = format === 'csv' ? dataset.csv_url
      : format === 'excel' ? dataset.excel_url
      : dataset.json_url

    if (url) window.open(url, '_blank')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-700 rounded-full animate-spin" />
      </div>
    )
  }

  if (!dataset) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <Database className="w-16 h-16" style={{ color: 'var(--muted)' }} />
        <h1 className="font-sora text-2xl font-bold" style={{ color: 'var(--navy)' }}>
          Dataset not found
        </h1>
        <Link href="/datasets" className="text-sm font-semibold hover:underline"
          style={{ color: 'var(--blue)' }}>
          ← Back to Datasets
        </Link>
      </div>
    )
  }

  const cat = categoryColors[dataset.category] || categoryColors.Other

  return (
    <div className="min-h-screen" style={{ background: 'var(--light)' }}>

      {/* BREADCRUMB */}
      <div className="border-b border-gray-100 bg-white px-4 py-3">
        <div className="max-w-5xl mx-auto flex items-center gap-2 text-xs"
          style={{ color: 'var(--muted)' }}>
          <Link href="/" className="hover:underline">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/datasets" className="hover:underline">Datasets</Link>
          <ChevronRight className="w-3 h-3" />
          <span style={{ color: 'var(--text)' }}>{dataset.title}</span>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* MAIN */}
          <div className="lg:col-span-2">
            <Link href="/datasets"
              className="inline-flex items-center gap-1.5 text-sm font-semibold mb-6 hover:underline"
              style={{ color: 'var(--blue)' }}>
              <ArrowLeft className="w-4 h-4" /> All Datasets
            </Link>

            {/* HEADER */}
            <div className="bg-white rounded-2xl border border-gray-100 p-8 mb-6">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                  style={{ background: cat.bg }}>
                  <Database className="w-7 h-7" style={{ color: cat.color }} />
                </div>
                {dataset.category && (
                  <span className="px-3 py-1 rounded-full text-xs font-semibold"
                    style={{ background: cat.bg, color: cat.color }}>
                    {dataset.category}
                  </span>
                )}
              </div>

              <h1 className="font-sora text-2xl font-bold mb-3" style={{ color: 'var(--navy)' }}>
                {dataset.title}
              </h1>

              {dataset.description && (
                <p className="text-base leading-relaxed mb-5" style={{ color: 'var(--muted)' }}>
                  {dataset.description}
                </p>
              )}

              {/* META */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 py-5 border-t border-b border-gray-100 mb-5">
                {dataset.source && (
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider mb-1"
                      style={{ color: 'var(--muted)' }}>Source</p>
                    <p className="text-sm font-semibold" style={{ color: 'var(--navy)' }}>
                      {dataset.source}
                    </p>
                  </div>
                )}
                {dataset.last_updated && (
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider mb-1"
                      style={{ color: 'var(--muted)' }}>Last Updated</p>
                    <p className="text-sm font-semibold" style={{ color: 'var(--navy)' }}>
                      {new Date(dataset.last_updated).toLocaleDateString('en-US', {
                        month: 'long', day: 'numeric', year: 'numeric'
                      })}
                    </p>
                  </div>
                )}
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider mb-1"
                    style={{ color: 'var(--muted)' }}>Downloads</p>
                  <p className="text-sm font-semibold" style={{ color: 'var(--navy)' }}>
                    {(dataset.download_count || 0).toLocaleString()}
                  </p>
                </div>
              </div>

              {/* DOWNLOAD BUTTONS */}
              <div className="flex flex-wrap gap-3">
                {dataset.csv_url && (
                  <button onClick={() => handleDownload('csv')}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold border transition-all hover:bg-blue-50"
                    style={{ color: '#1A56A0', borderColor: '#1A56A0' }}>
                    <FileText className="w-4 h-4" /> Download CSV
                  </button>
                )}
                {dataset.excel_url && (
                  <button onClick={() => handleDownload('excel')}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold border transition-all hover:bg-green-50"
                    style={{ color: '#1E8A4C', borderColor: '#1E8A4C' }}>
                    <Table className="w-4 h-4" /> Download Excel
                  </button>
                )}
                {dataset.json_url && (
                  <button onClick={() => handleDownload('json')}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold border transition-all hover:bg-purple-50"
                    style={{ color: '#7C3AED', borderColor: '#7C3AED' }}>
                    <Download className="w-4 h-4" /> Download JSON
                  </button>
                )}
              </div>
            </div>

            {/* METADATA / NOTES */}
            {dataset.metadata && (
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <h3 className="font-sora font-bold text-base mb-3" style={{ color: 'var(--navy)' }}>
                  Notes & Data Dictionary
                </h3>
                <p className="text-sm leading-relaxed whitespace-pre-wrap"
                  style={{ color: 'var(--muted)' }}>
                  {dataset.metadata}
                </p>
              </div>
            )}
          </div>

          {/* SIDEBAR */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 flex flex-col gap-5">

              {/* RELATED ARTICLES */}
              {relatedArticles.length > 0 && (
                <div className="bg-white rounded-2xl border border-gray-100 p-5">
                  <h4 className="font-sora font-bold text-sm mb-4" style={{ color: 'var(--navy)' }}>
                    Related Insights
                  </h4>
                  <div className="flex flex-col gap-3">
                    {relatedArticles.map(a => (
                      <Link key={a.slug} href={`/insights/${a.slug}`}
                        className="group flex flex-col gap-1 pb-3 border-b border-gray-100 last:border-0 last:pb-0">
                        <span className="text-sm font-semibold leading-snug group-hover:underline"
                          style={{ color: 'var(--navy)' }}>
                          {a.title}
                        </span>
                        {a.reading_time && (
                          <span className="text-xs" style={{ color: 'var(--muted)' }}>
                            {a.reading_time} min read
                          </span>
                        )}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* LEGAL NOTE */}
              <div className="rounded-2xl p-5 border border-blue-100"
                style={{ background: '#EFF6FF' }}>
                <h4 className="text-xs font-bold mb-2" style={{ color: '#1A56A0' }}>
                  ℹ️ Data Usage
                </h4>
                <p className="text-xs leading-relaxed" style={{ color: '#1A56A0' }}>
                  This dataset is free to use for research, journalism, and educational purposes.
                  Please cite Ayiti Data and the original source when publishing.
                </p>
              </div>

              {/* BACK TO ALL */}
              <Link href="/datasets"
                className="flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold border hover:bg-gray-50 transition-colors"
                style={{ color: 'var(--navy)', borderColor: 'var(--border)' }}>
                <ArrowLeft className="w-4 h-4" /> Browse All Datasets
              </Link>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}