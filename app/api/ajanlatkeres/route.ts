import { SITE } from "@/lib/site"

/**
 * Delivers a quote request from the wizard by email, through Resend.
 *
 * Configuration (Vercel → Project → Settings → Environment Variables):
 *  - RESEND_API_KEY      required; without it the request is refused with 503
 *                        and the wizard shows the email address instead.
 *  - INQUIRY_TO_EMAIL    where requests go; defaults to the site's contact email.
 *  - RESEND_FROM         a sender on a domain verified in Resend, e.g.
 *                        "D-Events <ajanlat@d-events.hu>". Until the domain is
 *                        verified, Resend only allows onboarding@resend.dev, and
 *                        only to the account owner's address — enough for the
 *                        inquiry itself, so the confirmation to the visitor is
 *                        sent only once RESEND_FROM is set.
 */

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MIN_FILL_MS = 3_000

type Inquiry = {
  lang: "hu" | "en"
  typeLabel: string
  date: string
  flexible: boolean
  location: string
  guests: number
  budget: string
  needs: string[]
  message: string
  name: string
  email: string
  phone: string
}

const clip = (value: unknown, max: number) => (typeof value === "string" ? value.trim().slice(0, max) : "")

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[ch] as string)

const parse = (body: Record<string, unknown>): Inquiry | null => {
  const inquiry: Inquiry = {
    lang: body.lang === "en" ? "en" : "hu",
    typeLabel: clip(body.typeLabel, 60),
    date: /^\d{4}-\d{2}-\d{2}$/.test(String(body.date || "")) ? String(body.date) : "",
    flexible: body.flexible === true,
    location: clip(body.location, 200),
    guests: Math.min(Math.max(Number(body.guests) || 0, 1), 2000),
    budget: clip(body.budget, 40),
    needs: Array.isArray(body.needs) ? body.needs.slice(0, 12).map((n) => clip(n, 60)).filter(Boolean) : [],
    message: clip(body.message, 3000),
    name: clip(body.name, 120),
    email: clip(body.email, 200),
    phone: clip(body.phone, 40),
  }
  if (!inquiry.name || !EMAIL.test(inquiry.email) || !inquiry.typeLabel) return null
  return inquiry
}

const sendEmail = async (payload: Record<string, unknown>) => {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
  if (!res.ok) throw new Error(`Resend ${res.status}: ${(await res.text()).slice(0, 200)}`)
}

const rows = (q: Inquiry) =>
  [
    ["Rendezvény", q.typeLabel],
    ["Dátum", q.flexible ? "rugalmas / még nincs" : q.date || "—"],
    ["Helyszín", q.location || "—"],
    ["Vendégek", String(q.guests)],
    ["Keret", q.budget || "—"],
    ["Igények", q.needs.join(", ") || "—"],
    ["Név", q.name],
    ["E-mail", q.email],
    ["Telefon", q.phone || "—"],
    ["Nyelv", q.lang === "en" ? "angol" : "magyar"],
  ] as const

export async function POST(request: Request) {
  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: "invalid_json" }, { status: 400 })
  }

  // A filled honeypot or a form sent faster than a person can type is a bot.
  // Answer as if it worked, so it learns nothing.
  if (clip(body.website, 200) || Number(body.elapsedMs) < MIN_FILL_MS) {
    return Response.json({ ok: true })
  }

  const inquiry = parse(body)
  if (!inquiry) return Response.json({ error: "invalid_inquiry" }, { status: 400 })

  if (!process.env.RESEND_API_KEY) {
    console.error("[ajanlatkeres] RESEND_API_KEY is not set; inquiry not delivered")
    return Response.json({ error: "not_configured" }, { status: 503 })
  }

  const to = process.env.INQUIRY_TO_EMAIL || SITE.contactEmail
  const from = process.env.RESEND_FROM || "D-Events weboldal <onboarding@resend.dev>"
  const table = rows(inquiry)
    .map(([k, v]) => `<tr><td style="padding:6px 12px 6px 0;color:#888;vertical-align:top">${k}</td><td style="padding:6px 0">${escapeHtml(v)}</td></tr>`)
    .join("")
  const messageHtml = inquiry.message ? `<p style="margin-top:16px;white-space:pre-wrap">${escapeHtml(inquiry.message)}</p>` : ""

  try {
    await sendEmail({
      from,
      to: [to],
      reply_to: inquiry.email,
      subject: `Új ajánlatkérés: ${inquiry.typeLabel} – ${inquiry.name}`,
      html: `<h2 style="font-family:Georgia,serif">Új ajánlatkérés a d-events.hu-ról</h2><table>${table}</table>${messageHtml}<p style="color:#888;font-size:12px">Válaszhoz elég a „Válasz” gomb: a levél az ügyfélnek megy.</p>`,
      text: rows(inquiry).map(([k, v]) => `${k}: ${v}`).join("\n") + (inquiry.message ? `\n\n${inquiry.message}` : ""),
    })
  } catch (err) {
    console.error("[ajanlatkeres] delivery failed", err)
    return Response.json({ error: "delivery_failed" }, { status: 502 })
  }

  // The visitor's confirmation needs a verified sending domain; without one
  // Resend refuses any recipient but the account owner.
  if (process.env.RESEND_FROM) {
    const hu = inquiry.lang === "hu"
    await sendEmail({
      from,
      to: [inquiry.email],
      reply_to: to,
      subject: hu ? "Megkaptuk az ajánlatkérését – D-Events" : "We've received your request – D-Events",
      text: hu
        ? `Kedves ${inquiry.name}!\n\nKöszönjük, megkaptuk az ajánlatkérését (${inquiry.typeLabel}). 24 órán belül jelentkezünk.\n\nÜdvözlettel:\nD-Events`
        : `Dear ${inquiry.name},\n\nThank you, we've received your request (${inquiry.typeLabel}). We'll be in touch within 24 hours.\n\nBest regards,\nD-Events`,
    }).catch((err) => console.error("[ajanlatkeres] confirmation failed", err))
  }

  return Response.json({ ok: true })
}
