import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Submit Your Research',
  description: 'Submit your research or analysis on Haiti to be featured on Ayiti Data.',
  openGraph: { title: 'Submit Your Research — Ayiti Data', description: 'Submit your research or analysis on Haiti to be featured on Ayiti Data.', url: 'https://ayitidata.org/work-with-us/submit' },
}
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</> }
