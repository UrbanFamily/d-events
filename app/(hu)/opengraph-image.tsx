import { brandImage, ogSize } from "@/components/og/brand-image"

export const alt = "D-Events – esküvő- és rendezvényszervezés"
export const size = ogSize
export const contentType = "image/png"

export default function Image() {
  return brandImage("Esküvő- és rendezvényszervezés · Budapest, Pest megye")
}
