import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: "Ayiti Data's Privacy Policy — how we collect, use, and protect your data.",
  openGraph: { title: 'Privacy Policy — Ayiti Data', description: "How Ayiti Data collects, uses, and protects your data.", url: 'https://ayitidata.org/privacy' },
}
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</> }
