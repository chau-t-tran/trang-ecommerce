import { useContext, useState, useEffect } from 'react';
import { 
  createStyles,
  useMantineColorScheme,
  useMantineTheme,
  ActionIcon,
  Header,
  Menu,
  Text,
  Title,
  Group,
} from '@mantine/core';
import { IconChevronDown, IconHome, IconLogout, IconMoon, IconMoonStars, IconShoppingCart, IconSun, IconUser } from '@tabler/icons';
import { useRouter } from 'next/navigation';
import { TokenResponse, useGoogleLogin, googleLogout, GoogleLogin } from '@react-oauth/google';
import axios from 'axios';

const useStyles = createStyles((theme) => ({
  title: {
    fontSize: 40,
    fontWeight: 900,
    marginTop: '10px',
    [theme.fn.smallerThan('md')]: {
      fontSize: 25,
    },
  },
  icons: {
    [theme.fn.smallerThan('md')]: {
      height: '20px',
      width: '20px',
    }
  },
  dropdown: { 
    borderTopLeftRadius: 0, 
    borderTopRightRadius: 0 
  }
}));

interface UserProfile {
  id: string;
  name: string;
  email: string;
  picture: string;
}

export function SmallHeader() {
  const { classes } = useStyles();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const router = useRouter();
  const theme = useMantineTheme();

  const [ user, setUser ] = useState<TokenResponse>();
  const [ profile, setProfile ] = useState<UserProfile | null>(null);

  const login = useGoogleLogin({
      onSuccess: (codeResponse) => setUser(codeResponse),
      onError: (error) => console.log('Login Failed:', error)
  });

  useEffect(
      () => {
          if (user) {
              axios
                  .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                      headers: {
                          Authorization: `Bearer ${user.access_token}`,
                          Accept: 'application/json'
                      }
                  })
                  .then((res) => {
                      setProfile(res.data);
                  })
                  .catch((err) => console.log(err));
          }
      },
      [ user ]
  );

  // log out function to log the user out of google and set the profile array to null
  const logOut = () => {
      googleLogout();
      setProfile(null);
  };

  return (
    <Header height={60} p={0}>
      <Menu width={"100%"} offset={0} classNames={{ dropdown: classes.dropdown }}>
        <Menu.Target>
          <ActionIcon style={{width: '100%', height: '100%'}}>
            <Group>
              <Title 
                className={classes.title} 
                align="center"
                style={{ cursor: 'pointer' }}
              >
                Call Of{" "}
                <Text inherit variant="gradient" component="span">
                  Nature
                </Text>
              </Title>
              <IconChevronDown />
            </Group>
          </ActionIcon>
        </Menu.Target>
        <Menu.Dropdown>
        <Menu.Item 
          icon={
            <IconHome 
              size={20}
            />
          }
          onClick={() => router.push('/')}
        >
          Trang Chủ
        </Menu.Item>
        <Menu.Item 
          icon={
            <IconUser 
              size={20}
            />
          }
          onClick={() => login()}
        >
          Dăng Nhập
        </Menu.Item>
        <Menu.Item 
          icon={
            <IconShoppingCart
              size={20}
            />
          }
          onClick={() => router.push('/cart')}
        >
          Giỏ Hàng
        </Menu.Item>
        {colorScheme === 'dark' 
          ?
          <Menu.Item 
            icon={
              <IconSun 
                size={20}
                color={theme.colors.yellow[4]}
              />
            }
            onClick={() => toggleColorScheme()}
          >
            Chế Độ Sáng
          </Menu.Item>
          :
          <Menu.Item 
            icon={
              <IconMoonStars 
                size={20}
                color={theme.colors.blue[6]}
              />
            }
            onClick={() => toggleColorScheme()}
          >
            Chế Độ Tối
          </Menu.Item>
        }
        </Menu.Dropdown>
      </Menu>
    </Header>
  );
}
