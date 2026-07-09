'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {  ArrowRight } from 'lucide-react'
import { FaLinkedin} from 'react-icons/fa6'
const demoTeam = [
  {
    id: '1',
    name: 'Ayiti Data Team',
    role: 'Founder & Lead Analyst',
    expertise: 'Data Analysis, Economics',
    bio: 'Passionate about making Haiti\'s data accessible to everyone. Building Ayiti Data to empower researchers, journalists, and citizens with quality information.',
    photo_url: null,
    linkedin_url: 'https://linkedin.com/company/ayitidata',
    display_order: 1,
  },
]

export default function TeamPage() {
  const [team, setTeam] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const supabase = createClient()
      const { data } = await supabase
        .from('team_members')
        .select('*')
        .order('display_order', { ascending: true })
      setTeam(data && data.length > 0 ? data : demoTeam)
      setLoading(false)
    }
    load()
  }, [])

  return (
    <div className="min-h-screen" style={{ background: 'var(--light)' }}>

      {/* HERO */}
      <div style={{ background: 'linear-gradient(135deg, #0D2B52 0%, #1A56A0 100%)' }}
        className="px-4 py-16">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}>
            <h1 className="font-sora text-4xl font-bold text-white mb-3">Our Team</h1>
            <p className="text-white/70 text-lg max-w-xl mx-auto">
              A growing team of professionals in finance, health, education, politics,
              and data science — united by a passion for Haiti.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-700 rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((member, i) => (
              <motion.div key={member.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-md transition-shadow">

                {/* AVATAR */}
                <div className="flex items-start justify-between mb-4">
                  {member.photo_url ? (
                    <img src={member.photo_url} alt={member.name}
                      className="w-16 h-16 rounded-2xl object-cover" />
                  ) : (
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl font-bold font-sora"
                      style={{ background: 'var(--navy)' }}>
                      {member.name?.charAt(0)}
                    </div>
                  )}
                  {member.linkedin_url && (
                    <a href={member.linkedin_url} target="_blank" rel="noopener noreferrer"
                      className="p-2 rounded-lg hover:bg-gray-50 transition-colors"
                      style={{ color: '#0077B5' }}>
                      <FaLinkedin className="w-4 h-4" />
                    </a>
                  )}
                </div>

                <h3 className="font-sora font-bold text-base mb-0.5"
                  style={{ color: 'var(--navy)' }}>
                  {member.name}
                </h3>
                <p className="text-sm font-semibold mb-1" style={{ color: 'var(--blue)' }}>
                  {member.role}
                </p>
                {member.expertise && (
                  <p className="text-xs mb-3 px-2 py-0.5 rounded-full inline-block"
                    style={{ background: 'var(--light)', color: 'var(--muted)' }}>
                    {member.expertise}
                  </p>
                )}
                {member.bio && (
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
                    {member.bio}
                  </p>
                )}
              </motion.div>
            ))}

            {/* JOIN THE TEAM CARD */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: team.length * 0.1 }}
            >
              <Link href="/work-with-us/join"
                className="block bg-white rounded-2xl border-2 border-dashed border-gray-200 p-6 hover:border-blue-300 hover:shadow-md transition-all h-full flex flex-col items-center justify-center text-center gap-3 min-h-48">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl"
                  style={{ background: 'var(--light)' }}>
                  🤝
                </div>
                <div>
                  <h3 className="font-sora font-bold text-base mb-1" style={{ color: 'var(--navy)' }}>
                    Join the Team
                  </h3>
                  <p className="text-sm" style={{ color: 'var(--muted)' }}>
                    Are you an expert in finance, health, education, or data? We'd love to have you.
                  </p>
                </div>
                <span className="inline-flex items-center gap-1 text-sm font-semibold"
                  style={{ color: 'var(--blue)' }}>
                  Apply now <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  )
}