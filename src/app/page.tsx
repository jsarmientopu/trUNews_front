'use client'

import Image from 'next/image'
import LoadingButton from '@/components/LoadingButton';
import {Button} from '@nextui-org/react'
import Link from 'next/link'
import MainCard from '@/components/MainCard';
import { useState } from 'react';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center ">
      {/* <LoadingButton>Hola Mundo</LoadingButton>
      <MainCard></MainCard> */}
      <Button className='bg-[#FF461F]'>
        <Link href="/crear-articulo" className='text-white' >Crear artículo</Link>
      </Button>
    </main>
  )
    

}
