import { jsonLdScript } from "@/lib/site"

export default function JsonLd({ data }: { data: unknown }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(data)} />
}
