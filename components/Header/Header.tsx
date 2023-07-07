import { useContext } from 'react';
import { 
  createStyles,
  Header as Hdr,
  Burger,
  Title,
  Text,
  ActionIcon,
  Indicator,
  Group,
} from '@mantine/core';
import { IconShoppingCart } from '@tabler/icons';
import { ColorSchemeToggle } from '../ColorSchemeToggle/ColorSchemeToggle';
import { CartActionType, CartContext } from '../../contexts/CartProvider';
import { useRouter } from 'next/navigation';

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


export function Header({ open, opened }: { open: () => void, opened: boolean }) {
  const { classes } = useStyles();
  const router = useRouter();
  const { state, dispatch } = useContext(CartContext);

  return (
    <Hdr height={60} p="xs">
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
            Call Of{" "}
            <Text inherit variant="gradient" component="span">
              Nature
            </Text>
          </Title>
        </div>
        <Group style={{ order: 2, marginLeft: 'auto' }}>
          <Indicator label={`${state.cartMap.size}`} inline size={16} offset={8} radius={3}>
            <ActionIcon size="xl" onClick={() => router.push('/cart')}>
              <IconShoppingCart />
            </ActionIcon>
          </Indicator>
          <ColorSchemeToggle />
        </Group>
      </div>
    </Hdr>
  );
}
