'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('ayitidata-cookies')
    if (!consent) setVisible(true)
  }, [])

  function accept() {
    localStorage.setItem('ayitidata-cookies', 'accepted')
    setVisible(false)
  }

  function decline() {
    localStorage.setItem('ayitidata-cookies', 'declined')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl border border-gray-100 p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex-1">
          <p className="text-sm font-semibold mb-1" style={{ color: 'var(--navy)' }}>
            🍪 We use cookies
          </p>
          <p className="text-xs leading-relaxed" style={{ color: 'var(--muted)' }}>
            We use essential cookies to keep the site working and analytics cookies to understand
            how visitors use Ayiti Data. No personal data is sold.{' '}
            <Link href="/cookies" className="font-semibold hover:underline" style={{ color: 'var(--blue)' }}>
              Learn more
            </Link>
          </p>
        </div>
        <div className="flex gap-2 flex-shrink-0">
          <button
            onClick={decline}
            className="px-4 py-2 rounded-xl text-xs font-semibold border border-gray-200 hover:bg-gray-50 transition-colors"
            style={{ color: 'var(--muted)' }}
          >
            Decline
          </button>
          <button
            onClick={accept}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-white transition-opacity hover:opacity-90"
            style={{ background: 'var(--navy)' }}
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  )
}