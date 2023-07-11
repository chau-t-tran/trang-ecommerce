import { useContext, useState, useEffect } from 'react';
import { 
  createStyles,
  Header,
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

export function SmallHeader() {
  const { classes } = useStyles();
  const router = useRouter();
  const { state, dispatch } = useContext(CartContext);


  return (
    <Header height={60} p="xs">

    </Header>
  );
}
