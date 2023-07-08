import { useContext, useState } from 'react';
import { 
  createStyles,
  useMantineTheme, 
  Table,
  Image,
  NumberInput,
  Checkbox,
  Center,
  Text,
  Space,
} from '@mantine/core';
import { IItem } from '../../contexts/IItem';
import { CartActionType, CartContext } from '../../contexts/CartProvider';

const useStyles = createStyles((theme) => ({
}));

export default function Prices({ items }: { items: IItem[]}) 
{
  const theme = useMantineTheme();
  const { classes } = useStyles();
  const { state, dispatch } = useContext(CartContext);

  const subtotal = items.reduce((sum, x) => sum + (x.pricePerUnit * (state.cartMap.get(x.id) ?? 0)), 0);
  const tax = Math.round(subtotal * 0.10);
  const ship = subtotal > 0 ? 200000 : 0;
  const total = subtotal + tax + ship;

  return (
    <Table>
      <thead>
        <th></th>
        <th></th>
      </thead>
      <tbody>
        <tr>
          <td><Text size={12} align="right">Tiền Hàng</Text></td>
          <td>
            <Text size={12} align="right">
              {`${subtotal.toLocaleString('vi-VN', { style: 'currency', currency: 'VND'})}`}
            </Text>
          </td>
        </tr>
        <tr>
          <td><Text size={12} align="right">Thuế GTGT (10%)</Text></td>
          <td>
            <Text size={12} align="right">
              {`${tax.toLocaleString('vi-VN', { style: 'currency', currency: 'VND'})}`}
            </Text>
          </td>
        </tr>
        <tr>
          <td><Text size={12} align="right">Tiền Ship</Text></td>
          <td>
            <Text size={12} align="right">
              {`${ship.toLocaleString('vi-VN', { style: 'currency', currency: 'VND'})}`}
            </Text>
          </td>
        </tr>
        <tr>
          <td><Text weight={700} size={12} align="right">Tổng Cộng</Text></td>
          <td>
            <Text size={12} align="right">
              {`${total.toLocaleString('vi-VN', { style: 'currency', currency: 'VND'})}`}
            </Text>
          </td>
        </tr>
      </tbody>
    </Table>
  );
}
