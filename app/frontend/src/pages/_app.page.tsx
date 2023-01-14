import type { AppProps } from 'next/app'

import { Header } from '@components/Header'
import { GlobalProvider } from '@contexts/GlobalContext'
import '@styles/global.scss'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <GlobalProvider>
      <Header />
      <Component {...pageProps} />
    </GlobalProvider>
  )
}
