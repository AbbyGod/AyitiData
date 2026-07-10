'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { ChevronLeft, Download } from 'lucide-react'
import Link from 'next/link'

export default function DownloadsAdminPage() {
  const [downloads, setDownloads] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => { loadDownloads() }, [])

  async function loadDownloads() {
    const supabase = createClient()
    const { data } = await supabase
      .from('downloads')
      .select('*, datasets(title)')
      .order('created_at', { ascending: false })
      .limit(100)
    setDownloads(data || [])
    setLoading(false)
  }

  return (
    <div className="min-h-screen" style={{ background: 'var(--light)' }}>
      <div className="bg-white border-b border-gray-100 px-8 py-5">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <Link href="/admin" className="flex items-center gap-1 text-sm hover:underline"
            style={{ color: 'var(--muted)' }}>
            <ChevronLeft className="w-4 h-4" /> Dashboard
          </Link>
          <h1 className="font-sora text-xl font-bold" style={{ color: 'var(--navy)' }}>
            Downloads
          </h1>
          <span className="text-sm px-2 py-0.5 rounded-full"
            style={{ background: 'var(--light)', color: 'var(--muted)' }}>
            Last 100 downloads
          </span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-8 py-8">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-700 rounded-full animate-spin" />
          </div>
        ) : downloads.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-16 text-center">
            <Download className="w-12 h-12 mx-auto mb-4" style={{ color: 'var(--muted)' }} />
            <h3 className="font-sora font-bold text-lg mb-2" style={{ color: 'var(--navy)' }}>No downloads yet</h3>
            <p className="text-sm" style={{ color: 'var(--muted)' }}>
              Downloads will appear here when users start downloading datasets.
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr style={{ background: 'var(--light)' }}>
                  <th className="text-left px-5 py-3 text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--muted)' }}>Dataset</th>
                  <th className="text-left px-5 py-3 text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--muted)' }}>Email</th>
                  <th className="text-left px-5 py-3 text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--muted)' }}>Country</th>
                  <th className="text-left px-5 py-3 text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--muted)' }}>Date</th>
                </tr>
              </thead>
              <tbody>
                {downloads.map((dl, i) => (
                  <tr key={dl.id} style={{ borderTop: i > 0 ? '1px solid var(--border)' : 'none' }}>
                    <td className="px-5 py-3 text-sm font-medium" style={{ color: 'var(--navy)' }}>
                      {dl.datasets?.title || 'Unknown'}
                    </td>
                    <td className="px-5 py-3 text-sm" style={{ color: 'var(--muted)' }}>
                      {dl.user_email || '—'}
                    </td>
                    <td className="px-5 py-3 text-sm" style={{ color: 'var(--muted)' }}>
                      {dl.country || '—'}
                    </td>
                    <td className="px-5 py-3 text-sm" style={{ color: 'var(--muted)' }}>
                      {new Date(dl.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}