import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Partners — Ayiti Data',
  description: 'Organizations and institutions that support Ayiti Data\'s mission to make Haiti\'s data open and accessible.',
  openGraph: { title: 'Partners — Ayiti Data', description: 'Organizations supporting open data in Haiti.', url: 'https://ayitidata.org/partners' },
}
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</> }