"use client"

import { useState, useEffect, useRef } from "react"
import {
  Menu, X, ChevronDown, ChevronLeft, ChevronRight,
  Heart, Star, Phone, Mail, MapPin, Share2, ArrowRight,
} from "lucide-react"

// ─── Translations ─────────────────────────────────────────────────────────────

const translations = {
  hu: {
    nav: { about: "Rólunk", services: "Szolgáltatások", gallery: "Galéria", testimonials: "Vélemények", contact: "Kapcsolat" },
    hero: {
      tagline: "Minden pillanat tökéletes legyen",
      subtitle: "Esküvő & Rendezvényszervezés",
      description: "Álmai napját mi tesszük valósággá — végtelen gonddal, személyes figyelemmel, és az elegancia iránt érzett szenvedéllyel.",
      cta: "Ajánlatot kérek",
      ctaSecondary: "Galériánk",
    },
    about: {
      label: "Rólunk",
      title: "Ahol az álmok valósággá válnak",
      p1: "A D-Events csapata hisz abban, hogy minden rendezvény egyedi történet. Legyen szó intim esküvőről, nagyszabású céges gáláról vagy bensőséges születésnapi ünnepségről — mi minden részletet átgondolunk, hogy Ön csak az élményre figyeljen.",
      p2: "Több mint tíz évnyi tapasztalatunkkal és gondosan válogatott partnereinkkel garantáljuk, hogy napja maradandó emlék marad.",
      stat1: { number: 200, suffix: "+", label: "Sikeres rendezvény" },
      stat2: { number: 10, suffix: "+", label: "Év tapasztalat" },
      stat3: { number: 98, suffix: "%", label: "Elégedett ügyfél" },
    },
    process: {
      label: "Folyamatunk",
      title: "A tökéletes nap útja",
      steps: [
        { num: "01", title: "Konzultáció", desc: "Megismerjük az álmait és elképzeléseit egy személyes találkozón." },
        { num: "02", title: "Tervezés", desc: "Részletes ajánlatot és moodboard-ot készítünk az Ön stílusához." },
        { num: "03", title: "Szervezés", desc: "Koordinálunk minden partnert, helyszínt és szolgáltatót." },
        { num: "04", title: "A nagy nap", desc: "Mi irányítunk a háttérből — Ön csak élvezi a pillanatokat." },
      ],
    },
    services: {
      label: "Szolgáltatások",
      title: "Amit kínálunk",
      items: [
        { title: "Esküvőszervezés", desc: "Teljes körű esküvőszervezés a helyszín kiválasztásától az utolsó virágszirmig." },
        { title: "Céges rendezvények", desc: "Gálák, csapatépítők, évfordulók — professzionális szervezéssel." },
        { title: "Magánrendezvények", desc: "Születésnapok, évfordulók, keresztelők — személyre szabott ünnepségek." },
        { title: "Dekoráció & Styling", desc: "Egyedi virágkompozíciók, tematikus dekorációk, helyszínkialakítás." },
      ],
    },
    partners: {
      label: "Partnereink",
      title: "Megbízható szakértői hálózat",
      subtitle: "Gondosan válogatott partnereinkkel garantáljuk a tökéletes kivitelezést.",
      items: ["Bella Florista", "Studio Light Photography", "Gourmet Catering Kft.", "Royal Music Group", "Luxury Venues Kft.", "Arte Décor Studio"],
    },
    beforeAfter: {
      label: "Átalakulás",
      title: "A helyszín, ahogy mi látjuk",
      subtitle: "Húzza a csúszkát és nézze meg a különbséget.",
      before: "Üres helyszín",
      after: "D-Events varázslata",
    },
    gallery: {
      label: "Galéria",
      title: "Pillanatok, amelyek örökre megmaradnak",
      tabs: ["Esküvők", "Céges", "Privát"],
    },
    calculator: {
      label: "Költségbecslő",
      title: "Mennyi az Ön rendezvénye?",
      guestLabel: "Vendégek száma",
      typeLabel: "Rendezvény típusa",
      types: ["Esküvő", "Céges rendezvény", "Magánrendezvény"],
      resultLabel: "Becsült keretek",
      disclaimer: "Tájékoztató jellegű becslés. A pontos ár az egyedi igényektől függ.",
      cta: "Személyes ajánlatot kérek",
    },
    faq: {
      label: "GYIK",
      title: "Gyakran Ismételt Kérdések",
      items: [
        { q: "Mennyi idővel előre kell foglalni?", a: "Esküvők esetén legalább 12–18 hónappal, céges rendezvényeknél 3–6 hónappal érdemes foglalni. A keresett dátumok hamar telnek — minél korábban veszi fel velünk a kapcsolatot, annál biztosabb a helye." },
        { q: "Mi szerepel a teljes körű szervezésben?", a: "A helyszín kiválasztástól a dekoráción, cateringen, fotóson és zenészen át az esemény teljes lebonyolításáig mindent intézünk Ön helyett. Egyetlen kapcsolattartóval dolgozik végig." },
        { q: "Hogyan zajlik az ajánlatadás?", a: "Az első konzultáció ingyenes és kötelezettségmentes. Ezt követően 3–5 munkanapon belül személyre szabott ajánlatot küldünk, amelyet igény szerint módosíthatunk." },
        { q: "Tudnak segíteni szűkösebb költségvetéssel is?", a: "Természetesen. Különböző szolgáltatási csomagjaink vannak, amelyeket az Ön igényeihez és keretéhez igazítunk. Az ár-érték arányt minden esetben maximalizáljuk." },
        { q: "Mi történik, ha változik a vendégszám?", a: "Rugalmasan alkalmazkodunk a változásokhoz. Az esetleges módosításokat a rendezvény előtt legalább 3–4 héttel jelezheti — ekkor még legtöbbször minden megoldható." },
      ],
    },
    testimonials: {
      label: "Vélemények",
      title: "Amit ügyfeleink mondanak",
      items: [
        { text: "A D-Events csapata minden várakozásunkat felülmúlta. Az esküvőnk tökéletes volt — minden részlet gondosan megtervezve, minden pillanat varázslatos.", name: "Kovács Anna & Péter", role: "Esküvői pár, 2024" },
        { text: "Céges gálánkat a D-Events szervezte, és a visszajelzések messze felülmúlták az eddigieket. Profi, kreatív, megbízható csapat.", name: "Dr. Nagy Gábor", role: "Ügyvezető, TechHub Kft." },
        { text: "Anyám 70. születésnapját egy álommá varázsolták. Minden vendégünk lenyűgözve távozott. Szívből ajánlom mindenkinek.", name: "Szabó Eszter", role: "Magánrendezvény, 2023" },
      ],
    },
    contact: {
      label: "Kapcsolat",
      title: "Kezdjük el együtt tervezni",
      subtitle: "Töltse ki az alábbi űrlapot és 24 órán belül felvesszük Önnel a kapcsolatot.",
      name: "Neve", email: "E-mail cím", phone: "Telefonszám", eventType: "Rendezvény típusa", message: "Üzenet",
      messagePlaceholder: "Meséljen az álmai rendezvényéről...",
      send: "Üzenet küldése",
      eventTypes: ["Esküvő", "Céges rendezvény", "Magánrendezvény", "Egyéb"],
      address: "Szigetszentmiklós, Pest megye", phoneNum: "+36 30 123 4567", emailAddr: "hello@d-events.hu",
    },
    footer: { copy: "© 2025 D-Events. Minden jog fenntartva.", tagline: "Ahol az álmok valósággá válnak." },
    sticky: "Álmai rendezvénye csak egy lépésre van.",
  },
  en: {
    nav: { about: "About", services: "Services", gallery: "Gallery", testimonials: "Testimonials", contact: "Contact" },
    hero: {
      tagline: "Every moment, perfectly crafted",
      subtitle: "Wedding & Event Planning",
      description: "We turn your dream day into reality — with meticulous care, personal attention, and a passion for elegance.",
      cta: "Request a Quote",
      ctaSecondary: "View Gallery",
    },
    about: {
      label: "About Us",
      title: "Where dreams become reality",
      p1: "The D-Events team believes every event tells a unique story. Whether it's an intimate wedding, a grand corporate gala, or a heartfelt birthday celebration — we think through every detail so you can focus on the experience.",
      p2: "With over a decade of experience and carefully selected partners, we guarantee your day will be an unforgettable memory.",
      stat1: { number: 200, suffix: "+", label: "Successful events" },
      stat2: { number: 10, suffix: "+", label: "Years experience" },
      stat3: { number: 98, suffix: "%", label: "Satisfied clients" },
    },
    process: {
      label: "Our Process",
      title: "The path to a perfect day",
      steps: [
        { num: "01", title: "Consultation", desc: "We get to know your vision and dreams in a personal meeting." },
        { num: "02", title: "Planning", desc: "We create a detailed proposal and moodboard tailored to your style." },
        { num: "03", title: "Coordination", desc: "We coordinate every partner, venue, and vendor for you." },
        { num: "04", title: "The Big Day", desc: "We work behind the scenes — you simply enjoy every moment." },
      ],
    },
    services: {
      label: "Services",
      title: "What we offer",
      items: [
        { title: "Wedding Planning", desc: "Full-service wedding coordination from venue selection to the last petal." },
        { title: "Corporate Events", desc: "Galas, team-buildings, anniversaries — professionally organised." },
        { title: "Private Celebrations", desc: "Birthdays, anniversaries, christenings — bespoke celebrations." },
        { title: "Décor & Styling", desc: "Custom floral arrangements, thematic décor, venue dressing." },
      ],
    },
    partners: {
      label: "Our Partners",
      title: "A trusted network of experts",
      subtitle: "Our carefully selected partners guarantee flawless execution.",
      items: ["Bella Florista", "Studio Light Photography", "Gourmet Catering", "Royal Music Group", "Luxury Venues", "Arte Décor Studio"],
    },
    beforeAfter: {
      label: "Transformation",
      title: "The venue as we see it",
      subtitle: "Drag the slider to see the difference.",
      before: "Empty venue",
      after: "D-Events magic",
    },
    gallery: {
      label: "Gallery",
      title: "Moments that last forever",
      tabs: ["Weddings", "Corporate", "Private"],
    },
    calculator: {
      label: "Cost Estimator",
      title: "How much will your event cost?",
      guestLabel: "Number of guests",
      typeLabel: "Event type",
      types: ["Wedding", "Corporate event", "Private celebration"],
      resultLabel: "Estimated budget",
      disclaimer: "This is an indicative estimate. The exact price depends on individual requirements.",
      cta: "Request a personalised quote",
    },
    faq: {
      label: "FAQ",
      title: "Frequently Asked Questions",
      items: [
        { q: "How far in advance should I book?", a: "For weddings, we recommend at least 12–18 months in advance; for corporate events, 3–6 months. Popular dates fill up quickly — the sooner you get in touch, the better." },
        { q: "What's included in full-service planning?", a: "From venue selection through décor, catering, photography, and entertainment to full event management on the day — we handle everything. You'll have one dedicated contact throughout." },
        { q: "How does the quote process work?", a: "The first consultation is free and non-binding. Afterwards, we send a personalised proposal within 3–5 working days, which can be adjusted as needed." },
        { q: "Can you work with a tighter budget?", a: "Absolutely. We offer different service packages that we tailor to your needs and budget. We always maximise value for money." },
        { q: "What if the guest count changes?", a: "We adapt flexibly to changes. Any adjustments notified at least 3–4 weeks before the event can almost always be accommodated." },
      ],
    },
    testimonials: {
      label: "Testimonials",
      title: "What our clients say",
      items: [
        { text: "The D-Events team exceeded every expectation. Our wedding was perfect — every detail thoughtfully planned, every moment magical.", name: "Anna & Péter Kovács", role: "Wedding couple, 2024" },
        { text: "D-Events organised our corporate gala and the feedback far surpassed anything we'd received before. Professional, creative, reliable.", name: "Dr. Gábor Nagy", role: "CEO, TechHub Ltd." },
        { text: "They turned my mother's 70th birthday into a dream. Every guest left in awe. I wholeheartedly recommend them to everyone.", name: "Eszter Szabó", role: "Private event, 2023" },
      ],
    },
    contact: {
      label: "Contact",
      title: "Let's start planning together",
      subtitle: "Fill in the form below and we'll get back to you within 24 hours.",
      name: "Your name", email: "Email address", phone: "Phone number", eventType: "Event type", message: "Message",
      messagePlaceholder: "Tell us about your dream event...",
      send: "Send message",
      eventTypes: ["Wedding", "Corporate event", "Private celebration", "Other"],
      address: "Szigetszentmiklós, Pest County", phoneNum: "+36 30 123 4567", emailAddr: "hello@d-events.hu",
    },
    footer: { copy: "© 2025 D-Events. All rights reserved.", tagline: "Where dreams become reality." },
    sticky: "Your dream event is just one step away.",
  },
}

