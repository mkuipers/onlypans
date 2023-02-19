import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';

function SignupScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSignup() {
    fetch('http://localhost:4000/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
      .then(response => {
        // Handle the response from the server
      })
      .catch(error => {
        // Handle the error
      });
  }

  return (
    <View>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
      />
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
      />
      <Button title="Sign up" onPress={handleSignup} />
    </View>
  );
}

export default SignupScreen;
