import Image from 'next/image'
import TailfyBackground from '../public/background.avif'
import RegisterForm from '@/components/RegisterForm'

export default async function Home() {
  const data = await fetch('http://localhost:3000/api/prices')
  const plans = await data.json()

  return (
    <main className='h-screen relative'>
      <Image
        className='z-0 object-center object-cover'
        src={TailfyBackground}
        alt="Tailfy Brackground"
        fill
      />
      <section className='h-full flex items-center justify-center'>
        <div className='text-5xl text-red-500'>HOLA</div>
        <RegisterForm {...plans} />
      </section>
    </main>
  )
}