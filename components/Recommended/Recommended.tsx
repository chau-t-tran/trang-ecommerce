import { SimpleGrid, useMantineTheme } from '@mantine/core';
import { 
  useState, 
  useEffect, 
  useContext, 
  ReactNode 
} from 'react';
import { DataContext } from '../../contexts/DataContextProvider';
import { Card } from '../Inventory/Card';
import { takeRandom } from '../../utility/array';

export default function Recommended() {
  const [cards, setCards] = useState<ReactNode>();
  const theme = useMantineTheme();
  const data = useContext(DataContext);

  useEffect(() => {
    setCards(takeRandom(data.map((item) => (
      <Card item={item} />
    )), 4));
  }, []);

  return (
    <SimpleGrid
      cols={4}
      spacing="lg"
      breakpoints={[
        { maxWidth: 'md', cols: 3, spacing: 'md' },
        { maxWidth: 'sm', cols: 2, spacing: 'sm' },
        { maxWidth: 'xs', cols: 1, spacing: 'sm' },
      ]}
    >
      {cards}
    </SimpleGrid>
  );
}
