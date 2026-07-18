'use client'

import { useEffect, useState } from 'react'
import { useLanguage } from '@/lib/i18n/LanguageContext'

// Expanded, formal legal dictionary with 10 substantial sections
const UI_MAP: Record<string, Record<string, string>> = {
  'Title': { en: 'Terms of Service', fr: 'Conditions d\'utilisation', ht: 'Kondisyon Itilizasyon' },
  'LastUpdated': { en: 'Effective Date: January 1, 2026', fr: 'Date d\'entrée en vigueur : 1er janvier 2026', ht: 'Dat Efikas: 1e janvye 2026' },
  
  'Nav_1': { en: '1. Definitions', fr: '1. Définitions', ht: '1. Definisyon' },
  'H_1': { en: '1. Definitions', fr: '1. Définitions', ht: '1. Definisyon' },
  'P_1': { 
    en: 'In these Terms of Service, "Platform" refers to the Ayiti Data website and its associated services. "User," "you," and "your" refer to any individual or entity accessing the Platform. "Datasets" refers to all statistical, demographic, and informational records provided. "We," "us," and "our" refer to the Ayiti Data collective.', 
    fr: 'Dans ces Conditions, "Plateforme" désigne le site web Ayiti Data et ses services. "Utilisateur", "vous" et "votre" désignent toute personne ou entité accédant à la Plateforme. "Ensembles de données" désigne tous les enregistrements statistiques et informatifs. "Nous" et "notre" désignent le collectif Ayiti Data.', 
    ht: 'Nan Kondisyon sa yo, "Platfòm" vle di sitwèb Ayiti Data ak sèvis li yo. "Itilizatè", "ou", ak "ou menm" vle di nenpòt moun oswa antite ki itilize Platfòm nan. "Seri done" vle di tout enfòmasyon estatistik nou bay. "Nou" ak "nou menm" vle di kolektif Ayiti Data a.' 
  },

  'Nav_2': { en: '2. Acceptance of Terms', fr: '2. Acceptation des conditions', ht: '2. Akseptasyon Kondisyon yo' },
  'H_2': { en: '2. Acceptance of Terms', fr: '2. Acceptation des conditions', ht: '2. Akseptasyon Kondisyon yo' },
  'P_2': { 
    en: 'By accessing, browsing, or utilizing the Ayiti Data Platform, you acknowledge that you have read, understood, and explicitly agree to be bound by these Terms of Service. If you are using the Platform on behalf of an organization, you represent that you hold the legal authority to bind that organization to these terms. If you do not agree with any provision, you must immediately cease use of the Platform.', 
    fr: 'En accédant, en naviguant ou en utilisant la Plateforme Ayiti Data, vous reconnaissez avoir lu, compris et accepté explicitement d\'être lié par ces Conditions. Si vous utilisez la Plateforme au nom d\'une organisation, vous déclarez détenir l\'autorité légale pour lier cette organisation. Si vous n\'acceptez pas une disposition, vous devez cesser l\'utilisation.', 
    ht: 'Lè w vizite, navige, oswa itilize Platfòm Ayiti Data a, ou rekonèt ou fin li, konprann, epi dakò san fòse pou respekte Kondisyon sa yo. Si w ap itilize Platfòm nan pou yon òganizasyon, ou deklare ou gen dwa legal pou angaje òganizasyon sa a. Si ou pa dakò ak okenn pwen, ou dwe sispann itilize Platfòm nan imedyatman.' 
  },

  'Nav_3': { en: '3. Access and Use of Data', fr: '3. Accès et utilisation des données', ht: '3. Aksè ak Itilizasyon Done' },
  'H_3': { en: '3. Access and Use of Data', fr: '3. Accès et utilisation des données', ht: '3. Aksè ak Itilizasyon Done' },
  'P_3': { 
    en: 'Ayiti Data grants you a revocable, non-exclusive, non-transferable license to access and utilize the Datasets strictly for research, journalism, educational, and non-commercial initiatives. You are strictly required to provide appropriate credit, cite Ayiti Data as the facilitator, and indicate if changes were made. Commercial exploitation of any Dataset requires a separate, legally executed agreement.', 
    fr: 'Ayiti Data vous accorde une licence révocable, non exclusive et non transférable pour accéder et utiliser les ensembles de données strictement pour la recherche, le journalisme, l\'éducation et les initiatives non commerciales. Vous êtes tenu de fournir le crédit approprié. L\'exploitation commerciale nécessite un accord distinct.', 
    ht: 'Ayiti Data ba ou yon lisans ki pa eksklizif, ki pa ka transfere bay lòt moun pou itilize Seri done yo sèlman pou rechèch, jounalis, edikasyon, ak pwojè ki pa pou fè lajan. Ou dwe toujou site Ayiti Data kòm fasilitatè a. Pou itilize done yo pou fè lajan, ou bezwen yon lòt akò legal separe.' 
  },

  'Nav_4': { en: '4. User Accounts & Security', fr: '4. Comptes et sécurité', ht: '4. Kont Itilizatè ak Sekirite' },
  'H_4': { en: '4. User Accounts & Security', fr: '4. Comptes et sécurité', ht: '4. Kont Itilizatè ak Sekirite' },
  'P_4': { 
    en: 'Certain features of the Platform may require account registration. You are solely responsible for safeguarding your login credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized access. We hold the right to suspend or terminate accounts that display suspicious activity or violate these terms.', 
    fr: 'Certaines fonctionnalités peuvent nécessiter la création d\'un compte. Vous êtes seul responsable de la protection de vos identifiants et de toutes les activités sous votre compte. Vous acceptez de nous informer de tout accès non autorisé. Nous nous réservons le droit de suspendre les comptes suspects.', 
    ht: 'Kèk opsyon sou Platfòm nan ka mande pou w kreye yon kont. Ou se sèl moun ki responsab pou pwoteje modpas ou ak tout sa k ap fèt sou kont ou a. Ou dakò pou fè nou konnen imedyatman si gen yon moun ki antre sou kont ou san pèmisyon. Nou gen dwa sispann kont ki pa respekte prensip yo.' 
  },

  'Nav_5': { en: '5. Content Submissions', fr: '5. Soumissions de contenu', ht: '5. Soumèt Kontni' },
  'H_5': { en: '5. Content Submissions & Licensing', fr: '5. Soumissions de contenu et licences', ht: '5. Soumèt Kontni ak Lisans' },
  'P_5': { 
    en: 'When you submit, upload, or share datasets, research, or documentation to the Platform, you retain your intellectual property rights. However, you grant Ayiti Data a worldwide, royalty-free, perpetual license to host, display, analyze, and distribute this content. You warrant that you hold the necessary rights to share any submitted data.', 
    fr: 'Lorsque vous soumettez des données ou des recherches, vous conservez vos droits de propriété intellectuelle. Cependant, vous accordez à Ayiti Data une licence mondiale, gratuite et perpétuelle pour héberger, afficher et distribuer ce contenu. Vous garantissez détenir les droits nécessaires pour partager ces données.', 
    ht: 'Lè w voye, pibliye, oswa pataje done ak rechèch sou Platfòm nan, ou toujou rete mèt travay ou a. Men, ou bay Ayiti Data yon lisans mondyal, gratis pou toutan pou afiche ak distribye kontni sa a. Ou garanti ou gen tout dwa ki nesesè pou pataje done ou soumèt yo.' 
  },

  'Nav_6': { en: '6. Prohibited Activities', fr: '6. Activités interdites', ht: '6. Aktivite ki Entèdi' },
  'H_6': { en: '6. Prohibited Activities', fr: '6. Activités interdites', ht: '6. Aktivite ki Entèdi' },
  'P_6': { 
    en: 'Users are strictly prohibited from: (a) attempting to bypass or breach our platform security; (b) scraping, mining, or using automated systems to extract data at an unreasonable scale without permission; (c) redistributing our datasets under a false identity or claiming original ownership; and (d) utilizing the data to discriminate, harass, or inflict harm upon any demographic group.', 
    fr: 'Il est strictement interdit aux utilisateurs de : (a) tenter de contourner notre sécurité ; (b) extraire des données à une échelle déraisonnable via des systèmes automatisés sans autorisation ; (c) redistribuer nos données sous une fausse identité ; et (d) utiliser les données pour discriminer ou nuire à un groupe démographique.', 
    ht: 'Li entèdi totalman pou Itilizatè yo: (a) eseye kase sistèm sekirite platfòm nan; (b) itilize sistèm otomatik pou rache done an kantite san pèmisyon; (c) pran done nou yo pou pibliye sou non pa yo; epi (d) itilize done yo pou fè diskriminasyon oswa fè abi sou nenpòt gwoup moun.' 
  },

  'Nav_7': { en: '7. Intellectual Property', fr: '7. Propriété intellectuelle', ht: '7. Pwopriyete Entelektyèl' },
  'H_7': { en: '7. Intellectual Property Rights', fr: '7. Droits de propriété intellectuelle', ht: '7. Dwa Pwopriyete Entelektyèl' },
  'P_7': { 
    en: 'The Ayiti Data brand, encompassing our logos, site design, structural architecture, and proprietary algorithms, remains the exclusive intellectual property of the Ayiti Data collective. Accessing the datasets does not transfer ownership of the overarching platform infrastructure to the user.', 
    fr: 'La marque Ayiti Data, englobant nos logos, le design du site et l\'architecture, reste la propriété intellectuelle exclusive du collectif Ayiti Data. L\'accès aux ensembles de données ne transfère pas la propriété de l\'infrastructure au l\'utilisateur.', 
    ht: 'Mak Ayiti Data a, ki gen ladan l logo nou yo, fòm sit la, ak teknoloji nou itilize a, rete pwopriyete prive kolektif Ayiti Data a. Lefèt ke w gen aksè ak done yo pa vle di ou vin mèt platfòm nan.' 
  },

  'Nav_8': { en: '8. Disclaimer', fr: '8. Clause de non-responsabilité', ht: '8. Limit Responsabilite' },
  'H_8': { en: '8. Disclaimer of Warranties', fr: '8. Exclusion de garanties', ht: '8. Limit Garanti' },
  'P_8': { 
    en: 'The Platform and its Datasets are provided on an "AS IS" and "AS AVAILABLE" basis. While we commit to rigorous verification processes, Ayiti Data makes no absolute warranties regarding the exhaustive completeness, real-time accuracy, or absolute reliability of the information. Users must independently verify critical data sets before relying on them for major policy, medical, or financial decisions.', 
    fr: 'La Plateforme et ses données sont fournies "TELLES QUELLES" et "SELON DISPONIBILITÉ". Bien que nous nous engagions à des processus de vérification rigoureux, Ayiti Data ne garantit pas l\'exactitude absolue des informations. Les utilisateurs doivent vérifier les données de manière indépendante avant de s\'y fier.', 
    ht: 'Nou bay Platfòm nan ak Done yo jan yo ye a, lè yo disponib. Malgre nou fè anpil efò pou nou verifye enfòmasyon yo, Ayiti Data pa ka garanti 100% tout done yo pafè san okenn fay. Itilizatè yo dwe toujou verifye done enpòtan yo anvan yo pran gwo desizyon finansye, medikal, oswa politik.' 
  },

  'Nav_9': { en: '9. Changes to Terms', fr: '9. Modifications', ht: '9. Chanjman' },
  'H_9': { en: '9. Modifications to the Terms', fr: '9. Modifications des conditions', ht: '9. Modifikasyon nan Kondisyon yo' },
  'P_9': { 
    en: 'We reserve the unilateral right to amend, update, or revise these Terms at any time to reflect changes in our operational structure or legal requirements. Significant updates will be highlighted on the Platform. Your continued engagement with Ayiti Data following such updates constitutes your binding acceptance of the revised Terms.', 
    fr: 'Nous nous réservons le droit unilatéral de modifier ou réviser ces Conditions à tout moment. Les mises à jour importantes seront mises en évidence sur la Plateforme. Votre engagement continu après ces mises à jour constitue votre acceptation des Conditions révisées.', 
    ht: 'Nou gen dwa pou nou chanje, mete ajou, oswa revize Kondisyon sa yo nenpòt ki lè pou reflete chanjman nan fason nou fonksyone oswa nan lalwa. N ap anonse gwo chanjman yo sou Platfòm nan. Si w kontinye itilize Ayiti Data apre chanjman sa yo, sa vle di ou aksepte nouvo Kondisyon yo.' 
  },

  'Nav_10': { en: '10. Contact Us', fr: '10. Nous contacter', ht: '10. Kontakte Nou' },
  'H_10': { en: '10. Contact Information', fr: '10. Coordonnées', ht: '10. Enfòmasyon pou Kontak' },
  'P_10': { 
    en: 'Should you require clarification regarding any clause in these Terms, or if you need to report a violation, please direct your correspondence to our legal and compliance team at ', 
    fr: 'Si vous avez besoin de précisions concernant une clause de ces Conditions, veuillez adresser votre correspondance à notre équipe juridique à ', 
    ht: 'Si w bezwen plis esplikasyon sou nenpòt pwen nan Kondisyon sa yo, oswa si w bezwen rapòte yon pwoblèm, tanpri kontakte ekip legal nou an nan ' 
  }
}

export default function TermsPage() {
  const { lang } = useLanguage()
  const currentLanguage = (lang && ['en', 'fr', 'ht'].includes(lang)) ? lang : 'en'
  const [activeSection, setActiveSection] = useState('section-1')

  // Smooth scroll helper
  const scrollToSection = (id: string) => {
    setActiveSection(id)
    const element = document.getElementById(id)
    if (element) {
      // Offset for a fixed header if you have one
      const y = element.getBoundingClientRect().top + window.scrollY - 100 
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  // Generate sections array programmatically [1 through 10]
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

        {/* Mobile Navigation Dropdown (Visible only on small screens) */}
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
                  className="mb-12 scroll-mt-28" // scroll-mt offsets the anchor scroll
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