import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';

import { AuthContext } from '../AppContext';

const Header = () => {
  const navigation = useNavigation();
  const authContext = useContext(AuthContext);

  const invalidateUserToken = async () => {
    const userToken = await SecureStore.getItemAsync('userToken');
    if (userToken) {
      try {
        const response = await fetch('http://192.168.1.96:4000/logout', {
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
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.link} onPress={() => navigation.navigate('Home')}>
        <Text style={styles.linkText}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.link} onPress={() => navigation.navigate('Profile')}>
        <Text style={styles.linkText}>Profile</Text>
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