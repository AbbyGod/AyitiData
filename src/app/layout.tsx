import type { Metadata } from 'next'
import { Inter, Sora } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Ayiti Data — Open Data About Haiti',
    template: '%s | Ayiti Data',
  },
  description: 'The most comprehensive open data platform about Haiti. Clean datasets, data-driven insights, and reports on education, economy, health, and more.',
  keywords: ['Haiti', 'Ayiti', 'open data', 'datasets', 'Haiti economy', 'Haiti health', 'Haiti education'],
  authors: [{ name: 'Ayiti Data Team' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://ayitidata.org',
    siteName: 'Ayiti Data',
    title: 'Ayiti Data — Open Data About Haiti',
    description: 'The most comprehensive open data platform about Haiti.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ayiti Data — Open Data About Haiti',
    description: 'The most comprehensive open data platform about Haiti.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${sora.variable} font-sans antialiased`}>
        <Navbar />
        <main className="pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}



