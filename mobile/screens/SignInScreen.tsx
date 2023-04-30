import { useState, useContext } from 'react';
import { 
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet
} from 'react-native';
import { gql, useMutation } from '@apollo/client';
import { AuthContext } from '../context/AuthContext';
import { AuthStackScreenProps } from '../types';
import { Text } from '../components/Themed';

const SIGNIN = gql`
  mutation SignIn($input: SignInInput!) {
    signin(signInInput: $input) {
      accessToken
      refreshToken
      user {
        email
        username
      }
    }
  }
`

export default function SignInScreen({ navigation }: AuthStackScreenProps<'SignIn'>) {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errors, setErrors] = useState<object>({});
  const { signin } = useContext(AuthContext);
  const [submitSignin, { loading }] = useMutation(SIGNIN, {
    onCompleted: (data: any) => {
      const accessToken = data.signin.accessToken;
      const refreshToken = data.signin.refreshToken;
      const user = {
        email: data.signin.user.email, 
        username: data.signin.user.username
      };
      signin(accessToken, refreshToken, user);
    },
    onError: (err) => {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: { 
      input: {
        email, password
      }
    }
  });

  return (
    <View style={styles.container}>
      <Text 
        style={styles.title}
        lightColor="rgba(0,0,0,0.8)"
        darkColor="rgba(255,255,255,0.8)">
        SignIn Screen
      </Text>
      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        value={email}
        placeholder="Email"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        placeholder="Password"
        secureTextEntry={true}
      />
      <TouchableOpacity
        onPress={() => submitSignin()}>
        {loading ? (
          <ActivityIndicator size="large" />
        ) : (
          <Text style={styles.button}>Sign in</Text>
        )}
      </TouchableOpacity>
      {Object.keys(errors).length > 0 && Object.values(errors).map(error => (
        <Text key={error} style={styles.error}>{error}</Text>
      ))}
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
    marginBottom: 25,
  },
  input: {
    width: 300,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    paddingBottom: 8,
    marginTop: 15,
    marginBottom: 25,
  },
  button: {
    backgroundColor: 'green',
    marginTop: 15,
    paddingVertical: 10,
    paddingHorizontal: 20,
    color: 'white',
  },
  error: {
    marginTop: 15,
  }
});
