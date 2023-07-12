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
import { useMediaQuery } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
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
    zIndex: 1,
    paddingLeft: '15%',
    paddingRight: '15%',
    paddingTop: '40px',
    [theme.fn.smallerThan("md")]: {
      paddingLeft: '25px',
      paddingRight: '25px',
      paddingTop: '25px',
      marginBottom: '50px'
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
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

  useEffect(() => {console.log(selected)}, [selected]);

  const thanhToan = () => {
    if (cartIds.length == 0)
    {
      notifications.show({
        title: 'Giở bạn đang trong!',
        message: ''
      });
      return;
    }
    dispatch({ type: CartActionType.RemoveMultipleIds, ids: cartIds });
    notifications.show({
      title: 'Thông báo: bạn đã đặt hàng thành công!',
      message: 'Quý khách sẽ được gửi đi trong vòng 3-4 ngày làm việc kể từ ngày đặt hàng'
    });
  };

  return (
    <Stack className={classes.content} spacing={ mobile ? '25px' : '40px' }>
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
              <Button size={mobile ? "xs" : "md"} onClick={thanhToan}>
                Thanh Toán
              </Button>
            </Group>
          </Card>
        </Grid.Col>
      </Grid>
    </Stack>
  );
}
