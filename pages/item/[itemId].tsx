import { useRouter } from 'next/router'
import { useContext } from 'react';
import { DataContext } from '../../contexts/DataContextProvider';
import { ItemType } from '../../contexts/IItem';
import Conditional from '../../components/Util/Conditional';
import { 
  Group,
  Image
} from '@mantine/core';
 
export default function ItemPage() {
  const router = useRouter()
  const itemId = router.query.itemId;
  const matches = useContext(DataContext).filter(x => x.id === itemId);
  const item = matches.length > 0 ? matches.slice(0, 1)[0] : null;

  return (
    <>
      <Group>
        <Conditional showWhen={item != null}>
          <Image src={item!.image} />
        </Conditional>
      </Group>
    </>
  );
}
