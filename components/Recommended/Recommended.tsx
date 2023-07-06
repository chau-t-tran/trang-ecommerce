import { SimpleGrid, useMantineTheme } from '@mantine/core';
import { useContext } from 'react';
import { DataContext } from '../../contexts/DataContextProvider';
import { Card } from '../Inventory/Card';

export default function Recommended() {
  const theme = useMantineTheme();
  const data = useContext(DataContext);
  const cards = data.map((item) => (
    <Card item={item} />
  )).slice(0, 4);

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
