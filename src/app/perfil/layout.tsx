import '../globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Providers } from '../providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'TrUNews Profile',
  description: 'Profile TrUNews',
}

export default function Layout({
    children,
}: {
  children: React.ReactNode
}) {
  return <div className='max-w-full w-full h-screen'>
  {children}
  
  </div>
}
