import Image from 'next/image'
import LoadingButton from '@/components/LoadingButton';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <LoadingButton>Hola Mundo</LoadingButton>
    </main>
  )
}
