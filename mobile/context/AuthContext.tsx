import React, { createContext, useState, useEffect } from 'react';
import { setValueFor, getValueFor, deleteValueFor } from '../utils/SecureStore';

import {
  ACCESS_TOKEN,
  REFRESH_TOKEN,
  USER
} from '../constants/Config';

import { AuthContextState } from '../interfaces';

export const AuthContext = createContext<AuthContextState>({
  signup: () => {},
  signin: () => {},
  signout: () => {},
  isLoading: false,
  accessToken: null,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const signup = async () => {
    try {
      setIsLoading(true);

      await setValueFor(ACCESS_TOKEN, 'sqsqsqs');
      await setValueFor(REFRESH_TOKEN, 'sqsqsqs');

      setAccessToken('sqsqsqs');
      setIsLoading(false);
    } catch(e) {
      console.error(`signup in error ${e}`)
    }
  }

  const signin = async (
    accessToken: string, refreshToken: string, user: {
      email: string, username: string
    }
  ) => {
    try {
      setIsLoading(true);

      await setValueFor(ACCESS_TOKEN, accessToken);
      await setValueFor(REFRESH_TOKEN, refreshToken);
      await setValueFor(USER, user);

      setAccessToken(accessToken);
      setIsLoading(false);
    } catch(e) {
      console.error(`signin in error ${e}`)
    }
  }

  const signout = async () => {
    try {
      await deleteValueFor(ACCESS_TOKEN);
      await deleteValueFor(REFRESH_TOKEN);

      setAccessToken(null);
      setIsLoading(false);
    } catch(e) {
      console.error(`signout in error ${e}`)
    }
  }

  const isLoggedIn = async () => {
    try {
      let accessToken = await getValueFor(ACCESS_TOKEN);
      let refreshToken = await getValueFor(REFRESH_TOKEN);
      
      if (accessToken !== null && refreshToken !== null) { 
        setAccessToken(accessToken);
      }
      setIsLoading(false);
    } catch(e) {
      console.error(`isLogged in error ${e}`)
    }
  }

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider value={{signup, signin, signout, isLoading, accessToken}}>
      {children}
    </AuthContext.Provider>
  );
}
