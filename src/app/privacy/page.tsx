'use client'

import { useState } from 'react'
import { useLanguage } from '@/lib/i18n/LanguageContext'

// Expanded, formal legal dictionary with 10 substantial sections
const UI_MAP: Record<string, Record<string, string>> = {
  'Title': { en: 'Privacy Policy', fr: 'Politique de confidentialité', ht: 'Règleman sou Konfidansyalite' },
  'LastUpdated': { en: 'Effective Date: January 1, 2026', fr: 'Date d\'entrée en vigueur : 1er janvier 2026', ht: 'Dat Efikas: 1e janvye 2026' },
  
  'Nav_1': { en: '1. Introduction & Scope', fr: '1. Introduction et portée', ht: '1. Entwodiksyon ak Dimansyon' },
  'H_1': { en: '1. Introduction and Scope', fr: '1. Introduction et portée', ht: '1. Entwodiksyon ak Dimansyon' },
  'P_1': { 
    en: 'This Privacy Policy details how the Ayiti Data collective ("we," "us," or "our") collects, uses, and safeguards your personal information when you access our platform. We are committed to protecting your privacy and ensuring transparency regarding our data practices.', 
    fr: 'Cette Politique de confidentialité détaille comment le collectif Ayiti Data ("nous" ou "notre") collecte, utilise et protège vos informations personnelles lorsque vous accédez à notre plateforme. Nous nous engageons à protéger votre vie privée et à assurer la transparence de nos pratiques en matière de données.', 
    ht: 'Règleman Konfidansyalite sa a esplike kijan kolektif Ayiti Data ("nou" oswa "nou menm") ranmase, itilize, epi pwoteje enfòmasyon pèsonèl ou lè w vizite platfòm nou an. Nou pran angajman pou pwoteje vi prive w epi asire nou klè sou fason nou jere done yo.' 
  },

  'Nav_2': { en: '2. Information We Collect', fr: '2. Informations collectées', ht: '2. Enfòmasyon Nou Kolekte' },
  'H_2': { en: '2. Information We Collect', fr: '2. Informations que nous collectons', ht: '2. Enfòmasyon Nou Kolekte' },
  'P_2': { 
    en: 'We collect information you provide directly, such as your name, email address, and institutional affiliation when creating an account or subscribing to our newsletter. Automatically, we collect usage data, IP addresses, and metadata regarding the datasets you download to improve our platform\'s functionality.', 
    fr: 'Nous collectons les informations que vous fournissez directement, telles que votre nom, adresse e-mail et affiliation institutionnelle lors de la création d\'un compte ou de l\'abonnement à notre newsletter. Automatiquement, nous collectons des données d\'utilisation et des adresses IP pour améliorer la fonctionnalité de notre plateforme.', 
    ht: 'Nou ranmase enfòmasyon ou ban nou dirèkteman, tankou non w, adrès imel ou, ak enstitisyon w ap travay pou li lè w kreye yon kont oswa abòne nan bilten nou an. Nou ranmase otomatikman tou kèk done sou fason w sèvi ak sit la pou ede nou amelyore platfòm nan.' 
  },

  'Nav_3': { en: '3. Use of Information', fr: '3. Utilisation des informations', ht: '3. Itilizasyon Enfòmasyon' },
  'H_3': { en: '3. How We Use Your Information', fr: '3. Comment nous utilisons vos informations', ht: '3. Kijan Nou Itilize Enfòmasyon Ou' },
  'P_3': { 
    en: 'Your data is strictly utilized to operate and improve the Ayiti Data platform, respond to inquiries, send requested newsletters, and analyze user engagement patterns. We unequivocally do not and will never sell your personal data to third parties for advertising or commercial purposes.', 
    fr: 'Vos données sont strictement utilisées pour exploiter et améliorer la plateforme Ayiti Data, répondre aux demandes, envoyer les newsletters demandées et analyser les modèles d\'engagement. Nous ne vendons et ne vendrons jamais vos données personnelles à des tiers à des fins publicitaires.', 
    ht: 'Nou itilize done ou yo sèlman pou fè platfòm Ayiti Data a mache pi byen, reponn kesyon ou yo, voye bilten ou mande yo, epi analize fason moun sèvi ak sit la. Nou pap janm vann enfòmasyon pèsonèl ou bay okenn lòt konpayi pou fè piblisite.' 
  },

  'Nav_4': { en: '4. Data Storage & Security', fr: '4. Stockage et sécurité', ht: '4. Depo ak Sekirite Done' },
  'H_4': { en: '4. Data Storage and Security', fr: '4. Stockage et sécurité des données', ht: '4. Depo ak Sekirite Done' },
  'P_4': { 
    en: 'We implement industry-standard encryption and security protocols to protect your data. Your information is securely stored using Supabase, a highly trusted, SOC2-compliant data infrastructure provider. However, please note that no method of transmission over the internet is completely infallible.', 
    fr: 'Nous mettons en œuvre des protocoles de sécurité et de cryptage conformes aux normes de l\'industrie. Vos informations sont stockées en toute sécurité à l\'aide de Supabase, un fournisseur d\'infrastructure de confiance. Cependant, aucune méthode de transmission sur Internet n\'est totalement infaillible.', 
    ht: 'Nou itilize pi gwo sistèm sekirite pou pwoteje done ou yo. Enfòmasyon ou yo byen sere sou Supabase, yon founisè done ki trè serye. Men, li enpòtan pou w konnen pa gen okenn sistèm sou entènèt ki 100% san fay.' 
  },

  'Nav_5': { en: '5. Cookies & Tracking', fr: '5. Cookies et suivi', ht: '5. Koulerez ak Suivi' },
  'H_5': { en: '5. Cookies and Tracking Technologies', fr: '5. Cookies et technologies de suivi', ht: '5. Koulerez (Cookies) ak Teknoloji Suivi' },
  'P_5': { 
    en: 'We deploy essential cookies to maintain your active sessions, language preferences, and security settings. We also utilize minimal analytics cookies to understand broad demographic trends without tracking individual user identities. You maintain full control to disable non-essential cookies via your browser settings.', 
    fr: 'Nous déployons des cookies essentiels pour maintenir vos sessions actives, vos préférences linguistiques et vos paramètres de sécurité. Nous utilisons également des cookies analytiques minimaux pour comprendre les tendances générales. Vous gardez le contrôle total pour désactiver les cookies non essentiels.', 
    ht: 'Nou itilize kèk ti dosye (cookies) ki esansyèl pou kenbe sesyon ou aktif, sonje lang ou chwazi a, epi asire sekirite sit la. Nou itilize tou kèk lòt pou ede nou konprann tandans vizitè yo an jeneral. Ou gen kontwòl total pou bloke sa ki pa nesesè yo nan paramèt navigatè w la.' 
  },

  'Nav_6': { en: '6. Third-Party Services', fr: '6. Services tiers', ht: '6. Sèvis Twazyèm Pati' },
  'H_6': { en: '6. Third-Party Service Providers', fr: '6. Fournisseurs de services tiers', ht: '6. Founisè Sèvis Twazyèm Pati' },
  'P_6': { 
    en: 'To operate efficiently, we rely on essential third-party services including Supabase for database management, Vercel for web hosting, and Resend for transactional emails. These providers are bound by strict data processing agreements and possess their own privacy policies governing data handling.', 
    fr: 'Pour fonctionner efficacement, nous nous appuyons sur des services tiers essentiels, notamment Supabase (base de données), Vercel (hébergement) et Resend (e-mails). Ces fournisseurs sont liés par des accords stricts de traitement des données.', 
    ht: 'Pou nou travay byen, nou sèvi ak kèk sèvis deyò tankou Supabase pou jere done yo, Vercel pou ebèje sit la, ak Resend pou voye imel. Founisè sa yo gen gwo akò sou fason yo dwe trete done yo avèk respè.' 
  },

  'Nav_7': { en: '7. Data Sharing', fr: '7. Partage des données', ht: '7. Pataje Done' },
  'H_7': { en: '7. Data Sharing and Disclosure', fr: '7. Partage et divulgation des données', ht: '7. Pataje ak Divilgasyon Done' },
  'P_7': { 
    en: 'We will not disclose your personal information to external entities unless explicitly mandated by law, court order, or regulatory authorities. We may also share information if it is absolutely necessary to prevent fraud, enforce our Terms of Service, or protect the safety of our users.', 
    fr: 'Nous ne divulguerons pas vos informations personnelles à des entités externes, sauf si la loi ou une décision de justice l\'exige explicitement. Nous pouvons également partager des informations s\'il est absolument nécessaire de prévenir la fraude ou de protéger la sécurité de nos utilisateurs.', 
    ht: 'Nou pap janm bay okenn lòt konpayi oswa òganizasyon enfòmasyon pèsonèl ou, sof si lalwa oswa yon tribinal oblije nou fè sa. Nou ka pataje enfòmasyon tou si sa nesesè pou anpeche fwod oswa pwoteje sekirite itilizatè nou yo.' 
  },

  'Nav_8': { en: '8. User Rights', fr: '8. Droits des utilisateurs', ht: '8. Dwa Itilizatè yo' },
  'H_8': { en: '8. Your Rights and Choices', fr: '8. Vos droits et choix', ht: '8. Dwa ak Chwa Ou Genyen' },
  'P_8': { 
    en: 'You retain the legal right to request access to, correction of, or permanent deletion of your personal data stored on our servers. To exercise these rights, submit a formal request to our support channel. We are committed to processing all verifiable requests within 30 standard business days.', 
    fr: 'Vous conservez le droit légal de demander l\'accès, la correction ou la suppression permanente de vos données personnelles stockées sur nos serveurs. Pour exercer ces droits, soumettez une demande formelle. Nous traiterons toutes les demandes vérifiables dans un délai de 30 jours.', 
    ht: 'Ou gen tout dwa legal pou mande wè, korije, oswa efase nèt done pèsonèl ou nou genyen sou sèvè nou yo. Pou fè sa, ou ka voye yon demann ofisyèl ba nou. N ap fè tout sa n kapab pou trete demann ou an nan mwens pase 30 jou.' 
  },

  'Nav_9': { en: '9. Communications', fr: '9. Communications', ht: '9. Kominikasyon' },
  'H_9': { en: '9. Communications and Newsletters', fr: '9. Communications et newsletters', ht: '9. Kominikasyon ak Bilten' },
  'P_9': { 
    en: 'By explicitly opting into our newsletter, you consent to receive periodic updates, research highlights, and platform announcements. You may withdraw this consent and opt out at any moment by utilizing the "unsubscribe" mechanism provided at the bottom of every automated correspondence.', 
    fr: 'En vous inscrivant explicitement à notre newsletter, vous acceptez de recevoir des mises à jour périodiques et des annonces. Vous pouvez retirer ce consentement à tout moment en utilisant le mécanisme de "désabonnement" fourni au bas de chaque correspondance automatisée.', 
    ht: 'Lè w chwazi abòne nan bilten nou an, ou dakò pou w resevwa nouvèl, rapò rechèch, ak anons sou platfòm nan. Ou kapab chanje lide epi dezabòne nenpòt ki lè; ou jis bezwen klike sou lyen "dezabòne" ki anba tout imel nou voye ba ou yo.' 
  },

  'Nav_10': { en: '10. Contact Us', fr: '10. Nous contacter', ht: '10. Kontakte Nou' },
  'H_10': { en: '10. Contact Information', fr: '10. Coordonnées', ht: '10. Enfòmasyon pou Kontak' },
  'P_10': { 
    en: 'If you have inquiries, concerns, or require further clarification regarding this Privacy Policy or our data handling practices, please communicate directly with our administration team at ', 
    fr: 'Si vous avez des questions, des préoccupations ou avez besoin de plus de précisions concernant cette Politique de confidentialité, veuillez communiquer directement avec notre équipe d\'administration à ', 
    ht: 'Si w gen kesyon, enkyetid, oswa ou bezwen plis esplikasyon sou Règleman Konfidansyalite sa a oswa fason nou jere done, tanpri kontakte ekip administrasyon nou an dirèkteman nan ' 
  }
}

