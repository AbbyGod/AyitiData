import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Join the Team',
  description: 'Join the Ayiti Data team — open roles and how to get involved.',
  openGraph: { title: 'Join the Team — Ayiti Data', description: 'Open roles and how to get involved with Ayiti Data.', url: 'https://ayitidata.org/work-with-us/join' },
}
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</> }
