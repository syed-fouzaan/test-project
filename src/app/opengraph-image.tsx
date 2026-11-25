import { ImageResponse } from "next/og";
import { invite } from "@/data/invite";

export const alt = "Nikah of Zeba Kausar & Mohammed Yasin — 19 December 2026";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#FBF8F2",
          border: "18px solid #3A5236",
          padding: "48px",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            border: "2px solid #B28B45",
            borderRadius: "24px",
            padding: "40px",
            backgroundColor: "#FBF8F2",
          }}
        >
          <div
            style={{
              fontSize: 22,
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              color: "#557050",
              marginBottom: 18,
            }}
          >
            Nikah Invitation
          </div>

          <div
            style={{
              fontSize: 64,
              fontWeight: 700,
              color: "#1E2A1D",
              textAlign: "center",
              lineHeight: 1.15,
            }}
          >
            {invite.bride.name}
          </div>

          <div
            style={{
              fontSize: 40,
              color: "#B28B45",
              margin: "10px 0",
            }}
          >
            &amp;
          </div>

          <div
            style={{
              fontSize: 58,
              fontWeight: 700,
              color: "#1E2A1D",
              textAlign: "center",
              lineHeight: 1.15,
            }}
          >
            {invite.groom.name}
          </div>

          <div
            style={{
              display: "flex",
              marginTop: 32,
              padding: "12px 32px",
              borderRadius: "9999px",
              backgroundColor: "#3A5236",
              color: "#FBF8F2",
              fontSize: 24,
              letterSpacing: "0.08em",
            }}
          >
            {`Saturday, 19 December 2026 • 11:45 AM • ${invite.event.venue.name}, Hubli`}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
