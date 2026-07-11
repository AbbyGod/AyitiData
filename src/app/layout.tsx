import type { Metadata } from 'next'
import { Inter, Sora } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { LanguageProvider } from '@/lib/i18n/LanguageContext'

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
  description: 'The most comprehensive open data platform about Haiti.',
  keywords: ['Haiti', 'Ayiti', 'open data', 'datasets'],
  authors: [{ name: 'Ayiti Data Team' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://ayitidata.org',
    siteName: 'Ayiti Data',
    title: 'Ayiti Data — Open Data About Haiti',
    description: 'The most comprehensive open data platform about Haiti.',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${sora.variable} font-sans antialiased`}>
        <LanguageProvider>
          <Navbar />
          <main className="pt-16">
            {children}
          </main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  )
}