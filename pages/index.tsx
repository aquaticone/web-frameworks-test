import { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'

type HomeProps = {
  highlySecretString: string
}

const Home: NextPage<HomeProps> = ({ highlySecretString}) => {
  const [highlySecretFromApi, setHighlySecretFromApi] = useState("")

  const updateHighlySecretFromApi = async () => {
    const resp = await fetch("/api/hello")
    const data = await resp.json()
    setHighlySecretFromApi(data.highlySecretString)
  }

  useEffect(() => {
    updateHighlySecretFromApi()
  }, [])

  return (
    <div>
      <Head>
        <title>Web Frameworks Test</title>
      </Head>

      <main>
        <dl>
          <dt>NEXT_PUBLIC_NOT_SO_SECRET_STRING</dt>
          <dd>{process.env.NEXT_PUBLIC_NOT_SO_SECRET_STRING}</dd>
          <dt>HIGHLY_SECRET_STRING (getServerSideProps)</dt>
          <dd>{highlySecretString}</dd>
          <dt>HIGHLY_SECRET_STRING (API route)</dt>
          <dd>{highlySecretFromApi}</dd>
        </dl>
      </main>
    </div>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {
      highlySecretString: process.env.HIGHLY_SECRET_STRING ?? "nope"
    }
  }
}