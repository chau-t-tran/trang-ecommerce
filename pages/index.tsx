import { useTheme } from '@emotion/react';
import { 
  Image, 
  Button,
  createStyles, 
  Stack,
  Center,
  Overlay,
  Input,
  useMantineTheme,
  Group,
  Paper,
} from '@mantine/core';
import { IconCarrot, IconSearch } from '@tabler/icons';

const useStyles = createStyles((theme) => ({
  bannerWrapper: {
    width: '100%',
    position: 'absolute',
    zIndex: 0,
    paddingLeft: '5%',
    paddingRight: '5%',
  },
  content: {
    position: 'relative',
    marginTop: '175px',
    paddingRight: '15%',
    paddingLeft: '15%',
    zIndex: 1,
    height: '1000px',
  },
  searchbar: {
    marginTop: '20px',
  },
}));


export default function HomePage() {
  const theme = useMantineTheme();
  const { classes } = useStyles();

  return (
    <>
      <Center className={classes.bannerWrapper}>
        <Overlay blur={0} opacity={theme.colorScheme === 'dark' ? 0.85 : 0.50} />
        <Image src="banner.png" height={150} fit="cover"/>
      </Center>
      <Stack className={classes.content}>
        <Input 
          className={classes.searchbar} 
          icon={<IconSearch />}
          radius="md"
          size="md"
          placeholder="Tìm Kiếm"
        />
        <Group grow spacing={0}>
          <Paper 
            withBorder 
            shadow="md" 
            p="md" 
            style={{borderTopRightRadius: '0px', borderBottomRightRadius: '0px'}}
          >
            Hello
          </Paper>
          <Paper 
            withBorder 
            shadow="md" 
            p="md"
            style={{borderRadius: '0px', borderRight: 0, borderLeft: 0}}
          >
            Hello
          </Paper>
          <Paper 
            withBorder 
            shadow="md" 
            p="md" 
            style={{borderTopLeftRadius: '0px', borderBottomLeftRadius: '0px'}}
          >
            Hello
          </Paper>
        </Group>
      </Stack>
    </>
  );
}
