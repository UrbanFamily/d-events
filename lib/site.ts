// One place for the facts every page repeats: the address the site lives at,
// how to reach the business, where it works. Search engines compare these
// across pages (and against the Google Business Profile), so they must match.

export const SITE = {
  name: "D-Events",
  url: "https://d-events.hu",
  /** Where inquiries are delivered and the address shown on the site. */
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "u.andras07@gmail.com",
  locality: "Szigetszentmiklós",
  region: "Pest megye",
  country: "HU",
  /** Where the business takes events; used in copy and in structured data. */
  areaServed: ["Budapest", "Pest megye", "Szigetszentmiklós", "Csepel-sziget", "Érd", "Budaörs", "Gödöllő", "Szentendre"],
  /**
   * Social profiles. Empty until real ones exist: a link to "#" is a dead end
   * for a visitor and an empty sameAs tells Google nothing.
   */
  social: [] as { label: string; url: string }[],
  /** A Cal.com booking link such as "d-events/konzultacio"; unset hides the embed. */
  calLink: process.env.NEXT_PUBLIC_CAL_LINK || "",
  /** The token from Search Console's HTML-tag verification method. */
  googleVerification: process.env.NEXT_PUBLIC_GSC_VERIFICATION || "",
} as const

export const absoluteUrl = (path = "/") => new URL(path, SITE.url).toString()

/** Serialises JSON-LD for a <script> tag; "<" is escaped so content cannot close it. */
export const jsonLdScript = (data: unknown) => ({ __html: JSON.stringify(data).replace(/</g, "\\u003c") })
