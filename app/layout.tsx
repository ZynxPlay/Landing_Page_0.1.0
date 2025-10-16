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
    "Discover and play amazing indie games on ZynxPlay, the ultimate platform for independent game developers and players.",
  generator: "ZynxPlay Landing Page",
  keywords: ["indie games", "gaming platform", "game discovery", "ZynxPlay"],
  authors: [{ name: "Tutankhamal" }, { name: "ZynxPlay" }],
  openGraph: {
    title: "ZynxPlay - A Indie Games Platform",
    description:
      "Discover and play amazing indie games on ZynxPlay, the ultimate platform for independent game developers and players.",
    url: "https://zynxplay.com",
    siteName: "ZynxPlay",
    images: [
      {
        url: "https://qyucubbl29wl9pia.public.blob.vercel-storage.com/zynxplay_banner_bg_transparent.webp",
        width: 680,
        height: 240,
        alt: "ZynxPlay - A Indie Games Platform",
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
    images: ["https://qyucubbl29wl9pia.public.blob.vercel-storage.com/zynxplay_banner_bg_transparent.webp"],
  },
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
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
