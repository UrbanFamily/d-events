import type { Metadata } from "next"
import QuoteWizard, { type EventType } from "@/components/QuoteWizard"
import { SiteHeader, SiteFooter } from "@/components/SiteChrome"
import { SITE } from "@/lib/site"

export const metadata: Metadata = {
  title: "Ajánlatkérés – esküvő és rendezvényszervezés",
  description: "Kérjen személyre szabott ajánlatot esküvőre, céges vagy magánrendezvényre Budapesten és Pest megyében. Egy perc, 24 órán belül válaszolunk.",
  alternates: { canonical: "/ajanlatkeres" },
}

const TYPES: EventType[] = ["wedding", "corporate", "private", "decor", "other"]

export default async function QuotePage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const sp = await searchParams
  const tipus = typeof sp.tipus === "string" && (TYPES as string[]).includes(sp.tipus) ? (sp.tipus as EventType) : undefined
  const letszam = typeof sp.letszam === "string" ? Math.min(Math.max(Number(sp.letszam) || 0, 10), 500) : undefined
  return (
    <>
      <SiteHeader />
      <main className="px-6 py-16 md:py-24 bg-[#faf7f2]" style={{ fontFamily: "var(--font-lato), system-ui, sans-serif" }}>
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl text-[#2c2c2c] text-center mb-4" style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 500 }}>Kérjen ajánlatot</h1>
          <p className="text-center text-[#5a5a5a] mb-10">Néhány kérdés a rendezvényről – 24 órán belül személyre szabott ajánlattal jelentkezünk. Kérdése van? Írjon: <a className="underline" href={`mailto:${SITE.contactEmail}`}>{SITE.contactEmail}</a></p>
          <QuoteWizard lang="hu" initialType={tipus} initialGuests={letszam} />
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
