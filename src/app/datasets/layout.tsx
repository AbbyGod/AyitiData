import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Datasets — Ayiti Data',
  description: 'Browse and download clean, documented datasets about Haiti — population, economy, health, education and more.',
  openGraph: { title: 'Datasets — Ayiti Data', description: 'Browse and download clean datasets about Haiti.', url: 'https://ayitidata.org/datasets' },
}
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</> }