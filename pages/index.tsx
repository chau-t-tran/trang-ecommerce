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
import InfoTab from '../components/InfoTab/InfoTab';
import Featured from '../components/Featured/Featured';
import Inventory from '../components/Inventory/Inventory';
import SubFeatured from '../components/SubFeatured/SubFeatured';
import { useInputState } from '@mantine/hooks';
import Results from '../components/Results/Results';

const useStyles = createStyles((theme) => ({
  bannerWrapper: {
    width: '100%',
    position: 'absolute',
    zIndex: 0,
  },
  content: {
    position: 'relative',
    marginTop: '175px',
    paddingLeft: '15%',
    paddingRight: '15%',
    [theme.fn.smallerThan("md")]: {
      paddingLeft: '5%',
      paddingRight: '5%',
    },
    zIndex: 1,
  },
  searchbar: {
    marginTop: '20px',
  },
}));


export default function HomePage() {
  const theme = useMantineTheme();
  const { classes } = useStyles();
  const [search, setSearch] = useInputState<string>('');

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
          onChange={setSearch}
        />
        {
          search.length > 0
          ?
          <Results search={search} />
          :
          <>
            <InfoTab />
            <Featured />
            <Inventory />
            <SubFeatured />
          </>
        }
      </Stack>
    </>
  );
}
