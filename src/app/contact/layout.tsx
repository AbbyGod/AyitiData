import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with the Ayiti Data team — questions, dataset requests, or partnership inquiries.',
  openGraph: { title: 'Contact Us — Ayiti Data', description: 'Get in touch with the Ayiti Data team.', url: 'https://ayitidata.org/contact' },
}
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</> }
