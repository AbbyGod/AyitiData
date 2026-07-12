import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://ayitidata.org'
  const lastModified = new Date()

  const staticPages = [
    '',
    '/datasets',
    '/insights',
    '/reports',
    '/resources',
    '/glossary',
    '/about',
    '/team',
    '/partners',
    '/support-us',
    '/contact',
    '/work-with-us/submit',
    '/work-with-us/partner',
    '/work-with-us/join',
    '/terms',
    '/privacy',
    '/cookies',
  ]

  return staticPages.map(path => ({
    url: `${baseUrl}${path}`,
    lastModified,
    changeFrequency: (path === '' ? 'daily' : 'weekly') as 'daily' | 'weekly',
    priority: path === '' ? 1 : 0.8,
  }))
}