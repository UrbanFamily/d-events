import type { MetadataRoute } from "next"
import { SERVICES } from "@/lib/services"
import { POSTS } from "@/lib/blog"
import { PORTFOLIO } from "@/lib/portfolio"
import { SITE, absoluteUrl } from "@/lib/site"

export default function sitemap(): MetadataRoute.Sitemap {
  const home = { languages: { hu: absoluteUrl("/"), en: absoluteUrl("/en") } }
  return [
    { url: absoluteUrl("/"), changeFrequency: "monthly", priority: 1, alternates: home },
    { url: absoluteUrl("/en"), changeFrequency: "monthly", priority: 0.7, alternates: home },
    ...SERVICES.map((s) => ({ url: absoluteUrl(`/${s.slug}`), changeFrequency: "monthly" as const, priority: 0.9 })),
    { url: absoluteUrl("/ajanlatkeres"), changeFrequency: "yearly", priority: 0.8 },
    { url: absoluteUrl("/blog"), changeFrequency: "weekly", priority: 0.6 },
    ...POSTS.map((p) => ({ url: absoluteUrl(`/blog/${p.slug}`), lastModified: new Date(p.updated || p.published), changeFrequency: "yearly" as const, priority: 0.6 })),
    ...(PORTFOLIO.length ? [{ url: absoluteUrl("/referenciak"), changeFrequency: "monthly" as const, priority: 0.7 }] : []),
    ...(SITE.calLink ? [{ url: absoluteUrl("/konzultacio"), changeFrequency: "yearly" as const, priority: 0.5 }] : []),
    { url: absoluteUrl("/adatvedelem"), changeFrequency: "yearly", priority: 0.2 },
  ]
}
