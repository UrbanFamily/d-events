// Real events only, with the client's permission and your own photos.
// The /referenciak page and its sitemap entry appear once this has entries.

export type PortfolioItem = {
  slug: string
  title: string
  /** e.g. "Esküvő", "Céges gála" */
  type: string
  /** Venue and town, e.g. "Kastély, Szigetszentmiklós" */
  place: string
  date: string
  guests?: number
  summary: string
  /** Paths under /public, e.g. "/referenciak/anna-peter-1.jpg" */
  photos: string[]
}

export const PORTFOLIO: PortfolioItem[] = []
