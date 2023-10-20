import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'TrUNews Community',
  description: 'TrUNews Community view',
}

export default function Layout ({children}:{
  children: React.ReactNode
}){
    return (
        <div>
            {children}
        </div>
    )
}