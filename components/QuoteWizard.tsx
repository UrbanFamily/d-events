"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { ArrowLeft, ArrowRight, Check, Loader2 } from "lucide-react"
import { SITE } from "@/lib/site"

/**
 * The quote request, one short question at a time.
 *
 * It replaced a form whose submit handler only called preventDefault: every
 * inquiry sent from the site was lost. A few small steps also qualify the
 * request (date, size, budget) so the first reply can already be an offer.
 */

export type EventType = "wedding" | "corporate" | "private" | "decor" | "other"

const COPY = {
  hu: {
    steps: ["Rendezvény", "Időpont", "Méret", "Részletek", "Elérhetőség"],
    typeTitle: "Milyen rendezvényt tervez?",
    types: { wedding: "Esküvő", corporate: "Céges rendezvény", private: "Magánrendezvény", decor: "Csak dekoráció", other: "Egyéb" },
    dateTitle: "Mikor és hol lenne?",
    date: "Tervezett dátum",
    dateFlexible: "Még nincs pontos dátum / rugalmas",
    location: "Helyszín vagy település (ha már tudja)",
    locationPlaceholder: "pl. Budapest, Szigetszentmiklós, még keresünk…",
    sizeTitle: "Mekkora rendezvény?",
    guests: "Vendégek száma",
    budget: "Tervezett keret",
    budgets: ["Még nem tudom", "1 M Ft alatt", "1–3 M Ft", "3–6 M Ft", "6–10 M Ft", "10 M Ft felett"],
    detailsTitle: "Miben segíthetünk?",
    needs: ["Teljes körű szervezés", "Helyszínkeresés", "Dekoráció & virág", "Catering", "Fotó & videó", "Zene & program", "Napi koordináció"],
    message: "Pár szó az elképzeléséről (nem kötelező)",
    messagePlaceholder: "Stílus, hangulat, ami fontos Önöknek…",
    contactTitle: "Hová küldhetjük az ajánlatot?",
    name: "Név",
    email: "E-mail cím",
    phone: "Telefonszám (nem kötelező)",
    consent: "Hozzájárulok, hogy a megadott adatokat az ajánlatadás céljából kezeljék.",
    privacy: "Adatkezelési tájékoztató",
    back: "Vissza",
    next: "Tovább",
    send: "Ajánlatot kérek",
    sending: "Küldés…",
    required: "Kérjük, töltse ki a csillaggal jelölt mezőket.",
    invalidEmail: "Kérjük, ellenőrizze az e-mail címet.",
    consentRequired: "Az ajánlatkéréshez szükséges a hozzájárulás.",
    failed: "Most nem sikerült elküldeni. Kérjük, írjon nekünk közvetlenül:",
    doneTitle: "Köszönjük, megkaptuk!",
    doneText: "24 órán belül jelentkezünk – addig is nézzen körül a blogunkon, vagy foglaljon egy ingyenes konzultációt.",
    book: "Ingyenes konzultáció foglalása",
  },
  en: {
    steps: ["Event", "Date", "Size", "Details", "Contact"],
    typeTitle: "What are you planning?",
    types: { wedding: "Wedding", corporate: "Corporate event", private: "Private celebration", decor: "Décor only", other: "Other" },
    dateTitle: "When and where?",
    date: "Planned date",
    dateFlexible: "No exact date yet / flexible",
    location: "Venue or town (if you know it)",
    locationPlaceholder: "e.g. Budapest, still looking…",
    sizeTitle: "How big is the event?",
    guests: "Number of guests",
    budget: "Planned budget",
    budgets: ["Not sure yet", "Under HUF 1M", "HUF 1–3M", "HUF 3–6M", "HUF 6–10M", "Over HUF 10M"],
    detailsTitle: "How can we help?",
    needs: ["Full planning", "Venue search", "Décor & flowers", "Catering", "Photo & video", "Music & entertainment", "Day-of coordination"],
    message: "A few words about your vision (optional)",
    messagePlaceholder: "Style, mood, what matters to you…",
    contactTitle: "Where should we send the proposal?",
    name: "Name",
    email: "Email address",
    phone: "Phone (optional)",
    consent: "I agree that my details are processed to prepare a proposal.",
    privacy: "Privacy notice",
    back: "Back",
    next: "Next",
    send: "Request a quote",
    sending: "Sending…",
    required: "Please fill in the fields marked with an asterisk.",
    invalidEmail: "Please check the email address.",
    consentRequired: "Consent is needed to send the request.",
    failed: "We couldn't send it just now. Please email us directly:",
    doneTitle: "Thank you, we've got it!",
    doneText: "We'll be in touch within 24 hours – meanwhile, book a free consultation if you'd like to talk sooner.",
    book: "Book a free consultation",
  },
} as const

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function QuoteWizard({
  lang = "hu",
  initialType,
  initialGuests,
}: {
  lang?: "hu" | "en"
  initialType?: EventType
  initialGuests?: number
}) {
  const c = COPY[lang]
  const [step, setStep] = useState(initialType ? 1 : 0)
  const [type, setType] = useState<EventType | "">(initialType || "")
  const [date, setDate] = useState("")
  const [flexible, setFlexible] = useState(false)
  const [location, setLocation] = useState("")
  const [guests, setGuests] = useState(initialGuests || 80)
  const [budget, setBudget] = useState(0)
  const [needs, setNeeds] = useState<string[]>([])
  const [message, setMessage] = useState("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [consent, setConsent] = useState(false)
  const [website, setWebsite] = useState("") // honeypot: people never see it
  const [error, setError] = useState("")
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "failed">("idle")
  const startedAt = useRef(0)
  const top = useRef<HTMLDivElement>(null)

  // When the form was opened: a request sent seconds later is a bot.
  useEffect(() => { startedAt.current = Date.now() }, [])

  // The budget estimator above can hand over its numbers; follow them when
  // they change (adjusting state during render, as React recommends).
  const [handedOver, setHandedOver] = useState({ initialType, initialGuests })
  if (handedOver.initialType !== initialType || handedOver.initialGuests !== initialGuests) {
    setHandedOver({ initialType, initialGuests })
    if (initialType) setType(initialType)
    if (initialGuests) setGuests(initialGuests)
  }

  const today = useMemo(() => new Date().toISOString().slice(0, 10), [])

  const go = (next: number) => {
    setError("")
    setStep(next)
    top.current?.scrollIntoView({ behavior: "smooth", block: "nearest" })
  }

  const canLeave = (s: number) => {
    if (s === 0 && !type) return c.required
    if (s === 1 && !date && !flexible) return c.required
    return ""
  }

  const next = () => {
    const problem = canLeave(step)
    if (problem) return setError(problem)
    go(step + 1)
  }

  const submit = async () => {
    if (!name.trim() || !email.trim()) return setError(c.required)
    if (!EMAIL.test(email.trim())) return setError(c.invalidEmail)
    if (!consent) return setError(c.consentRequired)
    setError("")
    setStatus("sending")
    try {
      const res = await fetch("/api/ajanlatkeres", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lang,
          type,
          typeLabel: type ? c.types[type] : "",
          date: flexible ? "" : date,
          flexible,
          location,
          guests,
          budget: c.budgets[budget],
          needs,
          message,
          name,
          email,
          phone,
          website,
          elapsedMs: Date.now() - startedAt.current,
        }),
      })
      if (!res.ok) throw new Error(String(res.status))
      setStatus("done")
    } catch {
      setStatus("failed")
    }
  }

  const field = "w-full bg-white border border-[#C9A84C]/30 px-4 py-3 text-sm text-[#2c2c2c] focus:outline-none focus:border-[#C9A84C] transition-colors"
  const label = "block text-xs tracking-wider text-[#5a5a5a] uppercase mb-1.5"
  const heading = "text-2xl text-[#2C2C2C] mb-6"
  const serif = { fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 500 }
  const consultHref = SITE.calLink ? (lang === "hu" ? "/konzultacio" : "/en#contact") : null

  if (status === "done") {
    return (
      <div className="bg-white border border-[#C9A84C]/20 p-8 md:p-10 text-center" role="status">
        <div className="mx-auto mb-5 w-12 h-12 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg,#C9A84C,#A07830)" }}>
          <Check className="w-6 h-6 text-white" />
        </div>
        <h3 className={heading} style={serif}>{c.doneTitle}</h3>
        <p className="text-sm text-[#5a5a5a] leading-relaxed mb-6">{c.doneText}</p>
        {consultHref && (
          <a href={consultHref} className="inline-block px-7 py-3 text-xs tracking-[0.2em] uppercase text-white hover:opacity-90"
            style={{ background: "linear-gradient(135deg,#C9A84C,#A07830)" }}>{c.book}</a>
        )}
      </div>
    )
  }

  return (
    <div ref={top} className="relative bg-white border border-[#C9A84C]/20 p-6 md:p-10 scroll-mt-24">
      {/* progress */}
      <ol className="flex items-center gap-2 mb-8" aria-label="progress">
        {c.steps.map((s, i) => (
          <li key={s} className="flex-1">
            <div className="h-0.5 mb-2 transition-colors" style={{ background: i <= step ? "#C9A84C" : "rgba(201,168,76,0.2)" }} />
            <span className={`hidden sm:block text-[10px] tracking-[0.15em] uppercase ${i === step ? "text-[#A07830]" : "text-[#9a9a9a]"}`}
              aria-current={i === step ? "step" : undefined}>{s}</span>
          </li>
        ))}
      </ol>

      {step === 0 && (
        <fieldset>
          <legend className={heading} style={serif}>{c.typeTitle} *</legend>
          <div className="grid sm:grid-cols-2 gap-3">
            {(Object.keys(c.types) as EventType[]).map((k) => (
              <button key={k} type="button" onClick={() => { setType(k); setError(""); go(1) }}
                className={`text-left px-5 py-4 border transition-all ${type === k ? "border-[#C9A84C] bg-[#faf7f2]" : "border-[#C9A84C]/25 hover:border-[#C9A84C]/60"}`}
                aria-pressed={type === k}>
                <span className="text-[#2c2c2c]">{c.types[k]}</span>
              </button>
            ))}
          </div>
        </fieldset>
      )}

      {step === 1 && (
        <div className="space-y-5">
          <h3 className={heading} style={serif}>{c.dateTitle}</h3>
          <div>
            <label className={label} htmlFor="qw-date">{c.date} *</label>
            <input id="qw-date" type="date" min={today} value={date} disabled={flexible}
              onChange={(e) => setDate(e.target.value)} className={`${field} disabled:opacity-50`} />
          </div>
          <label className="flex items-center gap-3 text-sm text-[#5a5a5a] cursor-pointer">
            <input type="checkbox" checked={flexible} onChange={(e) => setFlexible(e.target.checked)} className="accent-[#C9A84C] w-4 h-4" />
            {c.dateFlexible}
          </label>
          <div>
            <label className={label} htmlFor="qw-location">{c.location}</label>
            <input id="qw-location" value={location} onChange={(e) => setLocation(e.target.value)} placeholder={c.locationPlaceholder} className={field} maxLength={200} />
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6">
          <h3 className={heading} style={serif}>{c.sizeTitle}</h3>
          <div>
            <div className="flex justify-between items-baseline mb-2">
              <label className={label} htmlFor="qw-guests">{c.guests}</label>
              <span className="text-2xl text-[#A07830]" style={serif}>{guests}{guests >= 500 ? "+" : ""}</span>
            </div>
            <input id="qw-guests" type="range" min={10} max={500} step={10} value={guests}
              onChange={(e) => setGuests(Number(e.target.value))} className="w-full accent-[#C9A84C]" />
          </div>
          <div>
            <span className={label}>{c.budget}</span>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {c.budgets.map((b, i) => (
                <button key={b} type="button" onClick={() => setBudget(i)} aria-pressed={budget === i}
                  className={`px-3 py-2.5 text-sm border transition-all ${budget === i ? "border-[#C9A84C] bg-[#faf7f2] text-[#2c2c2c]" : "border-[#C9A84C]/25 text-[#5a5a5a] hover:border-[#C9A84C]/60"}`}>{b}</button>
              ))}
            </div>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-6">
          <h3 className={heading} style={serif}>{c.detailsTitle}</h3>
          <div className="flex flex-wrap gap-2">
            {c.needs.map((n) => {
              const on = needs.includes(n)
              return (
                <button key={n} type="button" aria-pressed={on}
                  onClick={() => setNeeds(on ? needs.filter((x) => x !== n) : [...needs, n])}
                  className={`px-4 py-2 text-sm border rounded-full transition-all ${on ? "border-[#C9A84C] bg-[#C9A84C] text-white" : "border-[#C9A84C]/30 text-[#5a5a5a] hover:border-[#C9A84C]/70"}`}>{n}</button>
              )
            })}
          </div>
          <div>
            <label className={label} htmlFor="qw-message">{c.message}</label>
            <textarea id="qw-message" rows={4} value={message} onChange={(e) => setMessage(e.target.value)}
              placeholder={c.messagePlaceholder} maxLength={3000} className={`${field} resize-none`} />
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="space-y-5">
          <h3 className={heading} style={serif}>{c.contactTitle}</h3>
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className={label} htmlFor="qw-name">{c.name} *</label>
              <input id="qw-name" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} className={field} maxLength={120} />
            </div>
            <div>
              <label className={label} htmlFor="qw-email">{c.email} *</label>
              <input id="qw-email" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} className={field} maxLength={200} />
            </div>
          </div>
          <div>
            <label className={label} htmlFor="qw-phone">{c.phone}</label>
            <input id="qw-phone" type="tel" autoComplete="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className={field} maxLength={40} />
          </div>
          {/* Honeypot. Hidden from people and from assistive tech; bots fill it. */}
          <div aria-hidden="true" className="absolute -left-[9999px] w-px h-px overflow-hidden">
            <label htmlFor="qw-website">Website</label>
            <input id="qw-website" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
          </div>
          <label className="flex items-start gap-3 text-sm text-[#5a5a5a] cursor-pointer">
            <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="accent-[#C9A84C] w-4 h-4 mt-0.5 shrink-0" />
            <span>{c.consent} <a href="/adatvedelem" className="underline hover:text-[#A07830]" target="_blank" rel="noopener">{c.privacy}</a></span>
          </label>
        </div>
      )}

      {error && <p className="mt-5 text-sm text-[#a0442c]" role="alert">{error}</p>}
      {status === "failed" && (
        <p className="mt-5 text-sm text-[#a0442c]" role="alert">
          {c.failed} <a className="underline" href={`mailto:${SITE.contactEmail}`}>{SITE.contactEmail}</a>
        </p>
      )}

      <div className="mt-8 flex items-center justify-between gap-4">
        {step > 0 ? (
          <button type="button" onClick={() => go(step - 1)} className="flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-[#5a5a5a] hover:text-[#A07830]">
            <ArrowLeft className="w-4 h-4" /> {c.back}
          </button>
        ) : <span />}
        {step < 4 ? (
          step > 0 && (
            <button type="button" onClick={next} className="flex items-center gap-2 px-7 py-3 text-xs tracking-[0.2em] uppercase text-white hover:opacity-90"
              style={{ background: "linear-gradient(135deg,#C9A84C,#A07830)" }}>
              {c.next} <ArrowRight className="w-4 h-4" />
            </button>
          )
        ) : (
          <button type="button" onClick={submit} disabled={status === "sending"}
            className="flex items-center gap-2 px-7 py-3 text-xs tracking-[0.2em] uppercase text-white hover:opacity-90 disabled:opacity-60"
            style={{ background: "linear-gradient(135deg,#C9A84C,#A07830)" }}>
            {status === "sending" ? <><Loader2 className="w-4 h-4 animate-spin" /> {c.sending}</> : c.send}
          </button>
        )}
      </div>
    </div>
  )
}
