import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Constants from 'expo-constants';

import * as SecureStore from 'expo-secure-store';


const PanScreen = () => {
  const [pans, setPans] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchPans = async () => {
      const userToken = await SecureStore.getItemAsync('userToken');
      const response = await fetch(Constants.expoConfig.extra.apiBaseUrl + '/api/v1/pans', {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      const data = await response.json();
      setPans(data);
      setLoading(false);
    };
    fetchPans();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.panContainer} onPress={() => navigation.navigate('PanDetail', { pan_id: item.id })}>
      <Image source={{ url: Constants.expoConfig.extra.apiBaseUrl + item.image_url }} style={styles.panImage} />
      <Text style={styles.panName}>{item.name}</Text>
      <Text style={styles.panDescription}>{item.description}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <FlatList data={pans} renderItem={renderItem} keyExtractor={(item) => item.id.toString()} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  panContainer: {
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  panImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  panName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  panDescription: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 10,
  },
});

export default PanScreen;
