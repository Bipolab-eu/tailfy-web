"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function SignUp() {
  return (
    <Formik
      initialValues={{ username: "", email: "", password: "" }}
      validationSchema={Yup.object({
        username: Yup.string().required("Your name is required"),
        email: Yup.string()
          .email("Invalid email address")
          .required("Email required"),
        password: Yup.string()
          .required("Campo obligatorio")
          .min(6, "Tu contraseña debe de tener como mínimo 6 carácteres.")
          .matches(/[a-zA-Z]/, "Añade letras a tu contraseña"),
      })}
      onSubmit={async (values, { resetForm }) => {
        const paymentButton = document.querySelector(".SS_ProductCheckout");

        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/auth/local/register`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                username: values.username,
                email: values.email,
                password: values.password,
              }),
            }
          );

          if (response.ok) {
            window.open(
              `https://buy.stripe.com/${process.env.NEXT_PUBLIC_PAYMENT_KEY}?prefilled_email=${values.email}`,
              "_self"
            );
          } else {
            console.error("Error en la solicitud POST a la API");
          }

          resetForm();
        } catch {
          console.error("Error:", error);
        }
      }}
    >
      <section className="bg-white p-8 grid gap-4">
        <h1 className="text-3xl text-center">Tailfy</h1>
        <Form className="flex flex-col gap-4">
          <Field
            name="username"
            type="text"
            placeholder="Usuario"
            className="p-4 rounded-full drop-shadow-lg text-center"
          />
          {/* Name Field */}
          <ErrorMessage
            name="username"
            component="span"
            className="pl-4 pt-2 text-sm"
          />

          <Field
            name="email"
            type="email"
            placeholder="Email"
            className="p-4 rounded-full drop-shadow-lg text-center"
          />
          {/* Email Field */}
          <ErrorMessage
            name="email"
            component="span"
            className="pl-4 pt-2 text-sm"
          />

          <Field
            name="password"
            type="password"
            placeholder="Contraseña"
            className="p-4 rounded-full drop-shadow-lg text-center"
          />
          {/* Password Field */}
          <ErrorMessage
            name="password"
            component="span"
            className="pl-4 pt-2 text-sm"
          />

          <button
            type="submit"
            className="text-base leading-none bg-blue-500 rounded-full px-6 py-4 w-fit mx-auto"
          >
            Crear Cuenta
          </button>
        </Form>
      </section>
    </Formik>
  );
}
