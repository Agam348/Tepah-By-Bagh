import type React from "react"
import type { Metadata } from "next"
import { Cormorant_Garamond } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const cormorant = Cormorant_Garamond({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"]
})

export const metadata: Metadata = {
  title: "Tepah by The Bagh - Coffee, Bakes, Global Plates & Cocktails",
  description:
    "Experience the finest coffee, artisan bakes, global cuisine, and handcrafted cocktails at Tepah by The Bagh in Amritsar. Open everyday 12pm-1am.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${cormorant.className} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
