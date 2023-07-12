import { useContext } from 'react';
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
import {
  useMediaQuery
} from '@mantine/hooks';
import { IItem } from '../../contexts/IItem';
import { CartActionType, CartContext } from '../../contexts/CartProvider';
import { useRouter } from 'next/router';

interface CartTableProps {
  items: IItem[], 
  checked: (id: string) => void, 
  unchecked: (id: string) => void 
}

export default function CartTable({ items, checked, unchecked }: CartTableProps) 
{
  const theme = useMantineTheme();
  const router = useRouter();
  const { state, dispatch } = useContext(CartContext);
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

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
        <Image 
          src={item.image} 
          radius={5} 
          width={mobile ? 20 : 80} 
          height={mobile ? 20 : 80}
          onClick={() => router.push(`/item/${item.id}`)}
          style={{ cursor: 'pointer' }}
        />
      </td>
      <td>
      <Text 
        onClick={() => router.push(`/item/${item.id}`)}
        style={{ cursor: 'pointer' }}
      >
        {item.name}
      </Text>
      </td>
      <td>
        <NumberInput
          defaultValue={state.cartMap.get(item.id)}
          placeholder="1"
          min={1}
          formatter={(value) => `${value} kg`}
          onChange={(value: number) => dispatch({ 
            type: CartActionType.SetQuantity, 
            id: item.id, 
            quantity: value,
          })}
          size={ mobile ? "xs" : "md" }
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
      <Table 
        captionSide="bottom" 
        horizontalSpacing={mobile ? "xs" : "md"}
        fontSize={mobile ? 10 : "sm"}
      >
        <thead>{ths}</thead>
        <tbody>{rows}</tbody>
      </Table>
      { items.length <= 0 && empty }
    </>
  );
}
