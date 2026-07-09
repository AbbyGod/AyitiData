'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  ArrowRight,
  Database,
  BookOpen,
  Download,
  TrendingUp,
  Users,
  MapPin,
  Activity,
  GraduationCap,
  DollarSign,
} from 'lucide-react'

// ═══════════════════════════════════════════
// ANIMATED COUNTER
// ═══════════════════════════════════════════
function AnimatedCounter({ target, suffix = '', prefix = '' }: {
  target: number
  suffix?: string
  prefix?: string
}) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true) },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!started) return
    const duration = 2000
    const steps = 60
    const increment = target / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)
    return () => clearInterval(timer)
  }, [started, target])

  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>
}

// ═══════════════════════════════════════════
// KEY HAITI STATS
// ═══════════════════════════════════════════
const haitiStats = [
  { icon: Users, label: 'Population', value: 12, suffix: 'M+', description: 'People in Haiti', color: '#1A56A0', bg: '#E8F0FC' },
  { icon: DollarSign, label: 'GDP', value: 8, suffix: 'B USD', prefix: '$', description: 'Gross Domestic Product', color: '#1E8A4C', bg: '#E6F5ED' },
  { icon: MapPin, label: 'Area', value: 27750, suffix: ' km²', description: 'Total land area', color: '#E8A020', bg: '#FFF8E1' },
  { icon: GraduationCap, label: 'Literacy Rate', value: 61, suffix: '%', description: 'Adult literacy rate', color: '#7C3AED', bg: '#F3E8FF' },
  { icon: Activity, label: 'Life Expectancy', value: 64, suffix: ' yrs', description: 'Average life expectancy', color: '#C0392B', bg: '#FDE8E8' },
  { icon: TrendingUp, label: 'Inflation', value: 28, suffix: '%', description: 'Annual inflation rate 2024', color: '#0D2B52', bg: '#E8F0FC' },
]

// ═══════════════════════════════════════════
// FEATURED DATASETS
// ═══════════════════════════════════════════
const featuredDatasets = [
  { title: 'Haiti Population 2020–2024', category: 'Population', source: 'World Bank', updated: 'May 12, 2024', downloads: 1240, href: '/datasets' },
  { title: 'Education Statistics 2016–2023', category: 'Education', source: 'MENFP', updated: 'April 30, 2024', downloads: 890, href: '/datasets' },
  { title: 'Inflation Data 2010–2024', category: 'Economy', source: 'IHSI', updated: 'May 05, 2024', downloads: 2100, href: '/datasets' },
]

// ═══════════════════════════════════════════
// FEATURED REPORTS
// ═══════════════════════════════════════════
const featuredReports = [
  { title: 'Haiti Economic Update 2024', organization: 'World Bank', category: 'Economy', year: 2024 },
  { title: 'Haiti Humanitarian Response Plan 2024', organization: 'OCHA', category: 'Humanitarian', year: 2024 },
  { title: 'Education Sector Analysis Haiti', organization: 'UNESCO', category: 'Education', year: 2023 },
]

// ═══════════════════════════════════════════
// LATEST INSIGHTS
// ═══════════════════════════════════════════
const latestInsights = [
  { title: 'Why school enrollment is decreasing in rural Haiti?', category: 'Education', date: 'May 10, 2024', readingTime: 8, views: 3420, emoji: '📉', bg: '#FDE8E8', href: '/insights' },
  { title: 'Inflation trends in Haiti: What the data shows', category: 'Economy', date: 'May 3, 2024', readingTime: 6, views: 5100, emoji: '📈', bg: '#E8F0FC', href: '/insights' },
  { title: 'Population growth by department (2020–2024)', category: 'Population', date: 'April 28, 2024', readingTime: 5, views: 2890, emoji: '🗺️', bg: '#E6F5ED', href: '/insights' },
]

const categoryColors: Record<string, string> = {
  Population: '#1A56A0',
  Education: '#E8A020',
  Economy: '#1E8A4C',
  Health: '#C0392B',
  Agriculture: '#7C3AED',
  Humanitarian: '#0D9488',
}

