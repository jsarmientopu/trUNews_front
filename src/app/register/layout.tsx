import '../globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Providers } from '../providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'trUNews',
  description: 'trUNews is a news site',
}

export default function Layout({
    children,
}: {
  children: React.ReactNode
}) {
  return <div className='w-screen h-screen'>
  {children}
  
  </div>
}
