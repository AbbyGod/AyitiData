'use client'

import { useLanguage } from '@/lib/i18n/LanguageContext'
import type { Language } from '@/lib/i18n/translations'
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

export default function Navbar() {
  const pathname = usePathname()
  const { lang, setLang, t } = useLanguage()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)

  const navLinks = [
    { href: '/', label: t('nav_home') },
    { href: '/datasets', label: t('nav_datasets') },
    { href: '/insights', label: t('nav_insights') },
    { href: '/reports', label: t('nav_reports') },
    { href: '/glossary', label: t('nav_glossary') },
    {
      label: t('nav_about'),
      dropdown: [
        { href: '/about', label: t('nav_mission') },
        { href: '/team', label: t('nav_team') },
        { href: '/partners', label: t('nav_partners') },
      ],
    },
    {
      label: t('nav_work'),
      dropdown: [
        { href: '/work-with-us/submit', label: t('nav_submit') },
        { href: '/work-with-us/partner', label: t('nav_partner') },
        { href: '/work-with-us/join', label: t('nav_join') },
      ],
    },
  ]


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
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && searchQuery.trim()) {
                        window.location.href = `/datasets?search=${encodeURIComponent(searchQuery.trim())}`
                      }
                    }}
                    placeholder={t('search_placeholder')}
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

            {/* LANGUAGE TOGGLE — dropdown */}
            <div className="relative">
              <button
                onClick={() => setActiveDropdown(activeDropdown === 'lang' ? null : 'lang')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold border border-gray-200 hover:bg-gray-50 transition-colors"
                style={{ color: 'var(--navy)' }}
              >
                <Globe className="w-3.5 h-3.5" />
                {lang === 'ht' ? 'Kreyòl' : lang === 'fr' ? 'Français' : lang === 'es' ? 'Español' : 'English'}
                <ChevronDown className={cn('w-3 h-3 transition-transform', activeDropdown === 'lang' && 'rotate-180')} />
              </button>
              {activeDropdown === 'lang' && (
                <div className="absolute top-full right-0 mt-1 w-36 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50">
                  {([
                    { code: 'fr', label: 'Français' },
                    { code: 'en', label: 'English' },
                    { code: 'ht', label: 'Kreyòl' },
                    //{ code: 'es', label: 'Español' },
                  ] as { code: Language; label: string }[]).map((l) => (
                    <button
                      key={l.code}
                      onClick={() => { setLang(l.code); setActiveDropdown(null) }}
                      className={cn(
                        'w-full text-left px-4 py-2 text-sm transition-colors',
                        lang === l.code
                          ? 'font-semibold'
                          : 'text-gray-600 hover:bg-gray-50'
                      )}
                      style={lang === l.code ? { color: 'var(--navy)', background: 'var(--light)' } : {}}
                    >
                      {l.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* SUPPORT US */}
            <Link
              href="/support-us"
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-sm font-semibold text-white transition-opacity hover:opacity-90"
              style={{ background: 'var(--accent)' }}
            >
              <HandHeart className="w-3.5 h-3.5" />
              {t('nav_support')}
            </Link>
          </div>
          </div>

            {/* LOGIN */}
          
          {/*Will add login later, for now I will keep it like this  */}
         
          {/* MOBILE MENU BUTTON */}
          <button
            className="lg:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-50"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

        </div>
     
{/* MOBILE MENU */}
{mobileOpen && (
  <div className="lg:hidden border-t border-gray-100 bg-white px-4 py-4 flex flex-col gap-2 max-h-[80vh] overflow-y-auto">
    {navLinks.map((link) => {
      if (link.dropdown) {
        return (
          <div key={link.label} className="py-1">
            <p className="px-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              {link.label}
            </p>
            {/* Using a grid to save vertical space */}
            <div className="grid grid-cols-2 gap-1 mt-1">
              {link.dropdown.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-3 py-2 text-xs text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-md truncate"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )
      }
      return (
        <Link
          key={link.href}
          href={link.href!}
          className={cn(
            'block px-3 py-2.5 rounded-lg text-sm font-medium',
            pathname === link.href
              ? 'text-blue-700 bg-blue-50'
              : 'text-gray-700 hover:bg-gray-50'
          )}
        >
          {link.label}
        </Link>
      )
    })}

    {/* LANGUAGE & SUPPORT */}
    <div className="pt-3 mt-2 border-t border-gray-100 flex flex-col gap-3">
      <div className="flex gap-2">
        {(['fr', 'en', 'ht'] as Language[]).map((code) => (
          <button
            key={code}
            onClick={() => setLang(code)}
            className={cn(
              'flex-1 py-1.5 text-[10px] font-bold rounded-md transition-colors uppercase',
              lang === code ? 'text-white' : 'bg-gray-50 text-gray-500'
            )}
            style={lang === code ? { background: 'var(--navy)' } : {}}
          >
            {code === 'ht' ? 'KR' : code.toUpperCase()}
          </button>
        ))}
      </div>
      
      <Link 
        href="/support-us" 
        className="text-center py-2.5 rounded-lg text-sm font-semibold text-white shadow-sm" 
        style={{ background: 'var(--accent)' }}
      >
        Support Us
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
