import React, { useState } from 'react';
import Constants from 'expo-constants';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { showMessage } from "react-native-flash-message";


const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignup = async () => {
    try {
      fetch(Constants.expoConfig.extra.apiBaseUrl + '/signup', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body : JSON.stringify({ 
          user: {
            email: email,
            password: password,
          }
        }),
      }).then(response => {
        console.log("success");
        console.log(JSON.stringify(response));
      })
      .catch(error => {
        console.log("fail");
        console.log(JSON.stringify(error));
      });

      showMessage({
        message: "Success",
        description: "You have successfully signed up!",
        type: "success",
      });      
      navigation.navigate('Login');
      
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(value) => setEmail(value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={(value) => setPassword(value)}
        secureTextEntry={true}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={(value) => setConfirmPassword(value)}
        secureTextEntry={true}
      />
      <Button title="Sign Up" onPress={handleSignup} />
    </View>
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
  }
});

export default SignupScreen;
