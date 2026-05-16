import type { Metadata } from "next"
import { Cormorant_Garamond, Lato } from "next/font/google"
import "./globals.css"

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
})

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
})

export const metadata: Metadata = {
  title: "D-Events — Esküvő és Rendezvényszervezés",
  description:
    "Álmai esküvőjét és rendezvényét valósítjuk meg — tökéletes részletekkel, személyes figyelemmel. We bring your dream wedding and events to life with perfect details and personal care.",
  openGraph: {
    title: "D-Events — Esküvő és Rendezvényszervezés",
    description: "Álmai rendezvényét valósítjuk meg.",
    siteName: "D-Events",
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "EventPlanningService",
  name: "D-Events",
  url: "https://d-events.hu",
  email: "hello@d-events.hu",
  telephone: "+36301234567",
  description: "Esküvő és rendezvényszervezés Szigetszentmiklóson — tökéletes részletekkel, személyes figyelemmel.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Szigetszentmiklós",
    addressRegion: "Pest megye",
    addressCountry: "HU",
  },
  areaServed: "HU",
  priceRange: "$$",
  sameAs: [],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="hu" className={`${cormorant.variable} ${lato.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
