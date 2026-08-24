import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { absoluteUrl } from '@/lib/seo'
import ReportsListClient from './ReportsListClient'

export const metadata: Metadata = {
  title: 'Reports & Official Documents',
  description: 'Official reports on Haiti from government agencies, international organizations, and research institutions — linked directly from their original sources.',
  alternates: { canonical: absoluteUrl('/reports') },
  openGraph: {
    title: 'Reports & Official Documents — Ayiti Data',
    description: 'Official reports on Haiti from government agencies, international organizations, and research institutions.',
    url: absoluteUrl('/reports'),
  },
}

export default async function ReportsPage() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('reports')
    .select('*')
    .order('year', { ascending: false })

  return <ReportsListClient reports={data || []} />
}
