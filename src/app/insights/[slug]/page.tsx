'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import {
  Clock, Eye, Calendar, ArrowRight, ArrowLeft, Share2,
 Link2, BookOpen,
  ChevronRight, MessageSquare, Send
} from 'lucide-react'
import {
  FaXTwitter,
  FaLinkedin,
  FaYoutube,
  FaFacebook
} from 'react-icons/fa6'

const categoryColors: Record<string, { bg: string; color: string }> = {
  Education: { bg: '#FFF3E0', color: '#E8A020' },
  Economy: { bg: '#E6F5ED', color: '#1E8A4C' },
  Health: { bg: '#FDE8E8', color: '#C0392B' },
  Population: { bg: '#E8F0FC', color: '#1A56A0' },
  Agriculture: { bg: '#F3E8FF', color: '#7C3AED' },
  Environment: { bg: '#E0F7F4', color: '#0D9488' },
  Politics: { bg: '#FFF1F2', color: '#E11D48' },
  Other: { bg: '#F4F7FB', color: '#6B7A90' },
}

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

export default function ArticlePage() {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug as string

  const [article, setArticle] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [comments, setComments] = useState<any[]>([])
  const [related, setRelated] = useState<any[]>([])
  const [commentName, setCommentName] = useState('')
  const [commentEmail, setCommentEmail] = useState('')
  const [commentText, setCommentText] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [copied, setCopied] = useState(false)
  const [showCite, setShowCite] = useState(false)

  useEffect(() => {
    async function load() {
      const supabase = createClient()

      // Load article
      const { data } = await supabase
        .from('articles')
        .select('*, profiles(name)')
        .eq('slug', slug)
        .eq('status', 'published')
        .single()

      const art = data || demoArticle
      setArticle(art)

      // Increment view count
      if (data) {
        await supabase
          .from('articles')
          .update({ view_count: (data.view_count || 0) + 1 })
          .eq('id', data.id)
      }

      // Load approved comments
      if (data) {
        const { data: commentsData } = await supabase
          .from('comments')
          .select('*')
          .eq('article_id', data.id)
          .eq('approved', true)
          .order('created_at', { ascending: true })
        setComments(commentsData || [])
      }

      // Load related articles
      if (art.category) {
        const { data: relatedData } = await supabase
          .from('articles')
          .select('title, slug, category, reading_time, published_at')
          .eq('status', 'published')
          .eq('category', art.category)
          .neq('slug', slug)
          .limit(3)
        setRelated(relatedData || [])
      }

      setLoading(false)
    }
    load()
  }, [slug])

  async function submitComment(e: React.FormEvent) {
    e.preventDefault()
    if (!commentName.trim() || !commentText.trim()) return
    setSubmitting(true)

    const supabase = createClient()
    await supabase.from('comments').insert({
      article_id: article.id,
      name: commentName,
      email: commentEmail,
      text: commentText,
      approved: false,
    })

    setSubmitting(false)
    setSubmitted(true)
    setCommentName('')
    setCommentEmail('')
    setCommentText('')
  }

  function copyLink() {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  function getCitation(format: string) {
    if (!article) return ''
    const author = article.profiles?.name || 'Ayiti Data Team'
    const year = new Date(article.published_at).getFullYear()
    const url = window.location.href
    const date = new Date(article.published_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })

    if (format === 'apa') return `${author}. (${year}). ${article.title}. Ayiti Data. ${url}`
    if (format === 'chicago') return `${author}. "${article.title}." Ayiti Data, ${date}. ${url}`
    return `${author}, "${article.title}", Ayiti Data, ${date}, ${url}`
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-700 rounded-full animate-spin" />
      </div>
    )
  }

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

  const cat = categoryColors[article.category] || categoryColors.Other

  return (
    <div className="min-h-screen bg-white">

      {/* BREADCRUMB */}
      <div className="border-b border-gray-100 px-4 py-3">
        <div className="max-w-4xl mx-auto flex items-center gap-2 text-xs" style={{ color: 'var(--muted)' }}>
          <Link href="/" className="hover:underline">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/insights" className="hover:underline">Insights</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="truncate max-w-xs" style={{ color: 'var(--text)' }}>{article.title}</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* MAIN CONTENT */}
          <div className="lg:col-span-2">

            {/* BACK */}
            <Link href="/insights"
              className="inline-flex items-center gap-1.5 text-sm font-semibold mb-6 hover:underline"
              style={{ color: 'var(--blue)' }}>
              <ArrowLeft className="w-4 h-4" /> All Insights
            </Link>

            {/* CATEGORY */}
            {article.category && (
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4"
                style={{ background: cat.bg, color: cat.color }}>
                {article.category}
              </span>
            )}

            {/* TITLE */}
            <h1 className="font-sora text-3xl font-bold leading-tight mb-4"
              style={{ color: 'var(--navy)' }}>
              {article.title}
            </h1>

            {/* SUMMARY */}
            {article.summary && (
              <p className="text-lg leading-relaxed mb-6" style={{ color: 'var(--muted)' }}>
                {article.summary}
              </p>
            )}

            {/* META */}
            <div className="flex flex-wrap items-center gap-4 text-xs pb-6 border-b border-gray-100 mb-8"
              style={{ color: 'var(--muted)' }}>
              {article.profiles?.name && (
                <span className="flex items-center gap-1.5">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold"
                    style={{ background: 'var(--navy)' }}>
                    {article.profiles.name.charAt(0)}
                  </div>
                  {article.profiles.name}
                </span>
              )}
              {article.published_at && (
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {new Date(article.published_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </span>
              )}
              {article.reading_time && (
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> {article.reading_time} min read
                </span>
              )}
              <span className="flex items-center gap-1">
                <Eye className="w-3.5 h-3.5" /> {(article.view_count || 0).toLocaleString()} views
              </span>
            </div>

            {/* ARTICLE CONTENT */}
            <div
              className="article-content"
              dangerouslySetInnerHTML={{ __html: article.content || '' }}
            />

            <style>{`
              .article-content h1 { font-size: 2rem; font-weight: 800; margin: 2rem 0 1rem; color: #0D2B52; font-family: 'Sora', sans-serif; }
              .article-content h2 { font-size: 1.5rem; font-weight: 700; margin: 1.75rem 0 0.75rem; color: #0D2B52; font-family: 'Sora', sans-serif; }
              .article-content h3 { font-size: 1.2rem; font-weight: 600; margin: 1.5rem 0 0.5rem; color: #0D2B52; }
              .article-content p { margin: 0.875rem 0; line-height: 1.8; font-size: 16px; color: #1C2A3A; }
              .article-content ul, .article-content ol { padding-left: 1.5rem; margin: 1rem 0; }
              .article-content li { margin: 0.4rem 0; line-height: 1.7; color: #1C2A3A; }
              .article-content blockquote { border-left: 3px solid #1A56A0; padding: 0.5rem 1rem; margin: 1.5rem 0; color: #6B7A90; font-style: italic; background: #F4F7FB; border-radius: 0 8px 8px 0; }
              .article-content hr { border: none; border-top: 1px solid #DDE3ED; margin: 2rem 0; }
              .article-content strong { font-weight: 700; color: #1C2A3A; }
              .article-content a { color: #1A56A0; text-decoration: underline; }
              .article-content mark { background: #FFF8C5; padding: 0 2px; border-radius: 2px; }
              .article-content img { width: 100%; border-radius: 12px; margin: 1.5rem 0; }
            `}</style>

            {/* SHARE + CITE */}
            <div className="mt-10 pt-8 border-t border-gray-100">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-sm font-semibold" style={{ color: 'var(--navy)' }}>Share:</span>
                <a href={'https://twitter.com/intent/tweet?text=' + encodeURIComponent(article.title) + '&url=' + encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}
                  target="_blank" rel="noopener noreferrer"
                  className="p-2 rounded-lg border hover:bg-gray-50 transition-colors"
                  style={{ color: 'var(--muted)', borderColor: 'var(--border)' }}>
                  <FaXTwitter className="w-4 h-4" />
                </a>
                <a href={'https://www.linkedin.com/sharing/share-offsite/?url=' + encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}
                  target="_blank" rel="noopener noreferrer"
                  className="p-2 rounded-lg border hover:bg-gray-50 transition-colors"
                  style={{ color: 'var(--muted)', borderColor: 'var(--border)' }}>
                  <FaLinkedin className="w-4 h-4" />
                </a>
                <a href={'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}
                  target="_blank" rel="noopener noreferrer"
                  className="p-2 rounded-lg border hover:bg-gray-50 transition-colors"
                  style={{ color: 'var(--muted)', borderColor: 'var(--border)' }}>
                  <FaFacebook className="w-4 h-4" />
                </a>
                <button onClick={copyLink}
                  className="p-2 rounded-lg border hover:bg-gray-50 transition-colors"
                  style={{ color: copied ? '#1E8A4C' : 'var(--muted)', borderColor: 'var(--border)' }}>
                  <Link2 className="w-4 h-4" />
                </button>
                {copied && <span className="text-xs font-semibold" style={{ color: '#1E8A4C' }}>Link copied!</span>}

                <button onClick={() => setShowCite(!showCite)}
                  className="ml-auto px-4 py-2 rounded-xl text-xs font-semibold border hover:bg-gray-50 transition-colors"
                  style={{ color: 'var(--navy)', borderColor: 'var(--border)' }}>
                  Cite this article
                </button>
              </div>

              {/* CITATION BOX */}
              {showCite && (
                <div className="mt-4 p-5 rounded-xl border border-gray-100" style={{ background: 'var(--light)' }}>
                  <h4 className="text-sm font-bold mb-3" style={{ color: 'var(--navy)' }}>Citation</h4>
                  {['apa', 'chicago', 'mla'].map(fmt => (
                    <div key={fmt} className="mb-3">
                      <span className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--muted)' }}>{fmt}</span>
                      <p className="text-xs mt-1 leading-relaxed p-2 bg-white rounded-lg border border-gray-100" style={{ color: 'var(--text)' }}>
                        {getCitation(fmt)}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* COMMENTS */}
            <div className="mt-10 pt-8 border-t border-gray-100">
              <h3 className="font-sora font-bold text-xl mb-6 flex items-center gap-2" style={{ color: 'var(--navy)' }}>
                <MessageSquare className="w-5 h-5" />
                Comments {comments.length > 0 && `(${comments.length})`}
              </h3>

              {/* COMMENT LIST */}
              {comments.length > 0 && (
                <div className="flex flex-col gap-4 mb-8">
                  {comments.map(comment => (
                    <div key={comment.id} className="p-4 rounded-xl border border-gray-100" style={{ background: 'var(--light)' }}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
                            style={{ background: 'var(--navy)' }}>
                            {comment.name?.charAt(0)?.toUpperCase()}
                          </div>
                          <span className="text-sm font-semibold" style={{ color: 'var(--navy)' }}>{comment.name}</span>
                        </div>
                        <span className="text-xs" style={{ color: 'var(--muted)' }}>
                          {new Date(comment.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                      </div>
                      <p className="text-sm leading-relaxed" style={{ color: 'var(--text)' }}>{comment.text}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* COMMENT FORM */}
              {submitted ? (
                <div className="p-5 rounded-xl text-center border border-green-100" style={{ background: '#E6F5ED' }}>
                  <p className="text-sm font-semibold" style={{ color: '#1E8A4C' }}>
                    ✓ Thank you! Your comment is pending review and will appear shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={submitComment} className="flex flex-col gap-3">
                  <h4 className="text-sm font-bold" style={{ color: 'var(--navy)' }}>Leave a comment</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <input type="text" value={commentName} onChange={e => setCommentName(e.target.value)}
                      placeholder="Your name *" required
                      className="px-3 py-2 text-sm border border-gray-200 rounded-xl outline-none focus:border-blue-400" />
                    <input type="email" value={commentEmail} onChange={e => setCommentEmail(e.target.value)}
                      placeholder="Email (optional, not shown)"
                      className="px-3 py-2 text-sm border border-gray-200 rounded-xl outline-none focus:border-blue-400" />
                  </div>
                  <textarea value={commentText} onChange={e => setCommentText(e.target.value)}
                    placeholder="Share your thoughts or questions..." required rows={4}
                    className="px-3 py-2 text-sm border border-gray-200 rounded-xl outline-none focus:border-blue-400 resize-none" />
                  <button type="submit" disabled={submitting}
                    className="self-start inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white disabled:opacity-60"
                    style={{ background: 'var(--navy)' }}>
                    {submitting
                      ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      : <Send className="w-4 h-4" />}
                    Post Comment
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* SIDEBAR */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 flex flex-col gap-6">

              {/* RELATED ARTICLES */}
              {related.length > 0 && (
                <div className="bg-white rounded-2xl border border-gray-100 p-5">
                  <h4 className="font-sora font-bold text-sm mb-4" style={{ color: 'var(--navy)' }}>
                    Related Insights
                  </h4>
                  <div className="flex flex-col gap-3">
                    {related.map(r => (
                      <Link key={r.slug} href={`/insights/${r.slug}`}
                        className="group flex flex-col gap-1 pb-3 border-b border-gray-100 last:border-0 last:pb-0">
                        <span className="text-sm font-semibold leading-snug group-hover:underline"
                          style={{ color: 'var(--navy)' }}>{r.title}</span>
                        {r.reading_time && (
                          <span className="text-xs flex items-center gap-1" style={{ color: 'var(--muted)' }}>
                            <Clock className="w-3 h-3" /> {r.reading_time} min read
                          </span>
                        )}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* EXPLORE DATA */}
              <div className="rounded-2xl p-5" style={{ background: 'var(--light)' }}>
                <h4 className="font-sora font-bold text-sm mb-2" style={{ color: 'var(--navy)' }}>
                  Explore the Data
                </h4>
                <p className="text-xs mb-4" style={{ color: 'var(--muted)' }}>
                  Download the datasets behind this analysis.
                </p>
                <Link href="/datasets"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white w-full justify-center"
                  style={{ background: 'var(--navy)' }}>
                  View Datasets <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

              {/* NEWSLETTER */}
              <div className="rounded-2xl p-5 border border-gray-100 bg-white">
                <h4 className="font-sora font-bold text-sm mb-2" style={{ color: 'var(--navy)' }}>
                  📬 Stay Updated
                </h4>
                <p className="text-xs mb-3" style={{ color: 'var(--muted)' }}>
                  Get new insights delivered to your inbox.
                </p>
                <form onSubmit={e => e.preventDefault()} className="flex flex-col gap-2">
                  <input type="email" placeholder="your@email.com"
                    className="px-3 py-2 text-xs border border-gray-200 rounded-xl outline-none focus:border-blue-400" />
                  <button type="submit"
                    className="py-2 rounded-xl text-xs font-semibold text-white"
                    style={{ background: 'var(--blue)' }}>
                    Subscribe
                  </button>
                </form>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}