import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>Megatherium</title>
        <meta name="description" content="Self-hosted community platform" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex items-center justify-center h-screen bg-slate-900 font-semibold text-white">
        <h1 className="text-2xl">Megatherium</h1>
      </main>
    </>
  );
}
