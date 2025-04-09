import type React from "react"
import type { Metadata } from "next"
import { Inter, Black_Han_Sans } from "next/font/google"
import "./globals.css"
import ClientLayout from "@/components/ClientLayout";

// 기본 폰트 설정 (Inter)
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

// 한글 폰트 설정 (Black Han Sans - 굵은 한글 폰트의 예시)
const blackHanSans = Black_Han_Sans({
  weight: "400", // Black Han Sans는 400 weight만 있음
  subsets: ["latin"],
  display: "swap",
  variable: "--font-black-han-sans",
})

export const metadata: Metadata = {
  title: "방방체크",
  description: "원하는 조건에 맞는 방을 쉽고 빠르게 찾아보세요",
  icons: {
    icon: "/favicon.ico"
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" className={`${inter.variable} ${blackHanSans.variable}`} suppressHydrationWarning>
      <body className={inter.className}>
      <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  )
}

