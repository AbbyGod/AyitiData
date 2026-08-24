import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { absoluteUrl } from '@/lib/seo'
import DatasetsListClient from './DatasetsListClient'

export const metadata: Metadata = {
  title: 'Datasets',
  description: 'Clean, documented open datasets about Haiti — population, education, economy, health, agriculture, and more. Free to download in CSV, Excel, or JSON.',
  alternates: { canonical: absoluteUrl('/datasets') },
  openGraph: {
    title: 'Datasets — Ayiti Data',
    description: 'Clean, documented open datasets about Haiti, free to download in CSV, Excel, or JSON.',
    url: absoluteUrl('/datasets'),
  },
}

export default async function DatasetsPage() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('datasets')
    .select('*')
    .order('created_at', { ascending: false })

  return <DatasetsListClient datasets={data || []} />
}
