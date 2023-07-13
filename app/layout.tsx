import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'

import type { Metadata } from 'next'
import { ModalProvider } from '@/providers/modal-provider'

import './globals.css'
import { ToasterProvider } from '@/providers/toast-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Dashboard',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <ClerkProvider>
          <body className={inter.className}>
            <ToasterProvider />
            <ModalProvider />
             {children}
          </body>
      </ClerkProvider>
    </html>
  )
}
