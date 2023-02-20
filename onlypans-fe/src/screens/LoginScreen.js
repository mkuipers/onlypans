import React, { useContext, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import { StyleSheet, Text, KeyboardAvoidingView, TextInput, TouchableOpacity, Image } from 'react-native';

import { AuthContext } from '../AppContext';

const Login = ({ navigation  }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const authContext = useContext(AuthContext);

  const handleLogin = async () => {
    try {
      const body = JSON.stringify({user: { email, password }});
      const response = await fetch('http://192.168.1.96:4000/login', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: body
      });
      
      const result = await response.headers.get('Authorization');
      if (result) {
        const token = result.split(' ')[1];
        await authContext.signIn(token);
      } else {
        console.log("Login failed");
      }
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Text style={styles.heading}>Login</Text>
      <Image source={require('../../assets/onlypansicon.png')} style={styles.image} />

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        secureTextEntry={true}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.linkText}>Don't have an account? Sign up here</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20
  },
  input: {
    height: 50,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  linkText: {
    color: 'blue',
    textDecorationLine: 'underline'
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
});

export default Login;
