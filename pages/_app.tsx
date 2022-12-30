import '../styles/globals.css'

import Head from 'next/head'
import React from 'react'
import { RecoilRoot } from 'recoil'
import { Navbar } from '../components/Navbar'
import type { AppProps } from 'next/app'

const CategoryModal = React.lazy(
  () => import('../components/modal/CategoryModal')
)
const AboutModal = React.lazy(() => import('../components/modal/AboutModal'))

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>News for InkoHX</title>
        <meta name="description" content="My feed reader" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <RecoilRoot>
        <Navbar />
        <main className="min-h-screen">
          <Component {...pageProps} />
        </main>
        <React.Suspense>
          <CategoryModal />
          <AboutModal />
        </React.Suspense>
      </RecoilRoot>
    </>
  )
}
