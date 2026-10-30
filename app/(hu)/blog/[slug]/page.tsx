import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { POSTS, postBySlug, type BlogBlock } from "@/lib/blog"
import { serviceBySlug } from "@/lib/services"
import { absoluteUrl } from "@/lib/site"
import { breadcrumbs, businessId } from "@/lib/structured-data"
import JsonLd from "@/components/JsonLd"
import { SiteHeader, SiteFooter } from "@/components/SiteChrome"

export const dynamicParams = false

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = postBySlug(slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: { type: "article", title: post.title, description: post.description, url: `/blog/${post.slug}`, images: [post.image], publishedTime: post.published },
  }
}

const serif = { fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 500 } as const

const Block = ({ block }: { block: BlogBlock }) => {
  if (block.type === "h2") return <h2 className="text-3xl text-[#2c2c2c] mt-12 mb-4" style={serif}>{block.text}</h2>
  if (block.type === "ul") return <ul className="list-disc pl-6 space-y-2 marker:text-[#C9A84C]">{block.items.map((i) => <li key={i}>{i}</li>)}</ul>
  if (block.type === "ol") return <ol className="list-decimal pl-6 space-y-2 marker:text-[#A07830]">{block.items.map((i) => <li key={i}>{i}</li>)}</ol>
  return <p>{block.text}</p>
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = postBySlug(slug)
  if (!post) notFound()
  const service = serviceBySlug(post.relatedService)
  const more = POSTS.filter((p) => p.slug !== post.slug)

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.description,
          image: post.image,
          datePublished: post.published,
          dateModified: post.updated || post.published,
          inLanguage: "hu",
          mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
          author: { "@id": businessId },
          publisher: { "@id": businessId },
        }}
      />
      <JsonLd data={breadcrumbs([{ name: "Főoldal", path: "/" }, { name: "Blog", path: "/blog" }, { name: post.title, path: `/blog/${post.slug}` }])} />
      <SiteHeader />
      <main className="bg-white" style={{ fontFamily: "var(--font-lato), system-ui, sans-serif" }}>
        <article className="max-w-3xl mx-auto px-6 py-14 md:py-20">
          <nav aria-label="Morzsamenü" className="text-xs tracking-[0.15em] uppercase text-[#8a8a8a] mb-6">
            <Link href="/" className="hover:text-[#A07830]">Főoldal</Link> › <Link href="/blog" className="hover:text-[#A07830]">Blog</Link>
          </nav>
          <h1 className="text-4xl md:text-5xl text-[#2c2c2c] leading-tight mb-5" style={serif}>{post.title}</h1>
          <p className="text-sm text-[#8a8a8a] mb-8">
            <time dateTime={post.published}>{new Date(post.published).toLocaleDateString("hu-HU", { year: "numeric", month: "long", day: "numeric" })}</time> · {post.readingMinutes} perc olvasás
          </p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={post.image} alt="" fetchPriority="high" className="w-full aspect-[16/9] object-cover mb-10" />
          <div className="space-y-5 text-[#3f3f3f] leading-relaxed text-[1.05rem]">
            {post.body.map((b, i) => <Block key={i} block={b} />)}
          </div>
          {service && (
            <aside className="mt-14 p-8 bg-[#faf7f2] border border-[#C9A84C]/25">
              <p className="text-2xl text-[#2c2c2c] mb-2" style={serif}>Segíthetünk a szervezésben?</p>
              <p className="text-sm text-[#5a5a5a] mb-5">{service.lead}</p>
              <div className="flex flex-wrap gap-3">
                <Link href={`/ajanlatkeres?tipus=${service.wizardType}`} className="px-6 py-3 text-xs tracking-[0.2em] uppercase text-white hover:opacity-90" style={{ background: "linear-gradient(135deg,#C9A84C,#A07830)" }}>Ajánlatot kérek</Link>
                <Link href={`/${service.slug}`} className="px-6 py-3 text-xs tracking-[0.2em] uppercase text-[#A07830] border border-[#C9A84C]/50 hover:border-[#C9A84C]">{service.navLabel}</Link>
              </div>
            </aside>
          )}
          {more.length > 0 && (
            <nav className="mt-14" aria-label="További cikkek">
              <p className="text-xs tracking-[0.2em] uppercase text-[#A07830] mb-4">További útmutatók</p>
              <ul className="space-y-2">{more.map((m) => <li key={m.slug}><Link href={`/blog/${m.slug}`} className="text-[#2c2c2c] hover:text-[#A07830]">{m.title}</Link></li>)}</ul>
            </nav>
          )}
        </article>
      </main>
      <SiteFooter />
    </>
  )
}
