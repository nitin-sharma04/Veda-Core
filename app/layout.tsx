import type React from "react"
import "@/app/globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { MainHeader } from "@/components/main-header"
import SplineBackground from "@/components/spline-background"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Veda - Holistic Health Platform",
  description: "Your personalized Ayurvedic health companion",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {/* Spline 3D Background */}
          <SplineBackground sceneUrl="https://prod.spline.design/CwLjPoa1LM25hh88/scene.splinecode" />
          <MainHeader />
          <main className="relative z-10">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'