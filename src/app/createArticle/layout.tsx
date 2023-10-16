'use client';

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { decryptedJWT } from '@/dto/users'
import verifyToken from '@/utils/utils'
import { useRouter } from 'next/navigation'
import { useState,useEffect } from 'react'

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

    const router = useRouter();

    async function token(){
        const rol =await verifyToken();
        if(rol.rol!=1){
            router.push("/");
        }
    }
    
    useEffect(()=>{
        token();
    },[]);

  

  return <div>
  {children}
  
  </div>
}
