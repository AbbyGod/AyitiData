'use client'

export const dynamic = 'force-dynamic'

import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
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
// TYPES FOR SUPABASE DATA
// ═══════════════════════════════════════════
type Dataset = { title: string; category: string; source: string; updated: string; downloads: number; href: string }
type Report = { title: string; organization: string; category: string; year: number }
type Insight = { title: string; category: string; date: string; readingTime: number; views: number; emoji: string; bg: string; href: string }

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

const categoryColors: Record<string, string> = {
  Population: '#1A56A0',
  Education: '#E8A020',
  Economy: '#1E8A4C',
  Health: '#C0392B',
  Agriculture: '#7C3AED',
  Humanitarian: '#0D9488',
}

export default function HomePage() {
  const { t } = useLanguage()

  // 1. Initialize empty state arrays for your data
  const [featuredDatasets, setFeaturedDatasets] = useState<Dataset[]>([])
  const [featuredReports, setFeaturedReports] = useState<Report[]>([])
  const [latestInsights, setLatestInsights] = useState<Insight[]>([])

  // 2. Fetch data from Supabase when the component loads
  useEffect(() => {
    async function fetchRealData() {
      const supabase = createClient()
      
      // Fetch datasets
      const { data: datasets } = await supabase.from('datasets').select('*').limit(3)
      if (datasets) setFeaturedDatasets(datasets)
      
      // Fetch reports
      const { data: reports } = await supabase.from('reports').select('*').limit(3)
      console.log("🚨 RAW REPORTS DATA:", reports)
      if (reports) setFeaturedReports(reports)
      
      // Fetch insights
      const { data: insights } = await supabase.from('articles').select('*').eq('status', 'published').limit(3)
      if (insights) setLatestInsights(insights)
    }

    fetchRealData()
  }, [])

  const haitiStats = [
    { icon: Users, label: t('stat_population'), value: 12, suffix: 'M+', description: t('stat_population_desc'), color: '#1A56A0', bg: '#E8F0FC' },
    { icon: DollarSign, label: t('stat_gdp'), value: 8, suffix: 'B USD', prefix: '$', description: t('stat_gdp_desc'), color: '#1E8A4C', bg: '#E6F5ED' },
    { icon: MapPin, label: t('stat_area'), value: 27750, suffix: ' km²', description: t('stat_area_desc'), color: '#E8A020', bg: '#FFF8E1' },
    { icon: GraduationCap, label: t('stat_literacy'), value: 61, suffix: '%', description: t('stat_literacy_desc'), color: '#7C3AED', bg: '#F3E8FF' },
    { icon: Activity, label: t('stat_life'), value: 64, suffix: ' yrs', description: t('stat_life_desc'), color: '#C0392B', bg: '#FDE8E8' },
    { icon: TrendingUp, label: t('stat_inflation'), value: 28, suffix: '%', description: t('stat_inflation_desc'), color: '#0D2B52', bg: '#E8F0FC' },
  ]

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
                {t('hero_badge')}
              </span>
              <h1 className="font-sora text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
               {t('hero_title_1')}{' '}
                <span style={{ color: '#E8A020' }}>{t('hero_title_2')}</span>{' '}
                {t('hero_title_3')}
              </h1>
              <p className="text-lg text-white/70 max-w-xl mb-10 leading-relaxed">
                {t('hero_desc')}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/datasets" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white transition-all hover:opacity-90 hover:-translate-y-0.5" style={{ background: '#E8A020' }}>
                  <Database className="w-4 h-4" /> {t('hero_btn_datasets')} <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/insights" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white bg-white/10 border border-white/20 transition-all hover:bg-white/20 hover:-translate-y-0.5">
                 <BookOpen className="w-4 h-4" /> {t('hero_btn_insights')}
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
            <h2 className="font-sora text-2xl font-bold mb-2" style={{ color: 'var(--navy)' }}>{t('stats_title')}</h2>
            <p className="text-sm" style={{ color: 'var(--muted)' }}>{t('stats_desc')}</p>
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
              <h2 className="font-sora text-2xl font-bold mb-1" style={{ color: 'var(--navy)' }}>{t('resources_title')}</h2>
              <p className="text-sm" style={{ color: 'var(--muted)' }}>{t('resources_desc')}</p>
            </div>
            <Link href="/resources" className="inline-flex items-center gap-1 text-sm font-semibold hover:underline" style={{ color: 'var(--blue)' }}>
              {t('resources_view')} <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {featuredDatasets.map((dataset, i) => (
              <motion.div key={'d-' + dataset.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}>
                <Link href={dataset.href} className="block bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-all hover:-translate-y-1 group h-full">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-full text-xs font-bold" style={{ background: '#E8F0FC', color: '#1A56A0' }}>{t('badge_dataset')}</span>
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
                    <span className="flex items-center gap-1"><Download className="w-3 h-3" />{dataset.downloads?.toLocaleString()}</span>
                  </div>
                </Link>
              </motion.div>
            ))}

            {featuredReports.map((report, i) => (
              <motion.div key={'r-' + report.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: (i + 3) * 0.1 }}>
                <Link href="/reports" className="block bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-all hover:-translate-y-1 group h-full">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-full text-xs font-bold" style={{ background: '#E6F5ED', color: '#1E8A4C' }}>{t('badge_report')}</span>
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
              <h2 className="font-sora text-2xl font-bold mb-1" style={{ color: 'var(--navy)' }}>{t('insights_title')}</h2>
              <p className="text-sm" style={{ color: 'var(--muted)' }}>{t('insights_desc')}</p>
            </div>
            <Link href="/insights" className="inline-flex items-center gap-1 text-sm font-semibold hover:underline" style={{ color: 'var(--blue)' }}>
             {t('insights_view')} <ArrowRight className="w-3.5 h-3.5" />
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
                      <span className="text-xs" style={{ color: 'var(--muted)' }}>{insight.readingTime} {t('min_read')}</span>
                    </div>
                    <h3 className="font-semibold text-sm leading-snug mb-3" style={{ color: 'var(--navy)' }}>{insight.title}</h3>
                    <div className="flex items-center justify-between text-xs" style={{ color: 'var(--muted)' }}>
                      <span>{insight.date}</span>
                      <span>👁 {insight.views.toLocaleString()} {t('views')}</span>
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
            <h2 className="font-sora text-3xl font-bold text-white mb-4">{t('support_title')}</h2>
            <p className="text-white/70 max-w-xl mx-auto mb-8 text-base leading-relaxed">
              {t('support_desc')}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/support-us" className="inline-flex items-center gap-2 px-8 py-3 rounded-xl font-semibold text-white transition-all hover:opacity-90 hover:-translate-y-0.5" style={{ background: '#E8A020' }}>
                {t('support_btn')}
              </Link>
              <Link href="/work-with-us/partner" className="inline-flex items-center gap-2 px-8 py-3 rounded-xl font-semibold text-white bg-white/10 border border-white/20 transition-all hover:bg-white/20 hover:-translate-y-0.5">
                {t('partner_btn')}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="py-14 bg-white border-t border-gray-100">
        <div className="max-w-xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <h2 className="font-sora text-2xl font-bold mb-2" style={{ color: 'var(--navy)' }}>{t('newsletter_title')}</h2>
            <p className="text-sm mb-6" style={{ color: 'var(--muted)' }}>
              {t('newsletter_desc')}
            </p>
            <form onSubmit={e => e.preventDefault()} className="flex gap-2 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder={t('newsletter_placeholder')}
              className="flex-1 px-4 py-2.5 text-sm border border-gray-200 rounded-xl outline-none focus:border-blue-400 transition-colors" 
            />
            <button 
              type="submit" 
              className="px-5 py-2.5 text-sm font-semibold text-white rounded-xl transition-opacity hover:opacity-90" 
              style={{ background: 'var(--navy)' }}
            >
              {t('newsletter_btn')}
            </button>
            </form>
          </motion.div>
        </div>
      </section>

    </div>
  )
}