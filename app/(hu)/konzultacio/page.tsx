import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { SiteHeader, SiteFooter } from "@/components/SiteChrome"
import { SITE } from "@/lib/site"

export const metadata: Metadata = {
  title: "Ingyenes konzultáció foglalása",
  description: "Foglaljon ingyenes online konzultációt esküvője vagy rendezvénye megbeszéléséhez a D-Events csapatával.",
  alternates: { canonical: "/konzultacio" },
}

// Exists only once a Cal.com link is configured (NEXT_PUBLIC_CAL_LINK).
export default function ConsultationPage() {
  if (!SITE.calLink) notFound()
  return (
    <>
      <SiteHeader />
      <main className="px-6 py-16 md:py-20 bg-[#faf7f2]" style={{ fontFamily: "var(--font-lato), system-ui, sans-serif" }}>
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl text-[#2c2c2c] text-center mb-4" style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 500 }}>Ingyenes konzultáció</h1>
          <p className="text-center text-[#5a5a5a] mb-10">Válasszon időpontot egy kötetlen, online beszélgetésre. Inkább írna? <Link href="/ajanlatkeres" className="underline">Kérjen ajánlatot</Link>.</p>
          <iframe
            title="Konzultáció foglalása"
            src={`https://cal.com/${SITE.calLink}?embed=true&theme=light`}
            className="w-full min-h-[720px] bg-white border border-[#C9A84C]/20"
            loading="lazy"
          />
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
