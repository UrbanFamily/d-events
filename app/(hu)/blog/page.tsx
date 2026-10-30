import type { Metadata } from "next"
import Link from "next/link"
import { POSTS } from "@/lib/blog"
import { SiteHeader, SiteFooter } from "@/components/SiteChrome"

export const metadata: Metadata = {
  title: "Blog – esküvő- és rendezvényszervezési útmutatók",
  description: "Gyakorlati útmutatók esküvő és rendezvény szervezéséhez: idővonal, költségvetés, céges rendezvények – a D-Events csapatától.",
  alternates: { canonical: "/blog" },
}

const serif = { fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 500 } as const
const fmt = (d: string) => new Date(d).toLocaleDateString("hu-HU", { year: "numeric", month: "long", day: "numeric" })

export default function BlogIndex() {
  const posts = [...POSTS].sort((a, b) => b.published.localeCompare(a.published))
  return (
    <>
      <SiteHeader />
      <main className="px-6 py-16 md:py-24 bg-white" style={{ fontFamily: "var(--font-lato), system-ui, sans-serif" }}>
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl text-[#2c2c2c] mb-4" style={serif}>Blog</h1>
          <p className="text-[#5a5a5a] mb-12 max-w-2xl">Gyakorlati útmutatók esküvő és rendezvény szervezéséhez.</p>
          <div className="grid gap-10 md:grid-cols-3">
            {posts.map((p) => (
              <article key={p.slug} className="group">
                <Link href={`/blog/${p.slug}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.image} alt="" loading="lazy" className="w-full aspect-[4/3] object-cover mb-5 group-hover:opacity-90 transition-opacity" />
                  <p className="text-xs tracking-[0.15em] uppercase text-[#A07830] mb-2">{fmt(p.published)} · {p.readingMinutes} perc</p>
                  <h2 className="text-2xl text-[#2c2c2c] mb-3 group-hover:text-[#A07830] transition-colors" style={serif}>{p.title}</h2>
                  <p className="text-sm text-[#5a5a5a] leading-relaxed">{p.description}</p>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
