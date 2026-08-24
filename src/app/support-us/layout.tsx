import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Support Us',
  description: "Support Ayiti Data's mission to make Haiti's data open and accessible to everyone.",
  openGraph: { title: 'Support Us — Ayiti Data', description: "Support Ayiti Data's mission to make Haiti's data open and accessible.", url: 'https://ayitidata.org/support-us' },
}
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</> }