type Lang = "hu" | "en"

// ─── Gallery photo sets ───────────────────────────────────────────────────────

const galleryByType = [
  [
    { id: "1519741497674-611481863552", alt: "Esküvői asztal" },
    { id: "1511285560929-80b456fea0bc", alt: "Esküvői pár" },
    { id: "1469371670807-013ccf25f16a", alt: "Esküvői hangulat" },
    { id: "1523438885200-e635ba2c371e", alt: "Dekoráció" },
    { id: "1519167758481-83f550bb49b3", alt: "Helyszín" },
  ],
  [
    { id: "1540575467063-178a50c2df87", alt: "Céges gála" },
    { id: "1519167758481-83f550bb49b3", alt: "Konferencia terem" },
    { id: "1469371670807-013ccf25f16a", alt: "Csapatépítő" },
    { id: "1511285560929-80b456fea0bc", alt: "Évforduló" },
    { id: "1523438885200-e635ba2c371e", alt: "Díszterem" },
  ],
  [
    { id: "1523438885200-e635ba2c371e", alt: "Születésnap" },
    { id: "1511285560929-80b456fea0bc", alt: "Évforduló" },
    { id: "1519741497674-611481863552", alt: "Privát vacsora" },
    { id: "1469371670807-013ccf25f16a", alt: "Kerti party" },
    { id: "1540575467063-178a50c2df87", alt: "Ünnepség" },
  ],
]

