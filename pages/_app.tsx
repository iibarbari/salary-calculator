// import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootswatch/dist/lumen/bootstrap.min.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { AnimateSharedLayout } from 'framer-motion';
import { RatesHandler } from '../components';
import SalaryHandler from '../components/SalaryHandler';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>pilot.co</title>
      </Head>

      <RatesHandler>
        <SalaryHandler>
          <AnimateSharedLayout type="crossfade">
            <Component {...pageProps} />
          </AnimateSharedLayout>
        </SalaryHandler>
      </RatesHandler>
    </>
  );
}

export default MyApp;
