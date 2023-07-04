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
import { IconShoppingCart } from '@tabler/icons'

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

export function Card({ image, name, pricePerUnit, quantityUnit, rating }: IItem) {
  const theme = useMantineTheme();
  const { classes } = useStyles();

  return (
    <Paper
      shadow="md"
      p="md"
      radius="md"
      sx={{ backgroundImage: `url(${image})` }}
      className={classes.card}
    >
      <div>
        <Title order={3} className={classes.title}>
          {name}
        </Title>
        <Rating value={rating}/>
      </div>
      <Button 
        leftIcon={<IconShoppingCart />}
        variant="white"
        color="dark"
        /*
        styles={
          (theme: MantineTheme) => ({
            root: {
              backgroundColor: 'green',
              border: '1px solid black'
            }
          })
        }
        */
      >
        {`${pricePerUnit.toLocaleString('vi-VN', { style: 'currency', currency: 'VND'})}`}
      </Button>
    </Paper>
  );
}
