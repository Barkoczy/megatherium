import Constants from 'expo-constants';
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { getValueFor } from './utils/SecureStore';
import { ACCESS_TOKEN } from './constants/Config';

const apiUrl = Constants?.expoConfig?.extra?.apiUrl;

const httpLink = new HttpLink({ uri: apiUrl });

const authLink = setContext(async (_, {headers}: any) => {
  const token = await getValueFor(ACCESS_TOKEN);

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

export default apolloClient;
