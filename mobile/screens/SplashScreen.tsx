import { 
  View,
  TouchableOpacity, 
  StyleSheet 
} from 'react-native';

import { Text } from '../components/Themed';

import { AuthStackScreenProps } from '../types';

export default function SplashScreen({ navigation }: AuthStackScreenProps<'Splash'>) {
  return (
    <View style={styles.container}>
      <Text 
        style={styles.title}
        lightColor="rgba(0,0,0,0.8)"
        darkColor="rgba(255,255,255,0.8)">
        Splash Screen
      </Text>
      <TouchableOpacity
        onPress={() => navigation.navigate('SignIn')}>
        <Text style={styles.button}>Sign in</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: 'green',
    marginTop: 15,
    paddingVertical: 10,
    paddingHorizontal: 20,
    color: 'white',
  },
});
