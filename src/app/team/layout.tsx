import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Our Team — Ayiti Data',
  description: 'Meet the team behind Ayiti Data — professionals in finance, health, education, politics, and data science.',
  openGraph: { title: 'Our Team — Ayiti Data', description: 'Meet the team behind Ayiti Data.', url: 'https://ayitidata.org/team' },
}
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</> }