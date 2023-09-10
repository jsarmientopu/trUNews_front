'use client'

import Image from 'next/image'
import LoadingButton from '@/components/LoadingButton';
import MainCard from '@/components/MainCard';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center ">
      <LoadingButton>Hola Mundo</LoadingButton>
      <MainCard></MainCard>
    </main>
  )
}
