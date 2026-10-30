import type { Metadata } from "next"
import "../globals.css"
import { cormorant, lato } from "@/lib/fonts"
import { SITE } from "@/lib/site"
import JsonLd from "@/components/JsonLd"
import { localBusiness } from "@/lib/structured-data"

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "D-Events – Wedding & Event Planner in Budapest, Hungary",
    template: "%s | D-Events",
  },
  description:
    "Wedding and event planning in Budapest and Pest County: weddings, corporate events, private celebrations and décor, with English-speaking coordination. Request a quote.",
  applicationName: SITE.name,
  alternates: {
    canonical: "/en",
    languages: { hu: "/", en: "/en", "x-default": "/" },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["hu_HU"],
    siteName: SITE.name,
    url: "/en",
  },
  twitter: { card: "summary_large_image" },
  ...(SITE.googleVerification ? { verification: { google: SITE.googleVerification } } : {}),
}

export default function EnglishLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${lato.variable}`}>
      <body>
        <JsonLd data={localBusiness()} />
        {children}
      </body>
    </html>
  )
}
