import { useRouter } from 'next/router'
import { useContext } from 'react';
import { DataContext } from '../../contexts/DataContextProvider';
import { 
  Container, 
  Grid, 
  SimpleGrid, 
  Skeleton, 
  useMantineTheme, 
  Image,
  Title,
  Stack,
  Rating,
  Text,
  rem,
  Space
} from '@mantine/core';

const PRIMARY_COL_HEIGHT = rem(300);

export default function LeadGrid() {
  const theme = useMantineTheme();
  const SECONDARY_COL_HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 2 - ${theme.spacing.md} / 2)`;

  const router = useRouter()
  const itemId = router.query.itemId;
  const matches = useContext(DataContext).filter(x => x.id === itemId);
  const item = matches.length > 0 ? matches.slice(0, 1)[0] : null;

  return (
    <Container my="md">
      <SimpleGrid cols={2} spacing="lg" breakpoints={[{ maxWidth: 'sm', cols: 1 }]} mt={30}>
        { /* <Skeleton height={PRIMARY_COL_HEIGHT} radius="md" animate={false} /> */ }
        <Image src={item!.image} radius="md" />
        <Grid gutter="md">
          <Grid.Col>
            <Stack spacing={0}>
              <Title> {item!.name} </Title>
              <Rating value={item!.rating}/>
              <Space h="md" />
              <Text> {item!.desc} </Text>
            </Stack>
          </Grid.Col>
          <Grid.Col span={6}>
            <Skeleton height={SECONDARY_COL_HEIGHT} radius="md" animate={false} />
          </Grid.Col>
          <Grid.Col span={6}>
            <Skeleton height={SECONDARY_COL_HEIGHT} radius="md" animate={false} />
          </Grid.Col>
        </Grid>
      </SimpleGrid>
    </Container>
  );
}
