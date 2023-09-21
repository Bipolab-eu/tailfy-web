'use client'

import { useState } from 'react'
import CheckoutButton from './CheckoutButton'

function RegisterForm(props) {
  const [checked, setChecked] = useState(false)
  const [step, setStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const price = props[0].unit_amount / 100

  async function handleSubmit(e) {
    e.preventDefault()
    const formData = new FormData(e.target)
    const formValues = Object.fromEntries(formData.entries())

    try {
      setLoading(true)
      if (step === 1) {
        const response = await fetch('/api/create-order', {
          method: 'POST',
          body: JSON.stringify({ ...formValues, priceId: props[0].id })
        })

        const { url } = await response.json()
        window.location.href = url
      } else {
        const response = await fetch('http://localhost:1337/api/users', {
          method: 'POST',
          body: JSON.stringify({ ...formValues, role: 1 }),
          headers: {
            'Content-Type': 'application/json',
          },
        })
        setStep(1)

      }
    } catch (error) {
      console.error('Error en crear el usuario:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`grid z-50 bg-gray-50 px-4 py-8 text-xs ${step === 1 ? 'min-w-[287px]' : 'min-w-[352px]'}`}
    >
      <h4 className='text-4xl text-center font-bold'>
        Tailfy
      </h4>
      {step === 0 &&
        <p className="my-12 text-center">
          Tu aplicación de reserva por {price}€ al mes
        </p>}
      {step === 0 ?
        <div className='grid gap-4'>
          <div className='grid gap-2'>
            <label htmlFor='name'>
              Tu nombre o el de tu negocio
            </label>
            <input
              className='border border-1 border-gray-900 p-2'
              type='text'
              placeholder='Nombre'
              name='username'
            />
          </div>
          <div className='grid gap-2'>
            <label htmlFor='prefilled_email'>
              Tu Email
            </label>
            <input
              className='border border-1 border-gray-900 p-2'
              type='email'
              placeholder='Email'
              name='email'
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
            />
          </div>
          <div className='mb-12 mt-8 flex justify-center'>
            <input
              name='checkbox'
              type='checkbox'
              value={checked}
              onChange={(e) => setChecked(e)}
            />
            <label htmlFor='checkbox' className='mx-1'>
              Acepto los términos y condiciones de usos
            </label>
          </div>
        </div>
        :
        <div className='grid justify-center'>
          <p className='my-12'>Activa tu plan</p>
          <p className='mb-12'>{price.toFixed(2).replace('.', ',')} € / mes</p>
        </div>
      }
      <div className='grid gap-14'>
        <CheckoutButton
          loading={loading}
          step={step}
        />
        <p className={`text-center ${step === 1 && 'hidden'}`}>Paso 1</p>
      </div>
    </form >

  )
}

export default RegisterForm
