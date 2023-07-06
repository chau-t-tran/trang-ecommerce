import { useRouter } from 'next/navigation';
import { IItem } from '../../contexts/IItem';
import { 
  createStyles,
  Paper, 
  Title, 
  Button, 
  rem,
  useMantineTheme,
  Rating
} from '@mantine/core';
import CartButton from '../CartButton/CartButton';

const useStyles = createStyles((theme) => ({
  card: {
    height: rem(220),
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
    fontSize: rem(32),
    marginTop: theme.spacing.xs,
  },
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
        <Rating value={item.rating}/>
      </div>
      <CartButton item={item}/>
    </Paper>
  );
}
