import SignUp from "@/components/SignUp";

export default async function Home() {
  return (
    <main className="bg-[url(../public/background.avif)] bg-no-repeat bg-cover bg-center w-full h-screen flex justify-center items-center">
      <SignUp />
    </main>
  );
}
