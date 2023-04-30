import { useContext } from 'react';
import {
  View, 
  TouchableOpacity, 
  StyleSheet
} from 'react-native';
import { Text } from '../components/Themed';

import { AuthContext } from '../context/AuthContext';

import { AuthStackScreenProps } from '../types';

export default function SignUpScreen({ navigation }: AuthStackScreenProps<'SignUp'>) {
  const { signUp }: any = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text 
        style={styles.title}
        lightColor="rgba(0,0,0,0.8)"
        darkColor="rgba(255,255,255,0.8)">
         SignUp Screen
      </Text>
      <TouchableOpacity
        onPress={() => {signUp()}}>
        <Text style={styles.button}>Sign up</Text>
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
