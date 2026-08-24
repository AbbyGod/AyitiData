import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Cookie Policy',
  description: "Ayiti Data's Cookie Policy — how we use cookies and similar technologies on this website.",
  openGraph: { title: 'Cookie Policy — Ayiti Data', description: "How Ayiti Data uses cookies on this website.", url: 'https://ayitidata.org/cookies' },
}
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</> }
