import { 
  Image, 
  createStyles, 
  Stack,
  Center,
  Overlay,
  Input,
  useMantineTheme,
} from '@mantine/core';
import { IconSearch } from '@tabler/icons';
import { InfoTab } from '../components/InfoTab/InfoTab';
import { Featured } from '../components/Featured/Featured';
import { DataContextProvider } from '../contexts/DataContextProvider';

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
    <DataContextProvider>
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
        <InfoTab />
        <Featured />
      </Stack>
    </DataContextProvider>
  );
}
