import { useContext, useRef } from 'react';
import { Carousel } from '@mantine/carousel';
import { useMediaQuery } from '@mantine/hooks';
import { useMantineTheme } from '@mantine/core';
import { DataContext } from '../../contexts/DataContextProvider';
import { ItemType } from '../../contexts/IItem';
import { Card } from './Card';
import Autoplay from 'embla-carousel-autoplay';

export default function SubFeatured() {
  const theme = useMantineTheme();
  const data = useContext(DataContext);
  const featured = data.filter(x => x.type === ItemType.SubFeatured);
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

  const autoplay = useRef(Autoplay());
  autoplay.current.options.delay = 3000;
  autoplay.current.options.playOnInit = true;
  autoplay.current.options.active = true;

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
      plugins={[autoplay.current]}
      onMouseEnter={autoplay.current.stop}
      onMouseLeave={autoplay.current.reset}
    >
      {slides}
    </Carousel>
  );
}
