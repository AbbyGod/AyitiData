import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'About — Ayiti Data',
  description: 'Learn about Ayiti Data\'s mission to make Haiti\'s data open, clean, and accessible to everyone.',
  openGraph: { title: 'About — Ayiti Data', description: 'Our mission to make Haiti\'s data open and accessible.', url: 'https://ayitidata.org/about' },
}
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</> }