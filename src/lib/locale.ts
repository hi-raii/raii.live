import {useRouter} from "next/router";
import {GetServerSidePropsContext, NextPageContext} from "next";


export function useLocale() {
  return useRouter().locale!.split("-")[0];
}

export function getLocaleServerSide(context: GetServerSidePropsContext) {
  return context.locale!.split("-")[0];
}

export function getLocaleAppInitialProps(context: NextPageContext) {
  return context.locale!.split("-")[0];
}