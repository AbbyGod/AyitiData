'use client'

import { useState } from 'react'
import { useLanguage } from '@/lib/i18n/LanguageContext'

// Expanded, formal legal dictionary with 10 substantial sections + table translations
const UI_MAP: Record<string, Record<string, string>> = {
  'Title': { en: 'Cookie Policy', fr: 'Politique relative aux cookies', ht: 'Règleman sou  (Cookies)' },
  'LastUpdated': { en: 'Effective Date: January 1, 2026', fr: 'Date d\'entrée en vigueur : 1er janvier 2026', ht: 'Dat Efikas: 1e janvye 2026' },
  
  'Nav_1': { en: '1. Introduction', fr: '1. Introduction', ht: '1. Entwodiksyon' },
  'H_1': { en: '1. Introduction', fr: '1. Introduction', ht: '1. Entwodiksyon' },
  'P_1': { 
    en: 'This Cookie Policy explains how Ayiti Data ("we," "us," or "our") uses cookies and similar tracking technologies when you visit our platform. It explains what these technologies are, why we use them, and your rights to control our use of them.', 
    fr: 'Cette Politique relative aux cookies explique comment Ayiti Data ("nous" ou "notre") utilise les cookies et des technologies de suivi similaires lorsque vous visitez notre plateforme. Elle explique ce que sont ces technologies, pourquoi nous les utilisons et vos droits.', 
    ht: 'Règleman sa a esplike kijan Ayiti Data ("nou" oswa "nou menm") sèvi ak ti dosye yo rele (cookies) ak lòt teknoloji menm jan an lè w vizite platfòm nou an. Li esplike kisa yo ye, poukisa nou itilize yo, ak dwa ou genyen pou kontwole yo.' 
  },

  'Nav_2': { en: '2. What Are Cookies?', fr: '2. Que sont les cookies ?', ht: '2. Kisa  yo ye?' },
  'H_2': { en: '2. What Are Cookies?', fr: '2. Que sont les cookies ?', ht: '2. Kisa  yo ye?' },
  'P_2': { 
    en: 'Cookies are small data files that are placed on your computer or mobile device when you visit a website. They are widely used by website owners to make their websites work, or to work more efficiently, as well as to provide reporting information.', 
    fr: 'Les cookies sont de petits fichiers de données placés sur votre ordinateur ou appareil mobile lorsque vous visitez un site web. Ils sont largement utilisés pour faire fonctionner les sites web plus efficacement et fournir des informations de reporting.', 
    ht: 'Cookies yo se ti dosye done ki anrejistre sou òdinatè w oswa telefòn ou lè w vizite yon sitwèb. Mèt sitwèb yo itilize yo anpil pou fè sit yo mache pi byen epi pou ede yo konprann kijan moun ap itilize sit la.' 
  },

  'Nav_3': { en: '3. Cookies We Use', fr: '3. Cookies utilisés', ht: '3.  Nou Itilize' },
  'H_3': { en: '3. The Types of Cookies We Use', fr: '3. Les types de cookies que nous utilisons', ht: '3. Kalite Cookies Nou Itilize yo' },
  'P_3': { 
    en: 'We use first-party and third-party cookies for several reasons. Some cookies are required for technical reasons in order for our platform to operate, while others help us enhance the user experience.', 
    fr: 'Nous utilisons des cookies de première partie et de tiers pour plusieurs raisons. Certains sont nécessaires pour des raisons techniques, tandis que d\'autres nous aident à améliorer l\'expérience utilisateur.', 
    ht: 'Nou itilize pwòp pa nou ak pa lòt konpayi pou plizyè rezon. Gen kèk ki obligatwa pou platfòm nan ka travay nòmalman, alòske gen lòt ki ede nou fè eksperyans ou sou sit la vin pi bon.' 
  },

  // Table Translations
  'Th_Type': { en: 'Type', fr: 'Type', ht: 'Kalite' },
  'Th_Purpose': { en: 'Purpose', fr: 'Objectif', ht: 'Objektif' },
  'Th_Required': { en: 'Required', fr: 'Requis', ht: 'Obligatwa' },
  'Tr1_Type': { en: 'Essential', fr: 'Essentiel', ht: 'Esansyèl' },
  'Tr1_Purp': { en: 'Authentication, session management, security', fr: 'Authentification, gestion de session, sécurité', ht: 'Otantifikasyon, jere sesyon, sekirite' },
  'Tr1_Req': { en: 'Yes', fr: 'Oui', ht: 'Wi' },
  'Tr2_Type': { en: 'Functional', fr: 'Fonctionnel', ht: 'Fonksyonèl' },
  'Tr2_Purp': { en: 'Language preferences, saved settings', fr: 'Préférences linguistiques, paramètres enregistrés', ht: 'Lang ou chwazi, paramèt ou sove' },
  'Tr2_Req': { en: 'No', fr: 'Non', ht: 'Non' },
  'Tr3_Type': { en: 'Analytics', fr: 'Analytique', ht: 'Analitik' },
  'Tr3_Purp': { en: 'Understanding how visitors use the platform', fr: 'Comprendre comment les visiteurs utilisent la plateforme', ht: 'Konprann kijan vizitè yo itilize platfòm nan' },
  'Tr3_Req': { en: 'No', fr: 'Non', ht: 'Non' },

  'Nav_4': { en: '4. Essential Cookies', fr: '4. Cookies essentiels', ht: '4.  Esansyèl' },
  'H_4': { en: '4. Strictly Necessary Cookies', fr: '4. Cookies strictement nécessaires', ht: '4.  ki Vrèman Obligatwa' },
  'P_4': { 
    en: 'These cookies are strictly necessary to provide you with services available through our platform and to use some of its features, such as access to secure areas. Because these cookies are strictly necessary to deliver the website, you cannot refuse them without impacting how our platform functions.', 
    fr: 'Ces cookies sont strictement nécessaires pour vous fournir les services disponibles sur notre plateforme. Étant donné que ces cookies sont indispensables, vous ne pouvez pas les refuser sans impacter le fonctionnement de notre plateforme.', 
    ht: 'Cookies sa yo vrèman obligatwa pou ba ou sèvis ki sou platfòm nou an, tankou pèmèt ou antre nan kont ou an sekirite. Paske yo tèlman enpòtan, ou pa ka refize yo san sa pa deranje fason platfòm nan ap mache.' 
  },

  'Nav_5': { en: '5. Functional Cookies', fr: '5. Cookies fonctionnels', ht: '5. Cookies Fonksyonèl' },
  'H_5': { en: '5. Functional & Preference Cookies', fr: '5. Cookies de fonctionnalité et de préférence', ht: '5.  pou Fonksyon ak Preferans' },
  'P_5': { 
    en: 'During your visit, cookies are used to remember information you have entered or choices you make (such as your language preference). They also store your preferences when utilizing the platform to provide a more personalized and consistent experience.', 
    fr: 'Lors de votre visite, des cookies sont utilisés pour mémoriser les informations que vous avez saisies ou vos choix (comme votre langue). Ils stockent également vos préférences pour offrir une expérience plus cohérente.', 
    ht: 'Pandan vizit ou a, nou itilize Cookies pou sonje chwa ou fè yo (tankou lang ou pito a). Yo ede nou ba ou yon eksperyans ki pi pèsonalize chak fwa ou retounen sou sit la.' 
  },

  'Nav_6': { en: '6. Analytics Cookies', fr: '6. Cookies analytiques', ht: '6.  Analitik' },
  'H_6': { en: '6. Analytics and Performance Cookies', fr: '6. Cookies analytiques et de performance', ht: '6.  Analitik ak Pèfòmans' },
  'P_6': { 
    en: 'These cookies collect information that is used either in aggregate form to help us understand how our platform is being used, how effective our datasets are, or to help us customize our platform for you. We do not use this data to identify individual visitors.', 
    fr: 'Ces cookies collectent des informations utilisées sous forme agrégée pour nous aider à comprendre l\'utilisation de notre plateforme et l\'efficacité de nos données. Nous n\'utilisons pas ces données pour identifier des visiteurs individuels.', 
    ht: 'Cookies sa yo ranmase enfòmasyon an jeneral pou ede nou konprann kijan moun ap itilize platfòm nan. Nou pa sèvi ak enfòmasyon sa yo pou chèche konnen kiyès ou ye an patikilye.' 
  },

  'Nav_7': { en: '7. Third-Party Cookies', fr: '7. Cookies tiers', ht: '7.  Twazyèm Pati' },
  'H_7': { en: '7. Third-Party Technologies', fr: '7. Technologies tierces', ht: '7. Teknoloji Twazyèm Pati' },
  'P_7': { 
    en: 'In some cases, we use cookies provided by trusted third parties, such as analytics providers and secure database services (e.g., Supabase). These third parties may track your usage across our site to provide their necessary technical infrastructure.', 
    fr: 'Dans certains cas, nous utilisons des cookies fournis par des tiers de confiance, tels que des fournisseurs d\'analyses et des services de bases de données (ex. Supabase).', 
    ht: 'Pafwa, nou itilize Cookies ki soti nan lòt gwo konpayi nou fè konfyans (tankou Supabase). Konpayi sa yo ka swiv fason ou itilize sit la pou asire sèvis teknik yo fonksyone kòrèkteman.' 
  },

  'Nav_8': { en: '8. Managing Cookies', fr: '8. Gérer les cookies', ht: '8. Jere Cookies yo' },
  'H_8': { en: '8. How to Manage Your Cookies', fr: '8. Comment gérer vos cookies', ht: '8. Kijan Pou Jere Cookies Ou Yo' },
  'P_8': { 
    en: 'You have the right to decide whether to accept or reject cookies. You can set or amend your web browser controls to accept or refuse cookies. If you choose to reject cookies, you may still use our website, though your access to some functionality and areas may be restricted.', 
    fr: 'Vous avez le droit de décider d\'accepter ou de refuser les cookies. Vous pouvez configurer votre navigateur web pour accepter ou refuser les cookies. Si vous choisissez de les refuser, vous pouvez toujours utiliser notre site web, mais certaines fonctionnalités seront restreintes.', 
    ht: 'Ou gen dwa deside si w ap aksepte oswa refize yo. Ou ka ranje paramèt nan navigatè (browser) ou a pou fè sa. Si w chwazi refize yo, w ap toujou ka itilize sit nou an, men kèk bagay ka pa mache byen.' 
  },

  'Nav_9': { en: '9. Updates to Policy', fr: '9. Mises à jour', ht: '9. Mizajou nan Règleman an' },
  'H_9': { en: '9. Updates to This Cookie Policy', fr: '9. Mises à jour de cette politique', ht: '9. Mizajou nan Règleman sa a' },
  'P_9': { 
    en: 'We may update this Cookie Policy from time to time in order to reflect, for example, changes to the cookies we use or for other operational, legal, or regulatory reasons. Please revisit this page regularly to stay informed about our use of cookies.', 
    fr: 'Nous pouvons mettre à jour cette Politique de temps à autre pour refléter, par exemple, des modifications apportées aux cookies ou pour d\'autres raisons opérationnelles ou légales. Veuillez consulter cette page régulièrement.', 
    ht: 'Nou ka chanje Règleman sa a tanzantan pou nou adapte l ak nouvo n ap itilize oswa pou rezon legal. Tanpri tcheke paj sa a regilyèman pou w ka toujou enfòme.' 
  },

  'Nav_10': { en: '10. Contact Us', fr: '10. Nous contacter', ht: '10. Kontakte Nou' },
  'H_10': { en: '10. Contact Information', fr: '10. Coordonnées', ht: '10. Enfòmasyon pou Kontak' },
  'P_10': { 
    en: 'If you have any questions about our use of cookies or other technologies, please direct your inquiries to our team at ', 
    fr: 'Si vous avez des questions sur notre utilisation des cookies ou d\'autres technologies, veuillez adresser vos demandes à notre équipe à ', 
    ht: 'Si w gen nenpòt kesyon sou fason nou itilize yo oswa lòt teknoloji, tanpri voye yon mesaj bay ekip nou an nan ' 
  }
}

