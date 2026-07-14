import type { Metadata, Viewport } from 'next'
import { Inter, Sora } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import CookieBanner from '@/components/layout/CookieBanner'
import { LanguageProvider } from '@/lib/i18n/LanguageContext'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })
const sora = Sora({ subsets: ['latin'], variable: '--font-sora', display: 'swap' })

// 1. Explicitly define metadata as a const object outside the component scope
export const metadata: Metadata = {
  title: 'Ayiti Data',
  description: 'La plateforme de données ouvertes sur Haïti.',
}

// 2. Add viewport (often required in newer Next.js versions to prevent build errors)
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`${inter.variable} ${sora.variable} font-sans antialiased`}>
        <LanguageProvider>
          <Navbar />
          <main className="pt-16">
            {children}
          </main>
          <CookieBanner />
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  )
}