import { Carousel } from '@mantine/carousel';
import { useMediaQuery } from '@mantine/hooks';
import { useMantineTheme } from '@mantine/core';
import { useContext } from 'react';
import { DataContext } from '../../contexts/DataContextProvider';
import { ItemType } from '../../contexts/IItem';
import { Card } from './Card';

export function Featured() {
  const theme = useMantineTheme();
  const data = useContext(DataContext);
  const featured = data.filter(x => x.type === ItemType.Featured);
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  const slides = featured.map((item) => (
    <Carousel.Slide key={item.name}>
      <Card {...item} />
    </Carousel.Slide>
  ));

  return (
    <Carousel
      slideSize="50%"
      breakpoints={[{ maxWidth: 'sm', slideSize: '100%', slideGap: 2 }]}
      slideGap="md"
      align="start"
      slidesToScroll={mobile ? 1 : 2}
      loop={true}
    >
      {slides}
    </Carousel>
  );
}
