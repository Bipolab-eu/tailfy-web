'use client'

import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from 'yup'

export default function SignUp () {
  // const [checked, setChecked] = useState(false)
  // const [step, setStep] = useState(0)
  // const [loading, setLoading] = useState(false)
  // const price = props[0].unit_amount / 100

  /* async function handleSubmit(e) {
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
  } */

  return (
    <Formik
      initialValues={
        { username: '', email: '', password: '' }
      }

      validationSchema={
        Yup.object({
          username: Yup
            .string()
            .required('Your name is required'),
          email: Yup
            .string()
            .email('Invalid email address')
            .required('Email required'),
          password: Yup
            .string()
            .required('Campo obligatorio').min(6, 'Tu contraseña debe de tener como mínimo 6 carácteres.').matches(/[a-zA-Z]/, 'Añade letras a tu contraseña')
        })
      }

      onSubmit={
        async (values, { resetForm }) => {
          await fetch(`${process.env.API_URL}/api/auth/local/register`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username: values.username,
              email: values.email,
              password: values.password
            })
          })
            .then(res => res.json())
            .catch(error => console.error('Error:', error))
          
          resetForm()
        }
      }
    >
      <section
       className="bg-white p-8 grid gap-4"
      >
        <h1 className="text-3xl text-center">Tailfy</h1>
        <Form
          className="flex flex-col gap-4"
        >
          <Field name="username" type="text" placeholder="Usuario" className="p-4 rounded-full drop-shadow-lg text-center" />{/* Name Field */}
          <ErrorMessage name="username" component="span" className="pl-4 pt-2 text-sm" />

          <Field name="email" type="email" placeholder="Email" className="p-4 rounded-full drop-shadow-lg text-center" />{/* Email Field */}
          <ErrorMessage name="email" component="span" className="pl-4 pt-2 text-sm" />

          <Field name="password" type="password" placeholder="Contraseña" className="p-4 rounded-full drop-shadow-lg text-center" />{/* Password Field */}
          <ErrorMessage name="password" component="span" className="pl-4 pt-2 text-sm" />

          <button
            type="submit"
            className="text-base leading-none bg-blue-500 rounded-full px-6 py-4 w-fit mx-auto"
          > Crear Cuenta
          </button>
        </Form>
      </section>
    </Formik >
  )
}
