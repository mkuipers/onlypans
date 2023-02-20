import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
// import Constants from 'expo-constants';
import * as SecureStore from 'expo-secure-store';

const UploadScreen = () => {
  const [panName, setPanName] = useState('');
  const [panImage, setPanImage] = useState(null);

  const handleChooseImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setPanImage(result.uri);
    }
  };

  const handleUpload = async () => {
    const userToken = await SecureStore.getItemAsync('userToken');

    const formData = new FormData();
    formData.append('pan[name]', panName);
    formData.append('pan[image]', {
      uri: panImage,
      name: 'image.jpg',
      type: 'image/jpg'
    });

    fetch('http://192.168.1.96:4000/api/v1/pans', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${userToken}`,
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        Alert.alert('Pan uploaded successfully!');
        setPanName('');
        setPanImage(null);
      })
      .catch(error => console.error(error));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Upload a Pan</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter pan name"
        value={panName}
        onChangeText={setPanName}
      />
      <Button title="Choose Image" onPress={handleChooseImage} />
      {panImage && <Image source={{ uri: panImage }} style={styles.image} />}
      <Button title="Upload" onPress={handleUpload} disabled={!panImage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 50,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  image: {
    height: 200,
    width: 200,
    marginVertical: 20,
  },
});

export default UploadScreen;
