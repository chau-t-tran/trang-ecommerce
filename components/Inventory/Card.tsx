import { useRouter } from 'next/navigation';
import { IItem } from '../../contexts/IItem';
import { 
  createStyles,
  useMantineTheme,
  rem,
  Paper, 
  Title, 
  Rating,
  Indicator,
} from '@mantine/core';
import CartButton from '../../components/CartButton/CartButton';

const useStyles = createStyles((theme) => ({
  card: {
    height: rem(110),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 900,
    color: theme.white,
    lineHeight: 1.2,
    fontSize: rem(12),
  },
  label: {
    fontSize: rem(10)
  },
  root: {
    height: '40px'
  }
}));

export function Card({ item }: { item: IItem }) {
  const router = useRouter();
  const theme = useMantineTheme();
  const { classes } = useStyles();

  return (
    <Paper
      shadow="md"
      p="md"
      radius="md"
      sx={{ backgroundImage: `url(${item.image})` }}
      className={classes.card}
    >
      <div>
        <Title order={3} className={classes.title}>
          {item.name}
        </Title>
        <Rating value={item.rating} size="xs"/>
      </div>
      <Indicator 
        inline 
        label={`- ${item.sale}%`}
        size={14} 
        offset={-5}
        radius="xs"
        color='yellow'
        disabled={item.sale <= 0}
      >
        <CartButton item={item} classNames={{
          label: classes.label,
          root: classes.root,
        }}/>
      </Indicator>
    </Paper>
  );
}
