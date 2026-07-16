'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Target, Eye, Heart, Users, Globe, Shield } from 'lucide-react'
import { useLanguage } from '@/lib/i18n/LanguageContext'

type Language = 'en' | 'fr' | 'ht';

const UI_MAP: Record<string, Record<Language, string>> = {
  'About': { en: 'About Ayiti Data', fr: 'À propos d\'Ayiti Data', ht: 'Konsènan Ayiti Data' },
  'HeroDesc': { 
    en: 'We believe data is a public good. Our mission is to make Haiti\'s data open, clean, and accessible to everyone, from students to policymakers.', 
    fr: 'Nous croyons que les données sont un bien public. Notre mission est de rendre les données d\'Haïti ouvertes, propres et accessibles à tous, des étudiants aux décideurs.', 
    ht: 'Nou kwè done se yon byen piblik. Misyon nou se fè done Ayiti yo louvri, pwòp, epi aksesib pou tout moun, depi etidyan rive nan moun k ap pran desizyon.' 
  },
  'Mission': { en: 'Our Mission', fr: 'Notre Mission', ht: 'Misyon Nou' },
  'MissionText1': { 
    en: 'Collect, clean, analyze, and disseminate high-quality data about Haiti. Provide insights that inform decisions and foster a community of learners and data enthusiasts.', 
    fr: 'Collecter, nettoyer, analyser et diffuser des données de haute qualité sur Haïti. Fournir des analyses qui éclairent les décisions et favorisent une communauté d\'apprenants et de passionnés de données.', 
    ht: 'Kolekte, netwaye, analize, epi difize done bon jan kalite sou Ayiti. Bay analiz ki gide desizyon epi ankouraje yon kominote moun k ap aprann ak pasyone done.' 
  },
  'MissionText2': { 
    en: 'We serve students, NGOs, researchers, journalists, policy makers and anyone who wants to understand Haiti through data.', 
    fr: 'Nous servons les étudiants, les ONG, les chercheurs, les journalistes, les décideurs et tous ceux qui souhaitent comprendre Haïti à travers les données.', 
    ht: 'Nou sèvi etidyan, ONG, chèchè, jounalis, moun k ap pran desizyon ak nenpòt moun ki vle konprann Ayiti atravè done.' 
  },
  'Vision': { en: 'Our Vision', fr: 'Notre Vision', ht: 'Vizyon Nou' },
  'VisionText1': { 
    en: 'To become the leading open data platform for Haiti by creating a data-driven society through accessibility, transparency, and knowledge.', 
    fr: 'Devenir la principale plateforme de données ouvertes pour Haïti en créant une société axée sur les données grâce à l\'accessibilité, la transparence et le savoir.', 
    ht: 'Vin tounen platfòm done ouvè ki pi enpòtan pou Ayiti nan kreye yon sosyete ki baze sou done atravè aksesibilite, transparans, ak konesans.' 
  },
  'VisionText2': { 
    en: 'Haiti has rich data produced by government agencies, international organizations, and researchers. But that data is often scattered, poorly formatted, or hard to find. We change that.', 
    fr: 'Haïti possède des données riches produites par des agences gouvernementales, des organisations internationales et des chercheurs. Mais ces données sont souvent dispersées, mal formatées ou difficiles à trouver. Nous changeons cela.', 
    ht: 'Ayiti gen done rich ki pwodui pa ajans gouvènman, òganizasyon entènasyonal, ak chèchè. Men done sa yo souvan gaye, mal fòmate, oswa difisil pou jwenn. Nou chanje sa.' 
  },
  'Values': { en: 'Our Values', fr: 'Nos Valeurs', ht: 'Valè Nou' },
  'ValuesDesc': { en: 'The principles that guide everything we do at Ayiti Data.', fr: 'Les principes qui guident tout ce que nous faisons chez Ayiti Data.', ht: 'Prensip k ap gide tout sa n ap fè nan Ayiti Data.' },
  'Impact': { en: 'Our Impact', fr: 'Notre Impact', ht: 'Enpak Nou' },
  'CTA': { en: 'Join us in building Haiti\'s data future', fr: 'Rejoignez-nous pour construire l\'avenir des données d\'Haïti', ht: 'Vin jwenn nou nan bati avni done Ayiti' },
  'CTADesc': { en: 'Whether you\'re a researcher, journalist, developer, or data enthusiast, there\'s a place for you at Ayiti Data.', fr: 'Que vous soyez chercheur, journaliste, développeur ou passionné de données, il y a une place pour vous chez Ayiti Data.', ht: 'Kit ou se chèchè, jounalis, pwogramè, oswa pasyone done, gen yon plas pou ou nan Ayiti Data.' },
  'MeetTeam': { en: 'Meet the Team', fr: 'Rencontrer l\'équipe', ht: 'Rankontre Ekip la' },
  'WorkWithUs': { en: 'Work With Us', fr: 'Travailler avec nous', ht: 'Travay avèk nou' }
}

