import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { SiteHeader, SiteFooter } from "@/components/SiteChrome"
import { PORTFOLIO } from "@/lib/portfolio"

export const metadata: Metadata = {
  title: "Referenciák – megvalósult esküvők és rendezvények",
  description: "Esküvők és rendezvények, amelyeket a D-Events szervezett Budapesten és Pest megyében.",
  alternates: { canonical: "/referenciak" },
}

const serif = { fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 500 } as const

export default function PortfolioPage() {
  // An empty portfolio page would only tell visitors and Google there is nothing.
  if (PORTFOLIO.length === 0) notFound()
  return (
    <>
      <SiteHeader />
      <main className="px-6 py-16 md:py-24 bg-white" style={{ fontFamily: "var(--font-lato), system-ui, sans-serif" }}>
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl text-[#2c2c2c] mb-12" style={serif}>Referenciák</h1>
          <div className="grid gap-12 md:grid-cols-2">
            {PORTFOLIO.map((item) => (
              <article key={item.slug}>
                {item.photos[0] && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={item.photos[0]} alt={item.title} loading="lazy" className="w-full aspect-[4/3] object-cover mb-5" />
                )}
                <p className="text-xs tracking-[0.15em] uppercase text-[#A07830] mb-2">{item.type} · {item.place}{item.guests ? ` · ${item.guests} vendég` : ""}</p>
                <h2 className="text-2xl text-[#2c2c2c] mb-3" style={serif}>{item.title}</h2>
                <p className="text-sm text-[#5a5a5a] leading-relaxed">{item.summary}</p>
              </article>
            ))}
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
