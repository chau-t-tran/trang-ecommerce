import { Drawer, useMantineTheme } from '@mantine/core';
import { NavbarNested } from './NavbarNested';

export function NavbarDrawer(props: {opened: boolean, close: () => void}) {
  return (
    <>
      <Drawer 
        opened={props.opened} 
        onClose={props.close}
        overlayProps={{ opacity: 0.5, blur: 4 }}
        withCloseButton={false}
        lockScroll={true}
        size={310}
        padding={0}
      >
        <NavbarNested />
      </Drawer>
    </>
  );
}
