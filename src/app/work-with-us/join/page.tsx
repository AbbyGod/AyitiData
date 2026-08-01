'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { motion } from 'framer-motion'
import { CheckCircle, Users } from 'lucide-react'
import { useLanguage } from '@/lib/i18n/LanguageContext'

type Language = 'en' | 'fr' | 'ht'

const translations = {
  en: {
    heroTitle: "Join the Team",
    heroSubtitle: "We're building a team of domain experts to produce world-class data analysis about Haiti. Are you in?",
    openRolesTitle: "Open Roles",
    applyNowTitle: "Apply Now",
    formName: "Full Name *",
    formEmail: "Email *",
    formExpertise: "Area of Expertise *",
    formSelect: "Select...",
    formLinkedin: "LinkedIn (optional)",
    formMotivationLabel: "Why do you want to join Ayiti Data? *",
    formMotivationPlaceholder: "Tell us about your background, what you bring to the team, and why you're passionate about Haiti's data...",
    submitBtn: "Submit Application",
    successTitle: "Application received!",
    successText: "Thank you for your interest in joining Ayiti Data. We'll review your application and get back to you soon.",
    expertiseAreas: [
      'Finance & Economics', 'Healthcare & Public Health', 'Education',
      'Political Science', 'Demography & Statistics', 'Data Science & Engineering',
      'Journalism & Communication', 'Agriculture & Environment', 'Law & Policy', 'Other'
    ],
    roles: [
      { title: 'Finance Analyst', description: "Analyze Haiti's economic data and write data-driven reports on GDP, inflation, trade, and fiscal policy." },
      { title: 'Health Data Specialist', description: "Work with health datasets to produce insights on healthcare access, mortality, disease, and public health in Haiti." },
      { title: 'Education Researcher', description: "Analyze enrollment, literacy, and education policy data to produce accessible reports for a general audience." },
      { title: 'Data Engineer', description: "Help us clean, structure, and publish datasets. Build pipelines to import data from government and international sources." },
      { title: 'Political Analyst', description: "Cover elections, governance, and political developments in Haiti through a data lens." },
      { title: 'Content Editor', description: "Review and edit articles written by our analysts for clarity, accuracy, and accessibility." }
    ]
  },
  fr: {
    heroTitle: "Rejoignez l'Équipe",
    heroSubtitle: "Nous construisons une équipe d'experts pour produire des analyses de données de classe mondiale sur Haïti. Êtes-vous de la partie ?",
    openRolesTitle: "Postes Ouverts",
    applyNowTitle: "Postulez Maintenant",
    formName: "Nom Complet *",
    formEmail: "Adresse E-mail *",
    formExpertise: "Domaine d'Expertise *",
    formSelect: "Sélectionner...",
    formLinkedin: "LinkedIn (facultatif)",
    formMotivationLabel: "Pourquoi voulez-vous rejoindre Ayiti Data ? *",
    formMotivationPlaceholder: "Parlez-nous de votre parcours, de ce que vous apportez à l'équipe et de votre passion pour les données d'Haïti...",
    submitBtn: "Soumettre la Candidature",
    successTitle: "Candidature reçue !",
    successText: "Merci de votre intérêt pour Ayiti Data. Nous examinerons votre candidature et vous contacterons bientôt.",
    expertiseAreas: [
      'Finance et Économie', 'Santé et Santé Publique', 'Éducation',
      'Sciences Politiques', 'Démographie et Statistiques', 'Science des Données et Ingénierie',
      'Journalisme et Communication', 'Agriculture et Environnement', 'Droit et Politiques Publiques', 'Autre'
    ],
    roles: [
      { title: 'Analyste Financier', description: "Analysez les données économiques d'Haïti et rédigez des rapports basés sur les données concernant le PIB, l'inflation, le commerce et la politique fiscale." },
      { title: 'Spécialiste des Données de Santé', description: "Travaillez avec des ensembles de données de santé pour produire des analyses sur l'accès aux soins, la mortalité, les maladies et la santé publique en Haïti." },
      { title: 'Chercheur en Éducation', description: "Analysez les données sur les inscriptions, l'alphabétisation et les politiques éducatives pour produire des rapports accessibles au grand public." },
      { title: 'Ingénieur de Données', description: "Aidez-nous à nettoyer, structurer et publier des ensembles de données. Créez des pipelines pour importer des données provenant de sources gouvernementales et internationales." },
      { title: 'Analyste Politique', description: "Couvrez les élections, la gouvernance et les développements politiques en Haïti sous l'angle des données." },
      { title: 'Éditeur de Contenu', description: "Révisez et éditez les articles rédigés par nos analystes pour en assurer la clarté, l'exactitude et l'accessibilité." }
    ]
  },
  ht: {
    heroTitle: "Vin Jwenn Ekip La",
    heroSubtitle: "N ap bati yon ekip ekspè pou pwodui pi bon analiz done sou Ayiti. Èske w prè pou w patisipe?",
    openRolesTitle: "Pòs ki Ouvè",
    applyNowTitle: "Aplike Kounye a",
    formName: "Non Konplè *",
    formEmail: "Imèl *",
    formExpertise: "Domèn Ekspètiz *",
    formSelect: "Chwazi...",
    formLinkedin: "LinkedIn (Si ou vle)",
    formMotivationLabel: "Poukisa ou vle vin jwenn Ayiti Data? *",
    formMotivationPlaceholder: "Pale nou de pakou w, sa w ap pote nan ekip la, ak poukisa w pasyone de done Ayiti...",
    submitBtn: "Soumèt Aplikasyon an",
    successTitle: "Nou resevwa aplikasyon w lan!",
    successText: "Mèsi pou enterè w nan Ayiti Data. Nou pral evalye aplikasyon w lan epi n ap kontakte w byento.",
    expertiseAreas: [
      'Finans ak Ekonomi', 'Swen Sante ak Sante Piblik', 'Edikasyon',
      'Syans Politik', 'Demografi ak Estatistik', 'Syans Done ak Jeni',
      'Jounalis ak Kominikasyon', 'Agrikilti ak Anviwònman', 'Dwa ak Politik Piblik', 'Lòt'
    ],
    roles: [
      { title: 'Analiste Finansye', description: "Analize done ekonomik Ayiti epi ekri rapò ki baze sou done pou PIB, enflasyon, komès, ak politik fiskal." },
      { title: 'Espesyalis Done Sante', description: "Travay ak done sante pou pwodui analiz sou aksè ak swen sante, mòtalite, maladi, ak sante piblik an Ayiti." },
      { title: 'Chèchè nan Edikasyon', description: "Analize done sou kantite moun ki anrejistre lekòl, alfabetizasyon, ak politik edikasyon pou pwodui rapò ki fasil pou konprann pou tout moun." },
      { title: 'Enjenyè Done', description: "Ede nou netwaye, estriktire, epi pibliye done. Bati sistèm pou enpòte done ki soti nan gouvènman ak sous entènasyonal yo." },
      { title: 'Analiste Politik', description: "Kouvri eleksyon, gouvènans, ak devlopman politik an Ayiti nan yon pèspektiv done." },
      { title: 'Editè Kontni', description: "Revize epi korije atik analis nou yo ekri pou asire yo klè, egzak, epi fasil pou li." }
    ]
  }
}

