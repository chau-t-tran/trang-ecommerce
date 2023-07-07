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
  createStyles
} from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { useDisclosure } from '@mantine/hooks';
import { NavbarDrawer } from '../components/NavbarDrawer/NavbarDrawer';
import { DataContextProvider } from '../contexts/DataContextProvider';
import { CartProvider } from '../contexts/CartProvider';
import { Header } from '../components/Header/Header';

export default function App(props: AppProps & { colorScheme: ColorScheme }) {
  const { Component, pageProps } = props;
  const [opened, { open, close }] = useDisclosure(false);
  const [colorScheme, setColorScheme] = useState<ColorScheme>(props.colorScheme);

  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme = value || (colorScheme === 'dark' ? 'light' : 'dark');
    setColorScheme(nextColorScheme);
    setCookie('mantine-color-scheme', nextColorScheme, { maxAge: 60 * 60 * 24 * 30 });
  };

  return (
    <>
      <DataContextProvider>
      <CartProvider>
      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
      <Head>
        <title>Mantine next example</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <link rel="shortcut icon" href="/favicon.svg" />
      </Head>

      <AppShell
        padding={0}
        header={ <Header open={open} opened={opened}/> }
        styles={(theme) => ({
          main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
        })}
      >
              <Component {...pageProps} />
          <Space h="md" />
      </AppShell>
      <Notifications />
      <NavbarDrawer opened={opened} close={close}/>
      </MantineProvider>
      </ColorSchemeProvider>
      </CartProvider>
      </DataContextProvider>
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
