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

interface CartTableProps {
  items: IItem[], 
  checked: (id: string) => void, 
  unchecked: (id: string) => void 
}

const useStyles = createStyles((theme) => ({
}));

export default function CartTable({ items, checked, unchecked }: CartTableProps) 
{
  const theme = useMantineTheme();
  const { classes } = useStyles();
  const { state, dispatch } = useContext(CartContext);

  const ths = (
    <tr>
      <th>Chọn</th>
      <th>Ảnh</th>
      <th>Sản Phẩm</th>
      <th>Trọng Lượng</th>
    </tr>
  );

  const rows = items.map((item: IItem) => (
    <tr key={item.id}>
      <td>
        <Checkbox onChange={(e) => {
          if (e.currentTarget.checked)
          {
            checked(item.id);
            return;
          }
          unchecked(item.id);
        }}/>
      </td>
      <td>
        <Image src={item.image} radius={5} width={80} height={80}/>
      </td>
      <td>{item.name}</td>
      <td>
        <NumberInput
          defaultValue={state.cartMap.get(item.id)}
          placeholder="1"
          min={1}
          label="Trọng lượng"
          formatter={(value) => `${value} kg`}
          onChange={(value: number) => dispatch({ 
            type: CartActionType.SetQuantity, 
            id: item.id, 
            quantity: value,
          })}
        />
      </td>
    </tr>
  ));

  const empty = 
    <>
      <Space h="md" />
      <Center>
        <Text>Giỏ hàng còn trống</Text>
      </Center>
    </>

  return (
    <>
      <Table captionSide="bottom">
        <thead>{ths}</thead>
        <tbody>{rows}</tbody>
      </Table>
      { items.length <= 0 && empty }
    </>
  );
}