export default function PrivacyPage() {
  const { lang } = useLanguage()
  const currentLanguage = (lang && ['en', 'fr', 'ht'].includes(lang)) ? lang : 'en'
  const [activeSection, setActiveSection] = useState('section-1')

  const scrollToSection = (id: string) => {
    setActiveSection(id)
    const element = document.getElementById(id)
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 100 
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  const sections = Array.from({ length: 10 }, (_, i) => i + 1)

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      
      {/* Banner */}
      <div style={{ background: 'linear-gradient(135deg, #0D2B52 0%, #1A56A0 100%)' }} className="px-4 py-20">
        <div className="max-w-6xl mx-auto text-center md:text-left">
          <h1 className="font-sora text-5xl font-bold text-white mb-4">{UI_MAP['Title'][currentLanguage]}</h1>
          <p className="text-blue-200 text-lg">{UI_MAP['LastUpdated'][currentLanguage]}</p>
        </div>
      </div>

      {/* Main Layout */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col md:flex-row gap-12 items-start">
        
        {/* Left Sidebar (Sticky Navigation) */}
        <aside className="w-full md:w-1/3 lg:w-1/4 hidden md:block sticky top-28 self-start">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <nav className="flex flex-col space-y-1">
              {sections.map((i) => (
                <button
                  key={`nav-${i}`}
                  onClick={() => scrollToSection(`section-${i}`)}
                  className={`text-left text-sm px-4 py-3 rounded-lg transition-all font-medium ${
                    activeSection === `section-${i}`
                      ? 'bg-blue-50 text-blue-700 font-semibold'
                      : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  {UI_MAP[`Nav_${i}`][currentLanguage]}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Mobile Navigation Dropdown */}
        <div className="w-full md:hidden mb-8">
          <select 
            className="w-full p-4 rounded-xl border border-slate-300 bg-white font-medium text-slate-700 shadow-sm"
            onChange={(e) => scrollToSection(e.target.value)}
            value={activeSection}
          >
            {sections.map((i) => (
              <option key={`mobile-nav-${i}`} value={`section-${i}`}>
                {UI_MAP[`Nav_${i}`][currentLanguage]}
              </option>
            ))}
          </select>
        </div>

        {/* Content Area */}
        <main className="w-full md:w-2/3 lg:w-3/4">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 md:p-12">
            
            <div className="prose prose-slate max-w-none">
              {sections.map((i) => (
                <section 
                  key={`section-${i}`} 
                  id={`section-${i}`} 
                  className="mb-12 scroll-mt-28" 
                >
                  <h2 className="font-sora font-bold text-2xl mb-4" style={{ color: 'var(--navy)' }}>
                    {UI_MAP[`H_${i}`][currentLanguage]}
                  </h2>
                  <p className="text-base leading-relaxed" style={{ color: 'var(--text, #334155)' }}>
                    {UI_MAP[`P_${i}`][currentLanguage]}
                    
                    {/* Add Email Link specifically to section 10 */}
                    {i === 10 && (
                      <a href="mailto:ayitidata@gmail.com" className="font-bold underline" style={{ color: '#1A56A0' }}>
                        ayitidata@gmail.com
                      </a>
                    )}
                  </p>
                  
                  {/* Subtle divider except for the last item */}
                  {i !== sections.length && <hr className="mt-12 border-slate-100" />}
                </section>
              ))}
            </div>

          </div>
        </main>

      </div>
    </div>
  )
}