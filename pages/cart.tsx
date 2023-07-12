import { useContext, useEffect, useState } from 'react';
import { 
  createStyles,
  useMantineTheme, 
  Stack,
  Card,
  Grid,
  Title,
  Space,
  Group,
  Button,
  Divider
} from '@mantine/core';
import {
  useMediaQuery
} from '@mantine/hooks';
import { CartActionType, CartContext } from '../contexts/CartProvider';
import { DataContext } from '../contexts/DataContextProvider';
import CartTable from '../components/CartTable/CartTable';
import { IItem } from '../contexts/IItem';
import Prices from '../components/Prices/Prices';

const useStyles = createStyles((theme) => ({
  fillHeight: {
    height: '100% !important'
  },
  content: {
    position: 'relative',
    marginTop: '40px',
    zIndex: 1,
    paddingLeft: '15%',
    paddingRight: '15%',
    [theme.fn.smallerThan("md")]: {
      paddingLeft: '5%',
      paddingRight: '5%',
    },
  },
}));

export default function Cart() {
  const theme = useMantineTheme();
  const { classes } = useStyles();
  const [selected, setSelected] = useState<string[]>([]);
  const data = useContext(DataContext);
  const { state, dispatch } = useContext(CartContext);
  const cartIds = Array.from(state.cartMap.keys());
  const cartItems: IItem[] = cartIds.flatMap(id => data.find(x => x.id === id) ?? []);

  useEffect(() => {console.log(selected)}, [selected]);
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

  return (
    <Stack className={classes.content}>
      <Grid>
        <Grid.Col span={12} md={8}>
          <Card padding={mobile ? 15 : 30}>
            <Title order={mobile ? 4 : 2}>Giỏ Hàng</Title>
            <Divider />
            <Space h="md" />
            <CartTable 
              items={cartItems} 
              checked={
                (id: string) => setSelected(selected.concat(id))
              }
              unchecked={
                (id: string) => setSelected(selected.filter(x => x !== id))
              }
            />
            <Space h="md" />
            <Group position="center">
              <Button 
                size={mobile ? "xs" : "md"}
                onClick={() => dispatch({
                  type: CartActionType.RemoveMultipleIds,
                  ids: selected,
                })}
              >
                Xóa
              </Button>
            </Group>
          </Card>
        </Grid.Col>
        <Grid.Col span={12} md={4}>
          <Card padding={mobile ? 15 : 30}>
            <Title order={mobile ? 4 : 2}>Giá</Title>
            <Divider />
            <Space h="xs" />
            <Prices items={cartItems}/>
            <Space h="xl" />
            <Group position="center">
              <Button size={mobile ? "xs" : "md"}>
                Thanh Toán
              </Button>
            </Group>
          </Card>
        </Grid.Col>
      </Grid>
    </Stack>
  );
}
