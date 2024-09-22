import '~/styles/output.css'

import type { AppProps } from 'next/app'
import { Archivo, Inter_Tight } from 'next/font/google'
import { lazy } from 'react'

const inter = Inter_Tight({ subsets: ['latin'] })
const archivo = Archivo({ subsets: ['latin'] })
export interface SharedPageProps {
  draftMode: boolean
  token: string
}

const PreviewProvider = lazy(() => import('~/components/PreviewProvider'))

export default function App({
  Component,
  pageProps,
}: AppProps<SharedPageProps>) {
  const { draftMode, token } = pageProps
  return (
    <div className="bg-primary">
      {draftMode ? (
        <PreviewProvider token={token}>
          <Component {...pageProps} />
        </PreviewProvider>
      ) : (
        <Component {...pageProps} />
      )}
    </div>
  )
}
