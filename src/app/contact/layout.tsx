import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Contact — Ayiti Data',
  description: 'Get in touch with the Ayiti Data team. Request a dataset, report an error, or ask a question.',
  openGraph: { title: 'Contact — Ayiti Data', description: 'Get in touch with the Ayiti Data team.', url: 'https://ayitidata.org/contact' },
}
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</> }