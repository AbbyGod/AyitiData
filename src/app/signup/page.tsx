'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Eye, EyeOff, UserPlus } from 'lucide-react'

export default function SignupPage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [newsletter, setNewsletter] = useState(true)
  const [agreed, setAgreed] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault()
    if (!agreed) { setError('Please agree to the Terms and Privacy Policy.'); return }
    setLoading(true)
    setError('')

    const supabase = createClient()

    const { data, error: signupError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name, newsletter_opt_in: newsletter }
      }
    })

    if (signupError) {
      setError(signupError.message)
      setLoading(false)
      return
    }

    // Create profile
    if (data.user) {
      await supabase.from('profiles').insert({
        id: data.user.id,
        name,
        email,
        role: 'author',
        newsletter_opt_in: newsletter,
        terms_accepted_at: new Date().toISOString(),
      })
    }

    setSuccess(true)
    setLoading(false)
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4"
        style={{ background: 'var(--light)' }}>
        <div className="w-full max-w-md text-center">
          <div className="text-5xl mb-4">🎉</div>
          <h1 className="text-2xl font-bold font-sora mb-2" style={{ color: 'var(--navy)' }}>
            Account created!
          </h1>
          <p className="text-sm mb-6" style={{ color: 'var(--muted)' }}>
            Please check your email to confirm your account, then sign in.
          </p>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white"
            style={{ background: 'var(--navy)' }}
          >
            Go to Login
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12"
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
            Create your account
          </h1>
          <p className="mt-2 text-sm" style={{ color: 'var(--muted)' }}>
            Join the Ayiti Data community
          </p>
        </div>

        {/* FORM */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <form onSubmit={handleSignup} className="flex flex-col gap-5">

            {error && (
              <div className="px-4 py-3 rounded-xl text-sm text-red-700 bg-red-50 border border-red-100">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold mb-2"
                style={{ color: 'var(--text)' }}>
                Full name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jean Pierre"
                required
                className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl outline-none transition-colors focus:border-blue-400"
              />
            </div>

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
                  placeholder="Min. 8 characters"
                  required
                  minLength={8}
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

            {/* NEWSLETTER OPT-IN */}
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={newsletter}
                onChange={(e) => setNewsletter(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded accent-blue-700"
              />
              <span className="text-sm" style={{ color: 'var(--muted)' }}>
                Send me email updates when new datasets and insights are published
              </span>
            </label>

            {/* TERMS */}
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded accent-blue-700"
                required
              />
              <span className="text-sm" style={{ color: 'var(--muted)' }}>
                I agree to the{' '}
                <Link href="/terms" className="font-semibold hover:underline"
                  style={{ color: 'var(--blue)' }}>
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href="/privacy" className="font-semibold hover:underline"
                  style={{ color: 'var(--blue)' }}>
                  Privacy Policy
                </Link>
              </span>
            </label>

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
                  <UserPlus className="w-4 h-4" />
                  Create Account
                </>
              )}
            </button>

          </form>

          <div className="mt-6 text-center text-sm" style={{ color: 'var(--muted)' }}>
            Already have an account?{' '}
            <Link href="/login" className="font-semibold hover:underline"
              style={{ color: 'var(--blue)' }}>
              Sign in
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