import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Great_Vibes, DM_Sans } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-great-vibes",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-dm-sans",
  display: "swap",
});

const siteUrl = "https://zeba-yasin.vercel.app"; // update before launch

export const metadata: Metadata = {
  title: "Nikah Invitation | Zeba & Yasin | 19 December 2026",
  description:
    "Insha Allah, you are warmly invited to the Nikah of Zeba Kausar and Mohammed Yasin on Saturday, 19 December 2026 at Arsh Garden, Hubli.",
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: "Nikah Invitation | Zeba & Yasin | 19 December 2026",
    description:
      "Insha Allah, you are warmly invited to the Nikah of Zeba Kausar and Mohammed Yasin on Saturday, 19 December 2026 at Arsh Garden, Hubli.",
    url: siteUrl,
    siteName: "Nikah Invite",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nikah Invitation | Zeba & Yasin | 19 December 2026",
    description:
      "Insha Allah, you are warmly invited to the Nikah of Zeba Kausar and Mohammed Yasin on Saturday, 19 December 2026 at Arsh Garden, Hubli.",
  },
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#4B6044",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${greatVibes.variable} ${dmSans.variable} h-full antialiased`}
    >
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="h-full">{children}</body>
    </html>
  );
}
