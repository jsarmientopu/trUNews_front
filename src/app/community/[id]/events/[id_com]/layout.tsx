import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'TrUNews Events',
  description: 'Events in Community TrUNews',
}

export default function Layout ({children}:{
  children: React.ReactNode
}){
    return (
        <div >
            {children}
        </div>
    )
}