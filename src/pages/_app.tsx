import Head from 'next/head';
import { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { ThemeSettings } from 'theme/Theme';
import createEmotionCache from 'utils/createEmotionCache';
import { Provider } from 'react-redux';
import Store from 'store/Store';
import { ToastContainer } from 'react-toastify';
import BlankLayout from 'layouts/blank/BlankLayout';
import FullLayout from 'layouts/full/FullLayout';

import { AuthProvider } from 'context/AuthContext';

import PublicLayout from 'layouts/public/PublicLayout';
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const layouts: any = {
  Blank: BlankLayout,
  Public: PublicLayout,
};

const MyApp = (props: MyAppProps) => {
  const {
    Component,
    emotionCache = clientSideEmotionCache,
    pageProps,
  }: any = props;
  const theme = ThemeSettings();

  const Layout = layouts[Component.layout] || FullLayout;

  return (
    //@ts-ignore
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default (props: MyAppProps) => (
  <Provider store={Store}>
    {/* @ts-expect-error*/}
    <AuthProvider>
      <MyApp {...props} />
    </AuthProvider>
    {/* @ts-expect-error*/}
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover={false}
      theme="colored"
    />
  </Provider>
);
