import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Target, Eye, Heart, Users, Globe, Shield } from 'lucide-react'

const values = [
  { icon: Globe, title: 'Open by Default', description: 'All datasets are free, no account required. Data belongs to the people of Haiti and the world.', color: '#1A56A0', bg: '#E8F0FC' },
  { icon: Shield, title: 'Clean & Documented', description: 'Every dataset is checked, cleaned, and comes with a data dictionary explaining each field.', color: '#1E8A4C', bg: '#E6F5ED' },
  { icon: Users, title: 'Community-Driven', description: 'Built with and for Haitians. We welcome contributors, partners, researchers, and feedback.', color: '#E8A020', bg: '#FFF8E1' },
  { icon: Heart, title: 'Multi-Language', description: 'Resources in Kreyòl, French, English, and Spanish — so no one is left out.', color: '#C0392B', bg: '#FDE8E8' },
  { icon: Eye, title: 'Visual & Accessible', description: 'Charts, maps, and plain-language explanations so the data speaks to everyone, not just analysts.', color: '#7C3AED', bg: '#F3E8FF' },
  { icon: Target, title: 'Source-Transparent', description: 'Every dataset is traced to its original source. We never publish unverified or made-up numbers.', color: '#0D9488', bg: '#E0F7F4' },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* HERO */}
      <div style={{ background: 'linear-gradient(135deg, #0D2B52 0%, #1A56A0 100%)' }}
        className="px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-sora text-4xl sm:text-5xl font-bold text-white mb-6">
            About Ayiti Data
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto leading-relaxed">
            We believe data is a public good. Our mission is to make Haiti's data
            open, clean, and accessible to everyone — from students to policymakers.
          </p>
        </div>
      </div>

      {/* MISSION + VISION */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
              style={{ background: '#E8F0FC' }}>
              <Target className="w-6 h-6" style={{ color: '#1A56A0' }} />
            </div>
            <h2 className="font-sora text-2xl font-bold mb-4" style={{ color: 'var(--navy)' }}>
              Our Mission
            </h2>
            <p className="text-base leading-relaxed mb-4" style={{ color: 'var(--muted)' }}>
              Collect, clean, analyze, and disseminate high-quality data about Haiti.
              Provide insights that inform decisions and foster a community of learners
              and data enthusiasts.
            </p>
            <p className="text-base leading-relaxed" style={{ color: 'var(--muted)' }}>
              We serve students, NGOs, researchers, journalists, policy makers —
              anyone who wants to understand Haiti through data.
            </p>
          </div>
          <div>
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
              style={{ background: '#E6F5ED' }}>
              <Eye className="w-6 h-6" style={{ color: '#1E8A4C' }} />
            </div>
            <h2 className="font-sora text-2xl font-bold mb-4" style={{ color: 'var(--navy)' }}>
              Our Vision
            </h2>
            <p className="text-base leading-relaxed mb-4" style={{ color: 'var(--muted)' }}>
              To become the leading open data platform for Haiti — empowering a
              data-driven society through accessibility, transparency, and knowledge.
            </p>
            <p className="text-base leading-relaxed" style={{ color: 'var(--muted)' }}>
              Haiti has rich data produced by government agencies, international
              organizations, and researchers. But that data is often scattered,
              poorly formatted, or hard to find. We change that.
            </p>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="py-16" style={{ background: 'var(--light)' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-sora text-3xl font-bold mb-3" style={{ color: 'var(--navy)' }}>
              Our Values
            </h2>
            <p className="text-base" style={{ color: 'var(--muted)' }}>
              The principles that guide everything we do at Ayiti Data.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, i) => (
              <div key={value.title}
                className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-shadow">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: value.bg }}>
                  <value.icon className="w-5 h-5" style={{ color: value.color }} />
                </div>
                <h3 className="font-sora font-bold text-base mb-2" style={{ color: 'var(--navy)' }}>
                  {value.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* IMPACT NUMBERS */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-sora text-3xl font-bold mb-12" style={{ color: 'var(--navy)' }}>
            Our Impact
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: '10+', label: 'Datasets Published' },
              { value: '4', label: 'Languages Supported' },
              { value: '10', label: 'Departments Covered' },
              { value: '100%', label: 'Free & Open' },
            ].map(stat => (
              <div key={stat.label} className="p-6 rounded-2xl border border-gray-100">
                <div className="font-sora text-3xl font-bold mb-2" style={{ color: 'var(--blue)' }}>
                  {stat.value}
                </div>
                <div className="text-sm" style={{ color: 'var(--muted)' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16" style={{ background: 'linear-gradient(135deg, #0D2B52 0%, #1A56A0 100%)' }}>
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-sora text-3xl font-bold text-white mb-4">
            Join us in building Haiti's data future
          </h2>
          <p className="text-white/70 mb-8">
            Whether you're a researcher, journalist, developer, or data enthusiast —
            there's a place for you at Ayiti Data.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/team"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white border border-white/30 hover:bg-white/10 transition-colors">
              Meet the Team <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/work-with-us/join"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-colors hover:opacity-90"
              style={{ background: '#E8A020', color: 'white' }}>
              Work With Us <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}