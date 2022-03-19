/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ['en','en-us', 'pt-br', 'pt-pt', "pt"],
    defaultLocale: 'en-us',
  },
  images: {
    domains: ["dl.airtable.com"]
  }
}
module.exports = nextConfig
