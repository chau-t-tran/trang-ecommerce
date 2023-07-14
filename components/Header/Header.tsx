import { useContext, useState, useEffect } from 'react';
import { 
  createStyles,
  Header as Hdr,
  Title,
  Text,
  ActionIcon,
  Indicator,
  Group,
  Avatar,
  Image
} from '@mantine/core';
import { IconLogout, IconShoppingCart, IconUser } from '@tabler/icons';
import { ColorSchemeToggle } from '../ColorSchemeToggle/ColorSchemeToggle';
import { CartContext } from '../../contexts/CartProvider';
import { useRouter } from 'next/navigation';
import { TokenResponse, useGoogleLogin, googleLogout, GoogleLogin } from '@react-oauth/google';
import axios from 'axios';

const useStyles = createStyles((theme) => ({
  title: {
    fontSize: 40,
    fontWeight: 900,
    marginTop: '10px',
    marginLeft: '20px',
    [theme.fn.smallerThan('md')]: {
      fontSize: 25,
    },
  },
  icons: {
    [theme.fn.smallerThan('md')]: {
      height: '20px',
      width: '20px',
    }
  }
}));

interface UserProfile {
  id: string;
  name: string;
  email: string;
  picture: string;
}

export function Header() {
  const { classes } = useStyles();
  const router = useRouter();
  const { state, dispatch } = useContext(CartContext);

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
    <Hdr height={60} p="xs">
      <div style={{ display: 'flex', alignItems: 'center', height: '100%', padding: '5px' }}>
        <Group spacing={1}>
          <Avatar src="./logo.png" />
          <Title 
            className={classes.title} 
            align="center"
            onClick={() => router.push('/')}
            style={{ cursor: 'pointer' }}
          >
            Call Of{" "}
            <Text inherit variant="gradient" component="span">
              Nature
            </Text>
          </Title>
        </Group>
        <Group spacing="xs" style={{ order: 2, marginLeft: 'auto' }}>
          <ColorSchemeToggle />
          {
            profile == null
            ?
            <ActionIcon size="md" onClick={() => login()}>
              <IconUser />
            </ActionIcon>
            :
            <>
              <Avatar src={`${profile.picture}`}/>
              <ActionIcon size="md" onClick={logOut}>
                <IconLogout />
              </ActionIcon>
            </>
          }
          <Indicator label={`${state.cartMap.size}`} inline size={16} offset={8} radius={3}>
            <ActionIcon size="md" onClick={() => router.push('/cart')}>
              <IconShoppingCart />
            </ActionIcon>
          </Indicator>
        </Group>
      </div>
    </Hdr>
  );
}
