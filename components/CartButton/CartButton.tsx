import { Button, ButtonStylesNames } from '@mantine/core';
import { IItem } from '../../contexts/IItem';
import { IconShoppingCart } from '@tabler/icons'
import { ClassNames } from '@mantine/styles';
import { useRouter } from 'next/navigation';

interface CartButtonProps {
  item: IItem,
  classNames?: ClassNames<ButtonStylesNames>
}

export default function CartButton({ item, classNames=undefined}: CartButtonProps) {
  const router = useRouter();

  return (
    <Button 
      leftIcon={<IconShoppingCart />}
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
