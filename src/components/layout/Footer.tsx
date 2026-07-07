import Link from 'next/link'
import { 
  Mail,
  MapPin,
  ExternalLink
} from 'lucide-react'

import {
  FaXTwitter,
  FaLinkedin,
  FaYoutube,
  FaFacebook
} from 'react-icons/fa6'

const footerLinks = {
  explore: [
    { href: '/datasets', label: 'Datasets' },
    { href: '/insights', label: 'Insights' },
    { href: '/reports', label: 'Reports' },
    { href: '/glossary', label: 'Glossary' },
    { href: '/map', label: 'Data Map' },
  ],
  about: [
    { href: '/about', label: 'Our Mission' },
    { href: '/team', label: 'The Team' },
    { href: '/partners', label: 'Partners' },
    { href: '/work-with-us/join', label: 'Join the Team' },
    { href: '/work-with-us/partner', label: 'Partner With Us' },
  ],
  contribute: [
    { href: '/work-with-us/submit', label: 'Submit Research' },
    { href: '/request-dataset', label: 'Request a Dataset' },
    { href: '/support-us', label: 'Support Us' },
    { href: '/newsletter', label: 'Newsletter' },
    { href: '/contact', label: 'Contact Us' },
  ],
  legal: [
    { href: '/terms', label: 'Terms of Service' },
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/cookies', label: 'Cookie Policy' },
  ],
}

const socialLinks = [
  { href: 'https://twitter.com/ayitidata', icon: FaXTwitter, label: 'Twitter' },
  { href: 'https://linkedin.com/company/ayitidata', icon: FaLinkedin, label: 'LinkedIn' },
  { href: 'https://youtube.com/@ayitidata', icon: FaYoutube, label: 'YouTube' },
  { href: 'https://facebook.com/ayitidata', icon: FaFacebook, label: 'Facebook' },
]
export default function Footer() {
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
            <p className="text-sm text-white/60 leading-relaxed mb-6 max-w-xs">
              Making data about Haiti open, clean, and accessible to everyone — 
              students, researchers, journalists, NGOs, and citizens.
            </p>

            {/* SOCIAL LINKS */}
            <div className="flex gap-3">
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
           {/* CONTACT INFO */}
<div className="mt-6 flex flex-col gap-2">

  <a
    href="mailto:hello@ayitidata.org"
    className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"
  >
    <Mail className="w-4 h-4" />
    hello@ayitidata.org
  </a>

  <div className="flex items-center gap-2 text-sm text-white/60">
    <MapPin className="w-4 h-4" />
    Port-au-Prince, Haiti
  </div>


              <div className="flex items-center gap-2 text-sm text-white/60">
                <MapPin className="w-4 h-4" />
                Port-au-Prince, Haiti
              </div>
            </div>
          </div>

          {/* EXPLORE */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Explore
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
              About
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
              Contribute
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
              Stay Updated
            </h4>
            <p className="text-sm text-white/60 mb-4">
              Get notified when new datasets and insights are published.
            </p>
         <form className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                className="px-3 py-2 text-sm rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/40 outline-none focus:border-white/40 transition-colors"
              />
              <button
                type="submit"
                className="px-3 py-2 text-sm font-semibold rounded-lg text-white transition-opacity hover:opacity-90"
                style={{ background: 'var(--accent)' }}
              >
                Subscribe
              </button>
            </form>
          </div>

        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/40">
            © {new Date().getFullYear()} Ayiti Data. All rights reserved.
          </p>
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
          <p className="text-xs text-white/30">
            Made with ❤️ for Haiti
          </p>
        </div>
      </div>

    </footer>
  )
}