export default function HomePage() {
  return (
    <div className="min-h-screen">

      {/* HERO */}
      <section className="relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0D2B52 0%, #1A56A0 100%)' }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-blue-300/10 blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="max-w-3xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-white/80 border border-white/20 mb-6">
                🇭🇹 Open Data Platform for Haiti
              </span>
              <h1 className="font-sora text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                Data about Haiti,{' '}
                <span style={{ color: '#E8A020' }}>open and accessible</span>{' '}
                to all.
              </h1>
              <p className="text-lg text-white/70 max-w-xl mb-10 leading-relaxed">
                Ayiti Data collects, cleans, and publishes high-quality data about Haiti —
                empowering students, researchers, journalists, NGOs, and citizens.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/datasets" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white transition-all hover:opacity-90 hover:-translate-y-0.5" style={{ background: '#E8A020' }}>
                  <Database className="w-4 h-4" /> Explore Datasets <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/insights" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white bg-white/10 border border-white/20 transition-all hover:bg-white/20 hover:-translate-y-0.5">
                  <BookOpen className="w-4 h-4" /> Read Insights
                </Link>
                <Link href="/reports" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white bg-white/10 border border-white/20 transition-all hover:bg-white/20 hover:-translate-y-0.5">
                  <Download className="w-4 h-4" /> Reports
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* HAITI STATS */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-12">
            <h2 className="font-sora text-2xl font-bold mb-2" style={{ color: 'var(--navy)' }}>Haiti in Numbers</h2>
            <p className="text-sm" style={{ color: 'var(--muted)' }}>Key indicators updated regularly from trusted sources</p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {haitiStats.map((stat, i) => (
              <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-2xl p-5 text-center border border-gray-100 hover:shadow-md transition-shadow" style={{ background: stat.bg }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3" style={{ background: stat.color + '20' }}>
                  <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
                </div>
                <div className="text-2xl font-bold font-sora mb-1" style={{ color: stat.color }}>
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
                </div>
                <div className="text-xs font-semibold mb-1" style={{ color: 'var(--navy)' }}>{stat.label}</div>
                <div className="text-xs" style={{ color: 'var(--muted)' }}>{stat.description}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* LATEST RESOURCES — Datasets + Reports together */}
      <section className="py-16" style={{ background: 'var(--light)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="font-sora text-2xl font-bold mb-1" style={{ color: 'var(--navy)' }}>Latest Resources</h2>
              <p className="text-sm" style={{ color: 'var(--muted)' }}>Datasets to download and reports to explore</p>
            </div>
          <Link href="/resources" className="inline-flex items-center gap-1 text-sm font-semibold hover:underline" style={{ color: 'var(--blue)' }}>
  View Resources <ArrowRight className="w-3.5 h-3.5" />
</Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {featuredDatasets.map((dataset, i) => (
              <motion.div key={'d-' + dataset.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}>
                <Link href={dataset.href} className="block bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-all hover:-translate-y-1 group h-full">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-full text-xs font-bold" style={{ background: '#E8F0FC', color: '#1A56A0' }}>Dataset</span>
                      <span className="px-2.5 py-1 rounded-full text-xs font-semibold"
                        style={{ background: (categoryColors[dataset.category] || '#1A56A0') + '15', color: categoryColors[dataset.category] || '#1A56A0' }}>
                        {dataset.category}
                      </span>
                    </div>
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: 'var(--blue)' }} />
                  </div>
                  <h3 className="font-semibold text-base mb-2 leading-snug" style={{ color: 'var(--navy)' }}>{dataset.title}</h3>
                  <div className="flex items-center justify-between text-xs mt-auto pt-3 border-t border-gray-100" style={{ color: 'var(--muted)' }}>
                    <span>Source: <strong style={{ color: 'var(--text)' }}>{dataset.source}</strong></span>
                    <span className="flex items-center gap-1"><Download className="w-3 h-3" />{dataset.downloads.toLocaleString()}</span>
                  </div>
                </Link>
              </motion.div>
            ))}

            {featuredReports.map((report, i) => (
              <motion.div key={'r-' + report.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: (i + 3) * 0.1 }}>
                <Link href="/reports" className="block bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-all hover:-translate-y-1 group h-full">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-full text-xs font-bold" style={{ background: '#E6F5ED', color: '#1E8A4C' }}>Report</span>
                      <span className="px-2.5 py-1 rounded-full text-xs font-semibold" style={{ background: '#F4F7FB', color: '#6B7A90' }}>{report.category}</span>
                    </div>
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: 'var(--blue)' }} />
                  </div>
                  <h3 className="font-semibold text-base mb-2 leading-snug" style={{ color: 'var(--navy)' }}>{report.title}</h3>
                  <div className="flex items-center justify-between text-xs mt-auto pt-3 border-t border-gray-100" style={{ color: 'var(--muted)' }}>
                    <span className="font-semibold" style={{ color: 'var(--blue)' }}>{report.organization}</span>
                    <span>{report.year}</span>
                  </div>
                </Link>
              </motion.div>
            ))}

          </div>
        </div>
      </section>

      {/* LATEST INSIGHTS */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="font-sora text-2xl font-bold mb-1" style={{ color: 'var(--navy)' }}>Latest Insights</h2>
              <p className="text-sm" style={{ color: 'var(--muted)' }}>Data-driven analyses on Haiti</p>
            </div>
            <Link href="/insights" className="inline-flex items-center gap-1 text-sm font-semibold hover:underline" style={{ color: 'var(--blue)' }}>
              View all <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {latestInsights.map((insight, i) => (
              <motion.div key={insight.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}>
                <Link href={insight.href} className="block bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1 group">
                  <div className="h-28 flex items-center justify-center text-4xl" style={{ background: insight.bg }}>{insight.emoji}</div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold"
                        style={{ background: (categoryColors[insight.category] || '#1A56A0') + '15', color: categoryColors[insight.category] || '#1A56A0' }}>
                        {insight.category}
                      </span>
                      <span className="text-xs" style={{ color: 'var(--muted)' }}>{insight.readingTime} min read</span>
                    </div>
                    <h3 className="font-semibold text-sm leading-snug mb-3" style={{ color: 'var(--navy)' }}>{insight.title}</h3>
                    <div className="flex items-center justify-between text-xs" style={{ color: 'var(--muted)' }}>
                      <span>{insight.date}</span>
                      <span>👁 {insight.views.toLocaleString()} views</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SUPPORT BANNER */}
      <section className="py-16" style={{ background: 'linear-gradient(135deg, #0D2B52 0%, #1A56A0 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <h2 className="font-sora text-3xl font-bold text-white mb-4">Help us keep Haiti's data open</h2>
            <p className="text-white/70 max-w-xl mx-auto mb-8 text-base leading-relaxed">
              Ayiti Data is free for everyone. Your support funds our analysts, technical infrastructure, and community programs.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/support-us" className="inline-flex items-center gap-2 px-8 py-3 rounded-xl font-semibold text-white transition-all hover:opacity-90 hover:-translate-y-0.5" style={{ background: '#E8A020' }}>
                ❤️ Support Ayiti Data
              </Link>
              <Link href="/work-with-us/partner" className="inline-flex items-center gap-2 px-8 py-3 rounded-xl font-semibold text-white bg-white/10 border border-white/20 transition-all hover:bg-white/20 hover:-translate-y-0.5">
                🤝 Become a Partner
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="py-14 bg-white border-t border-gray-100">
        <div className="max-w-xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <h2 className="font-sora text-2xl font-bold mb-2" style={{ color: 'var(--navy)' }}>📬 Stay in the loop</h2>
            <p className="text-sm mb-6" style={{ color: 'var(--muted)' }}>
              Get notified when new datasets, insights, and reports are published. No spam, unsubscribe anytime.
            </p>
            <form onSubmit={e => e.preventDefault()} className="flex gap-2 max-w-md mx-auto">
              <input type="email" placeholder="your@email.com"
                className="flex-1 px-4 py-2.5 text-sm border border-gray-200 rounded-xl outline-none focus:border-blue-400 transition-colors" />
              <button type="submit" className="px-5 py-2.5 text-sm font-semibold text-white rounded-xl transition-opacity hover:opacity-90" style={{ background: 'var(--navy)' }}>
                Subscribe
              </button>
            </form>
          </motion.div>
        </div>
      </section>

    </div>
  )
}
