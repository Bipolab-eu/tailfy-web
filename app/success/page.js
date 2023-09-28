"use client";

import { useEffect, useState } from "react";

async function getCheckoutStatus(sessionId) {
  const response = await fetch(
    `http://localhost:1337/strapi-stripe/retrieveCheckoutSession/${sessionId} `,
    {
      method: "GET",
      //   headers: {
      //     "Content-Type": "application/json",
      //     Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
      //   },
    }
  );
  return await response.json();
}

const PaymentSuccess = ({ searchParams }) => {
  const { sessionId } = searchParams;
  const [response, setResponse] = useState(null);

  useEffect(() => {
    getCheckoutStatus(sessionId).then((event) => {
      setResponse(event);
    });
  }, []);
  return (
    <main>
      <pre>{JSON.stringify(response, null, 2)}</pre>
    </main>
  );
};

export default PaymentSuccess;
