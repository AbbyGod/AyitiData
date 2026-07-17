'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Target, Eye, Heart, Users, Globe, Shield } from 'lucide-react'
import { useLanguage } from '@/lib/i18n/LanguageContext'

type Language = 'en' | 'fr' | 'ht';

// Dictionary containing all text content
const UI_MAP: Record<string, Record<Language, string>> = {
  'HeroTitle': { en: 'About Ayiti Data', fr: 'À propos d\'Ayiti Data', ht: 'Konsènan Ayiti Data' },
  'HeroDesc': { en: 'We believe data is a public good. Our mission is to make Haiti\'s data open, clean, and accessible to everyone, from students to policymakers.', fr: 'Nous croyons que les données sont un bien public. Notre mission est de rendre les données d\'Haïti ouvertes, propres et accessibles à tous, des étudiants aux décideurs.', ht: 'Nou kwè done se yon byen piblik. Misyon nou se fè done Ayiti yo louvri, pwòp, epi aksesib pou tout moun, depi etidyan rive nan moun k ap pran desizyon.' },
  'MissionTitle': { en: 'Our Mission', fr: 'Notre Mission', ht: 'Misyon Nou' },
  'MissionText': { en: 'Collect, clean, analyze, and disseminate high-quality data about Haiti. Provide insights that inform decisions and foster a community of learners and data enthusiasts.', fr: 'Collecter, nettoyer, analyser et diffuser des données de haute qualité sur Haïti. Fournir des analyses qui éclairent les décisions et favorisent une communauté d\'apprenants et de passionnés de données.', ht: 'Kolekte, netwaye, analize, epi difize done bon jan kalite sou Ayiti. Bay analiz ki gide desizyon epi ankouraje yon kominote moun k ap aprann ak pasyone done.' },
  'MissionSub': { en: 'We serve students, NGOs, researchers, journalists, policy makers and anyone who wants to understand Haiti through data.', fr: 'Nous servons les étudiants, les ONG, les chercheurs, les journalistes, les décideurs et tous ceux qui souhaitent comprendre Haïti à travers les données.', ht: 'Nou sèvi etidyan, ONG, chèchè, jounalis, moun k ap pran desizyon ak nenpòt moun ki vle konprann Ayiti atravè done.' },
  'VisionTitle': { en: 'Our Vision', fr: 'Notre Vision', ht: 'Vizyon Nou' },
  'VisionText': { en: 'To become the leading open data platform for Haiti by creating a data-driven society through accessibility, transparency, and knowledge.', fr: 'Devenir la principale plateforme de données ouvertes pour Haïti en créant une société axée sur les données grâce à l\'accessibilité, la transparence et le savoir.', ht: 'Vin tounen platfòm done ouvè ki pi enpòtan pou Ayiti nan kreye yon sosyete ki baze sou done atravè aksesibilite, transparans, ak konesans.' },
  'VisionSub': { en: 'Haiti has rich data produced by government agencies, international organizations, and researchers. But that data is often scattered, poorly formatted, or hard to find. We change that.', fr: 'Haïti possède des données riches produites par des agences gouvernementales, des organisations internationales et des chercheurs. Mais ces données sont souvent dispersées, mal formatées ou difficiles à trouver. Nous changeons cela.', ht: 'Ayiti gen done rich ki pwodui pa ajans gouvènman, òganizasyon entènasyonal, ak chèchè. Men done sa yo souvan gaye, mal fòmate, oswa difisil pou jwenn. Nou chanje sa.' },
  'ValuesTitle': { en: 'Our Values', fr: 'Nos Valeurs', ht: 'Valè Nou' },
  'ValuesDesc': { en: 'The principles that guide everything we do at Ayiti Data.', fr: 'Les principes qui guident tout ce que nous faisons chez Ayiti Data.', ht: 'Prensip k ap gide tout sa n ap fè nan Ayiti Data.' },
  'ImpactTitle': { en: 'Our Impact', fr: 'Notre Impact', ht: 'Enpak Nou' },
  'CTATitle': { en: 'Join us in building Haiti\'s data future', fr: 'Rejoignez-nous pour construire l\'avenir des données d\'Haïti', ht: 'Vin jwenn nou nan bati avni done Ayiti' },
  'CTADesc': { en: 'Whether you\'re a researcher, journalist, developer, or data enthusiast, there\'s a place for you at Ayiti Data.', fr: 'Que vous soyez chercheur, journaliste, développeur ou passionné de données, il y a une place pour vous chez Ayiti Data.', ht: 'Kit ou se chèchè, jounalis, pwogramè, oswa pasyone done, gen yon plas pou ou nan Ayiti Data.' },
  'MeetTeam': { en: 'Meet the Team', fr: 'Rencontrer l\'équipe', ht: 'Rankontre Ekip la' },
  'WorkWithUs': { en: 'Work With Us', fr: 'Travailler avec nous', ht: 'Travay avèk nou' }
}

