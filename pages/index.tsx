import { AppShell, Header, Burger, Title, Text, createStyles } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Welcome } from '../components/Welcome/Welcome';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import { NavbarDrawer } from '../components/NavbarDrawer/NavbarDrawer';

const  useStyles =  createStyles((theme) => ({
  title: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontSize: 40,
    fontWeight: 900,
    letterSpacing: -2,

    [theme.fn.smallerThan('md')]: {
      fontSize: 40,
    },
  },
}));

export default function HomePage() {
  const { classes } = useStyles();
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <NavbarDrawer opened={opened} close={close}/>
      <AppShell
        padding="md"
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
        <Welcome />
        <ColorSchemeToggle />
      </AppShell>
    </>
  );
}