const IMPACT_STATS: Record<Language, string[]> = {
  en: ['Datasets Published', 'Languages Supported', 'Departments Covered', 'Free & Open'],
  fr: ['Jeux de données publiés', 'Langues prises en charge', 'Départements couverts', 'Gratuit & Ouvert'],
  ht: ['Done Pibliye', 'Lang ki sipòte', 'Depatman ki kouvri', 'Gratis & Ouvè']
}

export default function AboutPage() {
  const { lang } = useLanguage()
  const currentLanguage = (lang as Language) || 'en'

  const values = [
    { icon: Globe, title: { en: 'Open by Default', fr: 'Ouvert par défaut', ht: 'Louvri pa default' }, description: { en: 'All datasets are free, no account required.', fr: 'Tous les jeux de données sont gratuits.', ht: 'Tout done yo gratis.' } },
    { icon: Shield, title: { en: 'Clean & Documented', fr: 'Propre & Documenté', ht: 'Pwòp & Dokimante' }, description: { en: 'Every dataset is checked and cleaned.', fr: 'Chaque jeu de données est vérifié.', ht: 'Chak done verifye.' } },
    { icon: Users, title: { en: 'Community-Driven', fr: 'Orienté Communauté', ht: 'Kominote-Dirije' }, description: { en: 'Built with and for Haitians.', fr: 'Construit avec et pour les Haïtiens.', ht: 'Bati avèk ak pou Ayisyen.' } }
  ]

  return (
    <div className="min-h-screen bg-white">
      <div style={{ background: 'linear-gradient(135deg, #0D2B52 0%, #1A56A0 100%)' }} className="px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-sora text-4xl font-bold text-white mb-6">{UI_MAP['About'][currentLanguage]}</h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">{UI_MAP['HeroDesc'][currentLanguage]}</p>
        </div>
      </div>

      <section className="max-w-5xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="font-sora text-2xl font-bold mb-4 text-navy">{UI_MAP['Mission'][currentLanguage]}</h2>
            <p className="text-muted mb-4">{UI_MAP['MissionText1'][currentLanguage]}</p>
            <p className="text-muted">{UI_MAP['MissionText2'][currentLanguage]}</p>
          </div>
          <div>
            <h2 className="font-sora text-2xl font-bold mb-4 text-navy">{UI_MAP['Vision'][currentLanguage]}</h2>
            <p className="text-muted mb-4">{UI_MAP['VisionText1'][currentLanguage]}</p>
            <p className="text-muted">{UI_MAP['VisionText2'][currentLanguage]}</p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="font-sora text-3xl font-bold mb-12 text-navy">{UI_MAP['Impact'][currentLanguage]}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {['10+', '3', '10', '100%'].map((val, i) => (
              <div key={i} className="p-6 rounded-2xl border bg-white">
                <div className="text-3xl font-bold text-blue-600 mb-2">{val}</div>
                <div className="text-sm text-gray-500">{IMPACT_STATS[currentLanguage][i]}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}