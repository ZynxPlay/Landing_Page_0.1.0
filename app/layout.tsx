import type React from "react"
import type { Metadata } from "next"
import { Orbitron, Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  title: "ZynxPlay - A Indie Games Platform",
  description:
    "A Indie Games Platform",
  keywords: ["indie games", "gaming platform", "game discovery", "ZynxPlay", "Discord", "embedded app"],
  authors: [{ name: "Tutankhamal" }, { name: "ZynxPlay" }],
  creator: "Tutankhamal",
  publisher: "ZynxPlay",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  openGraph: {
    title: "ZynxPlay - A Indie Games Platform",
    description:
      "Discover and play amazing indie games on ZynxPlay, the ultimate platform for independent game developers and players.",
    url: "https://zynxplay.com",
    siteName: "ZynxPlay",
    images: [
      {
        url: "https://i.imgur.com/bjYGqOM.gif",
        width: 680,
        height: 240,
        alt: "ZynxPlay - A Indie Games Platform",
        type: "image/webp",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ZynxPlay - A Indie Games Platform",
    description:
      "Discover and play amazing indie games on ZynxPlay, the ultimate platform for independent game developers and players.",
    creator: "@Tutankhamal",
    images: [
      {
        url: "https://i.imgur.com/bjYGqOM.gif",
        alt: "ZynxPlay - A Indie Games Platform",
      },
    ],
  },
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
    shortcut: "/favicon.png",
  },
  manifest: "/manifest.json",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${orbitron.variable} ${inter.variable}`}>
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
