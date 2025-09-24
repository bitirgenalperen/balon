import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "XCeleb - Celebrate Every Special Moment",
  description:
    "Transform your celebrations with custom video messages and discover perfect gift ideas that make every special day unforgettable.",
  generator: "v0.app",
  keywords: ["celebrations", "custom videos", "gift ideas", "special occasions", "birthdays", "anniversaries"],
  authors: [{ name: "XCeleb Team" }],
  openGraph: {
    title: "XCeleb - Celebrate Every Special Moment",
    description: "Transform your celebrations with custom video messages and discover perfect gift ideas.",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
