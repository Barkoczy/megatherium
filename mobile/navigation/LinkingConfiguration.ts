import { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';

import { RootStackParamList } from '../types';

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.createURL('/')],
  config: {
    screens: {
      Auth: {
        screens: {
          Splash: {
            screens: {
              SplashScreen: 'splash',
            },
          },
          SignUp: {
            screens: {
              SignInScreen: 'signup',
            },
          },
          SignIn: {
            screens: {
              SignUpScreen: 'signin',
            },
          },
        },
      },
      App: {
        screens: {
          Home: {
            screens: {
              HomeScreen: 'home',
            },
          },
        },
      },
    },
  },
};

export default linking;
