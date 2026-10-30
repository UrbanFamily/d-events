import { SITE, absoluteUrl } from "@/lib/site"

// Structured data shared by the pages. Only facts that are true belong here:
// no telephone (the one on the page is a placeholder) and no ratings (Google
// forbids marking up reviews that are not real customer reviews).

export const businessId = absoluteUrl("/#business")

export const localBusiness = () => ({
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": businessId,
  name: SITE.name,
  url: SITE.url,
  email: SITE.contactEmail,
  image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
  logo: absoluteUrl("/logo.svg"),
  description:
    "Esküvőszervezés, céges és magánrendezvények szervezése, dekoráció Budapesten, Szigetszentmiklóson és Pest megyében.",
  address: {
    "@type": "PostalAddress",
    addressLocality: SITE.locality,
    addressRegion: SITE.region,
    addressCountry: SITE.country,
  },
  areaServed: SITE.areaServed.map((name) => ({ "@type": "Place", name })),
  knowsLanguage: ["hu", "en"],
  ...(SITE.social.length ? { sameAs: SITE.social.map((s) => s.url) } : {}),
})

export const website = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": absoluteUrl("/#website"),
  name: SITE.name,
  url: SITE.url,
  inLanguage: ["hu", "en"],
  publisher: { "@id": businessId },
})

export const breadcrumbs = (items: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: item.name,
    item: absoluteUrl(item.path),
  })),
})
