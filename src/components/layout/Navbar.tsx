'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  Menu,
  X,
  Search,
  Globe,
  ChevronDown,
  Database,
  BookOpen,
  FileText,
  Users,
  HandHeart,
  Handshake,
  Home,
} from 'lucide-react'

const languages = [
  { code: 'en', label: 'EN', name: 'English' },
  { code: 'fr', label: 'FR', name: 'Français' },
  { code: 'ht', label: 'KR', name: 'Kreyòl' },
  { code: 'es', label: 'ES', name: 'Español' },
]

const navLinks = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/datasets', label: 'Datasets', icon: Database },
  { href: '/insights', label: 'Insights', icon: BookOpen },
  { href: '/reports', label: 'Reports', icon: FileText },
  { href: '/glossary', label: 'Glossary', icon: BookOpen },
  {
    label: 'About',
    icon: Users,
    dropdown: [
      { href: '/about', label: 'Mission' },
      { href: '/team', label: 'Our Team' },
      { href: '/partners', label: 'Partners' },
    ],
  },
  {
    label: 'Work With Us',
    icon: Handshake,
    dropdown: [
      { href: '/work-with-us/submit', label: 'Submit Research' },
      { href: '/work-with-us/partner', label: 'Partner With Us' },
      { href: '/work-with-us/join', label: 'Join the Team' },
    ],
  },
]

export default function Navbar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeLang, setActiveLang] = useState('en')
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setActiveDropdown(null)
  }, [pathname])

  return (
    <nav className={cn(
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      scrolled
        ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100'
        : 'bg-white border-b border-gray-100'
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* LOGO */}
          <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: 'var(--navy)' }}>
              <svg viewBox="0 0 18 18" fill="none" className="w-5 h-5">
                <rect x="1" y="10" width="3" height="7" rx="1" fill="#E8A020"/>
                <rect x="6" y="6" width="3" height="11" rx="1" fill="white"/>
                <rect x="11" y="2" width="3" height="15" rx="1" fill="#60A5FA"/>
              </svg>
            </div>
            <span className="font-sora font-bold text-lg"
              style={{ color: 'var(--navy)' }}>
              Ayiti Data
            </span>
          </Link>

          {/* DESKTOP NAV */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              if (link.dropdown) {
                return (
                  <div key={link.label} className="relative">
                    <button
                      onClick={() => setActiveDropdown(
                        activeDropdown === link.label ? null : link.label
                      )}
                      className={cn(
                        'flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                        activeDropdown === link.label
                          ? 'text-blue-700 bg-blue-50'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      )}
                    >
                      {link.label}
                      <ChevronDown className={cn(
                        'w-3.5 h-3.5 transition-transform',
                        activeDropdown === link.label && 'rotate-180'
                      )} />
                    </button>
                    {activeDropdown === link.label && (
                      <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50">
                        {link.dropdown.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="block px-4 py-2.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )
              }
              return (
                <Link
                  key={link.href}
                  href={link.href!}
                  className={cn(
                    'px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                    pathname === link.href
                      ? 'text-blue-700 bg-blue-50'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  )}
                >
                  {link.label}
                </Link>
              )
            })}
          </div>

          {/* RIGHT SIDE */}
          <div className="hidden lg:flex items-center gap-2">

            {/* SEARCH */}
            <div className="relative">
              {searchOpen ? (
                <div className="flex items-center gap-2">
                  <input
                    autoFocus
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search datasets, insights…"
                    className="w-64 px-4 py-1.5 text-sm border border-gray-200 rounded-lg outline-none focus:border-blue-400"
                  />
                  <button onClick={() => { setSearchOpen(false); setSearchQuery('') }}>
                    <X className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setSearchOpen(true)}
                  className="p-2 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                >
                  <Search className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* LANGUAGE TOGGLE */}
            <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setActiveLang(lang.code)}
                  className={cn(
                    'px-2.5 py-1 text-xs font-semibold transition-colors',
                    activeLang === lang.code
                      ? 'text-white'
                      : 'text-gray-500 hover:text-gray-900'
                  )}
                  style={activeLang === lang.code
                    ? { background: 'var(--navy)' }
                    : {}}
                  title={lang.name}
                >
                  {lang.label}
                </button>
              ))}
            </div>

            {/* SUPPORT US */}
            <Link
              href="/support-us"
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-sm font-semibold text-white transition-opacity hover:opacity-90"
              style={{ background: 'var(--accent)' }}
            >
              <HandHeart className="w-3.5 h-3.5" />
              Support Us
            </Link>

            {/* LOGIN */}
          
          {/*Will add login later, for now I will keep it like this  */}

          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            className="lg:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-50"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

        </div>
      </div>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white px-4 py-4 flex flex-col gap-1">
          {navLinks.map((link) => {
            if (link.dropdown) {
              return (
                <div key={link.label}>
                  <p className="px-3 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
                    {link.label}
                  </p>
                  {link.dropdown.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )
            }
            return (
              <Link
                key={link.href}
                href={link.href!}
                className={cn(
                  'block px-3 py-2 rounded-lg text-sm font-medium',
                  pathname === link.href
                    ? 'text-blue-700 bg-blue-50'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                )}
              >
                {link.label}
              </Link>
            )
          })}
          <div className="pt-3 border-t border-gray-100 flex flex-col gap-2">
            <div className="flex gap-1">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setActiveLang(lang.code)}
                  className={cn(
                    'flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors',
                    activeLang === lang.code
                      ? 'text-white'
                      : 'text-gray-500 border border-gray-200'
                  )}
                  style={activeLang === lang.code ? { background: 'var(--navy)' } : {}}
                >
                  {lang.label}
                </button>
              ))}
            </div>
            <Link href="/support-us" className="text-center py-2 rounded-lg text-sm font-semibold text-white" style={{ background: 'var(--accent)' }}>
              ❤️ Support Us
            </Link>
  
          </div>
        </div>
      )}

      {/* CLOSE DROPDOWN ON OUTSIDE CLICK */}
      {activeDropdown && (
        <div className="fixed inset-0 z-40" onClick={() => setActiveDropdown(null)} />
      )}
    </nav>
  )
}
