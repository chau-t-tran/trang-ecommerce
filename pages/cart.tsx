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
  Button
} from '@mantine/core';
import { CartActionType, CartContext } from '../contexts/CartProvider';
import { DataContext } from '../contexts/DataContextProvider';
import CartTable from '../components/CartTable/CartTable';
import { IItem } from '../contexts/IItem';

const useStyles = createStyles((theme) => ({
  fillHeight: {
    height: '100% !important'
  },
  content: {
    position: 'relative',
    marginTop: '40px',
    paddingRight: '15%',
    paddingLeft: '15%',
    zIndex: 1,
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

  return (
    <Stack className={classes.content}>
      <Grid>
        <Grid.Col span={12} md={8}>
          <Card padding={30}>
            <Title order={2}>Giỏ Hàng</Title>
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
            <Group position="right">
              <Button onClick={() => dispatch({
                type: CartActionType.RemoveMultipleIds,
                ids: selected,
              })}>
                Xóa
              </Button>
            </Group>
          </Card>
        </Grid.Col>
        <Grid.Col span={12} md={4}>
          <Card>
            <Title order={2}>Giá</Title>
          </Card>
        </Grid.Col>
      </Grid>
    </Stack>
  );
}
