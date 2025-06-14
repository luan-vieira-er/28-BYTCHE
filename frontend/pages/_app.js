import '@/styles/globals.css'
import Head from 'next/head'
import { DoctorPixelThemeProvider } from '@/contexts/ThemeContext'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        {/* Fonte Press Start 2P do Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap"
          rel="stylesheet"
        />

        {/* Meta tags para DoctorPixel */}
        <title>DoctorPixel - Hospital Virtual Pixel Art</title>
        <meta name="description" content="DoctorPixel - Um hospital virtual em pixel art para triagem médica interativa" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />

        {/* Meta tags para PWA */}
        <meta name="theme-color" content="#00BCD4" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="DoctorPixel" />
      </Head>

      <DoctorPixelThemeProvider>
        <Component {...pageProps} />
      </DoctorPixelThemeProvider>
    </>
  )
}
