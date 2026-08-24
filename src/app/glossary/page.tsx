import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { absoluteUrl } from '@/lib/seo'
import GlossaryListClient from './GlossaryListClient'

export const metadata: Metadata = {
  title: 'Glossary',
  description: "Key terms in finance, health, demography, education and more — explained simply so anyone can understand Haiti's data.",
  alternates: { canonical: absoluteUrl('/glossary') },
  openGraph: {
    title: 'Glossary — Ayiti Data',
    description: "Key terms in finance, health, demography, education and more, explained simply.",
    url: absoluteUrl('/glossary'),
  },
}

export default async function GlossaryPage() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('glossary')
    .select('*')
    .order('term', { ascending: true })

  return <GlossaryListClient terms={data || []} />
}
