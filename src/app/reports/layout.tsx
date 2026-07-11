import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Reports — Ayiti Data',
  description: 'Official reports and documents about Haiti from the World Bank, UN, OCHA, UNESCO and more.',
  openGraph: { title: 'Reports — Ayiti Data', description: 'Official reports about Haiti from trusted organizations.', url: 'https://ayitidata.org/reports' },
}
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</> }