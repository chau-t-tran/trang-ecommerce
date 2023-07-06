import { useRouter } from 'next/router'
import { useContext, useState } from 'react';
import { DataContext } from '../../contexts/DataContextProvider';
import { 
  createStyles,
  Grid, 
  SimpleGrid, 
  useMantineTheme, 
  Image,
  Title,
  Stack,
  Group,
  Rating,
  Text,
  Card,
  Space,
  NumberInput,
  Button
} from '@mantine/core';
import Recommended from '../../components/Recommended/Recommended';
import { CartActionType, CartContext } from '../../contexts/CartProvider';

const useStyles = createStyles((theme) => ({
  fillHeight: {
    height: '100% !important'
  },
  content: {
    position: 'relative',
    marginTop: '40px',
    paddingRight: '15%',
    paddingLeft: '15%',
    zIndex: 1,
  },
}));

export default function ItemDisplay() {
  const theme = useMantineTheme();
  const { classes } = useStyles();
  const [weight, setWeight] = useState<number>(1);
  const cart = useContext(CartContext);

  const router = useRouter()
  const itemId = router.query.itemId;
  const matches = useContext(DataContext).filter(x => x.id === itemId);
  const item = matches.length > 0 ? matches.slice(0, 1)[0] : null;

  return (
    <Stack className={classes.content} spacing="lg">
      <Card padding={20}>
        <SimpleGrid cols={2} spacing="lg" breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
          <Image 
            classNames={{
              root: classes.fillHeight,
              image: classes.fillHeight,
              imageWrapper: classes.fillHeight, 
              figure: classes.fillHeight
            }}
            src={item!.image} 
            radius="md"
            mx="auto"
            fit="fill"
          />
          <Grid gutter="sm">
            <Grid.Col>
              <Stack spacing={0}>
                <Title order={3}> {item!.name} </Title>
                <Rating value={item!.rating}/>
                <Space h="md" />
                <Text> {item!.desc} </Text>
                <Space h="sm" />
                <Text>
                  {`${(item!.pricePerUnit * weight).toLocaleString('vi-VN', { style: 'currency', currency: 'VND'})}/ ${weight} kg`}
                </Text>
                <Space h="sm" />
                <NumberInput
                  defaultValue={weight}
                  placeholder="1"
                  min={1}
                  label="Trọng lượng"
                  formatter={(value) => `${value} kg`}
                  onChange={(value: number) => setWeight(value)}
                />
                <Space h="md" />
                <Group>
                  <Button
                    onClick={() => {
                      cart.dispatch({
                        type: CartActionType.AddItem,
                        id: item!.id
                      });
                    }}
                  >
                    Thêm vào giở hàng
                  </Button>
                  <Button>
                    Mua ngay
                  </Button>
                </Group>
              </Stack>
            </Grid.Col>
          </Grid>
        </SimpleGrid>
      </Card>
      <Recommended />
    </Stack>
  );
}
