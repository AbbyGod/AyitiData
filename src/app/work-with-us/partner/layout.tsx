import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Partner With Us',
  description: 'Partner with Ayiti Data — collaborate with us on open data initiatives for Haiti.',
  openGraph: { title: 'Partner With Us — Ayiti Data', description: 'Partner with Ayiti Data on open data initiatives for Haiti.', url: 'https://ayitidata.org/work-with-us/partner' },
}
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</> }