export default function CookiesPage() {
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

                  {/* Inject the Cookie Table inside Section 3 */}
                  {i === 3 && (
                    <div className="border border-slate-200 rounded-2xl overflow-hidden my-8 shadow-sm">
                      <table className="w-full text-sm text-left">
                        <thead className="bg-slate-50 border-b border-slate-200">
                          <tr>
                            <th className="px-6 py-4 font-bold text-slate-700 uppercase tracking-wider text-xs">{UI_MAP['Th_Type'][currentLanguage]}</th>
                            <th className="px-6 py-4 font-bold text-slate-700 uppercase tracking-wider text-xs">{UI_MAP['Th_Purpose'][currentLanguage]}</th>
                            <th className="px-6 py-4 font-bold text-slate-700 uppercase tracking-wider text-xs">{UI_MAP['Th_Required'][currentLanguage]}</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {[1, 2, 3].map((row) => (
                            <tr key={`row-${row}`} className="bg-white hover:bg-slate-50 transition-colors">
                              <td className="px-6 py-4 font-semibold text-slate-900">{UI_MAP[`Tr${row}_Type`][currentLanguage]}</td>
                              <td className="px-6 py-4 text-slate-600">{UI_MAP[`Tr${row}_Purp`][currentLanguage]}</td>
                              <td className="px-6 py-4 font-semibold">
                                <span className={row === 1 ? 'text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md' : 'text-slate-500'}>
                                  {UI_MAP[`Tr${row}_Req`][currentLanguage]}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                  
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