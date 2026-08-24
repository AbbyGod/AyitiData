import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { absoluteUrl } from '@/lib/seo'
import InsightsListClient from './InsightsListClient'

export const metadata: Metadata = {
  title: 'Insights',
  description: 'Data-driven analyses and reports on Haiti — education, economy, health, population, and more.',
  alternates: { canonical: absoluteUrl('/insights') },
  openGraph: {
    title: 'Insights — Ayiti Data',
    description: 'Data-driven analyses and reports on Haiti — education, economy, health, population, and more.',
    url: absoluteUrl('/insights'),
  },
}

export default async function InsightsPage() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('articles')
    .select('*, profiles(name)')
    .eq('status', 'published')
    .order('published_at', { ascending: false })

  return <InsightsListClient insights={data || []} />
}
