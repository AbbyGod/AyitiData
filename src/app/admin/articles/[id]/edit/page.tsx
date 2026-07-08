'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import TextAlign from '@tiptap/extension-text-align'
import Underline from '@tiptap/extension-underline'
import Highlight from '@tiptap/extension-highlight'
import Link from '@tiptap/extension-link'
import {
  Bold, Italic, UnderlineIcon, Strikethrough,
  AlignLeft, AlignCenter, AlignRight,
  List, ListOrdered, Quote, Minus,
  Heading1, Heading2, Heading3,
  Highlighter, Undo, Redo,
  Eye, EyeOff, Save, Send, ChevronLeft,
  Smartphone, Monitor, Trash2,
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

export default function EditArticlePage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string

  const [title, setTitle] = useState('')
  const [summary, setSummary] = useState('')
  const [category, setCategory] = useState('')
  const [language, setLanguage] = useState('en')
  const [slug, setSlug] = useState('')
  const [coverImage, setCoverImage] = useState('')
  const [status, setStatus] = useState('draft')
  const [saving, setSaving] = useState(false)
  const [publishing, setPublishing] = useState(false)
  const [preview, setPreview] = useState(false)
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'mobile'>('desktop')
  const [wordCount, setWordCount] = useState(0)
  const [loading, setLoading] = useState(true)

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Highlight,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Link.configure({ openOnClick: false }),
      Placeholder.configure({ placeholder: 'Start writing your article here...' }),
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

  useEffect(() => {
    async function loadArticle() {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('id', id)
        .single()

      if (error || !data) {
        router.push('/admin/articles')
        return
      }

      setTitle(data.title || '')
      setSummary(data.summary || '')
      setCategory(data.category || '')
      setLanguage(data.language || 'en')
      setSlug(data.slug || '')
      setCoverImage(data.cover_image_url || '')
      setStatus(data.status || 'draft')

      if (editor && data.content) {
        editor.commands.setContent(data.content)
        const words = data.content.replace(/<[^>]*>/g, '').trim().split(/\s+/).filter(Boolean).length
        setWordCount(words)
      }

      setLoading(false)
    }

    if (editor) loadArticle()
  }, [editor, id, router])

  async function updateArticle(newStatus?: string) {
    if (!title.trim()) { alert('Please add a title.'); return }
    if (!editor) return

    const finalStatus = newStatus || status
    const setter = finalStatus === 'published' ? setPublishing : setSaving
    setter(true)

    const supabase = createClient()
    const content = editor.getHTML()

    const { error } = await supabase
      .from('articles')
      .update({
        title,
        summary,
        content,
        category,
        language,
        slug: slug || slugify(title),
        cover_image_url: coverImage,
        status: finalStatus,
        reading_time: estimateReadingTime(content),
        updated_at: new Date().toISOString(),
        published_at: finalStatus === 'published' ? new Date().toISOString() : null,
      })
      .eq('id', id)

    setter(false)

    if (error) {
      alert('Error saving: ' + error.message)
    } else {
      if (newStatus) router.push('/admin/articles')
    }
  }

  async function deleteArticle() {
    if (!confirm('Are you sure you want to delete this article? This cannot be undone.')) return
    const supabase = createClient()
    await supabase.from('articles').delete().eq('id', id)
    router.push('/admin/articles')
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

  if (loading || !editor) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-700 rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--light)' }}>

      {/* TOP BAR */}
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
          <span className="text-sm px-2.5 py-0.5 rounded-full capitalize font-semibold"
            style={{
              background: status === 'published' ? '#E6F5ED' : '#FFF8E1',
              color: status === 'published' ? '#1E8A4C' : '#E8A020'
            }}>
            {status}
          </span>
          <span className="text-sm" style={{ color: 'var(--muted)' }}>
            {wordCount} words · {estimateReadingTime(editor.getHTML())} min read
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* PREVIEW */}
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
                className="px-3 py-1.5 text-xs font-semibold text-gray-500 hover:bg-gray-50"
              >
                <EyeOff className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <button
            onClick={deleteArticle}
            className="p-2 rounded-xl border border-gray-200 hover:bg-red-50 transition-colors"
            style={{ color: '#C0392B' }}
            title="Delete article"
          >
            <Trash2 className="w-4 h-4" />
          </button>

          <button
            onClick={() => updateArticle()}
            disabled={saving}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold border border-gray-200 bg-white hover:bg-gray-50 disabled:opacity-60"
            style={{ color: 'var(--navy)' }}
          >
            {saving
              ? <div className="w-3.5 h-3.5 border-2 border-gray-300 border-t-gray-700 rounded-full animate-spin" />
              : <Save className="w-3.5 h-3.5" />}
            Save
          </button>

          <button
            onClick={() => updateArticle('published')}
            disabled={publishing}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-white hover:opacity-90 disabled:opacity-60"
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

        {/* EDITOR */}
        <div className={`flex-1 flex flex-col ${preview ? 'hidden' : ''}`}>

          {/* META */}
          <div className="bg-white border-b border-gray-100 px-8 py-6">
            <div className="max-w-3xl mx-auto">
              <textarea
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Article title..."
                rows={2}
                className="w-full text-3xl font-bold font-sora resize-none outline-none border-none bg-transparent placeholder:text-gray-300 mb-4 leading-tight"
                style={{ color: 'var(--navy)' }}
              />
              <textarea
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                placeholder="Brief summary..."
                rows={2}
                className="w-full text-base resize-none outline-none border-none bg-transparent placeholder:text-gray-300 leading-relaxed"
                style={{ color: 'var(--muted)' }}
              />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-5 pt-5 border-t border-gray-100">
                <div>
                  <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--muted)' }}>Category</label>
                  <select value={category} onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-blue-400">
                    <option value="">Select...</option>
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--muted)' }}>Language</label>
                  <select value={language} onChange={(e) => setLanguage(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-blue-400">
                    {LANGUAGES.map(l => <option key={l.code} value={l.code}>{l.label}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--muted)' }}>URL Slug</label>
                  <input type="text" value={slug} onChange={(e) => setSlug(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-blue-400"
                    placeholder="auto-generated" />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--muted)' }}>Cover Image URL</label>
                  <input type="text" value={coverImage} onChange={(e) => setCoverImage(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-blue-400"
                    placeholder="https://..." />
                </div>
              </div>
            </div>
          </div>

          {/* TOOLBAR */}
          <div className="bg-white border-b border-gray-100 px-8 py-2 flex items-center gap-1 flex-wrap sticky top-16 z-40">
            <ToolbarButton onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive('bold')} title="Bold"><Bold className="w-4 h-4" /></ToolbarButton>
            <ToolbarButton onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive('italic')} title="Italic"><Italic className="w-4 h-4" /></ToolbarButton>
            <ToolbarButton onClick={() => editor.chain().focus().toggleUnderline().run()} active={editor.isActive('underline')} title="Underline"><UnderlineIcon className="w-4 h-4" /></ToolbarButton>
            <ToolbarButton onClick={() => editor.chain().focus().toggleStrike().run()} active={editor.isActive('strike')} title="Strike"><Strikethrough className="w-4 h-4" /></ToolbarButton>
            <ToolbarButton onClick={() => editor.chain().focus().toggleHighlight().run()} active={editor.isActive('highlight')} title="Highlight"><Highlighter className="w-4 h-4" /></ToolbarButton>
            <div className="w-px h-5 bg-gray-200 mx-1" />
            <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} active={editor.isActive('heading', { level: 1 })} title="H1"><Heading1 className="w-4 h-4" /></ToolbarButton>
            <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive('heading', { level: 2 })} title="H2"><Heading2 className="w-4 h-4" /></ToolbarButton>
            <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive('heading', { level: 3 })} title="H3"><Heading3 className="w-4 h-4" /></ToolbarButton>
            <div className="w-px h-5 bg-gray-200 mx-1" />
            <ToolbarButton onClick={() => editor.chain().focus().setTextAlign('left').run()} active={editor.isActive({ textAlign: 'left' })} title="Left"><AlignLeft className="w-4 h-4" /></ToolbarButton>
            <ToolbarButton onClick={() => editor.chain().focus().setTextAlign('center').run()} active={editor.isActive({ textAlign: 'center' })} title="Center"><AlignCenter className="w-4 h-4" /></ToolbarButton>
            <ToolbarButton onClick={() => editor.chain().focus().setTextAlign('right').run()} active={editor.isActive({ textAlign: 'right' })} title="Right"><AlignRight className="w-4 h-4" /></ToolbarButton>
            <div className="w-px h-5 bg-gray-200 mx-1" />
            <ToolbarButton onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive('bulletList')} title="Bullets"><List className="w-4 h-4" /></ToolbarButton>
            <ToolbarButton onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive('orderedList')} title="Numbered"><ListOrdered className="w-4 h-4" /></ToolbarButton>
            <ToolbarButton onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive('blockquote')} title="Quote"><Quote className="w-4 h-4" /></ToolbarButton>
            <ToolbarButton onClick={() => editor.chain().focus().setHorizontalRule().run()} active={false} title="Divider"><Minus className="w-4 h-4" /></ToolbarButton>
            <div className="w-px h-5 bg-gray-200 mx-1" />
            <ToolbarButton onClick={() => editor.chain().focus().undo().run()} active={false} title="Undo"><Undo className="w-4 h-4" /></ToolbarButton>
            <ToolbarButton onClick={() => editor.chain().focus().redo().run()} active={false} title="Redo"><Redo className="w-4 h-4" /></ToolbarButton>
          </div>

          {/* EDITOR CONTENT */}
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
                .ProseMirror { min-height: 500px; }
                .ProseMirror h1 { font-size: 2rem; font-weight: 800; margin: 1.5rem 0 0.75rem; color: #0D2B52; }
                .ProseMirror h2 { font-size: 1.5rem; font-weight: 700; margin: 1.25rem 0 0.5rem; color: #0D2B52; }
                .ProseMirror h3 { font-size: 1.25rem; font-weight: 600; margin: 1rem 0 0.5rem; color: #0D2B52; }
                .ProseMirror p { margin: 0.75rem 0; line-height: 1.75; }
                .ProseMirror ul, .ProseMirror ol { padding-left: 1.5rem; margin: 0.75rem 0; }
                .ProseMirror li { margin: 0.25rem 0; }
                .ProseMirror blockquote { border-left: 3px solid #1A56A0; padding-left: 1rem; margin: 1rem 0; color: #6B7A90; font-style: italic; }
                .ProseMirror hr { border: none; border-top: 1px solid #DDE3ED; margin: 1.5rem 0; }
                .ProseMirror mark { background: #FFF8C5; padding: 0 2px; border-radius: 2px; }
                .ProseMirror strong { font-weight: 700; }
                .ProseMirror a { color: #1A56A0; text-decoration: underline; }
              `}</style>
              <EditorContent editor={editor} />
            </div>
          </div>
        </div>

        {/* PREVIEW */}
        {preview && (
          <div className="flex-1 flex items-start justify-center p-8 overflow-auto">
            <div className={`bg-white shadow-2xl rounded-2xl overflow-hidden transition-all ${previewDevice === 'mobile' ? 'w-96' : 'w-full max-w-4xl'}`}>
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
                <h1 className="font-sora text-2xl font-bold mb-3 leading-tight" style={{ color: 'var(--navy)' }}>
                  {title || 'Your article title'}
                </h1>
                {summary && (
                  <p className="text-base mb-6 leading-relaxed" style={{ color: 'var(--muted)' }}>{summary}</p>
                )}
                <div className="flex items-center gap-3 text-xs pb-6 border-b border-gray-100 mb-6" style={{ color: 'var(--muted)' }}>
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