'use client'

import Image from 'next/image'
import TailfyBackground from '../public/background.avif'
import { useState } from 'react'

export default function Home() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <main className='h-screen relative'>
      <Image
        className='z-0 object-center object-cover'
        src={TailfyBackground}
        alt="Tailfy Brackground"
        fill
      />
      <section className='h-full flex items-center justify-center'>
        <form
          action='https://buy.stripe.com/test_28o9CX2c4ekUeze3cc'
          method='GET'
          className='z-50 bg-gray-50 px-4 py-8 text-xs w-[350px]'
        >
          <h4 className='text-4xl text-center font-bold'>
            Tailfy
          </h4>
          <p className='my-12 text-center'>
            Tu aplicación de reserva por 35€ al mes
          </p>
          <div className='grid gap-4'>
            <div className='grid gap-2'>
              <label htmlFor='name'>
                Tu nombre o el de tu negocio
              </label>
              <input
                className='border border-1 border-gray-900 p-2'
                type='text'
                placeholder='Nombre'
                name='name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className='grid gap-2'>
              <label htmlFor='prefilled_email'>
                Tu Email
              </label>
              <input
                className='border border-1 border-gray-900 p-2'
                type='text'
                placeholder='Email'
                name='prefilled_email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className='grid gap-2'>
              <label htmlFor='password'>
                Tu contraseña
              </label>
              <input
                className='border border-1 border-gray-900 p-2'
                placeholder='Contraseña'
                type='password'
                name='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <p className='mb-12 mt-8 text-center'>
              Acepto los términos y condiciones de usos
            </p>
          </div>
          <button
            type='submit'
            className='bg-black text-gray-50 p-4 block m-auto'
          >
            Empezar
          </button>
        </form>

      </section>
    </main>
  )
}