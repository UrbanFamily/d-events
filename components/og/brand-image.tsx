import { ImageResponse } from "next/og"

export const ogSize = { width: 1200, height: 630 }

/** The card shown when a page is shared: wordmark, gold rule, one line. */
export function brandImage(tagline: string) {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg,#2c2c2c,#3d3320)", color: "#faf7f2" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          <div style={{ fontSize: 150, fontStyle: "italic", color: "#C9A84C", lineHeight: 1 }}>D</div>
          <div style={{ width: 2, height: 120, background: "#C9A84C" }} />
          <div style={{ fontSize: 56, letterSpacing: 18 }}>EVENTS</div>
        </div>
        <div style={{ marginTop: 48, width: 260, height: 2, background: "#C9A84C" }} />
        <div style={{ marginTop: 36, fontSize: 40, color: "#e4c97e" }}>{tagline}</div>
        <div style={{ marginTop: 18, fontSize: 26, color: "#bdbdbd" }}>d-events.hu</div>
      </div>
    ),
    ogSize
  )
}
