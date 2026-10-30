import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Check, ArrowRight } from "lucide-react"
import { SERVICES, serviceBySlug } from "@/lib/services"
import { POSTS } from "@/lib/blog"
import { SITE, absoluteUrl } from "@/lib/site"
import { breadcrumbs, businessId } from "@/lib/structured-data"
import JsonLd from "@/components/JsonLd"
import QuoteWizard from "@/components/QuoteWizard"
import { SiteHeader, SiteFooter } from "@/components/SiteChrome"

// Only the four service pages live here; any other slug is a 404.
export const dynamicParams = false

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const service = serviceBySlug(slug)
  if (!service) return {}
  return {
    title: { absolute: service.metaTitle },
    description: service.metaDescription,
    alternates: { canonical: `/${service.slug}`, languages: { hu: `/${service.slug}` } },
    openGraph: { title: service.metaTitle, description: service.metaDescription, url: `/${service.slug}`, images: [service.heroImage] },
  }
}

const serif = { fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 500 } as const

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const service = serviceBySlug(slug)
  if (!service) notFound()

  const guides = POSTS.filter((p) => p.relatedService === service.slug)
  const others = SERVICES.filter((s) => s.slug !== service.slug)

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: service.navLabel,
          serviceType: service.navLabel,
          description: service.metaDescription,
          url: absoluteUrl(`/${service.slug}`),
          provider: { "@id": businessId },
          areaServed: SITE.areaServed.map((name) => ({ "@type": "Place", name })),
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: service.navLabel,
            itemListElement: service.packages.map((p) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: p.name, description: p.desc } })),
          },
        }}
      />
      <JsonLd data={breadcrumbs([{ name: "Főoldal", path: "/" }, { name: service.navLabel, path: `/${service.slug}` }])} />
      <SiteHeader />
      <main style={{ fontFamily: "var(--font-lato), system-ui, sans-serif" }}>
        <section className="relative min-h-[60vh] flex items-end overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={service.heroImage} alt={service.navLabel} fetchPriority="high" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top,rgba(10,8,5,0.75),rgba(10,8,5,0.2))" }} />
          <div className="relative max-w-6xl mx-auto w-full px-6 pb-14 pt-32 text-white">
            <nav aria-label="Morzsamenü" className="text-xs tracking-[0.15em] uppercase text-white/70 mb-4">
              <Link href="/" className="hover:text-white">Főoldal</Link> <span aria-hidden>›</span> {service.navLabel}
            </nav>
            <h1 className="text-4xl md:text-6xl max-w-3xl leading-tight" style={serif}>{service.title}</h1>
            <p className="mt-5 max-w-2xl text-white/85 text-lg">{service.lead}</p>
            <Link href={`/ajanlatkeres?tipus=${service.wizardType}`} className="mt-8 inline-flex items-center gap-2 px-8 py-3.5 text-xs tracking-[0.2em] uppercase text-white hover:opacity-90"
              style={{ background: "linear-gradient(135deg,#C9A84C,#A07830)" }}>Ajánlatot kérek <ArrowRight className="w-4 h-4" /></Link>
          </div>
        </section>

        <section className="px-6 py-16 md:py-24 bg-white">
          <div className="max-w-6xl mx-auto grid gap-14 md:grid-cols-2">
            <div className="space-y-5 text-[#4a4a4a] leading-relaxed">
              {service.intro.map((p) => <p key={p.slice(0, 24)}>{p}</p>)}
            </div>
            <div>
              <h2 className="text-3xl text-[#2c2c2c] mb-6" style={serif}>Mit tartalmaz?</h2>
              <ul className="space-y-3">
                {service.includes.map((item) => (
                  <li key={item} className="flex gap-3 text-[#4a4a4a]"><Check className="w-5 h-5 text-[#C9A84C] shrink-0 mt-0.5" /> {item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="px-6 py-16 md:py-24" style={{ background: "#f5ede0" }}>
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl text-[#2c2c2c] text-center mb-12" style={serif}>Választható csomagok</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {service.packages.map((p) => (
                <div key={p.name} className="bg-white p-8">
                  <div className="w-10 h-px mb-6 bg-[#C9A84C]" />
                  <h3 className="text-2xl text-[#2c2c2c] mb-3" style={serif}>{p.name}</h3>
                  <p className="text-sm text-[#5a5a5a] leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>
            <p className="text-center text-sm text-[#5a5a5a] mt-8">Az első konzultáció ingyenes; utána tételes, személyre szabott ajánlatot küldünk.</p>
          </div>
        </section>

        <section className="px-6 py-16 md:py-24 bg-white">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl text-[#2c2c2c] mb-8" style={serif}>Gyakori kérdések</h2>
            <div className="divide-y divide-[#C9A84C]/20 border-y border-[#C9A84C]/20">
              {service.faq.map((f) => (
                <details key={f.q} className="group py-5">
                  <summary className="cursor-pointer list-none flex justify-between gap-4 text-[#2c2c2c] text-lg" style={serif}>
                    {f.q}<span className="text-[#C9A84C] group-open:rotate-45 transition-transform" aria-hidden>+</span>
                  </summary>
                  <p className="mt-3 text-sm text-[#5a5a5a] leading-relaxed">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section id="ajanlat" className="px-6 py-16 md:py-24 bg-[#faf7f2]">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl text-[#2c2c2c] text-center mb-3" style={serif}>Kérjen ajánlatot</h2>
            <p className="text-center text-sm text-[#5a5a5a] mb-10">Egy perc az egész – 24 órán belül jelentkezünk.</p>
            <QuoteWizard lang="hu" initialType={service.wizardType} />
          </div>
        </section>

        <section className="px-6 py-16 bg-white">
          <div className="max-w-6xl mx-auto grid gap-10 md:grid-cols-2">
            {guides.length > 0 && (
              <div>
                <h2 className="text-2xl text-[#2c2c2c] mb-5" style={serif}>Hasznos útmutatók</h2>
                <ul className="space-y-3">
                  {guides.map((g) => <li key={g.slug}><Link href={`/blog/${g.slug}`} className="text-[#A07830] hover:underline">{g.title}</Link></li>)}
                </ul>
              </div>
            )}
            <div>
              <h2 className="text-2xl text-[#2c2c2c] mb-5" style={serif}>További szolgáltatásaink</h2>
              <ul className="space-y-3">
                {others.map((o) => <li key={o.slug}><Link href={`/${o.slug}`} className="text-[#A07830] hover:underline">{o.navLabel}</Link></li>)}
              </ul>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
