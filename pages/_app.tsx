import 'bootswatch/dist/lux/bootstrap.min.css';
import { AnimateSharedLayout } from 'framer-motion';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { SWRConfig } from 'swr';
import { RatesHandler } from '../components';
import SalaryHandler from '../components/SalaryHandler';

const swrConfig = {
  fetcher: async (endpoint: string, init?: RequestInit) => {
    let response: Response;

    try {
      response = await fetch(endpoint, init);

      if (!response.ok) {
        const error: SWRError = {
          json: await response.json(),
          message: 'An error occurred while fetching the data.',
          status: response.status,
        };

        throw error;
      }

      return response.json();
    } catch (e) {
      const error: SWRError = {
        message: 'An error occurred while fetching the data.',
      };

      throw error;
    }
  },
  refreshInterval: 60000,
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>salarie | pilot</title>
        <meta content="Salarie | Calculate employer salarie" name="title" />
        <meta content="Calculate your employer's salary and your cost fast." name="description" />
        <meta content="salary, cost, calculate, employer, remote" name="keywords" />
        <meta content="index, follow" name="robots" />
        <meta charSet="UTF-8" />
        <meta content="English" name="language" />
        <meta content="width=device-width, initial-scale=1.0" name="viewport" />

        <link href="/apple-icon-57x57.png" rel="apple-touch-icon" sizes="57x57" />
        <link href="/apple-icon-60x60.png" rel="apple-touch-icon" sizes="60x60" />
        <link href="/apple-icon-72x72.png" rel="apple-touch-icon" sizes="72x72" />
        <link href="/apple-icon-76x76.png" rel="apple-touch-icon" sizes="76x76" />
        <link href="/apple-icon-114x114.png" rel="apple-touch-icon" sizes="114x114" />
        <link href="/apple-icon-120x120.png" rel="apple-touch-icon" sizes="120x120" />
        <link href="/apple-icon-144x144.png" rel="apple-touch-icon" sizes="144x144" />
        <link href="/apple-icon-152x152.png" rel="apple-touch-icon" sizes="152x152" />
        <link href="/apple-icon-180x180.png" rel="apple-touch-icon" sizes="180x180" />
        <link href="/android-icon-192x192.png" rel="icon" sizes="192x192" type="image/png" />
        <link href="/favicon-32x32.png" rel="icon" sizes="32x32" type="image/png" />
        <link href="/favicon-96x96.png" rel="icon" sizes="96x96" type="image/png" />
        <link href="/favicon-16x16.png" rel="icon" sizes="16x16" type="image/png" />
        <link href="/manifest.json" rel="manifest" />
        <meta content="#ffffff" name="msapplication-TileColor" />
        <meta content="/ms-icon-144x144.png" name="msapplication-TileImage" />
        <meta content="#ffffff" name="theme-color" />
      </Head>

      <SWRConfig value={swrConfig}>
        <RatesHandler>
          <SalaryHandler>
            <AnimateSharedLayout type="crossfade">
              <Component {...pageProps} />
            </AnimateSharedLayout>
          </SalaryHandler>
        </RatesHandler>
      </SWRConfig>
    </>
  );
}

export default MyApp;
