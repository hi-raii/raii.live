import { Html, Head, Main, NextScript } from 'next/document'

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