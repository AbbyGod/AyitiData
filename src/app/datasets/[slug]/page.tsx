import type { Metadata } from 'next'
import Link from 'next/link'
import { Database, ArrowLeft } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { SITE_NAME, absoluteUrl } from '@/lib/seo'
import DatasetDetailClient from './DatasetDetailClient'

async function getDataset(slug: string) {
  const supabase = await createClient()

  const { data: dataset } = await supabase
    .from('datasets')
    .select('*')
    .eq('slug', slug)
    .single()

  if (!dataset) return { dataset: null, relatedArticles: [] }

  const { data: articles } = await supabase
    .from('articles')
    .select('title, slug, category, reading_time, published_at')
    .eq('status', 'published')
    .eq('related_dataset_id', dataset.id)
    .limit(5)

  return { dataset, relatedArticles: articles || [] }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const { dataset } = await getDataset(slug)

  if (!dataset) {
    return { title: 'Dataset not found', robots: { index: false, follow: true } }
  }

  const description = dataset.description || `${dataset.title} — free open dataset on Haiti from ${SITE_NAME}.`
  const url = absoluteUrl(`/datasets/${slug}`)

  return {
    title: dataset.title,
    description,
    alternates: { canonical: url },
    openGraph: { title: dataset.title, description, url, type: 'website' },
    twitter: { card: 'summary_large_image', title: dataset.title, description },
  }
}

export default async function DatasetPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const { dataset, relatedArticles } = await getDataset(slug)

  if (!dataset) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <Database className="w-16 h-16" style={{ color: 'var(--muted)' }} />
        <h1 className="font-sora text-2xl font-bold" style={{ color: 'var(--navy)' }}>
          Dataset not found
        </h1>
        <Link href="/datasets" className="text-sm font-semibold hover:underline"
          style={{ color: 'var(--blue)' }}>
          ← Back to Datasets
        </Link>
      </div>
    )
  }

  const url = absoluteUrl(`/datasets/${slug}`)
  const distribution = [
    dataset.csv_url && { '@type': 'DataDownload', encodingFormat: 'text/csv', contentUrl: dataset.csv_url },
    dataset.excel_url && { '@type': 'DataDownload', encodingFormat: 'application/vnd.ms-excel', contentUrl: dataset.excel_url },
    dataset.json_url && { '@type': 'DataDownload', encodingFormat: 'application/json', contentUrl: dataset.json_url },
  ].filter(Boolean)

  const datasetJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    name: dataset.title,
    description: dataset.description || dataset.title,
    url,
    creator: { '@type': 'Organization', name: SITE_NAME, url: 'https://ayitidata.org' },
    ...(dataset.source ? { creditText: dataset.source } : {}),
    ...(dataset.last_updated ? { dateModified: dataset.last_updated } : {}),
    ...(distribution.length ? { distribution } : {}),
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: absoluteUrl('/') },
      { '@type': 'ListItem', position: 2, name: 'Datasets', item: absoluteUrl('/datasets') },
      { '@type': 'ListItem', position: 3, name: dataset.title, item: url },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <DatasetDetailClient dataset={dataset} relatedArticles={relatedArticles} />
    </>
  )
}
