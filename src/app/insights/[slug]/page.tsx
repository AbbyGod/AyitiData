import type { Metadata } from 'next'
import Link from 'next/link'
import { BookOpen } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { SITE_NAME, absoluteUrl } from '@/lib/seo'
import InsightDetailClient from './InsightDetailClient'

// DEMO ARTICLE — shown when slug doesn't match a real article
const demoArticle = {
  id: 'demo',
  title: 'Why school enrollment is decreasing in rural Haiti?',
  summary: 'An analysis of education data between 2018 and 2023, looking at access, distance and poverty.',
  content: `<h2>Introduction</h2>
<p>Between 2018 and 2023, school enrollment in rural Haiti dropped by an estimated 5.7%, despite national policies aimed at expanding access to education. This analysis uses data from MENFP to understand the drivers of this decline.</p>
<h2>Key Findings</h2>
<p>Departments most affected include Nord-Ouest (−8.2%), Nippes (−7.1%), and Grand'Anse (−6.8%). Distance to the nearest school increased by an average of 2.3 km in rural areas.</p>
<p>Poverty rates in affected communes are 34% higher than the national average. Teacher shortages are severe — 1 teacher per 62 students in rural areas versus 1:38 nationally.</p>
<h2>What the Data Suggests</h2>
<p>The decline is driven by a combination of economic pressure, school closures due to insecurity, and the displacement of families from rural communes to urban centers.</p>
<h2>Conclusion</h2>
<p>Without targeted intervention — school feeding programs, conditional cash transfers, and teacher deployment incentives — enrollment rates in rural Haiti are likely to continue declining through 2026.</p>`,
  category: 'Education',
  slug: 'school-enrollment-rural-haiti',
  reading_time: 8,
  view_count: 3420,
  published_at: '2024-05-10T00:00:00Z',
  profiles: { name: 'Ayiti Data Team' },
}

async function getArticle(slug: string) {
  const supabase = await createClient()

  const { data } = await supabase
    .from('articles')
    .select('*, profiles(name)')
    .eq('slug', slug)
    .eq('status', 'published')
    .single()

  const article = data || demoArticle

  let comments: any[] = []
  let related: any[] = []

  if (data) {
    await supabase
      .from('articles')
      .update({ view_count: (data.view_count || 0) + 1 })
      .eq('id', data.id)

    const { data: commentsData } = await supabase
      .from('comments')
      .select('*')
      .eq('article_id', data.id)
      .eq('approved', true)
      .order('created_at', { ascending: true })
    comments = commentsData || []
  }

  if (article.category) {
    const { data: relatedData } = await supabase
      .from('articles')
      .select('title, slug, category, reading_time, published_at')
      .eq('status', 'published')
      .eq('category', article.category)
      .neq('slug', slug)
      .limit(3)
    related = relatedData || []
  }

  return { article, comments, related }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const { article } = await getArticle(slug)

  const description = article.summary || `${article.title} — ${SITE_NAME}.`
  const url = absoluteUrl(`/insights/${slug}`)

  return {
    title: article.title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: article.title,
      description,
      url,
      type: 'article',
      ...(article.published_at ? { publishedTime: article.published_at } : {}),
    },
    twitter: { card: 'summary_large_image', title: article.title, description },
  }
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const { article, comments, related } = await getArticle(slug)

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <BookOpen className="w-16 h-16" style={{ color: 'var(--muted)' }} />
        <h1 className="font-sora text-2xl font-bold" style={{ color: 'var(--navy)' }}>Article not found</h1>
        <Link href="/insights" className="text-sm font-semibold hover:underline" style={{ color: 'var(--blue)' }}>
          ← Back to Insights
        </Link>
      </div>
    )
  }

  const url = absoluteUrl(`/insights/${slug}`)
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.summary || article.title,
    url,
    ...(article.published_at ? { datePublished: article.published_at } : {}),
    author: { '@type': 'Organization', name: article.profiles?.name || 'Ayiti Data Team' },
    publisher: { '@type': 'Organization', name: SITE_NAME },
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: absoluteUrl('/') },
      { '@type': 'ListItem', position: 2, name: 'Insights', item: absoluteUrl('/insights') },
      { '@type': 'ListItem', position: 3, name: article.title, item: url },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <InsightDetailClient article={article} comments={comments} related={related} />
    </>
  )
}
