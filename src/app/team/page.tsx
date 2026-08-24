'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { useLanguage } from '@/lib/i18n/LanguageContext'

// Translation dictionary with English, French, and Creole
const UI_MAP: Record<string, Record<string, string>> = {
  'Title': { 
    en: 'Ayiti Data Team', 
    fr: 'Équipe Ayiti Data', 
    ht: 'Ekip Ayiti Data' 
  },
  'HeroDesc': { 
    en: 'We are a multidisciplinary collective of analysts, economists, and technologists dedicated to democratizing access to Haiti’s data, bridging the gap between information and informed decision-making. Every dataset undergoes a rigorous verification lifecycle: sourcing from authoritative references, cross-validating against independent data, and providing transparent documentation regarding any limitations or gaps.', 
    fr: 'Nous sommes un collectif multidisciplinaire d\'analystes, d\'économistes et de technologues dédiés à la démocratisation de l\'accès aux données d\'Haïti, comblant le fossé entre l\'information et la prise de décision éclairée. Chaque ensemble de données suit un cycle de vérification rigoureux : sourçage auprès de références faisant autorité, validation croisée avec des données indépendantes et documentation transparente concernant toute limitation ou lacune.',
    ht: 'Ayiti Data se yon kolektif miltidisiplinè ki rasanble analis, ekonomis ak teknològ. N ap travay pou rann done sou Ayiti aksesib pou tout moun, yon fason pou fasilite chèchè, jounalis, moun k ap pran desizyon ak piblik la pran bon desizyon. Chak done nou pibliye pase nan yon pwosesis verifikasyon sevè: nou pran yo nan sous otorize, nou verifye yo ak lòt sous endepandan, epi n ap bay eksplikasyon klè sou limit oswa mank ki ka genyen nan enfòmasyon yo.' 
  },
  'Meet': { 
    en: 'Meet the Contributors', 
    fr: 'Rencontrez les contributeurs', 
    ht: 'Rankontre Kolaboratè yo' 
  },
  'JoinTitle': { 
    en: 'Join the Team', 
    fr: 'Rejoignez l\'équipe', 
    ht: 'Antre nan Ekip la' 
  },
  'JoinDesc': { 
    en: 'Help us build the future of data in Haiti.', 
    fr: 'Aidez-nous à construire l\'avenir des données en Haïti.', 
    ht: 'Vin ede nou bati avni done an Ayiti.' 
  },
  'Apply': { 
    en: 'Apply now', 
    fr: 'Postulez maintenant', 
    ht: 'Aplike kounye a' 
  },
  'Loading': { 
    en: 'Loading team members...', 
    fr: 'Chargement des membres de l\'équipe...', 
    ht: 'N ap chaje manm ekip la...' 
  }
}

export default function TeamPage() {
  const [team, setTeam] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const { lang } = useLanguage()
  const currentLanguage = lang || 'en'

  useEffect(() => {
    async function load() {
      const supabase = createClient()
      const { data } = await supabase.from('team_members').select('*').order('display_order')
      setTeam(data || [])
      setLoading(false)
    }
    load()
  }, [])

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* 1. Hero */}
      <div style={{ background: 'linear-gradient(135deg, #0D2B52 0%, #1A56A0 100%)' }} className="px-4 py-20">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h1 className="text-5xl font-bold font-sora mb-8 text-white">{UI_MAP['Title'][currentLanguage]}</h1>
          <p className="text-lg text-blue-100 leading-relaxed opacity-100">
            {UI_MAP['HeroDesc'][currentLanguage]}
          </p>
        </div>
      </div>

      {/* 2. Team Grid Section */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold font-sora text-slate-800 mb-12 text-center">{UI_MAP['Meet'][currentLanguage]}</h2>
        
        {loading ? (
          <div className="text-center py-20 text-slate-400">{UI_MAP['Loading'][currentLanguage]}</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
            
            {team.map((member) => (
              <div key={member.id} className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all text-center w-full max-w-sm">
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-blue-900 font-bold">
                    {member.name?.charAt(0)}
                  </div>
                </div>
                <h3 className="font-bold text-lg text-slate-900">{member.name}</h3>
                <p className="text-blue-700 text-sm font-medium mb-4">{member.role}</p>
                <p className="text-slate-600 text-sm leading-relaxed">{member.bio}</p>
              </div>
            ))}

            <Link href="/work-with-us/join" 
              className="border-2 border-dashed border-slate-300 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:border-blue-500 hover:bg-blue-50 transition-all group w-full max-w-sm">
              <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mb-4 group-hover:bg-blue-100 text-2xl">🤝</div>
              <h3 className="font-bold text-slate-900">{UI_MAP['JoinTitle'][currentLanguage]}</h3>
              <p className="text-slate-500 text-sm mt-2 mb-6">{UI_MAP['JoinDesc'][currentLanguage]}</p>
              
              <div className="inline-flex items-center gap-2 text-blue-600 font-semibold group-hover:gap-4 transition-all">
                {UI_MAP['Apply'][currentLanguage]} <ArrowRight size={18} />
              </div>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}