import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import { showMessage } from "react-native-flash-message";
import Constants from 'expo-constants';


import { AuthContext } from '../AppContext';



const Header = () => {
  const navigation = useNavigation();
  const authContext = useContext(AuthContext);

  const invalidateUserToken = async () => {
    const userToken = await SecureStore.getItemAsync('userToken');
    if (userToken) {
      try {
        const response = await fetch(Constants.expoConfig.extra.apiBaseUrl + '/logout', {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });
      } catch (error) {
        console.error(error);
      }
    }
  }


  const handleLogout = async () => {
    // handle logout logic here, e.g. clear token from securestore
    await invalidateUserToken();
    await authContext.signOut();
    showMessage({
      message: "Bye!",
      description: "You have successfully signed out!",
      type: "success",
    });   
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.link} onPress={() => navigation.navigate('Home')}>
        <Text style={styles.linkText}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.link} onPress={() => navigation.navigate('Profile', {user: user})}>
        <Text style={styles.linkText}>Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.link} onPress={() => navigation.navigate('Upload')}>
        <Text style={styles.linkText}>Upload</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.link} onPress={() => navigation.navigate('Pans')}>
        <Text style={styles.linkText}>Pans</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.link} onPress={handleLogout}>
        <Text style={styles.linkText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#eee',
    height: 60,
    paddingHorizontal: 20
  },
  link: {
    paddingHorizontal: 10
  },
  linkText: {
    fontSize: 18
  }
});

export default Header;
