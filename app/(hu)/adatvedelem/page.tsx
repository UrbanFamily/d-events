import type { Metadata } from "next"
import { SiteHeader, SiteFooter } from "@/components/SiteChrome"
import { SITE } from "@/lib/site"

export const metadata: Metadata = {
  title: "Adatkezelési tájékoztató",
  description: "Hogyan kezeli a D-Events az ajánlatkéréskor megadott személyes adatokat.",
  alternates: { canonical: "/adatvedelem" },
}

const serif = { fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 500 } as const

// Covers what the site itself collects: the quote request. Review it before
// the business takes on other processing (newsletter, analytics cookies …).
export default function PrivacyPage() {
  return (
    <>
      <SiteHeader />
      <main className="px-6 py-16 md:py-24 bg-white" style={{ fontFamily: "var(--font-lato), system-ui, sans-serif" }}>
        <article className="max-w-3xl mx-auto space-y-5 text-[#3f3f3f] leading-relaxed">
          <h1 className="text-4xl text-[#2c2c2c] mb-6" style={serif}>Adatkezelési tájékoztató</h1>
          <h2 className="text-2xl text-[#2c2c2c] pt-4" style={serif}>Az adatkezelő</h2>
          <p>{SITE.name}, {SITE.locality}. Kapcsolat: <a className="underline" href={`mailto:${SITE.contactEmail}`}>{SITE.contactEmail}</a></p>
          <h2 className="text-2xl text-[#2c2c2c] pt-4" style={serif}>Milyen adatokat kezelünk és miért?</h2>
          <p>Az ajánlatkérő űrlapon megadott adatokat – név, e-mail cím, telefonszám (ha megadja), valamint a rendezvény adatai (típus, időpont, helyszín, létszám, keret, igények, üzenet) – kizárólag az ajánlatadás és a kapcsolattartás céljából kezeljük.</p>
          <p>Az adatkezelés jogalapja az Ön hozzájárulása (GDPR 6. cikk (1) a)), illetve – ha megbízás jön létre – a szerződés teljesítése (6. cikk (1) b)).</p>
          <h2 className="text-2xl text-[#2c2c2c] pt-4" style={serif}>Meddig őrizzük?</h2>
          <p>Ha az ajánlatkérésből nem lesz megbízás, az adatokat legkésőbb az ajánlatkéréstől számított egy év elteltével töröljük. Megbízás esetén a szerződésre és a számvitelre vonatkozó jogszabályi határidőkig őrizzük.</p>
          <h2 className="text-2xl text-[#2c2c2c] pt-4" style={serif}>Kik férnek hozzá?</h2>
          <p>Az adatokat nem adjuk el és nem adjuk át harmadik félnek marketing célra. Adatfeldolgozóként a weboldal tárhelyszolgáltatója (Vercel Inc.) és az e-mail kézbesítést végző szolgáltató (Resend) technikailag hozzáfér a továbbított adatokhoz.</p>
          <h2 className="text-2xl text-[#2c2c2c] pt-4" style={serif}>Az Ön jogai</h2>
          <p>Kérhet tájékoztatást a kezelt adatairól, kérheti azok helyesbítését, törlését vagy kezelésük korlátozását, és bármikor visszavonhatja a hozzájárulását a fenti e-mail címen. Panasszal a Nemzeti Adatvédelmi és Információszabadság Hatósághoz (NAIH, naih.hu) fordulhat.</p>
          <h2 className="text-2xl text-[#2c2c2c] pt-4" style={serif}>Sütik</h2>
          <p>A weboldal csak a működéshez szükséges technikai adatokat használja; követő vagy hirdetési sütiket nem helyez el.</p>
        </article>
      </main>
      <SiteFooter />
    </>
  )
}
