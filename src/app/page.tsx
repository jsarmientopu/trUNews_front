'use client'

import Image from 'next/image'
import LoadingButton from '@/components/LoadingButton';
import {Button} from '@nextui-org/react'
import Link from 'next/link'
import MainCard from '@/components/MainCard';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center ">
      <LoadingButton>Hola Mundo</LoadingButton>
      <MainCard></MainCard>
      <Button>
        <Link href="/crear-articulo">Crear artículo</Link>
      </Button>
    </main>
  )
}
