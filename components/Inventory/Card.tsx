import { IItem } from '../../contexts/IItem';
import { 
  createStyles,
  useMantineTheme,
  rem,
  Paper, 
  Title, 
  Button, 
  Rating,
  Indicator,
} from '@mantine/core';
import { IconShoppingCart } from '@tabler/icons'

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

export function Card({ image, name, pricePerUnit, rating, sale }: IItem) {
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
        <Rating value={rating} size="xs"/>
      </div>
      <Indicator 
        inline 
        label={`- ${sale}%`}
        size={14} 
        offset={-5}
        radius="xs"
        color='yellow'
        disabled={sale <= 0}
      >
        <Button 
          leftIcon={<IconShoppingCart />}
          variant="white"
          color="dark"
          size="xs"
          classNames={{
            root: classes.root,
            label: classes.label
          }}
        >
          {`${pricePerUnit.toLocaleString('vi-VN', { style: 'currency', currency: 'VND'})}`}
        </Button>
      </Indicator>
    </Paper>
  );
}
