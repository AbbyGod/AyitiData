'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { ChevronLeft, Bell, Trash2, Download } from 'lucide-react'
import Link from 'next/link'

export default function SubscribersAdminPage() {
  const [subscribers, setSubscribers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => { loadSubscribers() }, [])

  async function loadSubscribers() {
    const supabase = createClient()
    const { data } = await supabase
      .from('subscribers')
      .select('*')
      .order('created_at', { ascending: false })
    setSubscribers(data || [])
    setLoading(false)
  }

  async function deleteSubscriber(id: string) {
    if (!confirm('Remove this subscriber?')) return
    const supabase = createClient()
    await supabase.from('subscribers').delete().eq('id', id)
    setSubscribers(subscribers.filter(s => s.id !== id))
  }

  function exportCSV() {
    const csv = ['Email,Language,Confirmed,Date']
      .concat(subscribers.map(s =>
        `${s.email},${s.language || 'en'},${s.confirmed},${new Date(s.created_at).toLocaleDateString()}`
      )).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'ayitidata-subscribers.csv'
    a.click()
  }

  return (
    <div className="min-h-screen" style={{ background: 'var(--light)' }}>
      <div className="bg-white border-b border-gray-100 px-8 py-5">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="flex items-center gap-1 text-sm hover:underline"
              style={{ color: 'var(--muted)' }}>
              <ChevronLeft className="w-4 h-4" /> Dashboard
            </Link>
            <h1 className="font-sora text-xl font-bold" style={{ color: 'var(--navy)' }}>Subscribers</h1>
            <span className="text-sm px-2 py-0.5 rounded-full"
              style={{ background: 'var(--light)', color: 'var(--muted)' }}>
              {subscribers.length} total
            </span>
          </div>
          <button onClick={exportCSV}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border hover:bg-gray-50"
            style={{ color: 'var(--navy)', borderColor: 'var(--border)' }}>
            <Download className="w-4 h-4" /> Export CSV
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-8 py-8">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-700 rounded-full animate-spin" />
          </div>
        ) : subscribers.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-16 text-center">
            <Bell className="w-12 h-12 mx-auto mb-4" style={{ color: 'var(--muted)' }} />
            <h3 className="font-sora font-bold text-lg mb-2" style={{ color: 'var(--navy)' }}>No subscribers yet</h3>
            <p className="text-sm" style={{ color: 'var(--muted)' }}>
              Subscribers will appear here when people sign up for the newsletter.
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr style={{ background: 'var(--light)' }}>
                  <th className="text-left px-5 py-3 text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--muted)' }}>Email</th>
                  <th className="text-left px-5 py-3 text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--muted)' }}>Language</th>
                  <th className="text-left px-5 py-3 text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--muted)' }}>Confirmed</th>
                  <th className="text-left px-5 py-3 text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--muted)' }}>Date</th>
                  <th className="px-5 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {subscribers.map((sub, i) => (
                  <tr key={sub.id} style={{ borderTop: i > 0 ? '1px solid var(--border)' : 'none' }}>
                    <td className="px-5 py-3 text-sm font-medium" style={{ color: 'var(--navy)' }}>{sub.email}</td>
                    <td className="px-5 py-3 text-sm uppercase" style={{ color: 'var(--muted)' }}>{sub.language || 'en'}</td>
                    <td className="px-5 py-3">
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full"
                        style={sub.confirmed
                          ? { background: '#E6F5ED', color: '#1E8A4C' }
                          : { background: '#FFF8E1', color: '#E8A020' }}>
                        {sub.confirmed ? 'Yes' : 'Pending'}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-sm" style={{ color: 'var(--muted)' }}>
                      {new Date(sub.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-5 py-3">
                      <button onClick={() => deleteSubscriber(sub.id)}
                        className="p-1.5 rounded-lg hover:bg-red-50" style={{ color: '#C0392B' }}>
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
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