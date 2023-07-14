import { useState } from 'react';
import NextApp, { AppProps, AppContext } from 'next/app';
import { getCookie, setCookie } from 'cookies-next';
import Head from 'next/head';
import { 
  MantineProvider, 
  ColorScheme, 
  ColorSchemeProvider,
  AppShell,
  Space,
  useMantineTheme
} from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { Header } from '../components/Header/Header';
import { DataContextProvider } from '../contexts/DataContextProvider';
import { CartProvider } from '../contexts/CartProvider';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { SmallHeader } from '../components/SmallHeader/SmallHeader';

export default function App(props: AppProps & { colorScheme: ColorScheme }) {
  const { Component, pageProps } = props;
  const [colorScheme, setColorScheme] = useState<ColorScheme>(props.colorScheme);
  const theme = useMantineTheme();
  const isSmallScreen = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme = value || (colorScheme === 'dark' ? 'light' : 'dark');
    setColorScheme(nextColorScheme);
    setCookie('mantine-color-scheme', nextColorScheme, { maxAge: 60 * 60 * 24 * 30 });
  };

  const themeOverride = {
    defaultGradient: { to: '#20b573', from: '#006937', deg: 90 },
  };

  return (
    <>
      <GoogleOAuthProvider clientId="1020638621435-3nothonhkvaujmfch5as0g6nppun6ug1.apps.googleusercontent.com">
      <DataContextProvider>
      <CartProvider>
      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider theme={{ colorScheme, ...themeOverride }} withGlobalStyles withNormalizeCSS>
      <Head>
        <title>Call of Nature</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <link rel="shortcut icon" href="/favicon.svg" />
      </Head>

      <AppShell
        padding={0}
        header={ isSmallScreen ? <SmallHeader /> : <Header /> }
        styles={(theme) => ({
          main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[1] },
        })}
      >
              <Component {...pageProps} />
          <Space h="md" />
      </AppShell>
      <Notifications />
      </MantineProvider>
      </ColorSchemeProvider>
      </CartProvider>
      </DataContextProvider>
      </GoogleOAuthProvider>
    </>
  );
}

App.getInitialProps = async (appContext: AppContext) => {
  const appProps = await NextApp.getInitialProps(appContext);
  return {
    ...appProps,
    colorScheme: getCookie('mantine-color-scheme', appContext.ctx) || 'dark',
  };
};
