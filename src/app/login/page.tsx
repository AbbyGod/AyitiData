'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Eye, EyeOff, LogIn } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      router.push('/admin')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4"
      style={{ background: 'var(--light)' }}>
      <div className="w-full max-w-md">

        {/* LOGO */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: 'var(--navy)' }}>
              <svg viewBox="0 0 18 18" fill="none" className="w-6 h-6">
                <rect x="1" y="10" width="3" height="7" rx="1" fill="#E8A020"/>
                <rect x="6" y="6" width="3" height="11" rx="1" fill="white"/>
                <rect x="11" y="2" width="3" height="15" rx="1" fill="#60A5FA"/>
              </svg>
            </div>
            <span className="font-sora font-bold text-xl" style={{ color: 'var(--navy)' }}>
              Ayiti Data
            </span>
          </Link>
          <h1 className="mt-6 text-2xl font-bold font-sora" style={{ color: 'var(--navy)' }}>
            Welcome back
          </h1>
          <p className="mt-2 text-sm" style={{ color: 'var(--muted)' }}>
            Sign in to access your dashboard
          </p>
        </div>

        {/* FORM */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <form onSubmit={handleLogin} className="flex flex-col gap-5">

            {error && (
              <div className="px-4 py-3 rounded-xl text-sm text-red-700 bg-red-50 border border-red-100">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold mb-2"
                style={{ color: 'var(--text)' }}>
                Email address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl outline-none transition-colors focus:border-blue-400"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2"
                style={{ color: 'var(--text)' }}>
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl outline-none transition-colors focus:border-blue-400 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword
                    ? <EyeOff className="w-4 h-4" />
                    : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
              style={{ background: 'var(--navy)' }}
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  Sign In
                </>
              )}
            </button>

          </form>

          <div className="mt-6 text-center text-sm" style={{ color: 'var(--muted)' }}>
            Don't have an account?{' '}
            <Link href="/signup" className="font-semibold hover:underline"
              style={{ color: 'var(--blue)' }}>
              Sign up
            </Link>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link href="/" className="text-sm hover:underline" style={{ color: 'var(--muted)' }}>
            ← Back to Ayiti Data
          </Link>
        </div>

      </div>
    </div>
  )
}