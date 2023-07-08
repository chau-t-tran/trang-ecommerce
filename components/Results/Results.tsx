import { SimpleGrid, useMantineTheme } from '@mantine/core';
import { useContext } from 'react';
import { DataContext } from '../../contexts/DataContextProvider';
import { Card } from './Card';
import { FuzzyMatchRank } from '../../utility/fuzzy';

export default function Results({ search }: { search: string }) {
  const theme = useMantineTheme();
  const data = useContext(DataContext);
  const matches = FuzzyMatchRank(search, data, "name");
  const cards = matches.map((item) => (
    <Card item={item} />
  ));

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
