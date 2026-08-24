import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Terms of Service',
  description: "Terms of Service for using Ayiti Data's platform and datasets.",
  openGraph: { title: 'Terms of Service — Ayiti Data', description: "Terms of Service for using Ayiti Data's platform and datasets.", url: 'https://ayitidata.org/terms' },
}
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</> }
