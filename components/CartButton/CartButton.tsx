import { useContext } from 'react';
import { Button, ButtonStylesNames } from '@mantine/core';
import { IItem } from '../../contexts/IItem';
import { IconShoppingCart, IconShoppingCartDiscount } from '@tabler/icons'
import { ClassNames } from '@mantine/styles';
import { CartContext } from '../../contexts/CartProvider';
import { useRouter } from 'next/navigation';

interface CartButtonProps {
  item: IItem,
  classNames?: ClassNames<ButtonStylesNames>
}

export default function CartButton({ item, classNames=undefined}: CartButtonProps) {
  const router = useRouter();
  const { state, dispatch } = useContext(CartContext);

  return (
    <Button 
      leftIcon={state.cartMap.has(item.id) ? <IconShoppingCartDiscount /> : <IconShoppingCart />}
      variant="white"
      color="dark"
      size="xs"
      onClick={() => router.push(`/item/${item.id}`)}
      classNames={classNames}
    >
      {`${item.pricePerUnit.toLocaleString('vi-VN', { style: 'currency', currency: 'VND'})}`}
    </Button>
  );
}
