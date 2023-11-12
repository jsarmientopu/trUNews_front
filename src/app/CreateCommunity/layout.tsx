import '../globals.css'
import type { Metadata } from 'next'


export const metadata: Metadata = {
  title: 'trUNews',
  description: 'trUNews is a news site',
}

export default function Layout({
    children,
}: {
  children: React.ReactNode
}) {
  return <div className='w-full h-screen'>
  {children}
  
  </div>
}
