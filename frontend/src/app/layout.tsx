import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Hyper Tube',
  description: 'make streaming site for job ',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
