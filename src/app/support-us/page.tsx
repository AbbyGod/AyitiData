'use client'

import { motion } from 'framer-motion'
import { Heart, Server, Users, Globe, Landmark } from 'lucide-react'
import { useLanguage } from '@/lib/i18n/LanguageContext'

// ═══════════════════════════════════════════
// CUSTOM BRAND ICONS
// ═══════════════════════════════════════════
function AppleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 384 512" fill="currentColor" {...props}>
      <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
    </svg>
  )
}

function GoogleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 488 512" fill="currentColor" {...props}>
      <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
    </svg>
  )
}

function PayPalIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 384 512" fill="currentColor" {...props}>
      <path d="M111.4 295.9l-35.4 207.2c-1.4 8.2 5 15.6 13.3 15.6h75.5c6.5 0 12.1-4.7 13.2-11.1l11.4-71.1c1.1-6.4 6.7-11.1 13.2-11.1h32c91.3 0 151-38 165.7-124.6 6.8-40.3-1-76.3-21.7-104.9-13.6-18.7-32.8-32.9-55.7-41.9-20.7-8.1-45-12.2-71.7-12.2H174.6c-7.3 0-13.5 5.3-14.7 12.5L111.4 295.9zm215.1-134.8c-10.7-34.3-37.4-55-75.1-64.8-17.5-4.5-38-6.8-60.8-6.8H106.4c-8.9 0-16.5 6.4-17.9 15.2L42.1 385c-1.7 10.1 6.1 19 16.3 19h61.7c7.9 0 14.8-5.7 16.1-13.6l15.9-99.3c1.3-7.9 8.2-13.6 16.1-13.6h28c94.2 0 156.4-33.8 171.1-115.7 6.3-35.2.9-63.4-14.1-84.1z" />
    </svg>
  )
}

