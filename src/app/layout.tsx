import type { Metadata, Viewport } from 'next'
import { Inter, Sora } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import CookieBanner from '@/components/layout/CookieBanner'
import { LanguageProvider } from '@/lib/i18n/LanguageContext'
import { SITE_NAME, SITE_URL } from '@/lib/seo'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })
const sora = Sora({ subsets: ['latin'], variable: '--font-sora', display: 'swap' })

const DEFAULT_DESCRIPTION = 'La plateforme de données ouvertes sur Haïti — datasets, analyses et rapports gratuits sur la population, l\'économie, la santé et l\'éducation en Haïti.'

// 1. Explicitly define metadata as a const object outside the component scope
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Open Data on Haiti`,
    template: `%s — ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    url: SITE_URL,
    title: `${SITE_NAME} — Open Data on Haiti`,
    description: DEFAULT_DESCRIPTION,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} — Open Data on Haiti`,
    description: DEFAULT_DESCRIPTION,
  },
}

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_NAME,
  url: SITE_URL,
  sameAs: [
    'https://twitter.com/ayitidata',
    'https://linkedin.com/company/ayitidata',
    'https://youtube.com/@ayitidata',
    'https://facebook.com/ayitidata',
  ],
}

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_NAME,
  url: SITE_URL,
  potentialAction: {
    '@type': 'SearchAction',
    target: `${SITE_URL}/datasets?search={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
}

// 2. Add viewport (often required in newer Next.js versions to prevent build errors)
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
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