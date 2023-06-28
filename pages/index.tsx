import { AppShell, Header, Burger } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Welcome } from '../components/Welcome/Welcome';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import { NavbarDrawer } from '../components/NavbarDrawer/NavbarDrawer';

export default function HomePage() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <NavbarDrawer opened={opened} close={close}/>
      <AppShell
        padding="md"
        header={
          <Header height={60} p="xs">
            <Burger
              opened={opened}
              onClick={open}
              size="sm"
              mr="xl" 
            />
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
