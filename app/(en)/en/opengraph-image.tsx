import { brandImage, ogSize } from "@/components/og/brand-image"

export const alt = "D-Events – wedding and event planning"
export const size = ogSize
export const contentType = "image/png"

export default function Image() {
  return brandImage("Wedding & event planning · Budapest, Hungary")
}
