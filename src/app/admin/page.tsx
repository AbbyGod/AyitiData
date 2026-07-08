'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import {
  Database,
  BookOpen,
  FileText,
  Users,
  Download,
  MessageSquare,
  Inbox,
  Bell,
  LogOut,
  Plus,
  ChevronRight,
  TrendingUp,
  Eye,
  Heart,
} from 'lucide-react'

const stats = [
  { label: 'Articles Published', value: 0, icon: BookOpen, color: '#1A56A0', bg: '#E8F0FC', href: '/admin/articles' },
  { label: 'Datasets', value: 0, icon: Database, color: '#1E8A4C', bg: '#E6F5ED', href: '/admin/datasets' },
  { label: 'Total Downloads', value: 0, icon: Download, color: '#E8A020', bg: '#FFF8E1', href: '/admin/downloads' },
  { label: 'Pending Comments', value: 0, icon: MessageSquare, color: '#7C3AED', bg: '#F3E8FF', href: '/admin/comments' },
  { label: 'Submissions', value: 0, icon: Inbox, color: '#C0392B', bg: '#FDE8E8', href: '/admin/submissions' },
  { label: 'Subscribers', value: 0, icon: Bell, color: '#0D2B52', bg: '#E8F0FC', href: '/admin/subscribers' },
]

const quickActions = [
  { label: 'Write New Article', href: '/admin/articles/new', icon: Plus, color: '#1A56A0' },
  { label: 'Upload Dataset', href: '/admin/datasets', icon: Database, color: '#1E8A4C' },
  { label: 'Add Report', href: '/admin/reports', icon: FileText, color: '#E8A020' },
  { label: 'Manage Team', href: '/admin/team', icon: Users, color: '#7C3AED' },
]

const navItems = [
  { label: 'Dashboard', href: '/admin', icon: TrendingUp },
  { label: 'Articles', href: '/admin/articles', icon: BookOpen },
  { label: 'Datasets', href: '/admin/datasets', icon: Database },
  { label: 'Reports', href: '/admin/reports', icon: FileText },
  { label: 'Team', href: '/admin/team', icon: Users },
  { label: 'Comments', href: '/admin/comments', icon: MessageSquare },
  { label: 'Submissions', href: '/admin/submissions', icon: Inbox },
  { label: 'Subscribers', href: '/admin/subscribers', icon: Bell },
  { label: 'Downloads', href: '/admin/downloads', icon: Download },
]

export default function AdminDashboard() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadUser() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        router.push('/login')
        return
      }

      setUser(user)

      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      setProfile(profile)
      setLoading(false)
    }

    loadUser()
  }, [router])

  async function handleLogout() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-700 rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex" style={{ background: 'var(--light)' }}>

      {/* ═══════════════════════════════════════════
          SIDEBAR
          ═══════════════════════════════════════════ */}
      <aside className="w-64 flex-shrink-0 bg-white border-r border-gray-100 flex flex-col fixed left-0 top-0 h-full z-40">

        {/* Logo */}
        <div className="p-6 border-b border-gray-100">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: 'var(--navy)' }}>
              <svg viewBox="0 0 18 18" fill="none" className="w-5 h-5">
                <rect x="1" y="10" width="3" height="7" rx="1" fill="#E8A020"/>
                <rect x="6" y="6" width="3" height="11" rx="1" fill="white"/>
                <rect x="11" y="2" width="3" height="15" rx="1" fill="#60A5FA"/>
              </svg>
            </div>
            <div>
              <div className="font-sora font-bold text-sm" style={{ color: 'var(--navy)' }}>
                Ayiti Data
              </div>
              <div className="text-xs" style={{ color: 'var(--muted)' }}>Admin Dashboard</div>
            </div>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 flex flex-col gap-1 overflow-y-auto">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors hover:bg-gray-50"
              style={{ color: 'var(--text)' }}
            >
              <item.icon className="w-4 h-4" style={{ color: 'var(--muted)' }} />
              {item.label}
            </Link>
          ))}
        </nav>

        {/* User */}
        <div className="p-4 border-t border-gray-100">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold"
              style={{ background: 'var(--navy)' }}>
              {profile?.name?.charAt(0) || user?.email?.charAt(0) || 'A'}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold truncate" style={{ color: 'var(--navy)' }}>
                {profile?.name || 'Admin'}
              </div>
              <div className="text-xs truncate capitalize px-1.5 py-0.5 rounded-full inline-block"
                style={{ background: '#E8F0FC', color: 'var(--blue)' }}>
                {profile?.role || 'admin'}
              </div>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-colors hover:bg-red-50"
            style={{ color: '#C0392B' }}
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* ═══════════════════════════════════════════
          MAIN CONTENT
          ═══════════════════════════════════════════ */}
      <main className="flex-1 ml-64 p-8">

        {/* Header */}
        <div className="mb-8">
          <h1 className="font-sora text-2xl font-bold mb-1" style={{ color: 'var(--navy)' }}>
            Welcome back, {profile?.name?.split(' ')[0] || 'Admin'} 👋
          </h1>
          <p className="text-sm" style={{ color: 'var(--muted)' }}>
            Here's what's happening with Ayiti Data today.
          </p>
        </div>

        {/* STATS GRID */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {stats.map((stat) => (
            <Link
              key={stat.label}
              href={stat.href}
              className="bg-white rounded-2xl p-5 border border-gray-100 hover:shadow-md transition-all hover:-translate-y-0.5 group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: stat.bg }}>
                  <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
                </div>
                <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ color: 'var(--muted)' }} />
              </div>
              <div className="text-2xl font-bold font-sora mb-1" style={{ color: 'var(--navy)' }}>
                {stat.value}
              </div>
              <div className="text-sm" style={{ color: 'var(--muted)' }}>
                {stat.label}
              </div>
            </Link>
          ))}
        </div>

        {/* QUICK ACTIONS */}
        <div className="mb-8">
          <h2 className="font-sora text-lg font-bold mb-4" style={{ color: 'var(--navy)' }}>
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action) => (
              <Link
                key={action.label}
                href={action.href}
                className="bg-white rounded-2xl p-5 border border-gray-100 hover:shadow-md transition-all hover:-translate-y-0.5 flex flex-col items-center text-center gap-3"
              >
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center"
                  style={{ background: action.color + '15' }}>
                  <action.icon className="w-6 h-6" style={{ color: action.color }} />
                </div>
                <span className="text-sm font-semibold" style={{ color: 'var(--navy)' }}>
                  {action.label}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* RECENT ACTIVITY */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="font-sora text-lg font-bold mb-4" style={{ color: 'var(--navy)' }}>
            Recent Activity
          </h2>
          <div className="flex flex-col items-center justify-center py-12 gap-3">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center"
              style={{ background: 'var(--light)' }}>
              <Eye className="w-7 h-7" style={{ color: 'var(--muted)' }} />
            </div>
            <p className="text-sm font-medium" style={{ color: 'var(--navy)' }}>
              No activity yet
            </p>
            <p className="text-xs text-center max-w-xs" style={{ color: 'var(--muted)' }}>
              Start by writing your first article or uploading a dataset.
            </p>
            <Link
              href="/admin/articles/new"
              className="mt-2 inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white"
              style={{ background: 'var(--navy)' }}
            >
              <Plus className="w-4 h-4" />
              Write First Article
            </Link>
          </div>
        </div>

      </main>
    </div>
  )
}