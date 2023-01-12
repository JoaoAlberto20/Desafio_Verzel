import Layout from '@components/Layout'
import type { AppProps } from 'next/app'

import { GlobalProvider } from '@contexts/GlobalContext'
import '@styles/global.scss'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <GlobalProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </GlobalProvider>
  )
}
