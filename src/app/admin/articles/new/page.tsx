'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import CharacterCount from '@tiptap/extension-character-count'
import TextAlign from '@tiptap/extension-text-align'
import Underline from '@tiptap/extension-underline'
import Highlight from '@tiptap/extension-highlight'
import Link from '@tiptap/extension-link'
import {
  Bold, Italic, UnderlineIcon, Strikethrough,
  AlignLeft, AlignCenter, AlignRight,
  List, ListOrdered, Quote, Minus,
  Heading1, Heading2, Heading3,
  Highlighter, LinkIcon, Undo, Redo,
  Eye, EyeOff, Save, Send, ChevronLeft,
  Smartphone, Monitor,
} from 'lucide-react'

const CATEGORIES = [
  'Education', 'Economy', 'Health', 'Population',
  'Agriculture', 'Environment', 'Politics', 'Other'
]

const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'fr', label: 'Français' },
  { code: 'ht', label: 'Kreyòl' },
  { code: 'es', label: 'Español' },
]

function slugify(text: string) {
  return text.toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

function estimateReadingTime(content: string) {
  const words = content.replace(/<[^>]*>/g, '').trim().split(/\s+/).length
  return Math.max(1, Math.ceil(words / 200))
}

export default function NewArticlePage() {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [summary, setSummary] = useState('')
  const [category, setCategory] = useState('')
  const [language, setLanguage] = useState('en')
  const [slug, setSlug] = useState('')
  const [coverImage, setCoverImage] = useState('')
  const [relatedDatasetId, setRelatedDatasetId] = useState('')
  const [saving, setSaving] = useState(false)
  const [publishing, setPublishing] = useState(false)
  const [preview, setPreview] = useState(false)
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'mobile'>('desktop')
  const [user, setUser] = useState<any>(null)
  const [wordCount, setWordCount] = useState(0)

  useEffect(() => {
    async function getUser() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/login'); return }
      setUser(user)
    }
    getUser()
  }, [router])

  // Auto-generate slug from title
  useEffect(() => {
    if (title) setSlug(slugify(title))
  }, [title])

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Highlight,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Link.configure({ openOnClick: false }),
      Placeholder.configure({ placeholder: 'Start writing your article here...' }),
      CharacterCount,
    ],
    content: '',
    onUpdate: ({ editor }) => {
      const text = editor.getText()
      setWordCount(text.trim().split(/\s+/).filter(Boolean).length)
    },
    editorProps: {
      attributes: {
        class: 'prose prose-lg max-w-none focus:outline-none min-h-96 px-8 py-6',
      },
    },
  })

  async function saveArticle(status: 'draft' | 'published') {
    if (!title.trim()) { alert('Please add a title.'); return }
    if (!editor) return

    const setter = status === 'published' ? setPublishing : setSaving
    setter(true)

    const supabase = createClient()
    const content = editor.getHTML()
    const readingTime = estimateReadingTime(content)

    const { error } = await supabase.from('articles').insert({
      title,
      summary,
      content,
      category,
      language,
      slug: slug || slugify(title),
      cover_image_url: coverImage,
     status,
      reading_time: readingTime,
      author_id: user?.id,
      published_at: status === 'published' ? new Date().toISOString() : null,
      related_dataset_id: relatedDatasetId || null,
    })
    setter(false)

    if (error) {
      alert('Error saving: ' + error.message)
    } else {
      router.push('/admin/articles')
    }
  }

  const ToolbarButton = ({ onClick, active, children, title }: any) => (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`p-1.5 rounded-lg transition-colors ${active
        ? 'bg-blue-100 text-blue-700'
        : 'text-gray-600 hover:bg-gray-100'
        }`}
    >
      {children}
    </button>
  )

  if (!editor) return null

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--light)' }}>

      {/* ── TOP BAR ── */}
      <div className="bg-white border-b border-gray-100 px-6 py-3 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push('/admin/articles')}
            className="flex items-center gap-1 text-sm hover:underline"
            style={{ color: 'var(--muted)' }}
          >
            <ChevronLeft className="w-4 h-4" /> Articles
          </button>
          <span className="text-gray-200">|</span>
          <span className="text-sm font-medium" style={{ color: 'var(--muted)' }}>
            {wordCount} words · {estimateReadingTime(editor.getHTML())} min read
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* PREVIEW TOGGLE */}
          <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={() => { setPreview(!preview); setPreviewDevice('desktop') }}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold transition-colors ${preview && previewDevice === 'desktop' ? 'bg-gray-100 text-gray-900' : 'text-gray-500 hover:bg-gray-50'}`}
            >
              <Monitor className="w-3.5 h-3.5" /> Desktop
            </button>
            <button
              onClick={() => { setPreview(true); setPreviewDevice('mobile') }}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold transition-colors ${preview && previewDevice === 'mobile' ? 'bg-gray-100 text-gray-900' : 'text-gray-500 hover:bg-gray-50'}`}
            >
              <Smartphone className="w-3.5 h-3.5" /> Mobile
            </button>
            {preview && (
              <button
                onClick={() => setPreview(false)}
                className="px-3 py-1.5 text-xs font-semibold text-gray-500 hover:bg-gray-50 transition-colors"
              >
                <EyeOff className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <button
            onClick={() => saveArticle('draft')}
            disabled={saving}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold border border-gray-200 bg-white transition-colors hover:bg-gray-50 disabled:opacity-60"
            style={{ color: 'var(--navy)' }}
          >
            {saving
              ? <div className="w-3.5 h-3.5 border-2 border-gray-300 border-t-gray-700 rounded-full animate-spin" />
              : <Save className="w-3.5 h-3.5" />}
            Save Draft
          </button>

          <button
            onClick={() => saveArticle('published')}
            disabled={publishing}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
            style={{ background: 'var(--navy)' }}
          >
            {publishing
              ? <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              : <Send className="w-3.5 h-3.5" />}
            Publish
          </button>
        </div>
      </div>

      <div className="flex flex-1">

        {/* ── EDITOR AREA ── */}
        <div className={`flex-1 flex flex-col ${preview ? 'hidden' : ''}`}>

          {/* ARTICLE META */}
          <div className="bg-white border-b border-gray-100 px-8 py-6">
            <div className="max-w-3xl mx-auto">

              {/* TITLE */}
              <textarea
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Article title..."
                rows={2}
                className="w-full text-3xl font-bold font-sora resize-none outline-none border-none bg-transparent placeholder:text-gray-300 mb-4 leading-tight"
                style={{ color: 'var(--navy)' }}
              />

              {/* SUMMARY */}
              <textarea
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                placeholder="Brief summary (shown in article cards and search results)..."
                rows={2}
                className="w-full text-base resize-none outline-none border-none bg-transparent placeholder:text-gray-300 leading-relaxed"
                style={{ color: 'var(--muted)' }}
              />

              {/* META FIELDS */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-5 pt-5 border-t border-gray-100">
                <div>
                  <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--muted)' }}>
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-blue-400"
                  >
                    <option value="">Select...</option>
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--muted)' }}>
                    Language
                  </label>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-blue-400"
                  >
                    {LANGUAGES.map(l => <option key={l.code} value={l.code}>{l.label}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--muted)' }}>
                    URL Slug
                  </label>
                  <input
                    type="text"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-blue-400"
                    placeholder="auto-generated"
                  />
                </div>
               <div>
                  <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--muted)' }}>
                    Cover Image URL
                  </label>
                  <input
                    type="text"
                    value={coverImage}
                    onChange={(e) => setCoverImage(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-blue-400"
                    placeholder="https://..."
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--muted)' }}>
                    Related Dataset ID
                  </label>
                  <input
                    type="text"
                    value={relatedDatasetId}
                    onChange={(e) => setRelatedDatasetId(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-blue-400"
                    placeholder="Paste dataset UUID from admin"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* TOOLBAR */}
          <div className="bg-white border-b border-gray-100 px-8 py-2 flex items-center gap-1 flex-wrap sticky top-16 z-40">
            <ToolbarButton onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive('bold')} title="Bold">
              <Bold className="w-4 h-4" />
            </ToolbarButton>
            <ToolbarButton onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive('italic')} title="Italic">
              <Italic className="w-4 h-4" />
            </ToolbarButton>
            <ToolbarButton onClick={() => editor.chain().focus().toggleUnderline().run()} active={editor.isActive('underline')} title="Underline">
              <UnderlineIcon className="w-4 h-4" />
            </ToolbarButton>
            <ToolbarButton onClick={() => editor.chain().focus().toggleStrike().run()} active={editor.isActive('strike')} title="Strikethrough">
              <Strikethrough className="w-4 h-4" />
            </ToolbarButton>
            <ToolbarButton onClick={() => editor.chain().focus().toggleHighlight().run()} active={editor.isActive('highlight')} title="Highlight">
              <Highlighter className="w-4 h-4" />
            </ToolbarButton>

            <div className="w-px h-5 bg-gray-200 mx-1" />

            <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} active={editor.isActive('heading', { level: 1 })} title="Heading 1">
              <Heading1 className="w-4 h-4" />
            </ToolbarButton>
            <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive('heading', { level: 2 })} title="Heading 2">
              <Heading2 className="w-4 h-4" />
            </ToolbarButton>
            <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive('heading', { level: 3 })} title="Heading 3">
              <Heading3 className="w-4 h-4" />
            </ToolbarButton>

            <div className="w-px h-5 bg-gray-200 mx-1" />

            <ToolbarButton onClick={() => editor.chain().focus().setTextAlign('left').run()} active={editor.isActive({ textAlign: 'left' })} title="Align Left">
              <AlignLeft className="w-4 h-4" />
            </ToolbarButton>
            <ToolbarButton onClick={() => editor.chain().focus().setTextAlign('center').run()} active={editor.isActive({ textAlign: 'center' })} title="Align Center">
              <AlignCenter className="w-4 h-4" />
            </ToolbarButton>
            <ToolbarButton onClick={() => editor.chain().focus().setTextAlign('right').run()} active={editor.isActive({ textAlign: 'right' })} title="Align Right">
              <AlignRight className="w-4 h-4" />
            </ToolbarButton>

            <div className="w-px h-5 bg-gray-200 mx-1" />

            <ToolbarButton onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive('bulletList')} title="Bullet List">
              <List className="w-4 h-4" />
            </ToolbarButton>
            <ToolbarButton onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive('orderedList')} title="Numbered List">
              <ListOrdered className="w-4 h-4" />
            </ToolbarButton>
            <ToolbarButton onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive('blockquote')} title="Quote">
              <Quote className="w-4 h-4" />
            </ToolbarButton>
            <ToolbarButton onClick={() => editor.chain().focus().setHorizontalRule().run()} active={false} title="Divider">
              <Minus className="w-4 h-4" />
            </ToolbarButton>

            <div className="w-px h-5 bg-gray-200 mx-1" />

            <ToolbarButton onClick={() => editor.chain().focus().undo().run()} active={false} title="Undo">
              <Undo className="w-4 h-4" />
            </ToolbarButton>
            <ToolbarButton onClick={() => editor.chain().focus().redo().run()} active={false} title="Redo">
              <Redo className="w-4 h-4" />
            </ToolbarButton>
          </div>

          {/* EDITOR */}
          <div className="flex-1 bg-white">
            <div className="max-w-3xl mx-auto">
              <style>{`
                .ProseMirror p.is-editor-empty:first-child::before {
                  content: attr(data-placeholder);
                  float: left;
                  color: #9CA3AF;
                  pointer-events: none;
                  height: 0;
                }
                .ProseMirror {
                  min-height: 500px;
                }
                .ProseMirror h1 { font-size: 2rem; font-weight: 800; margin: 1.5rem 0 0.75rem; color: #0D2B52; }
                .ProseMirror h2 { font-size: 1.5rem; font-weight: 700; margin: 1.25rem 0 0.5rem; color: #0D2B52; }
                .ProseMirror h3 { font-size: 1.25rem; font-weight: 600; margin: 1rem 0 0.5rem; color: #0D2B52; }
                .ProseMirror p { margin: 0.75rem 0; line-height: 1.75; }
                .ProseMirror ul, .ProseMirror ol { padding-left: 1.5rem; margin: 0.75rem 0; }
                .ProseMirror li { margin: 0.25rem 0; }
                .ProseMirror blockquote { border-left: 3px solid #1A56A0; padding-left: 1rem; margin: 1rem 0; color: #6B7A90; font-style: italic; }
                .ProseMirror hr { border: none; border-top: 1px solid #DDE3ED; margin: 1.5rem 0; }
                .ProseMirror mark { background: #FFF8C5; padding: 0 2px; border-radius: 2px; }
                .ProseMirror strong { font-weight: 700; color: #1C2A3A; }
                .ProseMirror a { color: #1A56A0; text-decoration: underline; }
              `}</style>
              <EditorContent editor={editor} />
            </div>
          </div>
        </div>

        {/* ── PREVIEW AREA ── */}
        {preview && (
          <div className="flex-1 flex items-start justify-center p-8 overflow-auto">
            <div
              className={`bg-white shadow-2xl rounded-2xl overflow-hidden transition-all ${previewDevice === 'mobile' ? 'w-96' : 'w-full max-w-4xl'
                }`}
            >
              {/* Preview header */}
              {previewDevice === 'mobile' && (
                <div className="bg-gray-900 px-4 py-2 flex items-center justify-center">
                  <div className="w-20 h-1.5 bg-gray-600 rounded-full" />
                </div>
              )}
              <div className="p-8">
                {category && (
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4"
                    style={{ background: '#E8F0FC', color: '#1A56A0' }}>
                    {category}
                  </span>
                )}
                <h1 className="font-sora text-2xl font-bold mb-3 leading-tight"
                  style={{ color: 'var(--navy)' }}>
                  {title || 'Your article title will appear here'}
                </h1>
                {summary && (
                  <p className="text-base mb-6 leading-relaxed" style={{ color: 'var(--muted)' }}>
                    {summary}
                  </p>
                )}
                <div className="flex items-center gap-3 text-xs pb-6 border-b border-gray-100 mb-6"
                  style={{ color: 'var(--muted)' }}>
                  <span>{estimateReadingTime(editor.getHTML())} min read</span>
                  <span>·</span>
                  <span>{wordCount} words</span>
                  <span>·</span>
                  <span>{new Date().toLocaleDateString()}</span>
                </div>
                <div
                  className="prose prose-lg max-w-none"
                  style={{ fontSize: previewDevice === 'mobile' ? '15px' : '16px' }}
                  dangerouslySetInnerHTML={{ __html: editor.getHTML() }}
                />
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}