import { Html, Head, Main, NextScript } from 'next/document'
// eslint-disable-next-line @next/next/no-script-in-document
import Script from 'next/script'


export default function Document() {
  return (
    <Html>
      <Head/>
      <body>
      {/*<ColorModeScript initialColorMode={theme.config.initialColorMode} />*/}
      <Main />
      <NextScript />
      </body>
    </Html>
  )
}