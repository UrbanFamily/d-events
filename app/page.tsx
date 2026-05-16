"use client"

import { useState, useEffect, useRef } from "react"
import { Menu, X, ChevronDown, Heart, Star, Phone, Mail, MapPin, Share2 } from "lucide-react"

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
      stat1: { number: "200+", label: "Sikeres rendezvény" },
      stat2: { number: "10+", label: "Év tapasztalat" },
      stat3: { number: "98%", label: "Elégedett ügyfél" },
    },
    services: {
      label: "Szolgáltatások",
      title: "Amit kínálunk",
      items: [
        { title: "Esküvőszervezés", desc: "Teljes körű esküvőszervezés a helyszín kiválasztásától az utolsó virágszirmig. Álmai esküvőjét minden részletében megtervezzük és koordináljuk." },
        { title: "Céges rendezvények", desc: "Gálák, csapatépítők, évfordulók — professzionális szervezéssel, amelyek erősítik a céges identitást és maradandó benyomást keltenek." },
        { title: "Magánrendezvények", desc: "Születésnapok, évfordulók, keresztelők — személyre szabott ünnepségek, amelyek tükrözik az Ön egyéniségét és stílusát." },
        { title: "Dekoráció & Styling", desc: "Egyedi virágkompozíciók, tematikus dekorációk, helyszínkialakítás — minden részlet összhangban az Ön elképzelésével." },
      ],
    },
    gallery: {
      label: "Galéria",
      title: "Pillanatok, amelyek örökre megmaradnak",
      subtitle: "Néhány kedvenc munkánk",
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
      address: "Budapest, V. kerület", phoneNum: "+36 30 123 4567", emailAddr: "hello@d-events.hu",
    },
    footer: { copy: "© 2025 D-Events. Minden jog fenntartva.", tagline: "Ahol az álmok valósággá válnak." },
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
      stat1: { number: "200+", label: "Successful events" },
      stat2: { number: "10+", label: "Years experience" },
      stat3: { number: "98%", label: "Satisfied clients" },
    },
    services: {
      label: "Services",
      title: "What we offer",
      items: [
        { title: "Wedding Planning", desc: "Full-service wedding coordination from venue selection to the last petal. We plan and manage every detail of your dream wedding." },
        { title: "Corporate Events", desc: "Galas, team-buildings, anniversaries — professionally organised events that strengthen your brand and leave lasting impressions." },
        { title: "Private Celebrations", desc: "Birthdays, anniversaries, christenings — bespoke celebrations that reflect your personality and style." },
        { title: "Décor & Styling", desc: "Custom floral arrangements, thematic décor, venue dressing — every detail in harmony with your vision." },
      ],
    },
    gallery: {
      label: "Gallery",
      title: "Moments that last forever",
      subtitle: "A selection of our favourite work",
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
      address: "Budapest, District V", phoneNum: "+36 30 123 4567", emailAddr: "hello@d-events.hu",
    },
    footer: { copy: "© 2025 D-Events. All rights reserved.", tagline: "Where dreams become reality." },
  },
}

type Lang = "hu" | "en"

// ─── Gallery photos from Unsplash ────────────────────────────────────────────

const galleryPhotos = [
  { id: "1519741497674-611481863552", alt: "Esküvői asztal / Wedding table" },
  { id: "1511285560929-80b456fea0bc", alt: "Esküvői pár / Wedding couple" },
  { id: "1540575467063-178a50c2df87", alt: "Gála / Gala event" },
  { id: "1469371670807-013ccf25f16a", alt: "Esküvői hangulat / Wedding mood" },
  { id: "1523438885200-e635ba2c371e", alt: "Esküvői dekoráció / Decor" },
  { id: "1519167758481-83f550bb49b3", alt: "Helyszín / Venue" },
]

// ─── Scroll animation hook ────────────────────────────────────────────────────

function useReveal() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold: 0.12 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return { ref, visible }
}

// ─── Reveal wrapper ───────────────────────────────────────────────────────────

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, visible } = useReveal()
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.8s ease ${delay}ms, transform 0.8s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

// ─── Logo component ───────────────────────────────────────────────────────────

