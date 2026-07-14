import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Resources — Ayiti Data',
  description: 'All datasets and official reports about Haiti in one place — download data or explore documents from trusted sources.',
  openGraph: { title: 'Resources — Ayiti Data', description: 'All Haiti datasets and reports in one place.', url: 'https://ayitidata.org/resources' },
}
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</> }