export default function JoinPage() {
  // Read the global state from your Context
  const { lang } = useLanguage() as { lang: Language }

  const [form, setForm] = useState({ name: '', email: '', expertise: '', linkedin: '', motivation: '' })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  // t dynamically updates whenever the global 'lang' changes
  const t = translations[lang]

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    const supabase = createClient()
    await supabase.from('submissions').insert({
      name: form.name,
      email: form.email,
      title: `Join the Team — ${form.expertise}`,
      abstract: `Expertise: ${form.expertise}\nLinkedIn: ${form.linkedin}\n\nMotivation: ${form.motivation}`,
      category: 'Other',
      status: 'pending',
    })
    setSubmitting(false)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ background: 'var(--light)' }}>
        <div className="bg-white rounded-2xl border border-gray-100 p-12 max-w-md w-full text-center">
          <CheckCircle className="w-16 h-16 mx-auto mb-4" style={{ color: '#1E8A4C' }} />
          <h2 className="font-sora text-2xl font-bold mb-3" style={{ color: 'var(--navy)' }}>{t.successTitle}</h2>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
            {t.successText}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen" style={{ background: 'var(--light)' }}>
      <div style={{ background: 'linear-gradient(135deg, #0D2B52 0%, #1A56A0 100%)' }} className="px-4 py-16 relative">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="font-sora text-4xl font-bold text-white mb-3">{t.heroTitle}</h1>
            <p className="text-white/70 text-lg max-w-xl">
              {t.heroSubtitle}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* OPEN ROLES */}
        <h2 className="font-sora font-bold text-xl mb-6" style={{ color: 'var(--navy)' }}>
          {t.openRolesTitle}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
          {t.roles.map((role) => (
            <div key={role.title} className="bg-white rounded-2xl border border-gray-100 p-5">
              <h3 className="font-sora font-bold text-sm mb-2" style={{ color: 'var(--navy)' }}>
                {role.title}
              </h3>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--muted)' }}>
                {role.description}
              </p>
            </div>
          ))}
        </div>

        {/* APPLICATION FORM */}
        <div className="bg-white rounded-2xl border border-gray-100 p-8">
          <h2 className="font-sora font-bold text-xl mb-6" style={{ color: 'var(--navy)' }}>
            {t.applyNowTitle}
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text)' }}>{t.formName}</label>
                <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required
                  className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl outline-none focus:border-blue-400" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text)' }}>{t.formEmail}</label>
                <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required
                  className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl outline-none focus:border-blue-400" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text)' }}>{t.formExpertise}</label>
                <select value={form.expertise} onChange={e => setForm({ ...form, expertise: e.target.value })} required
                  className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl outline-none focus:border-blue-400">
                  <option value="">{t.formSelect}</option>
                  {translations.en.expertiseAreas.map((enKey, index) => (
                    <option key={enKey} value={enKey}>{t.expertiseAreas[index]}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text)' }}>{t.formLinkedin}</label>
                <input type="text" value={form.linkedin} onChange={e => setForm({ ...form, linkedin: e.target.value })}
                  placeholder="https://linkedin.com/in/..."
                  className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl outline-none focus:border-blue-400" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text)' }}>
                {t.formMotivationLabel}
              </label>
              <textarea value={form.motivation} onChange={e => setForm({ ...form, motivation: e.target.value })} required rows={5}
                placeholder={t.formMotivationPlaceholder}
                className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl outline-none focus:border-blue-400 resize-none" />
            </div>
            <button type="submit" disabled={submitting}
              className="self-start inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white disabled:opacity-60 transition-opacity hover:opacity-90"
              style={{ background: 'var(--navy)' }}>
              {submitting
                ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                : <Users className="w-4 h-4" />}
              {t.submitBtn}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}