function Logo({ className = "" }: { className?: string }) {
  return (
    <a href="#" className={`flex items-center gap-0 ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/logo.svg" alt="D·Events" width={160} height={40} />
    </a>
  )
}

// ─── Gold divider ─────────────────────────────────────────────────────────────

function GoldDivider() {
  return (
    <div className="flex items-center justify-center gap-3 my-6">
      <div className="h-px w-10" style={{ background: "linear-gradient(90deg, transparent, #C9A84C)" }} />
      <Heart className="w-3 h-3 fill-[#C9A84C] text-[#C9A84C]" />
      <div className="h-px w-10" style={{ background: "linear-gradient(90deg, #C9A84C, transparent)" }} />
    </div>
  )
}

// ─── Section label ────────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="text-xs tracking-[0.35em] text-[#C9A84C] uppercase mb-3">{children}</p>
}

// ─── Section heading ──────────────────────────────────────────────────────────

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="text-4xl md:text-5xl text-[#2C2C2C]"
      style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 400, fontStyle: "italic" }}
    >
      {children}
    </h2>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Home() {
  const [lang, setLang] = useState<Lang>("hu")
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const t = translations[lang]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

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
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled ? "rgba(250,247,242,0.97)" : "transparent",
          backdropFilter: scrolled ? "blur(8px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(201,168,76,0.2)" : "none",
        }}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
          <Logo />

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href}
                className="text-xs tracking-[0.2em] uppercase transition-colors hover:text-[#C9A84C]"
                style={{ color: scrolled ? "#5a5a5a" : "rgba(255,255,255,0.9)" }}>
                {l.label}
              </a>
            ))}
            <button
              onClick={() => setLang(lang === "hu" ? "en" : "hu")}
              className="text-xs tracking-wider border px-3 py-1 rounded-full transition-colors hover:text-[#C9A84C] hover:border-[#C9A84C]"
              style={{ color: scrolled ? "#5a5a5a" : "rgba(255,255,255,0.85)", borderColor: scrolled ? "rgba(201,168,76,0.4)" : "rgba(255,255,255,0.4)" }}
            >
              {lang === "hu" ? "EN" : "HU"}
            </button>
          </div>

          <div className="md:hidden flex items-center gap-3">
            <button onClick={() => setLang(lang === "hu" ? "en" : "hu")}
              className="text-xs text-[#C9A84C] border border-[#C9A84C]/40 px-2 py-0.5 rounded-full">
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
                className="text-xs tracking-[0.2em] text-[#5a5a5a] hover:text-[#C9A84C] transition-colors uppercase">
                {l.label}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section className="relative h-screen flex flex-col items-center justify-center text-center px-6">
        {/* Background photo */}
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1920&q=85"
            alt="Esküvői hangulat"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(20,15,10,0.55) 0%, rgba(20,15,10,0.35) 50%, rgba(20,15,10,0.6) 100%)" }} />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-4 mb-8" style={{ opacity: 1, animation: "fadeIn 1.2s ease both" }}>
            <div className="h-px w-16" style={{ background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.8))" }} />
            <Heart className="w-4 h-4 fill-[#C9A84C] text-[#C9A84C]" />
            <div className="h-px w-16" style={{ background: "linear-gradient(90deg, rgba(201,168,76,0.8), transparent)" }} />
          </div>

          <p className="text-sm tracking-[0.35em] text-[#E4C97E] uppercase mb-4" style={{ animation: "fadeInUp 1s 0.1s ease both" }}>
            {t.hero.subtitle}
          </p>

          <h1
            className="text-5xl md:text-7xl text-white leading-tight mb-6"
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 300, fontStyle: "italic", animation: "fadeInUp 1s 0.25s ease both", textShadow: "0 2px 20px rgba(0,0,0,0.3)" }}
          >
            {t.hero.tagline}
          </h1>

          <p className="text-base md:text-lg text-white/80 max-w-xl mx-auto leading-relaxed mb-10"
            style={{ animation: "fadeInUp 1s 0.45s ease both" }}>
            {t.hero.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center" style={{ animation: "fadeInUp 1s 0.65s ease both" }}>
            <a href="#contact"
              className="px-8 py-3.5 text-xs tracking-[0.2em] uppercase text-white transition-opacity hover:opacity-90"
              style={{ background: "linear-gradient(135deg, #C9A84C, #A07830)" }}>
              {t.hero.cta}
            </a>
            <a href="#gallery"
              className="px-8 py-3.5 text-xs tracking-[0.2em] uppercase text-white border border-white/40 hover:border-white/80 transition-colors">
              {t.hero.ctaSecondary}
            </a>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/40" style={{ animation: "fadeIn 2s 1.2s ease both" }}>
          <div className="h-12 w-px" style={{ background: "linear-gradient(180deg, transparent, rgba(201,168,76,0.6))" }} />
          <ChevronDown className="w-4 h-4 text-[#C9A84C]/60" />
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="py-28 px-6 bg-white">
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
                    <div className="text-3xl md:text-4xl text-[#C9A84C] mb-2"
                      style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontStyle: "italic" }}>
                      {s.number}
                    </div>
                    <div className="text-xs text-[#5a5a5a] tracking-wider uppercase leading-tight">{s.label}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" className="py-28 px-6" style={{ background: "#f5ede0" }}>
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
                  <h3 className="text-xl text-[#2C2C2C] mb-3"
                    style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 500 }}>
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#5a5a5a] leading-relaxed">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── GALLERY ── */}
      <section id="gallery" className="py-28 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-16">
            <SectionLabel>{t.gallery.label}</SectionLabel>
            <SectionHeading>{t.gallery.title}</SectionHeading>
            <p className="text-sm text-[#5a5a5a] tracking-wider mt-2">{t.gallery.subtitle}</p>
            <GoldDivider />
          </Reveal>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {galleryPhotos.map((photo, i) => (
              <Reveal key={i} delay={i * 80} className={i === 0 ? "row-span-2" : ""}>
                <div className="relative overflow-hidden group" style={{ aspectRatio: i === 0 ? "3/4" : "4/3" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`https://images.unsplash.com/photo-${photo.id}?auto=format&fit=crop&w=800&q=80`}
                    alt={photo.alt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-end p-4"
                    style={{ background: "linear-gradient(0deg, rgba(44,44,44,0.55), transparent)" }}>
                    <span className="text-white text-xs tracking-wider">{photo.alt}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section id="testimonials" className="py-28 px-6" style={{ background: "linear-gradient(135deg, #2c2c2c, #3d3320)" }}>
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-16">
            <SectionLabel>{t.testimonials.label}</SectionLabel>
            <h2 className="text-4xl md:text-5xl text-white"
              style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 400, fontStyle: "italic" }}>
              {t.testimonials.title}
            </h2>
            <GoldDivider />
          </Reveal>

          <div className="grid md:grid-cols-3 gap-8">
            {t.testimonials.items.map((item, i) => (
              <Reveal key={i} delay={i * 120}>
                <div className="p-8 border border-[#C9A84C]/20 bg-white/5 h-full flex flex-col">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, j) => <Star key={j} className="w-3 h-3 text-[#C9A84C] fill-[#C9A84C]" />)}
                  </div>
                  <p className="text-white/80 text-sm leading-relaxed mb-6 italic flex-1">&ldquo;{item.text}&rdquo;</p>
                  <div>
                    <div className="h-px mb-4" style={{ background: "linear-gradient(90deg, #C9A84C, transparent)" }} />
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
      <section id="contact" className="py-28 px-6 bg-[#faf7f2]">
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
                <button type="submit"
                  className="w-full py-4 text-xs tracking-[0.2em] uppercase text-white transition-opacity hover:opacity-90"
                  style={{ background: "linear-gradient(135deg, #C9A84C, #A07830)" }}>
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
                  <p className="text-xs tracking-[0.2em] text-[#5a5a5a] uppercase mb-4">
                    {lang === "hu" ? "Kövessen minket" : "Follow us"}
                  </p>
                  <div className="flex gap-3">
                    {[{ icon: <Share2 className="w-4 h-4" />, label: "Instagram" }, { icon: <Share2 className="w-4 h-4" />, label: "Facebook" }].map((s) => (
                      <a key={s.label} href="#"
                        className="w-10 h-10 border border-[#C9A84C]/40 flex items-center justify-center text-[#C9A84C] hover:bg-[#C9A84C] hover:text-white transition-all"
                        aria-label={s.label}>
                        {s.icon}
                      </a>
                    ))}
                  </div>
                </div>

                <div className="p-6 border border-[#C9A84C]/20 bg-white">
                  <p className="text-[#2C2C2C] leading-relaxed italic"
                    style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "1.15rem" }}>
                    {lang === "hu"
                      ? <>&bdquo;Minden nagy rendezvény egy kis álommal kezdődik.&rdquo;</>
                      : <>&ldquo;Every great event begins with a small dream.&rdquo;</>}
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
            <img src="/logo.svg" alt="D·Events" width={140} height={36} className="brightness-[2] opacity-80" />
          </div>
          <p className="text-xs text-white/40 tracking-wider italic mb-6">{t.footer.tagline}</p>
          <div className="h-px w-16 mx-auto mb-6" style={{ background: "linear-gradient(90deg, transparent, #C9A84C, transparent)" }} />
          <p className="text-xs text-white/25 tracking-wider">{t.footer.copy}</p>
        </div>
      </footer>

    </div>
  )
}
