// components/ClientLayout.tsx
"use client"
import { ThemeProvider } from "next-themes"
import { AuthProvider } from "@/context/AuthContext";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
    <AuthProvider>{children}</AuthProvider>
  </ThemeProvider>)
}
