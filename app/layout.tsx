import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { Analytics } from '@vercel/analytics/react'
import { LenisProvider } from '@/providers/LenisProvider'
import './globals.css'

// Variable-weight Latin subsets, self-hosted so dev/build never wait on the network.
const archivo = localFont({
  src: './fonts/Archivo.woff2',
  weight: '100 900',
  variable: '--font-archivo',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://vaibhavroy.com'),
  title: 'Vaibhav Roy — Product Designer, Manager & Builder',
  description:
    'Product designer, manager, and builder — 9+ years shaping AI-native, enterprise-grade software across fintech, healthcare, B2B SaaS, and telecom.',
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={archivo.variable}>
      <body className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-full focus:bg-[var(--ink)] focus:px-5 focus:py-2.5 focus:text-white focus:outline-none"
        >
          Skip to content
        </a>
        <LenisProvider>{children}</LenisProvider>
        <Analytics />
      </body>
    </html>
  )
}
