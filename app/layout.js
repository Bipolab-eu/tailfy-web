/* eslint-disable @next/next/no-before-interactive-script-outside-document */
"use client";
import Script from "next/script";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "Tailfy Payment's Website",
//   description: "Tu app de reservas",
// };

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <Script
          strategy="beforeInteractive"
          type="text/javascript"
          src="http://localhost:1337/plugins/strapi-stripe/static/stripe.js"
          onLoad={(e) => {
            console.log("Stripe plugin loaded");
          }}
          onReady={() => {
            console.info("Stripe plugin ready");
          }}
          onError={(e) => {
            console.log(e);
            console.error("Error al cargar plugin");
          }}
        />
        {children}
      </body>
    </html>
  );
}