export default function AboutPage() {
  const { lang } = useLanguage()
  const currentLanguage = (lang as Language) || 'en'

  const values = [
    { icon: Globe, title: { en: 'Open by Default', fr: 'Ouvert par défaut', ht: 'Louvri pa default' }, description: { en: 'All datasets are free, no account required. Data belongs to the people of Haiti and the world.', fr: 'Tous les jeux de données sont gratuits, aucun compte requis. Les données appartiennent au peuple haïtien et au monde.', ht: 'Tout done yo gratis, pa bezwen kont. Done yo se pou pèp Ayisyen an ak mond lan.' }, color: '#1A56A0', bg: '#E8F0FC' },
    { icon: Shield, title: { en: 'Clean & Documented', fr: 'Propre & Documenté', ht: 'Pwòp & Dokimante' }, description: { en: 'Every dataset is checked, cleaned, and comes with a data dictionary explaining each field.', fr: 'Chaque jeu de données est vérifié, nettoyé et accompagné d\'un dictionnaire de données expliquant chaque champ.', ht: 'Chak done verifye, netwaye, epi li vini ak yon diksyonè done ki eksplike chak chan.' }, color: '#1E8A4C', bg: '#E6F5ED' },
    { icon: Users, title: { en: 'Community-Driven', fr: 'Orienté Communauté', ht: 'Kominote-Dirije' }, description: { en: 'Built with and for Haitians. We welcome contributors, partners, researchers, and feedback.', fr: 'Construit avec et pour les Haïtiens. Nous accueillons les contributeurs, partenaires, chercheurs et commentaires.', ht: 'Bati avèk ak pou Ayisyen. Nou akeyi kontribitè, patnè, chèchè, ak fidbak.' }, color: '#E8A020', bg: '#FFF8E1' },
    { icon: Heart, title: { en: 'Multi-Language', fr: 'Multilingue', ht: 'Miltilang' }, description: { en: 'Resources in Kreyòl, French, English, and Spanish, so no one is left out.', fr: 'Ressources en créole, français, anglais et espagnol, pour que personne ne soit laissé pour compte.', ht: 'Resous an Kreyòl, Franse, Angle, ak Panyòl, pou pèsonn pa rete dèyè.' }, color: '#C0392B', bg: '#FDE8E8' },
    { icon: Eye, title: { en: 'Visual & Accessible', fr: 'Visuel & Accessible', ht: 'Vizyèl & Aksesib' }, description: { en: 'Charts, maps, and plain-language explanations so the data speaks to everyone, not just analysts.', fr: 'Graphiques, cartes et explications en langage simple pour que les données parlent à tous, pas seulement aux analystes.', ht: 'Grafik, kat, ak eksplikasyon nan lang senp pou done yo pale ak tout moun, pa sèlman analis.' }, color: '#7C3AED', bg: '#F3E8FF' },
    { icon: Target, title: { en: 'Source-Transparent', fr: 'Transparence des sources', ht: 'Sous-Transparan' }, description: { en: 'Every dataset is traced to its original source. We never publish unverified or made-up numbers.', fr: 'Chaque jeu de données est tracé jusqu\'à sa source originale. Nous ne publions jamais de chiffres non vérifiés ou inventés.', ht: 'Chak done trase rive nan sous orijinal li. Nou pa janm pibliye chif ki pa verifye oswa ki envante.' }, color: '#0D9488', bg: '#E0F7F4' },
  ]

  return (
    <div className="min-h-screen bg-white">
      <div style={{ background: 'linear-gradient(135deg, #0D2B52 0%, #1A56A0 100%)' }} className="px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-sora text-4xl sm:text-5xl font-bold text-white mb-6">{UI_MAP['HeroTitle'][currentLanguage]}</h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto leading-relaxed">{UI_MAP['HeroDesc'][currentLanguage]}</p>
        </div>
      </div>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5" style={{ background: '#E8F0FC' }}><Target className="w-6 h-6" style={{ color: '#1A56A0' }} /></div>
            <h2 className="font-sora text-2xl font-bold mb-4" style={{ color: 'var(--navy)' }}>{UI_MAP['MissionTitle'][currentLanguage]}</h2>
            <p className="text-base leading-relaxed mb-4" style={{ color: 'var(--muted)' }}>{UI_MAP['MissionText'][currentLanguage]}</p>
            <p className="text-base leading-relaxed" style={{ color: 'var(--muted)' }}>{UI_MAP['MissionSub'][currentLanguage]}</p>
          </div>
          <div>
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5" style={{ background: '#E6F5ED' }}><Eye className="w-6 h-6" style={{ color: '#1E8A4C' }} /></div>
            <h2 className="font-sora text-2xl font-bold mb-4" style={{ color: 'var(--navy)' }}>{UI_MAP['VisionTitle'][currentLanguage]}</h2>
            <p className="text-base leading-relaxed mb-4" style={{ color: 'var(--muted)' }}>{UI_MAP['VisionText'][currentLanguage]}</p>
            <p className="text-base leading-relaxed" style={{ color: 'var(--muted)' }}>{UI_MAP['VisionSub'][currentLanguage]}</p>
          </div>
        </div>
      </section>

      <section className="py-16" style={{ background: 'var(--light)' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-sora text-3xl font-bold mb-3" style={{ color: 'var(--navy)' }}>{UI_MAP['ValuesTitle'][currentLanguage]}</h2>
            <p className="text-base" style={{ color: 'var(--muted)' }}>{UI_MAP['ValuesDesc'][currentLanguage]}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((v) => (
              <div key={v.title.en} className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-shadow">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ background: v.bg }}>
                  <v.icon className="w-5 h-5" style={{ color: v.color }} />
                </div>
                <h3 className="font-sora font-bold text-base mb-2" style={{ color: 'var(--navy)' }}>{v.title[currentLanguage]}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>{v.description[currentLanguage]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-sora text-3xl font-bold mb-12" style={{ color: 'var(--navy)' }}>{UI_MAP['ImpactTitle'][currentLanguage]}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[ { v: '10+', l: 'Datasets Published' }, { v: '3', l: 'Languages Supported' }, { v: '10', l: 'Departments Covered' }, { v: '100%', l: 'Free & Open' } ].map(stat => (
              <div key={stat.l} className="p-6 rounded-2xl border border-gray-100">
                <div className="font-sora text-3xl font-bold mb-2" style={{ color: 'var(--blue)' }}>{stat.v}</div>
                <div className="text-sm" style={{ color: 'var(--muted)' }}>{stat.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16" style={{ background: 'linear-gradient(135deg, #0D2B52 0%, #1A56A0 100%)' }}>
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-sora text-3xl font-bold text-white mb-4">{UI_MAP['CTATitle'][currentLanguage]}</h2>
          <p className="text-white/70 mb-8">{UI_MAP['CTADesc'][currentLanguage]}</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/team" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white border border-white/30 hover:bg-white/10 transition-colors">
              {UI_MAP['MeetTeam'][currentLanguage]} <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/work-with-us/join" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-colors hover:opacity-90" style={{ background: '#E8A020', color: 'white' }}>
              {UI_MAP['WorkWithUs'][currentLanguage]} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}