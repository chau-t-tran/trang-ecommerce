import { useState } from 'react';
import NextApp, { AppProps, AppContext } from 'next/app';
import { getCookie, setCookie } from 'cookies-next';
import Head from 'next/head';
import { 
  MantineProvider, 
  ColorScheme, 
  ColorSchemeProvider,
  AppShell,
  Header,
  Burger,
  Title,
  Text,
  Space,
  createStyles
} from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { useDisclosure } from '@mantine/hooks';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import { NavbarDrawer } from '../components/NavbarDrawer/NavbarDrawer';
import { DataContextProvider } from '../contexts/DataContextProvider';

const useStyles = createStyles((theme) => ({
  title: {
    fontSize: 40,
    fontWeight: 900,
    letterSpacing: -2,

    [theme.fn.smallerThan('md')]: {
      fontSize: 40,
    },
  },
}));


export default function App(props: AppProps & { colorScheme: ColorScheme }) {
  const { classes } = useStyles();
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
      <Head>
        <title>Mantine next example</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <link rel="shortcut icon" href="/favicon.svg" />
      </Head>

      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
        <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
      <AppShell
        padding={0}
        header={
          <Header height={60} p="xs">
            <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
              <Burger
                opened={opened}
                onClick={open}
                size="sm"
                ml="md"
                mr="xl" 
              />
              <div>
                <Title className={classes.title} align="center">
                  Cơm Trắng{" "}
                  <Text inherit variant="gradient" component="span">
                    Tuyệt Vời
                  </Text>
                </Title>
              </div>
              <div style={{ order: 2, marginLeft: 'auto' }}>
                <ColorSchemeToggle />
              </div>
            </div>
          </Header>
        }
        styles={(theme) => ({
          main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
        })}
      >
          <DataContextProvider>
            <Component {...pageProps} />
          </DataContextProvider>
          <Space h="md" />
      </AppShell>
          <Notifications />
          <NavbarDrawer opened={opened} close={close}/>
        </MantineProvider>
      </ColorSchemeProvider>
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
