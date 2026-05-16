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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="hu" className={`${cormorant.variable} ${lato.variable}`}>
      <body>{children}</body>
    </html>
  )
}