// k HUF per guest: wedding / corporate / private
const calcBases = [150, 80, 60]

function formatBudget(guests: number, typeIdx: number): string {
  const totalM = (guests * calcBases[typeIdx]) / 1000
  return `${(totalM * 0.8).toFixed(1)} – ${(totalM * 1.2).toFixed(1)} M Ft`
}

// ─── Falling petals canvas ────────────────────────────────────────────────────

function PetalsCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener("resize", resize)

    const petals = Array.from({ length: 7 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight - window.innerHeight,
      size: Math.random() * 5 + 4,
      speed: Math.random() * 0.4 + 0.2,
      rot: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.015,
      sway: Math.random() * Math.PI * 2,
      swaySpeed: Math.random() * 0.008 + 0.004,
      opacity: Math.random() * 0.08 + 0.05,
      color: Math.random() > 0.5 ? "#d4a8a8" : "#c9a84c",
    }))

    let raf: number
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      petals.forEach((p) => {
        p.y += p.speed
        p.rot += p.rotSpeed
        p.sway += p.swaySpeed
        p.x += Math.sin(p.sway) * 0.7
        if (p.y > canvas.height + 20) {
          p.y = -20
          p.x = Math.random() * canvas.width
        }
        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate(p.rot)
        ctx.globalAlpha = p.opacity
        ctx.fillStyle = p.color
        ctx.beginPath()
        ctx.ellipse(0, 0, p.size * 0.45, p.size, 0, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      })
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", resize)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none" style={{ zIndex: 5 }} />
}

// ─── Animated counter ─────────────────────────────────────────────────────────

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        const duration = 1800
        const steps = 60
        const increment = target / steps
        let current = 0
        const timer = setInterval(() => {
          current += increment
          if (current >= target) { setCount(target); clearInterval(timer) }
          else setCount(Math.floor(current))
        }, duration / steps)
      }
    }, { threshold: 0.5 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [target])

  return (
    <div ref={ref} className="text-3xl md:text-4xl text-[#C9A84C]"
      style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontStyle: "italic" }}>
      {count}{suffix}
    </div>
  )
}

// ─── Scroll reveal ────────────────────────────────────────────────────────────

function useReveal() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } }, { threshold: 0.1 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return { ref, visible }
}

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, visible } = useReveal()
  return (
    <div ref={ref} className={className}
      style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(28px)", transition: `opacity 0.8s ease ${delay}ms, transform 0.8s ease ${delay}ms` }}>
      {children}
    </div>
  )
}

// ─── Shared UI ────────────────────────────────────────────────────────────────

function Logo({ inverted = false }: { inverted?: boolean }) {
  return (
    <a href="#">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/logo.svg?v=3" alt="D·Events" width={160} height={40}
        style={{ filter: inverted ? "brightness(0) invert(1)" : "none", transition: "filter 0.4s ease" }} />
    </a>
  )
}

