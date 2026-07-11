import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Insights — Ayiti Data',
  description: 'Data-driven analyses and reports on Haiti — education, economy, health, population and more.',
  openGraph: { title: 'Insights — Ayiti Data', description: 'Data-driven analyses on Haiti.', url: 'https://ayitidata.org/insights' },
}
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</> }