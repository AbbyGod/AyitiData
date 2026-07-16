'use client'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { 
  Mail,
  MapPin
} from 'lucide-react'

import {
  FaXTwitter,
  FaLinkedin,
  FaYoutube,
  FaFacebook
} from 'react-icons/fa6'

const socialLinks = [
  { href: 'https://twitter.com/ayitidata', icon: FaXTwitter, label: 'Twitter' },
  { href: 'https://linkedin.com/company/ayitidata', icon: FaLinkedin, label: 'LinkedIn' },
  { href: 'https://youtube.com/@ayitidata', icon: FaYoutube, label: 'YouTube' },
  { href: 'https://facebook.com/ayitidata', icon: FaFacebook, label: 'Facebook' },
]

function NewsletterForm() {
  const { t } = useLanguage()
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return
    setStatus('loading')
    const supabase = createClient()
    const { error } = await supabase.from('subscribers').insert({
      email: email.trim().toLowerCase(),
      confirmed: false,
    })
    if (error && error.code === '23505') {
      setStatus('success')
      return
    }
    setStatus(error ? 'error' : 'success')
    if (!error) setEmail('')
  }

  if (status === 'success') {
    return (
      <p className="text-sm font-semibold" style={{ color: '#6EE7B7' }}>
        ✓ {t('loading') === 'Chargement...' ? 'Abonné !' : t('loading') === 'Chajman...' ? 'Ou abòne !' : t('loading') === 'Cargando...' ? '¡Suscrito!' : "You're subscribed!"}
      </p>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder={t('newsletter_placeholder')}
        required
        className="px-3 py-2 text-sm rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/40 outline-none focus:border-white/40 transition-colors"
      />
      <button
        type="submit"
        disabled={status === 'loading'}
        className="px-3 py-2 text-sm font-semibold rounded-lg text-white transition-opacity hover:opacity-90 disabled:opacity-60"
        style={{ background: 'var(--accent)' }}
      >
        {status === 'loading' ? t('loading') : t('newsletter_btn')}
      </button>
      {status === 'error' && (
        <p className="text-xs" style={{ color: '#FCA5A5' }}>Something went wrong. Try again.</p>
      )}
    </form>
  )
}

export default function Footer() {
  const { t } = useLanguage()
  
  const footerLinks = {
    explore: [
      { href: '/datasets', label: t('nav_datasets') },
      { href: '/insights', label: t('nav_insights') },
      { href: '/reports', label: t('nav_reports') },
      { href: '/glossary', label: t('nav_glossary') },
      { href: '/map', label: t('footer_map') },
    ],
    about: [
      { href: '/about', label: t('nav_mission') },
      { href: '/team', label: t('nav_team') },
      { href: '/partners', label: t('nav_partners') },
      { href: '/work-with-us/join', label: t('nav_join') },
      { href: '/work-with-us/partner', label: t('nav_partner') },
    ],
    contribute: [
      { href: '/work-with-us/submit', label: t('nav_submit') },
      { href: '/contact', label: t('footer_request') },
      { href: '/support-us', label: t('nav_support') },
      { href: '/contact', label: t('footer_contact') },
    ],
    legal: [
      { href: '/terms', label: t('footer_terms') },
      { href: '/privacy', label: t('footer_privacy') },
      { href: '/cookies', label: t('footer_cookies') },
    ],
  }

  return (
    <footer style={{ background: 'var(--navy)' }} className="text-white">

      {/* MAIN FOOTER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12">

          {/* BRAND */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/10">
                <svg viewBox="0 0 18 18" fill="none" className="w-5 h-5">
                  <rect x="1" y="10" width="3" height="7" rx="1" fill="#E8A020"/>
                  <rect x="6" y="6" width="3" height="11" rx="1" fill="white"/>
                  <rect x="11" y="2" width="3" height="15" rx="1" fill="#60A5FA"/>
                </svg>
              </div>
              <span className="font-sora font-bold text-lg text-white">
                Ayiti Data
              </span>
            </Link>
            <p className="mb-6 text-sm text-white/80">{t('footer_tagline')}</p>

            {/* SOCIAL LINKS */}
            <div className="flex gap-3 mb-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/20 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>

            {/* CONTACT INFO */}
            <div className="flex flex-col gap-2">
              <a
                href="mailto:ayitidata@gmail.com"
                className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4" />
                ayitidata@gmail.com
              </a>

              <div className="flex items-center gap-2 text-sm text-white/60">
                <MapPin className="w-4 h-4" />
                Port-au-Prince, Haiti
              </div>
            </div>
          </div>

          {/* EXPLORE */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              {t('footer_explore')}
            </h4>
            <ul className="flex flex-col gap-2.5">
              {footerLinks.explore.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ABOUT */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              {t('footer_about')}
            </h4>
            <ul className="flex flex-col gap-2.5">
              {footerLinks.about.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTRIBUTE */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              {t('footer_contribute')}
            </h4>
            <ul className="flex flex-col gap-2.5">
              {footerLinks.contribute.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* NEWSLETTER */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              {t('stay_updated')}
            </h4>
            <p className="text-sm text-white/60 mb-4">
              {t('stay_updated_desc')}
            </p>
            <NewsletterForm />
          </div>

        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span>© {new Date().getFullYear()} Ayiti Data. {t('footer_rights')}</span>
          <div className="flex items-center gap-6">
            {footerLinks.legal.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs text-white/40 hover:text-white/70 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <p className="text-sm text-white/40">{t('footer_made')}</p>
        </div>
      </div>

    </footer>
  )
}