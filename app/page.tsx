"use client"

import { useState } from "react"
import { Menu, X, ChevronDown, Heart, Star, Phone, Mail, MapPin, Share2 } from "lucide-react"

const translations = {
  hu: {
    nav: {
      about: "Rólunk",
      services: "Szolgáltatások",
      gallery: "Galéria",
      testimonials: "Vélemények",
      contact: "Kapcsolat",
    },
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
        {
          title: "Esküvőszervezés",
          desc: "Teljes körű esküvőszervezés a helyszín kiválasztásától az utolsó virágszirmig. Álmai esküvőjét minden részletében megtervezzük és koordináljuk.",
        },
        {
          title: "Céges rendezvények",
          desc: "Gálák, csapatépítők, évfordulók — professzionális szervezéssel, amelyek erősítik a céges identitást és maradandó benyomást keltenek.",
        },
        {
          title: "Magánrendezvények",
          desc: "Születésnapok, évfordulók, keresztelők — személyre szabott ünnepségek, amelyek tükrözik az Ön egyéniségét és stílusát.",
        },
        {
          title: "Dekoráció & Styling",
          desc: "Egyedi virágkompozíciók, tematikus dekorációk, helyszínkialakítás — minden részlet összhangban az Ön elképzelésével.",
        },
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
        {
          text: "A D-Events csapata minden várakozásunkat felülmúlta. Az esküvőnk tökéletes volt — minden részlet gondosan megtervezve, minden pillanat varázslatos.",
          name: "Kovács Anna & Péter",
          role: "Esküvői pár, 2024",
        },
        {
          text: "Céges gálánkat a D-Events szervezte, és a visszajelzések messze felülmúlták az eddigieket. Profi, kreatív, megbízható csapat.",
          name: "Dr. Nagy Gábor",
          role: "Ügyvezető, TechHub Kft.",
        },
        {
          text: "Anyám 70. születésnapját egy álommá varázsolták. Minden vendégünk lenyűgözve távozott. Szívből ajánlom mindenkinek.",
          name: "Szabó Eszter",
          role: "Magánrendezvény, 2023",
        },
      ],
    },
    contact: {
      label: "Kapcsolat",
      title: "Kezdjük el együtt tervezni",
      subtitle: "Töltse ki az alábbi űrlapot és 24 órán belül felvesszük Önnel a kapcsolatot.",
      name: "Neve",
      email: "E-mail cím",
      phone: "Telefonszám",
      eventType: "Rendezvény típusa",
      message: "Üzenet",
      messagePlaceholder: "Meséljen az álmai rendezvényéről...",
      send: "Üzenet küldése",
      eventTypes: ["Esküvő", "Céges rendezvény", "Magánrendezvény", "Egyéb"],
      address: "Budapest, V. kerület",
      phoneNum: "+36 30 123 4567",
      emailAddr: "hello@d-events.hu",
    },
    footer: {
      copy: "© 2025 D-Events. Minden jog fenntartva.",
      tagline: "Ahol az álmok valósággá válnak.",
    },
  },
  en: {
    nav: {
      about: "About",
      services: "Services",
      gallery: "Gallery",
      testimonials: "Testimonials",
      contact: "Contact",
    },
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
        {
          title: "Wedding Planning",
          desc: "Full-service wedding coordination from venue selection to the last petal. We plan and manage every detail of your dream wedding.",
        },
        {
          title: "Corporate Events",
          desc: "Galas, team-buildings, anniversaries — professionally organized events that strengthen your brand and leave lasting impressions.",
        },
        {
          title: "Private Celebrations",
          desc: "Birthdays, anniversaries, christenings — bespoke celebrations that reflect your personality and style.",
        },
        {
          title: "Décor & Styling",
          desc: "Custom floral arrangements, thematic décor, venue dressing — every detail in harmony with your vision.",
        },
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
        {
          text: "The D-Events team exceeded every expectation. Our wedding was perfect — every detail thoughtfully planned, every moment magical.",
          name: "Anna & Péter Kovács",
          role: "Wedding couple, 2024",
        },
        {
          text: "D-Events organised our corporate gala and the feedback far surpassed anything we'd received before. Professional, creative, reliable.",
          name: "Dr. Gábor Nagy",
          role: "CEO, TechHub Ltd.",
        },
        {
          text: "They turned my mother's 70th birthday into a dream. Every guest left in awe. I wholeheartedly recommend them to everyone.",
          name: "Eszter Szabó",
          role: "Private event, 2023",
        },
      ],
    },
    contact: {
      label: "Contact",
      title: "Let's start planning together",
      subtitle: "Fill in the form below and we'll get back to you within 24 hours.",
      name: "Your name",
      email: "Email address",
      phone: "Phone number",
      eventType: "Event type",
      message: "Message",
      messagePlaceholder: "Tell us about your dream event...",
      send: "Send message",
      eventTypes: ["Wedding", "Corporate event", "Private celebration", "Other"],
      address: "Budapest, District V",
      phoneNum: "+36 30 123 4567",
      emailAddr: "hello@d-events.hu",
    },
    footer: {
      copy: "© 2025 D-Events. All rights reserved.",
      tagline: "Where dreams become reality.",
    },
  },
}

