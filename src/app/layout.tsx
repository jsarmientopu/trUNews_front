import { Montserrat } from 'next/font/google'

import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Providers } from './providers'
import Navbar from '@/components/Navbar_Components/Navbar'

const montserrat = Montserrat({
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

  return (
    <html lang="en" className='scroll-smooth'>
      <body className={montserrat.className}>
        <Providers>
          <>
          <Navbar />
            {children}
          </>
        </Providers>
      </body>
    </html>
  )
}