function GoldDivider() {
  return (
    <div className="flex items-center justify-center gap-3 my-6">
      <div className="h-px w-10" style={{ background: "linear-gradient(90deg,transparent,#C9A84C)" }} />
      <Heart className="w-3 h-3 fill-[#C9A84C] text-[#C9A84C]" />
      <div className="h-px w-10" style={{ background: "linear-gradient(90deg,#C9A84C,transparent)" }} />
    </div>
  )
}

function SectionLabel({ light = false, children }: { light?: boolean; children: React.ReactNode }) {
  return <p className={`text-xs tracking-[0.35em] uppercase mb-3 ${light ? "text-[#C9A84C]" : "text-[#C9A84C]"}`}>{children}</p>
}

function SectionHeading({ light = false, children }: { light?: boolean; children: React.ReactNode }) {
  return (
    <h2 className={`text-4xl md:text-5xl ${light ? "text-white" : "text-[#2C2C2C]"}`}
      style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 400, fontStyle: "italic" }}>
      {children}
    </h2>
  )
}

// ─── Lightbox ─────────────────────────────────────────────────────────────────

function Lightbox({ photos, index, onClose, onPrev, onNext }: {
  photos: { id: string; alt: string }[]
  index: number
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowLeft") onPrev()
      if (e.key === "ArrowRight") onNext()
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [onClose, onPrev, onNext])

  const photo = photos[index]
  return (
    <div className="fixed inset-0 flex items-center justify-center" style={{ zIndex: 200, background: "rgba(0,0,0,0.94)" }}
      onClick={onClose}>
      <button className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors" onClick={onClose}>
        <X className="w-7 h-7" />
      </button>
      <button className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
        onClick={(e) => { e.stopPropagation(); onPrev() }}>
        <ChevronLeft className="w-7 h-7" />
      </button>
      <div className="w-full max-h-[85vh] flex flex-col items-center px-12 md:px-24" onClick={(e) => e.stopPropagation()}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`https://images.unsplash.com/photo-${photo.id}?auto=format&fit=crop&w=1400&q=90`}
          alt={photo.alt} className="max-w-full max-h-[78vh] object-contain" />
        <p className="text-white/50 text-xs tracking-widest mt-3 uppercase">{photo.alt}</p>
      </div>
      <button className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
        onClick={(e) => { e.stopPropagation(); onNext() }}>
        <ChevronRight className="w-7 h-7" />
      </button>
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
        {photos.map((_, i) => (
          <div key={i} className="w-1.5 h-1.5 rounded-full transition-all duration-300"
            style={{ background: i === index ? "#C9A84C" : "rgba(255,255,255,0.3)", transform: i === index ? "scale(1.3)" : "scale(1)" }} />
        ))}
      </div>
    </div>
  )
}

// ─── Sticky CTA bar ───────────────────────────────────────────────────────────

function StickyCtaBar({ lang, ctaText, stickyText, visible }: { lang: Lang; ctaText: string; stickyText: string; visible: boolean }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 transition-transform duration-500"
      style={{ zIndex: 60, transform: visible ? "translateY(0)" : "translateY(100%)" }}>
      <div className="py-3 px-6" style={{ background: "rgba(28,22,14,0.96)", backdropFilter: "blur(8px)", borderTop: "1px solid rgba(201,168,76,0.3)" }}>
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <p className="text-white/75 text-sm hidden sm:block" style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontStyle: "italic", fontSize: "1.05rem" }}>
            {stickyText}
          </p>
          <a href="#contact" className="ml-auto shrink-0 px-7 py-2.5 text-xs tracking-[0.2em] uppercase text-white hover:opacity-90 transition-opacity"
            style={{ background: "linear-gradient(135deg,#C9A84C,#A07830)" }}>
            {ctaText}
          </a>
        </div>
      </div>
    </div>
  )
}

// ─── Before / After slider ────────────────────────────────────────────────────

