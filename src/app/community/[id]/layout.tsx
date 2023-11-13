import { Providers } from '@/app/providers'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'TrUNews Community',
  description: 'TrUNews Community view',
}

export default function Layout ({children}:{
  children: React.ReactNode
}){
    return (
      <Providers>
        <div>
          <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
            {children}
        </div>
      </Providers>
    )
}