'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { translations, Language, TranslationKey } from './translations'

interface LanguageContextType {
  lang: Language
  setLang: (lang: Language) => void
  t: (key: TranslationKey) => string
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'fr',
  setLang: () => {},
  t: (key) => key,
})

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>('fr')

  useEffect(() => {
    // Load saved language from localStorage
    const saved = localStorage.getItem('ayitidata-lang') as Language
    if (saved && ['en', 'fr', 'ht', 'es'].includes(saved)) {
      setLangState(saved)
    }
  }, [])

  function setLang(newLang: Language) {
    setLangState(newLang)
    localStorage.setItem('ayitidata-lang', newLang)
  }

  function t(key: TranslationKey): string {
    return translations[lang][key] || translations['en'][key] || key
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}