function BeforeAfterSlider({ beforeLabel, afterLabel }: { beforeLabel: string; afterLabel: string }) {
  const [pos, setPos] = useState(50)
  const p = Math.max(1, Math.min(99, pos))

  return (
    <div className="relative overflow-hidden select-none ba-slider" style={{ aspectRatio: "4/3" }}>
      {/* After image */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1400&q=80"
        alt={afterLabel} className="absolute inset-0 w-full h-full object-cover" />
      {/* Before image — clipped from left */}
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${p}%` }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1400&q=80"
          alt={beforeLabel} className="absolute inset-0 h-full object-cover"
          style={{ width: `${(10000 / p).toFixed(2)}%`, maxWidth: "none" }} />
      </div>
      {/* Labels */}
      <div className="absolute top-4 left-4 text-white text-xs tracking-widest px-3 py-1.5 uppercase pointer-events-none"
        style={{ background: "rgba(44,44,44,0.6)" }}>{beforeLabel}</div>
      <div className="absolute top-4 right-4 text-white text-xs tracking-widest px-3 py-1.5 uppercase pointer-events-none"
        style={{ background: "rgba(201,168,76,0.75)" }}>{afterLabel}</div>
      {/* Divider */}
      <div className="absolute top-0 bottom-0 w-px bg-white/70 pointer-events-none" style={{ left: `${p}%`, transform: "translateX(-50%)" }}>
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white shadow-xl flex items-center justify-center gap-px">
          <ChevronLeft className="w-3 h-3 text-[#2C2C2C]" />
          <ChevronRight className="w-3 h-3 text-[#2C2C2C]" />
        </div>
      </div>
      {/* Invisible range input for drag interaction */}
      <input type="range" min={0} max={100} value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        className="absolute inset-0 w-full h-full opacity-0 cursor-col-resize"
        style={{ zIndex: 10 }} />
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Home() {
  const [lang, setLang] = useState<Lang>("hu")
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [galleryTab, setGalleryTab] = useState(0)
  const [lightbox, setLightbox] = useState<number | null>(null)
  const [stickyVisible, setStickyVisible] = useState(false)
  const [faqOpen, setFaqOpen] = useState<number | null>(null)
  const [guests, setGuests] = useState(80)
  const [calcType, setCalcType] = useState(0)
  const t = translations[lang]

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60)
      setStickyVisible(window.scrollY > window.innerHeight * 0.9)
    }
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const photos = galleryByType[galleryTab]

  const navLinks = [
    { href: "#about", label: t.nav.about },
    { href: "#services", label: t.nav.services },
    { href: "#gallery", label: t.nav.gallery },
    { href: "#testimonials", label: t.nav.testimonials },
    { href: "#contact", label: t.nav.contact },
  ]

  return (
    <div className="min-h-screen" style={{ fontFamily: "var(--font-lato), system-ui, sans-serif" }}>

      {/* ── NAV ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{ background: scrolled ? "rgba(250,247,242,0.97)" : "transparent", backdropFilter: scrolled ? "blur(8px)" : "none", borderBottom: scrolled ? "1px solid rgba(201,168,76,0.2)" : "none" }}>
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
          <Logo inverted={!scrolled} />
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} className="text-xs tracking-[0.2em] uppercase transition-colors hover:text-[#C9A84C]"
                style={{ color: scrolled ? "#5a5a5a" : "rgba(255,255,255,0.9)" }}>{l.label}</a>
            ))}
            <button onClick={() => setLang(lang === "hu" ? "en" : "hu")}
              className="text-xs tracking-wider border px-3 py-1 rounded-full transition-colors hover:text-[#C9A84C] hover:border-[#C9A84C]"
              style={{ color: scrolled ? "#5a5a5a" : "rgba(255,255,255,0.85)", borderColor: scrolled ? "rgba(201,168,76,0.4)" : "rgba(255,255,255,0.4)" }}>
              {lang === "hu" ? "EN" : "HU"}
            </button>
          </div>
          <div className="md:hidden flex items-center gap-3">
            <button onClick={() => setLang(lang === "hu" ? "en" : "hu")} className="text-xs text-[#C9A84C] border border-[#C9A84C]/40 px-2 py-0.5 rounded-full">
              {lang === "hu" ? "EN" : "HU"}
            </button>
            <button onClick={() => setMenuOpen(!menuOpen)} style={{ color: scrolled ? "#2c2c2c" : "white" }}>
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-[#faf7f2] border-t border-[#C9A84C]/20 px-6 py-4 flex flex-col gap-4">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}
                className="text-xs tracking-[0.2em] text-[#5a5a5a] hover:text-[#C9A84C] transition-colors uppercase">{l.label}</a>
            ))}
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section className="relative h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        <div className="absolute inset-0" style={{ animation: "kenBurns 20s ease-in-out infinite alternate" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1920&q=85"
            alt="Esküvői hangulat" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom,rgba(10,8,5,0.28) 0%,rgba(10,8,5,0.15) 40%,rgba(10,8,5,0.42) 100%)" }} />
        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-4 mb-8" style={{ animation: "fadeIn 1.2s ease both" }}>
            <div className="h-px w-16" style={{ background: "linear-gradient(90deg,transparent,rgba(201,168,76,0.8))" }} />
            <Heart className="w-4 h-4 fill-[#C9A84C] text-[#C9A84C]" />
            <div className="h-px w-16" style={{ background: "linear-gradient(90deg,rgba(201,168,76,0.8),transparent)" }} />
          </div>
          <p className="text-sm tracking-[0.35em] text-[#E4C97E] uppercase mb-4" style={{ animation: "fadeInUp 1s 0.1s ease both" }}>
            {t.hero.subtitle}
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-7xl text-white leading-tight mb-6"
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 300, fontStyle: "italic", animation: "fadeInUp 1s 0.25s ease both", textShadow: "0 2px 20px rgba(0,0,0,0.3)" }}>
            {t.hero.tagline}
          </h1>
          <p className="text-base md:text-lg text-white/80 max-w-xl mx-auto leading-relaxed mb-10" style={{ animation: "fadeInUp 1s 0.45s ease both" }}>
            {t.hero.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center" style={{ animation: "fadeInUp 1s 0.65s ease both" }}>
            <a href="#contact" className="px-8 py-3.5 text-xs tracking-[0.2em] uppercase text-white transition-opacity hover:opacity-90"
              style={{ background: "linear-gradient(135deg,#C9A84C,#A07830)" }}>{t.hero.cta}</a>
            <a href="#gallery" className="px-8 py-3.5 text-xs tracking-[0.2em] uppercase text-white border border-white/40 hover:border-white/80 transition-colors">
              {t.hero.ctaSecondary}
            </a>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1" style={{ animation: "fadeIn 2s 1.2s ease both" }}>
          <div className="h-12 w-px" style={{ background: "linear-gradient(180deg,transparent,rgba(201,168,76,0.6))" }} />
          <ChevronDown className="w-4 h-4 text-[#C9A84C]/60" />
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="py-16 md:py-28 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-16">
            <SectionLabel>{t.about.label}</SectionLabel>
            <SectionHeading>{t.about.title}</SectionHeading>
            <GoldDivider />
          </Reveal>
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <Reveal delay={100}>
              <div className="space-y-6">
                <p className="text-[#5a5a5a] leading-relaxed text-lg">{t.about.p1}</p>
                <p className="text-[#5a5a5a] leading-relaxed">{t.about.p2}</p>
              </div>
            </Reveal>
            <Reveal delay={200}>
              <div className="grid grid-cols-3 gap-6">
                {[t.about.stat1, t.about.stat2, t.about.stat3].map((s) => (
                  <div key={s.label} className="text-center p-6 border border-[#C9A84C]/20 bg-[#faf7f2]">
                    <AnimatedCounter target={s.number} suffix={s.suffix} />
                    <div className="text-xs text-[#5a5a5a] tracking-wider uppercase leading-tight mt-2">{s.label}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── PROCESS TIMELINE ── */}
      <section id="process" className="py-16 md:py-28 px-6" style={{ background: "linear-gradient(135deg,#2c2c2c,#3d3320)" }}>
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-16">
            <SectionLabel>{t.process.label}</SectionLabel>
            <SectionHeading light>{t.process.title}</SectionHeading>
            <GoldDivider />
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-0">
            {t.process.steps.map((step, i) => (
              <Reveal key={i} delay={i * 120}>
                <div className="relative p-8 group">
                  {i < t.process.steps.length - 1 && (
                    <div className="hidden lg:block absolute top-12 left-[calc(100%-1rem)] w-8 h-px" style={{ background: "linear-gradient(90deg,#C9A84C,transparent)" }} />
                  )}
                  <div className="text-5xl mb-4 leading-none" style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontStyle: "italic", color: "rgba(201,168,76,0.25)" }}>
                    {step.num}
                  </div>
                  <div className="w-8 h-px mb-4" style={{ background: "#C9A84C" }} />
                  <h3 className="text-lg text-white mb-2" style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 500 }}>
                    {step.title}
                  </h3>
                  <p className="text-sm text-white/60 leading-relaxed">{step.desc}</p>
                  <div className="flex items-center gap-2 mt-4 text-[#C9A84C]/60 text-xs tracking-wider group-hover:text-[#C9A84C] transition-colors">
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" className="py-16 md:py-28 px-6" style={{ background: "#f5ede0" }}>
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-16">
            <SectionLabel>{t.services.label}</SectionLabel>
            <SectionHeading>{t.services.title}</SectionHeading>
            <GoldDivider />
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.services.items.map((item, i) => (
              <Reveal key={i} delay={i * 100}>
                <div className="bg-white p-8 h-full group hover:shadow-xl transition-shadow duration-500">
                  <div className="w-10 h-px mb-6" style={{ background: "#C9A84C" }} />
                  <h3 className="text-xl text-[#2C2C2C] mb-3" style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 500 }}>
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#5a5a5a] leading-relaxed">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── PARTNERS ── */}
      <section className="py-12 md:py-20 px-6 bg-white border-t border-[#C9A84C]/10">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-12">
            <SectionLabel>{t.partners.label}</SectionLabel>
            <SectionHeading>{t.partners.title}</SectionHeading>
            <p className="text-sm text-[#5a5a5a] mt-3">{t.partners.subtitle}</p>
          </Reveal>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {t.partners.items.map((name, i) => (
              <Reveal key={i} delay={i * 60}>
                <div className="flex flex-col items-center justify-center py-6 px-3 border border-[#C9A84C]/15 hover:border-[#C9A84C]/40 transition-colors group">
                  <div className="w-6 h-px mb-3" style={{ background: "#C9A84C" }} />
                  <p className="text-xs text-center text-[#5a5a5a] group-hover:text-[#2C2C2C] transition-colors leading-snug tracking-wide"
                    style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "0.85rem" }}>
                    {name}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── BEFORE / AFTER ── */}
      <section className="py-16 md:py-28 px-6" style={{ background: "#f5ede0" }}>
        <div className="max-w-5xl mx-auto">
          <Reveal className="text-center mb-12">
            <SectionLabel>{t.beforeAfter.label}</SectionLabel>
            <SectionHeading>{t.beforeAfter.title}</SectionHeading>
            <p className="text-sm text-[#5a5a5a] mt-3">{t.beforeAfter.subtitle}</p>
            <GoldDivider />
          </Reveal>
          <Reveal>
            <BeforeAfterSlider beforeLabel={t.beforeAfter.before} afterLabel={t.beforeAfter.after} />
          </Reveal>
        </div>
      </section>

      {/* ── GALLERY with tabs + lightbox ── */}
      <section id="gallery" className="py-16 md:py-28 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-10">
            <SectionLabel>{t.gallery.label}</SectionLabel>
            <SectionHeading>{t.gallery.title}</SectionHeading>
            <GoldDivider />
          </Reveal>
          <div className="flex justify-center gap-0 mb-10">
            {t.gallery.tabs.map((tab, i) => (
              <button key={i} onClick={() => { setGalleryTab(i); setLightbox(null) }}
                className="px-6 py-2.5 text-xs tracking-[0.2em] uppercase transition-all border-b-2"
                style={{ color: galleryTab === i ? "#C9A84C" : "#5a5a5a", borderColor: galleryTab === i ? "#C9A84C" : "transparent", fontWeight: galleryTab === i ? 600 : 400 }}>
                {tab}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 gallery-grid" style={{ gridAutoRows: "220px" }}>
            {photos.map((photo, i) => (
              <div key={`${galleryTab}-${i}`} className={i === 0 ? "row-span-2" : ""}>
                <div className="relative overflow-hidden group w-full h-full cursor-pointer"
                  onClick={() => setLightbox(i)}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`https://images.unsplash.com/photo-${photo.id}?auto=format&fit=crop&w=800&q=80`}
                    alt={photo.alt} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4"
                    style={{ background: "linear-gradient(0deg,rgba(44,44,44,0.6),transparent)" }}>
                    <span className="text-white text-xs tracking-wider">{photo.alt}</span>
                  </div>
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-7 h-7 bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <ArrowRight className="w-3 h-3 text-white rotate-[-45deg]" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BUDGET CALCULATOR ── */}
      <section className="py-16 md:py-28 px-6" style={{ background: "linear-gradient(135deg,#2c2c2c,#3d3320)" }}>
        <div className="max-w-3xl mx-auto">
          <Reveal className="text-center mb-14">
            <SectionLabel>{t.calculator.label}</SectionLabel>
            <SectionHeading light>{t.calculator.title}</SectionHeading>
            <GoldDivider />
          </Reveal>
          <Reveal delay={100}>
            <div className="p-8 md:p-12" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(201,168,76,0.2)" }}>
              {/* Guest slider */}
              <div className="mb-10">
                <div className="flex justify-between items-center mb-4">
                  <label className="text-xs tracking-[0.25em] uppercase text-[#C9A84C]">{t.calculator.guestLabel}</label>
                  <span className="text-white text-2xl" style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontStyle: "italic" }}>
                    {guests} {lang === "hu" ? "fő" : "guests"}
                  </span>
                </div>
                <input type="range" min={10} max={500} step={5} value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  className="w-full h-px appearance-none cursor-pointer"
                  style={{ background: `linear-gradient(90deg, #C9A84C ${((guests - 10) / 490) * 100}%, rgba(255,255,255,0.15) 0%)`, accentColor: "#C9A84C" }} />
                <div className="flex justify-between text-xs text-white/30 mt-2">
                  <span>10</span><span>500</span>
                </div>
              </div>
              {/* Event type */}
              <div className="mb-10">
                <label className="text-xs tracking-[0.25em] uppercase text-[#C9A84C] block mb-4">{t.calculator.typeLabel}</label>
                <div className="grid grid-cols-3 gap-3">
                  {t.calculator.types.map((type, i) => (
                    <button key={i} onClick={() => setCalcType(i)}
                      className="py-3 px-2 text-xs tracking-wider uppercase transition-all border"
                      style={{
                        background: calcType === i ? "linear-gradient(135deg,#C9A84C,#A07830)" : "transparent",
                        borderColor: calcType === i ? "#C9A84C" : "rgba(255,255,255,0.15)",
                        color: calcType === i ? "white" : "rgba(255,255,255,0.55)",
                      }}>
                      {type}
                    </button>
                  ))}
                </div>
              </div>
              {/* Result */}
              <div className="text-center py-8 border-t border-[#C9A84C]/20">
                <p className="text-xs tracking-[0.3em] uppercase text-[#C9A84C] mb-3">{t.calculator.resultLabel}</p>
                <p className="text-4xl md:text-5xl text-white mb-2"
                  style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontStyle: "italic" }}>
                  {formatBudget(guests, calcType)}
                </p>
                <p className="text-xs text-white/35 mt-3">{t.calculator.disclaimer}</p>
              </div>
              <a href="#contact" className="mt-6 flex items-center justify-center gap-2 py-4 text-xs tracking-[0.2em] uppercase text-white hover:opacity-90 transition-opacity"
                style={{ background: "linear-gradient(135deg,#C9A84C,#A07830)" }}>
                {t.calculator.cta}
                <ArrowRight className="w-3 h-3" />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="py-16 md:py-28 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <Reveal className="text-center mb-14">
            <SectionLabel>{t.faq.label}</SectionLabel>
            <SectionHeading>{t.faq.title}</SectionHeading>
            <GoldDivider />
          </Reveal>
          <div className="space-y-0">
            {t.faq.items.map((item, i) => (
              <Reveal key={i} delay={i * 60}>
                <div className="border-b border-[#C9A84C]/20">
                  <button
                    className="w-full flex items-center justify-between py-5 text-left gap-4 group"
                    onClick={() => setFaqOpen(faqOpen === i ? null : i)}>
                    <span className="text-base text-[#2C2C2C] group-hover:text-[#C9A84C] transition-colors"
                      style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 500, fontSize: "1.1rem" }}>
                      {item.q}
                    </span>
                    <ChevronDown className="w-4 h-4 text-[#C9A84C] shrink-0 transition-transform duration-300"
                      style={{ transform: faqOpen === i ? "rotate(180deg)" : "rotate(0deg)" }} />
                  </button>
                  <div className="overflow-hidden transition-all duration-400"
                    style={{ maxHeight: faqOpen === i ? "300px" : "0px" }}>
                    <p className="text-sm text-[#5a5a5a] leading-relaxed pb-5 pr-8">{item.a}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section id="testimonials" className="py-16 md:py-28 px-6" style={{ background: "linear-gradient(135deg,#2c2c2c,#3d3320)" }}>
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-16">
            <SectionLabel>{t.testimonials.label}</SectionLabel>
            <SectionHeading light>{t.testimonials.title}</SectionHeading>
            <GoldDivider />
          </Reveal>
          <div className="grid md:grid-cols-3 gap-8">
            {t.testimonials.items.map((item, i) => (
              <Reveal key={i} delay={i * 120}>
                <div className="p-8 border border-[#C9A84C]/20 bg-white/5 h-full flex flex-col">
                  <div className="flex gap-1 mb-4">{[...Array(5)].map((_, j) => <Star key={j} className="w-3 h-3 text-[#C9A84C] fill-[#C9A84C]" />)}</div>
                  <p className="text-white/80 text-sm leading-relaxed mb-6 italic flex-1">&ldquo;{item.text}&rdquo;</p>
                  <div>
                    <div className="h-px mb-4" style={{ background: "linear-gradient(90deg,#C9A84C,transparent)" }} />
                    <div className="text-white font-medium text-sm">{item.name}</div>
                    <div className="text-[#C9A84C]/70 text-xs tracking-wider mt-0.5">{item.role}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="py-16 md:py-28 px-6 bg-[#faf7f2]">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-16">
            <SectionLabel>{t.contact.label}</SectionLabel>
            <SectionHeading>{t.contact.title}</SectionHeading>
            <p className="text-sm text-[#5a5a5a] mt-2">{t.contact.subtitle}</p>
            <GoldDivider />
          </Reveal>
          <div className="grid md:grid-cols-2 gap-16">
            <Reveal>
              <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs tracking-wider text-[#5a5a5a] uppercase mb-1.5">{t.contact.name}</label>
                    <input className="w-full bg-white border border-[#C9A84C]/30 px-4 py-3 text-sm text-[#2c2c2c] focus:outline-none focus:border-[#C9A84C] transition-colors" />
                  </div>
                  <div>
                    <label className="block text-xs tracking-wider text-[#5a5a5a] uppercase mb-1.5">{t.contact.email}</label>
                    <input type="email" className="w-full bg-white border border-[#C9A84C]/30 px-4 py-3 text-sm text-[#2c2c2c] focus:outline-none focus:border-[#C9A84C] transition-colors" />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs tracking-wider text-[#5a5a5a] uppercase mb-1.5">{t.contact.phone}</label>
                    <input type="tel" className="w-full bg-white border border-[#C9A84C]/30 px-4 py-3 text-sm text-[#2c2c2c] focus:outline-none focus:border-[#C9A84C] transition-colors" />
                  </div>
                  <div>
                    <label className="block text-xs tracking-wider text-[#5a5a5a] uppercase mb-1.5">{t.contact.eventType}</label>
                    <select className="w-full bg-white border border-[#C9A84C]/30 px-4 py-3 text-sm text-[#2c2c2c] focus:outline-none focus:border-[#C9A84C] transition-colors appearance-none">
                      <option value="">—</option>
                      {t.contact.eventTypes.map((type) => <option key={type}>{type}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs tracking-wider text-[#5a5a5a] uppercase mb-1.5">{t.contact.message}</label>
                  <textarea rows={5} placeholder={t.contact.messagePlaceholder}
                    className="w-full bg-white border border-[#C9A84C]/30 px-4 py-3 text-sm text-[#2c2c2c] focus:outline-none focus:border-[#C9A84C] transition-colors resize-none" />
                </div>
                <button type="submit" className="w-full py-4 text-xs tracking-[0.2em] uppercase text-white transition-opacity hover:opacity-90"
                  style={{ background: "linear-gradient(135deg,#C9A84C,#A07830)" }}>
                  {t.contact.send}
                </button>
              </form>
            </Reveal>
            <Reveal delay={150}>
              <div className="space-y-10">
                <div className="space-y-6">
                  {[
                    { icon: <MapPin className="w-4 h-4" />, text: t.contact.address },
                    { icon: <Phone className="w-4 h-4" />, text: t.contact.phoneNum },
                    { icon: <Mail className="w-4 h-4" />, text: t.contact.emailAddr },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="text-[#C9A84C] shrink-0">{item.icon}</div>
                      <span className="text-sm text-[#5a5a5a]">{item.text}</span>
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-xs tracking-[0.2em] text-[#5a5a5a] uppercase mb-4">{lang === "hu" ? "Kövessen minket" : "Follow us"}</p>
                  <div className="flex gap-3">
                    {[{ icon: <Share2 className="w-4 h-4" />, label: "Instagram" }, { icon: <Share2 className="w-4 h-4" />, label: "Facebook" }].map((s) => (
                      <a key={s.label} href="#" className="w-10 h-10 border border-[#C9A84C]/40 flex items-center justify-center text-[#C9A84C] hover:bg-[#C9A84C] hover:text-white transition-all" aria-label={s.label}>
                        {s.icon}
                      </a>
                    ))}
                  </div>
                </div>
                <div className="p-6 border border-[#C9A84C]/20 bg-white">
                  <p className="text-[#2C2C2C] leading-relaxed italic" style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "1.15rem" }}>
                    {lang === "hu" ? <>&bdquo;Minden nagy rendezvény egy kis álommal kezdődik.&rdquo;</> : <>&ldquo;Every great event begins with a small dream.&rdquo;</>}
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-12 px-6 text-center" style={{ background: "#2C2C2C" }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-center mb-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.svg?v=3" alt="D·Events" width={140} height={36} className="brightness-[2] opacity-80" />
          </div>
          <p className="text-xs text-white/40 tracking-wider italic mb-6">{t.footer.tagline}</p>
          <div className="h-px w-16 mx-auto mb-6" style={{ background: "linear-gradient(90deg,transparent,#C9A84C,transparent)" }} />
          <p className="text-xs text-white/25 tracking-wider">{t.footer.copy}</p>
        </div>
      </footer>

      {/* ── STICKY CTA ── */}
      <StickyCtaBar lang={lang} ctaText={t.hero.cta} stickyText={t.sticky} visible={stickyVisible} />

      {/* ── LIGHTBOX ── */}
      {lightbox !== null && (
        <Lightbox
          photos={photos}
          index={lightbox}
          onClose={() => setLightbox(null)}
          onPrev={() => setLightbox((prev) => prev !== null ? (prev - 1 + photos.length) % photos.length : null)}
          onNext={() => setLightbox((prev) => prev !== null ? (prev + 1) % photos.length : null)}
        />
      )}

      {/* ── CSS animations ── */}
      <style>{`
        @keyframes kenBurns {
          0%   { transform: scale(1)    translateX(0)    translateY(0); }
          50%  { transform: scale(1.06) translateX(-1%)  translateY(-1%); }
          100% { transform: scale(1.10) translateX(1.5%) translateY(0.5%); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        input[type=range]::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 18px; height: 18px;
          border-radius: 50%;
          background: #C9A84C;
          cursor: pointer;
        }
        input[type=range]::-moz-range-thumb {
          width: 18px; height: 18px;
          border-radius: 50%;
          background: #C9A84C;
          border: none;
          cursor: pointer;
        }
        @media (max-width: 768px) {
          .gallery-grid { grid-auto-rows: 140px !important; }
          .ba-slider { aspect-ratio: 3/2 !important; }
        }
      `}</style>

    </div>
  )
}
