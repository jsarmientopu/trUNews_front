import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'TrUNews Article',
  description: 'Article TrUNews',
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