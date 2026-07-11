import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Support Us — Ayiti Data',
  description: 'Support Ayiti Data\'s mission to keep Haiti\'s data open and free for everyone.',
  openGraph: { title: 'Support Us — Ayiti Data', description: 'Help us keep Haiti\'s data open and free.', url: 'https://ayitidata.org/support-us' },
}
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</> }