type Lang = "hu" | "en"

const galleryItems = [
  { bg: "bg-rose-100", label: "Esküvő / Wedding" },
  { bg: "bg-amber-50", label: "Gála / Gala" },
  { bg: "bg-pink-100", label: "Dekoráció / Décor" },
  { bg: "bg-yellow-50", label: "Virág / Flowers" },
  { bg: "bg-rose-50", label: "Helyszín / Venue" },
  { bg: "bg-amber-100", label: "Részlet / Detail" },
]

export default function Home() {
  const [lang, setLang] = useState<Lang>("hu")
  const [menuOpen, setMenuOpen] = useState(false)
  const t = translations[lang]

  const navLinks = [
    { href: "#about", label: t.nav.about },
    { href: "#services", label: t.nav.services },
    { href: "#gallery", label: t.nav.gallery },
    { href: "#testimonials", label: t.nav.testimonials },
    { href: "#contact", label: t.nav.contact },
  ]

  return (
    <div className="min-h-screen" style={{ fontFamily: "var(--font-lato), system-ui, sans-serif" }}>

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#faf7f2]/95 backdrop-blur-sm border-b border-[#c9a84c]/20">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
          <a href="#" className="text-2xl tracking-widest text-[#c9a84c] uppercase" style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}>
            D·Events
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} className="text-sm tracking-wider text-[#5a5a5a] hover:text-[#c9a84c] transition-colors uppercase">
                {l.label}
              </a>
            ))}
            <button
              onClick={() => setLang(lang === "hu" ? "en" : "hu")}
              className="text-sm tracking-wider text-[#5a5a5a] hover:text-[#c9a84c] transition-colors border border-[#c9a84c]/40 px-3 py-1 rounded-full"
            >
              {lang === "hu" ? "EN" : "HU"}
            </button>
          </div>

          {/* Mobile */}
          <div className="md:hidden flex items-center gap-3">
            <button onClick={() => setLang(lang === "hu" ? "en" : "hu")} className="text-xs text-[#c9a84c] border border-[#c9a84c]/40 px-2 py-0.5 rounded-full">
              {lang === "hu" ? "EN" : "HU"}
            </button>
            <button onClick={() => setMenuOpen(!menuOpen)} className="text-[#2c2c2c]">
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-[#faf7f2] border-t border-[#c9a84c]/20 px-6 py-4 flex flex-col gap-4">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)} className="text-sm tracking-wider text-[#5a5a5a] hover:text-[#c9a84c] transition-colors uppercase">
                {l.label}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-16"
        style={{ background: "linear-gradient(160deg, #fdf9f3 0%, #f5ede0 50%, #faf7f2 100%)" }}>

        {/* Decorative circles */}
        <div className="absolute top-24 left-12 w-64 h-64 rounded-full opacity-20" style={{ background: "radial-gradient(circle, #e4c97e, transparent)" }} />
        <div className="absolute bottom-24 right-12 w-96 h-96 rounded-full opacity-15" style={{ background: "radial-gradient(circle, #c49a9a, transparent)" }} />

        <div className="relative z-10 max-w-3xl mx-auto">
          {/* Ornament */}
          <div className="flex items-center justify-center gap-4 mb-8 animate-fade-in">
            <div className="h-px w-16" style={{ background: "linear-gradient(90deg, transparent, #c9a84c)" }} />
            <Heart className="w-4 h-4 text-[#c9a84c] fill-[#c9a84c]" />
            <div className="h-px w-16" style={{ background: "linear-gradient(90deg, #c9a84c, transparent)" }} />
          </div>

          <p className="text-sm tracking-[0.3em] text-[#c9a84c] uppercase mb-4 animate-fade-in-up">{t.hero.subtitle}</p>

          <h1 className="text-5xl md:text-7xl text-[#2c2c2c] leading-tight mb-6 animate-fade-in-up delay-200"
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 400, fontStyle: "italic" }}>
            {t.hero.tagline}
          </h1>

          <p className="text-base md:text-lg text-[#5a5a5a] max-w-xl mx-auto leading-relaxed mb-10 animate-fade-in-up delay-400">
            {t.hero.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up delay-600">
            <a href="#contact"
              className="px-8 py-3.5 text-sm tracking-wider uppercase text-white transition-all"
              style={{ background: "linear-gradient(135deg, #c9a84c, #a07830)", letterSpacing: "0.15em" }}>
              {t.hero.cta}
            </a>
            <a href="#gallery"
              className="px-8 py-3.5 text-sm tracking-wider uppercase text-[#c9a84c] border border-[#c9a84c] hover:bg-[#c9a84c]/5 transition-all"
              style={{ letterSpacing: "0.15em" }}>
              {t.hero.ctaSecondary}
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-[#c9a84c]/60 animate-fade-in delay-800">
          <div className="h-12 w-px" style={{ background: "linear-gradient(180deg, transparent, #c9a84c)" }} />
          <ChevronDown className="w-4 h-4" />
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs tracking-[0.3em] text-[#c9a84c] uppercase mb-3">{t.about.label}</p>
            <h2 className="text-4xl md:text-5xl text-[#2c2c2c] mb-6"
              style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 400, fontStyle: "italic" }}>
              {t.about.title}
            </h2>
            <div className="h-px w-16 mx-auto" style={{ background: "linear-gradient(90deg, transparent, #c9a84c, transparent)" }} />
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <p className="text-[#5a5a5a] leading-relaxed text-lg">{t.about.p1}</p>
              <p className="text-[#5a5a5a] leading-relaxed">{t.about.p2}</p>
            </div>

            <div className="grid grid-cols-3 gap-6">
              {[t.about.stat1, t.about.stat2, t.about.stat3].map((s) => (
                <div key={s.label} className="text-center p-6 border border-[#c9a84c]/20 bg-[#faf7f2]">
                  <div className="text-3xl md:text-4xl text-[#c9a84c] mb-2"
                    style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontStyle: "italic" }}>
                    {s.number}
                  </div>
                  <div className="text-xs text-[#5a5a5a] tracking-wider uppercase leading-tight">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24 px-6" style={{ background: "#f5ede0" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs tracking-[0.3em] text-[#c9a84c] uppercase mb-3">{t.services.label}</p>
            <h2 className="text-4xl md:text-5xl text-[#2c2c2c]"
              style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 400, fontStyle: "italic" }}>
              {t.services.title}
            </h2>
            <div className="h-px w-16 mx-auto mt-6" style={{ background: "linear-gradient(90deg, transparent, #c9a84c, transparent)" }} />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.services.items.map((item, i) => (
              <div key={i} className="bg-white p-8 group hover:shadow-lg transition-shadow duration-500">
                <div className="w-10 h-px mb-6" style={{ background: "#c9a84c" }} />
                <h3 className="text-xl text-[#2c2c2c] mb-3"
                  style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 500 }}>
                  {item.title}
                </h3>
                <p className="text-sm text-[#5a5a5a] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs tracking-[0.3em] text-[#c9a84c] uppercase mb-3">{t.gallery.label}</p>
            <h2 className="text-4xl md:text-5xl text-[#2c2c2c] mb-3"
              style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 400, fontStyle: "italic" }}>
              {t.gallery.title}
            </h2>
            <p className="text-sm text-[#5a5a5a] tracking-wider">{t.gallery.subtitle}</p>
            <div className="h-px w-16 mx-auto mt-6" style={{ background: "linear-gradient(90deg, transparent, #c9a84c, transparent)" }} />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {galleryItems.map((item, i) => (
              <div key={i}
                className={`${item.bg} relative overflow-hidden group cursor-pointer`}
                style={{ aspectRatio: i === 0 || i === 5 ? "4/3" : "3/4" }}>
                <div className="absolute inset-0 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: "linear-gradient(0deg, rgba(44,44,44,0.5), transparent)" }}>
                  <span className="text-white text-xs tracking-wider">{item.label}</span>
                </div>
                {/* Placeholder content */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <Heart className="w-8 h-8 text-[#c9a84c]/30" />
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-xs text-[#5a5a5a]/60 mt-6 tracking-wider italic">
            {lang === "hu" ? "Hamarosan valódi fotókkal frissítve" : "Photos coming soon"}
          </p>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="py-24 px-6" style={{ background: "linear-gradient(135deg, #2c2c2c, #3d3320)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs tracking-[0.3em] text-[#c9a84c] uppercase mb-3">{t.testimonials.label}</p>
            <h2 className="text-4xl md:text-5xl text-white"
              style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 400, fontStyle: "italic" }}>
              {t.testimonials.title}
            </h2>
            <div className="h-px w-16 mx-auto mt-6" style={{ background: "linear-gradient(90deg, transparent, #c9a84c, transparent)" }} />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {t.testimonials.items.map((item, i) => (
              <div key={i} className="p-8 border border-[#c9a84c]/20 bg-white/5">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-3 h-3 text-[#c9a84c] fill-[#c9a84c]" />
                  ))}
                </div>
                <p className="text-white/80 text-sm leading-relaxed mb-6 italic">&ldquo;{item.text}&rdquo;</p>
                <div className="h-px mb-4" style={{ background: "linear-gradient(90deg, #c9a84c, transparent)" }} />
                <div>
                  <div className="text-white font-medium text-sm">{item.name}</div>
                  <div className="text-[#c9a84c]/70 text-xs tracking-wider mt-0.5">{item.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-24 px-6 bg-[#faf7f2]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs tracking-[0.3em] text-[#c9a84c] uppercase mb-3">{t.contact.label}</p>
            <h2 className="text-4xl md:text-5xl text-[#2c2c2c] mb-3"
              style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 400, fontStyle: "italic" }}>
              {t.contact.title}
            </h2>
            <p className="text-sm text-[#5a5a5a]">{t.contact.subtitle}</p>
            <div className="h-px w-16 mx-auto mt-6" style={{ background: "linear-gradient(90deg, transparent, #c9a84c, transparent)" }} />
          </div>

          <div className="grid md:grid-cols-2 gap-16">
            {/* Form */}
            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs tracking-wider text-[#5a5a5a] uppercase mb-1.5">{t.contact.name}</label>
                  <input className="w-full bg-white border border-[#c9a84c]/30 px-4 py-3 text-sm text-[#2c2c2c] focus:outline-none focus:border-[#c9a84c] transition-colors" />
                </div>
                <div>
                  <label className="block text-xs tracking-wider text-[#5a5a5a] uppercase mb-1.5">{t.contact.email}</label>
                  <input type="email" className="w-full bg-white border border-[#c9a84c]/30 px-4 py-3 text-sm text-[#2c2c2c] focus:outline-none focus:border-[#c9a84c] transition-colors" />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs tracking-wider text-[#5a5a5a] uppercase mb-1.5">{t.contact.phone}</label>
                  <input type="tel" className="w-full bg-white border border-[#c9a84c]/30 px-4 py-3 text-sm text-[#2c2c2c] focus:outline-none focus:border-[#c9a84c] transition-colors" />
                </div>
                <div>
                  <label className="block text-xs tracking-wider text-[#5a5a5a] uppercase mb-1.5">{t.contact.eventType}</label>
                  <select className="w-full bg-white border border-[#c9a84c]/30 px-4 py-3 text-sm text-[#2c2c2c] focus:outline-none focus:border-[#c9a84c] transition-colors appearance-none">
                    <option value="">—</option>
                    {t.contact.eventTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs tracking-wider text-[#5a5a5a] uppercase mb-1.5">{t.contact.message}</label>
                <textarea rows={5} placeholder={t.contact.messagePlaceholder}
                  className="w-full bg-white border border-[#c9a84c]/30 px-4 py-3 text-sm text-[#2c2c2c] focus:outline-none focus:border-[#c9a84c] transition-colors resize-none" />
              </div>
              <button type="submit"
                className="w-full py-4 text-sm tracking-[0.2em] uppercase text-white transition-opacity hover:opacity-90"
                style={{ background: "linear-gradient(135deg, #c9a84c, #a07830)" }}>
                {t.contact.send}
              </button>
            </form>

            {/* Info */}
            <div className="space-y-10">
              <div>
                <div className="flex items-center gap-4 mb-8">
                  <div className="h-px flex-1" style={{ background: "linear-gradient(90deg, #c9a84c, transparent)" }} />
                  <Heart className="w-4 h-4 text-[#c9a84c] fill-[#c9a84c] shrink-0" />
                </div>
                <div className="space-y-6">
                  {[
                    { icon: <MapPin className="w-4 h-4" />, text: t.contact.address },
                    { icon: <Phone className="w-4 h-4" />, text: t.contact.phoneNum },
                    { icon: <Mail className="w-4 h-4" />, text: t.contact.emailAddr },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="text-[#c9a84c]">{item.icon}</div>
                      <span className="text-sm text-[#5a5a5a]">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs tracking-[0.2em] text-[#5a5a5a] uppercase mb-4">
                  {lang === "hu" ? "Kövessen minket" : "Follow us"}
                </p>
                <div className="flex gap-4">
                  {[
                    { icon: <Share2 className="w-4 h-4" />, label: "Instagram" },
                    { icon: <Share2 className="w-4 h-4" />, label: "Facebook" },
                  ].map((s) => (
                    <a key={s.label} href="#"
                      className="w-10 h-10 border border-[#c9a84c]/40 flex items-center justify-center text-[#c9a84c] hover:bg-[#c9a84c] hover:text-white transition-all"
                      aria-label={s.label}>
                      {s.icon}
                    </a>
                  ))}
                </div>
              </div>

              <div className="p-6 border border-[#c9a84c]/20 bg-white">
                <p className="text-[#2c2c2c] text-sm leading-relaxed italic"
                  style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "1.1rem" }}>
                  {lang === "hu"
                    ? <>&bdquo;Minden nagy rendezvény egy kis álommal kezdődik.&rdquo;</>
                    : <>&ldquo;Every great event begins with a small dream.&rdquo;</>}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 px-6 text-center" style={{ background: "#2c2c2c" }}>
        <div className="max-w-6xl mx-auto">
          <a href="#" className="text-2xl tracking-widest text-[#c9a84c] uppercase block mb-3"
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}>
            D·Events
          </a>
          <p className="text-xs text-white/40 tracking-wider italic mb-6">{t.footer.tagline}</p>
          <div className="h-px w-16 mx-auto mb-6" style={{ background: "linear-gradient(90deg, transparent, #c9a84c, transparent)" }} />
          <p className="text-xs text-white/30 tracking-wider">{t.footer.copy}</p>
        </div>
      </footer>

    </div>
  )
}
