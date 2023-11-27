import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'TrUNews Communities',
  description: 'Communities TrUNews',
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