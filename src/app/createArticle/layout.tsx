'use client';

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { decryptedJWT } from '@/dto/users'
import verifyToken from '@/utils/utils'
import { useRouter } from 'next/navigation'
import { useState,useEffect } from 'react'
import { Roles } from '@/utils/rolDefinition';

export const metadata: Metadata = {
  title: 'TrUNews Create Article',
  description: 'Create an Article in TrUNews',
}

export default function Layout({
    children,
}: {
  children: React.ReactNode
}) {

    const router = useRouter();

    async function token(){
        const rol =await verifyToken();
        if(rol.rol!=Roles.escritor){
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