export default function SupportUsPage() {
  const { t } = useLanguage()

  const tiers = [
    {
      icon: Server,
      title: t('support_tier1Title' as any),
      description: t('support_tier1Desc' as any),
      color: '#1A56A0',
      bg: '#E8F0FC',
      examples: [t('support_tier1Ex1' as any), t('support_tier1Ex2' as any), t('support_tier1Ex3' as any), t('support_tier1Ex4' as any)],
    },
    {
      icon: Users,
      title: t('support_tier2Title' as any),
      description: t('support_tier2Desc' as any),
      color: '#1E8A4C',
      bg: '#E6F5ED',
      examples: [t('support_tier2Ex1' as any), t('support_tier2Ex2' as any), t('support_tier2Ex3' as any), t('support_tier2Ex4' as any)],
    },
    {
      icon: Globe,
      title: t('support_tier3Title' as any),
      description: t('support_tier3Desc' as any),
      color: '#E8A020',
      bg: '#FFF8E1',
      examples: [t('support_tier3Ex1' as any), t('support_tier3Ex2' as any), t('support_tier3Ex3' as any), t('support_tier3Ex4' as any)],
    },
  ]

  // Using exact brand icons now
  const paymentMethods = [
    { name: 'PayPal', icon: PayPalIcon },
    { name: 'Apple Pay', icon: AppleIcon },
    { name: 'Google Pay', icon: GoogleIcon },
    { name: t('support_payBank' as any), icon: Landmark },
  ]

  const amounts = ['$5', '$10', '$25', '$50', '$100', t('support_amtCustom' as any)]
  const frequencies = [t('support_freqOneTime' as any), t('support_freqMonthly' as any)]

  return (
    <div className="min-h-screen" style={{ background: 'var(--light)' }}>

      {/* HERO */}
      <div style={{ background: 'linear-gradient(135deg, #0D2B52 0%, #1A56A0 100%)' }} className="px-4 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6" style={{ background: 'rgba(255,255,255,0.1)' }}>
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h1 className="font-sora text-4xl font-bold text-white mb-4">
              {t('support_heroTitle' as any)}
            </h1>
            <p className="text-white/70 text-lg max-w-xl mx-auto leading-relaxed">
              {t('support_heroDesc' as any)}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* WHY SUPPORT */}
        <div className="text-center mb-12">
          <h2 className="font-sora text-2xl font-bold mb-3" style={{ color: 'var(--navy)' }}>
            {t('support_whyTitle' as any)}
          </h2>
          <p className="text-base max-w-2xl mx-auto" style={{ color: 'var(--muted)' }}>
            {t('support_whyDesc' as any)}
          </p>
        </div>

        {/* TIERS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {tiers.map((tier, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white rounded-2xl border border-gray-100 p-6">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: tier.bg }}>
                <tier.icon className="w-6 h-6" style={{ color: tier.color }} />
              </div>
              <h3 className="font-sora font-bold text-base mb-2" style={{ color: 'var(--navy)' }}>
                {tier.title}
              </h3>
              <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--muted)' }}>
                {tier.description}
              </p>
              <ul className="flex flex-col gap-1.5">
                {tier.examples.map((ex, index) => (
                  <li key={index} className="flex items-center gap-2 text-xs" style={{ color: 'var(--muted)' }}>
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: tier.color }} />
                    {ex}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* DONATION SECTION */}
        <div className="bg-white rounded-2xl border border-gray-100 p-8 mb-8">
          <h2 className="font-sora font-bold text-xl mb-2 text-center" style={{ color: 'var(--navy)' }}>
            {t('support_donateTitle' as any)}
          </h2>
          <p className="text-sm text-center mb-8" style={{ color: 'var(--muted)' }}>
            {t('support_donateDesc' as any)}
          </p>

          {/* AMOUNT SELECTOR */}
          <div className="flex flex-wrap gap-3 justify-center mb-6">
            {amounts.map(amount => (
              <button key={amount}
                className="px-6 py-3 rounded-xl text-sm font-bold border-2 transition-all hover:border-blue-400"
                style={{ borderColor: 'var(--border)', color: 'var(--navy)' }}>
                {amount}
              </button>
            ))}
          </div>

          {/* FREQUENCY */}
          <div className="flex justify-center gap-3 mb-8">
            {frequencies.map(freq => (
              <button key={freq}
                className="px-6 py-2 rounded-xl text-sm font-semibold border transition-all"
                style={{ borderColor: 'var(--border)', color: 'var(--muted)' }}>
                {freq}
              </button>
            ))}
          </div>

          {/* PAYMENT METHODS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
            {paymentMethods.map(method => (
              <div key={method.name}
                className="flex flex-col items-center justify-center gap-3 border border-gray-100 rounded-xl p-4 text-center hover:border-blue-200 hover:shadow-sm transition-all cursor-pointer">
                {/* Dynamically rendering the icon component here */}
                <method.icon className="w-7 h-7" style={{ color: 'var(--navy)' }} />
                <div className="text-xs font-semibold" style={{ color: 'var(--navy)' }}>{method.name}</div>
              </div>
            ))}
          </div>

          {/* PAYPAL BUTTON */}
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-[#FFC439] text-[#003087] font-bold px-10 py-3 rounded-xl text-sm cursor-pointer hover:bg-yellow-400 transition-colors">
              <PayPalIcon className="w-5 h-5" /> {t('support_payBtn' as any)}
            </div>
            <p className="text-xs mt-3" style={{ color: 'var(--muted)' }}>
              {t('support_paySecure' as any)}
            </p>
          </div>
        </div>

        {/* ANONYMOUS NOTE */}
        <p className="text-center text-sm" style={{ color: 'var(--muted)' }}>
          {t('support_anonMsg' as any)}{' '}
          <a href="mailto:ayitidata@gmail.com" className="font-semibold hover:underline" style={{ color: 'var(--blue)' }}>
            ayitidata@gmail.com
          </a>
        </p>
      </div>
    </div>
  )
}