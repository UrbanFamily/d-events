"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { SERVICES } from "@/lib/services"
import { SITE } from "@/lib/site"

/** Header and footer for the inner pages; the home page keeps its own. */

const NAV = [
  ...SERVICES.map((s) => ({ href: `/${s.slug}`, label: s.navLabel })),
  { href: "/blog", label: "Blog" },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  return (
    <header className="sticky top-0 z-50 bg-[#faf7f2]/95 backdrop-blur border-b border-[#C9A84C]/20">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" aria-label="D-Events – főoldal">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.svg?v=3" alt="D·Events" width={140} height={36} />
        </Link>
        <nav className="hidden lg:flex items-center gap-6" aria-label="Fő navigáció">
          {NAV.map((l) => (
            <Link key={l.href} href={l.href} className="whitespace-nowrap text-[11px] tracking-[0.16em] uppercase text-[#5a5a5a] hover:text-[#A07830] transition-colors">{l.label}</Link>
          ))}
          <Link href="/ajanlatkeres" className="whitespace-nowrap px-5 py-2.5 text-xs tracking-[0.2em] uppercase text-white hover:opacity-90"
            style={{ background: "linear-gradient(135deg,#C9A84C,#A07830)" }}>Ajánlatkérés</Link>
        </nav>
        <button className="lg:hidden text-[#2c2c2c]" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Menü">
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>
      {open && (
        <nav className="lg:hidden border-t border-[#C9A84C]/20 px-6 py-4 flex flex-col gap-4" aria-label="Mobil navigáció">
          {NAV.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-xs tracking-[0.18em] uppercase text-[#5a5a5a]">{l.label}</Link>
          ))}
          <Link href="/ajanlatkeres" onClick={() => setOpen(false)} className="text-xs tracking-[0.18em] uppercase text-[#A07830]">Ajánlatkérés</Link>
        </nav>
      )}
    </header>
  )
}

export function SiteFooter() {
  return (
    <footer className="bg-[#2c2c2c] text-[#bdbdbd] px-6 py-14">
      <div className="max-w-6xl mx-auto grid gap-10 md:grid-cols-3 text-sm">
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.svg?v=3" alt="D·Events" width={140} height={36} className="brightness-[2] opacity-80 mb-4" />
          <p className="leading-relaxed">Esküvő- és rendezvényszervezés {SITE.locality}ról, Budapesten és Pest megyében.</p>
        </div>
        <nav aria-label="Szolgáltatások">
          <p className="text-xs tracking-[0.2em] uppercase text-[#C9A84C] mb-4">Szolgáltatások</p>
          <ul className="space-y-2">
            {SERVICES.map((s) => <li key={s.slug}><Link href={`/${s.slug}`} className="hover:text-white">{s.navLabel}</Link></li>)}
          </ul>
        </nav>
        <div>
          <p className="text-xs tracking-[0.2em] uppercase text-[#C9A84C] mb-4">Kapcsolat</p>
          <ul className="space-y-2">
            <li><a href={`mailto:${SITE.contactEmail}`} className="hover:text-white">{SITE.contactEmail}</a></li>
            <li>{SITE.locality}, {SITE.region}</li>
            <li><Link href="/ajanlatkeres" className="hover:text-white">Ajánlatkérés</Link></li>
            <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
            <li><Link href="/adatvedelem" className="hover:text-white">Adatkezelési tájékoztató</Link></li>
          </ul>
        </div>
      </div>
      <p className="max-w-6xl mx-auto mt-10 pt-6 border-t border-white/10 text-xs text-[#8a8a8a]">© {new Date().getFullYear()} D-Events</p>
    </footer>
  )
}
