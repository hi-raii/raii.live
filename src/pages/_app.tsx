import '../../styles/globals.css'
import type {AppContext, AppProps} from 'next/app'
import {ChakraProvider} from "@chakra-ui/react";
import theme from "../../theme";
import {IntlProvider} from "react-intl";
import Head from "next/head";
import {getTitleIntl} from "@lib/utils/getTitleIntl";
import {getLocaleAppInitialProps, useLocale} from "@lib/locale";
import App from "next/app";
import React from "react";
import Layout from "@components/Layout";
import {NextSeo} from "next-seo";
import getConfig from "next/config";
import Script from "next/script";

function MyApp({Component, pageProps, messages}: AppProps & { messages: any }) {
  const locale = useLocale();
  const {publicRuntimeConfig } = getConfig()

  return (
    <ChakraProvider theme={theme}>
      <IntlProvider locale={locale} messages={messages}>
        <NextSeo
          title={getTitleIntl('page_title', messages, "Raii's VTuber")}
          twitter={{
            cardType: "summary",
            site: "@_hi_raii"
          }}
          facebook={{
            appId: publicRuntimeConfig.facebookAppId
          }}
          openGraph={{
            images: [{url: "https://raii.live/cover.png", width: 411, height: 411, type: "image/png",alt:"Raii's website cover"}]
          }}
        />
        {/* eslint-disable-next-line @next/next/no-script-component-in-head */}
        <Head>
          <title>{getTitleIntl('page_title', messages, "Raii's VTuber")}</title>
          <link rel='icon' href='/favicon.ico'/>
        </Head>
        <Layout>
          <Component {...pageProps} />
        </Layout>




        {/*Global site tag (gtag.js) - Google Analytics*/}
        <Script src={` https://www.googletagmanager.com/gtag/js?id=${publicRuntimeConfig.googleAnalyticsId}`} strategy="afterInteractive"/>
        <Script id="google-analytics" strategy="afterInteractive">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-VPF1L1M5EX');
          `}
        </Script>
      </IntlProvider>
    </ChakraProvider>
  )
}

export default MyApp

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
MyApp.getInitialProps = async (appContext: AppContext) => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext);
  const messages = messagesPerLocale[getLocaleAppInitialProps(appContext.ctx)] || messagesPerLocale.en

  return {...appProps, messages}
}


const messagesPerLocale: { [locale: string]: any } = {
  pt: {
    'page_title': 'VTuber Raii',
    "raiis_menu": "Menu do Raii",
    "fan_arts_and_commissions": "Fanarts e comissões",
    "buy_me_a_coffe": "Me compre um café",
    "discord_server": "Servidor do Discord",
    "quests": "Missões",
    "finish_college": "Concluir a faculdade",
    "languages": "Idiomas"
  },
  en: {
    'page_title': 'Raii VTuber',
    "discord_server": "Discord Server (portuguese)"
  }
}


