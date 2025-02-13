"use client";


import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";
import "./globals.css";
import { ModeToggle } from "@/components/ModeToggle";
import { Toaster } from "@/components/ui/toaster";

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className="relative min-h-screen">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >

          <div className="fixed top-4 right-4 z-50">
            <ModeToggle />
          </div>
          
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
