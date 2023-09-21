import SignUp from '@/components/SignUp'

export default async function Home() {
  const data = await fetch('http://localhost:3000/api/prices')
  const plans = await data.json()

  return (
    <main
      className='bg-[url(../public/background.avif)] bg-no-repeat bg-cover bg-center w-full h-screen flex justify-center items-center'
    >
      <SignUp {...plans} />
    </main>
  )
}