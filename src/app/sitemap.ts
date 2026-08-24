import type { MetadataRoute } from 'next'
import { createClient } from '@/lib/supabase/server'
import { SITE_URL } from '@/lib/seo'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
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

  const staticEntries: MetadataRoute.Sitemap = staticPages.map(path => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency: (path === '' ? 'daily' : 'weekly') as 'daily' | 'weekly',
    priority: path === '' ? 1 : 0.8,
  }))

  const supabase = await createClient()

  const [{ data: datasets }, { data: articles }] = await Promise.all([
    supabase.from('datasets').select('slug, last_updated'),
    supabase.from('articles').select('slug, published_at').eq('status', 'published'),
  ])

  const datasetEntries: MetadataRoute.Sitemap = (datasets || [])
    .filter(d => d.slug)
    .map(d => ({
      url: `${SITE_URL}/datasets/${d.slug}`,
      lastModified: d.last_updated ? new Date(d.last_updated) : lastModified,
      changeFrequency: 'weekly',
      priority: 0.7,
    }))

  const articleEntries: MetadataRoute.Sitemap = (articles || [])
    .filter(a => a.slug)
    .map(a => ({
      url: `${SITE_URL}/insights/${a.slug}`,
      lastModified: a.published_at ? new Date(a.published_at) : lastModified,
      changeFrequency: 'weekly',
      priority: 0.7,
    }))

  return [...staticEntries, ...datasetEntries, ...articleEntries]
}