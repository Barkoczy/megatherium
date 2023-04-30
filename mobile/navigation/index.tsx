import { useContext } from 'react';
import { View, ActivityIndicator, ColorSchemeName } from 'react-native';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';

import { AuthContext } from '../context/AuthContext';

import AuthStack from './AuthStack';
import AppStack from './AppStack';
import LinkingConfiguration from './LinkingConfiguration';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  const {isLoading, accessToken} = useContext(AuthContext);

  if (isLoading) {
    return (
      <View style={{flex:1,justifyContent:'center',alignContent:'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      { accessToken === null ? <AuthStack /> : <AppStack /> }
    </NavigationContainer>
  );
}
