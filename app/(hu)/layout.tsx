import type { Metadata } from "next"
import "../globals.css"
import { cormorant, lato } from "@/lib/fonts"
import { SITE } from "@/lib/site"
import JsonLd from "@/components/JsonLd"
import { localBusiness, website } from "@/lib/structured-data"

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "D-Events – Esküvőszervezés és rendezvényszervezés Budapest, Pest megye",
    template: "%s | D-Events",
  },
  description:
    "Esküvőszervező és rendezvényszervező csapat Szigetszentmiklóson: esküvők, céges rendezvények, magánünnepek és dekoráció Budapesten és Pest megyében. Kérjen ajánlatot!",
  applicationName: SITE.name,
  alternates: {
    canonical: "/",
    languages: { hu: "/", en: "/en", "x-default": "/" },
  },
  openGraph: {
    type: "website",
    locale: "hu_HU",
    alternateLocale: ["en_US"],
    siteName: SITE.name,
    url: "/",
  },
  twitter: { card: "summary_large_image" },
  ...(SITE.googleVerification ? { verification: { google: SITE.googleVerification } } : {}),
}

export default function HungarianLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="hu" className={`${cormorant.variable} ${lato.variable}`}>
      <body>
        <JsonLd data={localBusiness()} />
        <JsonLd data={website()} />
        {children}
      </body>
    </html>
  )
}
