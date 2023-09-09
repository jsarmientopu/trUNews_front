'use client'
import Image from 'next/image'
import LoadingButton from '@/components/LoadingButton';
import {Button} from '@nextui-org/react'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Button>
        <Link href="/crear-articulo">Crear artículo</Link>
      </Button>
    </main>
  )
}
