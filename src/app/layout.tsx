'use client'
import { Roboto } from 'next/font/google'

import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Providers } from './providers'
import Navbar from '@/components/Navbar'
import { usePathname } from 'next/navigation';

const roboto = Roboto({
  weight:["300","400","500","700"],
  style:["normal","italic"],
  subsets: ['latin'],
})

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'trUNews',
  description: 'trUNews is a news site',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}){

  const pathname = usePathname()
  const isLoginPage= (pathname==='/login' || pathname==='/register')

  return (
    <html lang="en">
      <body className={roboto.className}>
        <Providers>
          <>
          {!isLoginPage &&(<Navbar /> )}
            {children}
          </>
        </Providers>
      </body>
    </html>
  )
}
