'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { ChevronLeft, Plus, Users, Trash2, Edit, X, Save } from 'lucide-react'
import Link from 'next/link'

const EXPERTISE_AREAS = [
  'Finance & Economics', 'Healthcare & Public Health', 'Education',
  'Political Science', 'Demography & Statistics', 'Data Science & Engineering',
  'Journalism & Communication', 'Agriculture & Environment', 'Law & Policy', 'Other'
]

const emptyForm = {
  name: '', role: '', expertise: '', bio: '',
  photo_url: '', linkedin_url: '', display_order: 0,
}

export default function TeamAdminPage() {
  const [members, setMembers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState<any>(emptyForm)
  const [saving, setSaving] = useState(false)

  useEffect(() => { loadMembers() }, [])

  async function loadMembers() {
    const supabase = createClient()
    const { data } = await supabase
      .from('team_members')
      .select('*')
      .order('display_order', { ascending: true })
    setMembers(data || [])
    setLoading(false)
  }

  function openNew() {
    setForm({ ...emptyForm, display_order: members.length + 1 })
    setEditingId(null)
    setShowForm(true)
  }

  function openEdit(member: any) {
    setForm({
      name: member.name || '',
      role: member.role || '',
      expertise: member.expertise || '',
      bio: member.bio || '',
      photo_url: member.photo_url || '',
      linkedin_url: member.linkedin_url || '',
      display_order: member.display_order || 0,
    })
    setEditingId(member.id)
    setShowForm(true)
  }

  async function saveMember() {
    if (!form.name.trim()) { alert('Please add a name.'); return }
    setSaving(true)
    const supabase = createClient()
    if (editingId) {
      await supabase.from('team_members').update(form).eq('id', editingId)
    } else {
      await supabase.from('team_members').insert(form)
    }
    setSaving(false)
    setShowForm(false)
    setEditingId(null)
    setForm(emptyForm)
    loadMembers()
  }

  async function deleteMember(id: string) {
    if (!confirm('Delete this team member?')) return
    const supabase = createClient()
    await supabase.from('team_members').delete().eq('id', id)
    setMembers(members.filter(m => m.id !== id))
  }

  return (
    <div className="min-h-screen" style={{ background: 'var(--light)' }}>
      <div className="bg-white border-b border-gray-100 px-8 py-5">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="flex items-center gap-1 text-sm hover:underline"
              style={{ color: 'var(--muted)' }}>
              <ChevronLeft className="w-4 h-4" /> Dashboard
            </Link>
            <h1 className="font-sora text-xl font-bold" style={{ color: 'var(--navy)' }}>Team</h1>
          </div>
          <button onClick={openNew}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white"
            style={{ background: 'var(--navy)' }}>
            <Plus className="w-4 h-4" /> Add Member
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-8 py-8">
        {showForm && (
          <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-sora font-bold text-lg" style={{ color: 'var(--navy)' }}>
                {editingId ? 'Edit Member' : 'Add Team Member'}
              </h2>
              <button onClick={() => setShowForm(false)}>
                <X className="w-5 h-5" style={{ color: 'var(--muted)' }} />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--muted)' }}>Full Name *</label>
                <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl outline-none focus:border-blue-400" />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--muted)' }}>Role / Title</label>
                <input type="text" value={form.role} onChange={e => setForm({ ...form, role: e.target.value })}
                  placeholder="e.g. Lead Analyst, Health Researcher"
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl outline-none focus:border-blue-400" />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--muted)' }}>Area of Expertise</label>
                <select value={form.expertise} onChange={e => setForm({ ...form, expertise: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl outline-none focus:border-blue-400">
                  <option value="">Select...</option>
                  {EXPERTISE_AREAS.map(a => <option key={a} value={a}>{a}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--muted)' }}>Display Order</label>
                <input type="number" value={form.display_order} onChange={e => setForm({ ...form, display_order: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl outline-none focus:border-blue-400" />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--muted)' }}>Photo URL</label>
                <input type="text" value={form.photo_url} onChange={e => setForm({ ...form, photo_url: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl outline-none focus:border-blue-400" />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--muted)' }}>LinkedIn URL</label>
                <input type="text" value={form.linkedin_url} onChange={e => setForm({ ...form, linkedin_url: e.target.value })}
                  placeholder="https://linkedin.com/in/..."
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl outline-none focus:border-blue-400" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--muted)' }}>Bio</label>
                <textarea value={form.bio} onChange={e => setForm({ ...form, bio: e.target.value })}
                  rows={3} placeholder="Short biography..."
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl outline-none focus:border-blue-400 resize-none" />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-5 pt-5 border-t border-gray-100">
              <button onClick={() => setShowForm(false)}
                className="px-4 py-2 rounded-xl text-sm font-semibold border border-gray-200 hover:bg-gray-50"
                style={{ color: 'var(--muted)' }}>Cancel</button>
              <button onClick={saveMember} disabled={saving}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold text-white disabled:opacity-60"
                style={{ background: 'var(--navy)' }}>
                {saving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save className="w-4 h-4" />}
                {editingId ? 'Update' : 'Save'}
              </button>
            </div>
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-700 rounded-full animate-spin" />
          </div>
        ) : members.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-16 text-center">
            <Users className="w-12 h-12 mx-auto mb-4" style={{ color: 'var(--muted)' }} />
            <h3 className="font-sora font-bold text-lg mb-2" style={{ color: 'var(--navy)' }}>No team members yet</h3>
            <button onClick={openNew}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white mt-4"
              style={{ background: 'var(--navy)' }}>
              <Plus className="w-4 h-4" /> Add First Member
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {members.map(member => (
              <div key={member.id}
                className="bg-white rounded-2xl border border-gray-100 p-5 flex items-center gap-4 hover:shadow-sm transition-shadow">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-lg font-bold font-sora flex-shrink-0"
                  style={{ background: member.photo_url ? 'transparent' : 'var(--navy)' }}>
                  {member.photo_url
                    ? <img src={member.photo_url} alt={member.name} className="w-12 h-12 rounded-xl object-cover" />
                    : member.name?.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm" style={{ color: 'var(--navy)' }}>{member.name}</h3>
                  <p className="text-xs" style={{ color: 'var(--blue)' }}>{member.role}</p>
                  {member.expertise && <p className="text-xs" style={{ color: 'var(--muted)' }}>{member.expertise}</p>}
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => openEdit(member)}
                    className="p-2 rounded-lg hover:bg-gray-50" style={{ color: 'var(--blue)' }}>
                    <Edit className="w-4 h-4" />
                  </button>
                  <button onClick={() => deleteMember(member.id)}
                    className="p-2 rounded-lg hover:bg-red-50" style={{ color: '#C0392B' }}>
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}