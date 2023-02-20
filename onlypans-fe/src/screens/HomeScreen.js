import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { showMessage } from "react-native-flash-message";

import Header from '../components/Header';

import { AuthContext } from '../AppContext';


const HomeScreen = () => {
  const authContext = useContext(AuthContext);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user data
    async function fetchUserData() {
      const userToken = await SecureStore.getItemAsync('userToken');
      if (userToken) {
        try {
          const response = await fetch('http://192.168.1.96:4000/current_user', {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          });
          if (!response.ok) {
            await authContext.signOut();
            showMessage({
              message: "Something went wrong",
              description: "Please sign in again",
              type: "warning",
            }); 
          } else {
            const data = await response.json();
            setUser(data);
          }
        } catch (error) {
          console.error(error);
        }
      }
    }

    fetchUserData();
  }, []);

  return (
    <View style={styles.container}>
      <Header />
      {user ? (
        <Text>Welcome, {user.email}!</Text>
      ) : (
        <Text>Loading user data...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
