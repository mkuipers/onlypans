import React, { useState } from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  StyleSheet
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as SecureStore from 'expo-secure-store';

const API_URL = 'http://192.168.1.96:4000/api/v1';

const ProfileScreen = ({ navigation, route }) => {
  const [username, setUsername] = useState(route.params.user.username);
  const [firstName, setFirstName] = useState(route.params.user.first_name);
  const [lastName, setLastName] = useState(route.params.user.last_name);
  const [email, setEmail] = useState(route.params.user.email);
  const [bio, setBio] = useState(route.params.user.bio);
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [profilePicture, setProfilePicture] = useState(route.params.user.image_url);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSave = async () => {
    const userParams = {};
    if (username !== route.params.user.username) {
      userParams.username = username;
    }
    if (firstName !== route.params.user.first_name) {
      userParams.first_name = firstName;
    }
    if (lastName !== route.params.user.last_name) {
      userParams.last_name = lastName;
    }
    if (email !== route.params.user.email) {
      userParams.email = email;
    }
    if (bio !== route.params.user.bio) {
      userParams.bio = bio;
    }
    if (password !== '') {
      userParams.password = password;
    }
    if (passwordConfirmation !== '') {
      userParams.password_confirmation = passwordConfirmation;
    }
    if (profilePicture !== route.params.user.image) {
      userParams.image = profilePicture;
    }
    try {
      const userToken = await SecureStore.getItemAsync('userToken');
      const response = await fetch(`${API_URL}/users/${route.params.user.id}`, {
        method: 'PATCH',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify({ user: userParams }),
      });
      if (response.ok) {
        const userJson = await response.json();
        navigation.navigate('Home', {userData: userJson});
      } else {
        const errorJson = await response.json();
        setErrorMessage(errorJson.errors);
      }
    } catch (error) {
      console.error(error);
      setErrorMessage('An error occurred. Please try again later.');
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      setProfilePicture(result.uri);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
        {profilePicture ? (
          <Image source={{ uri: profilePicture }} style={styles.image} />
        ) : (
          <Text style={styles.imagePickerText}>Pick a profile picture</Text>
        )}
      </TouchableOpacity>
      <TextInput
        style={styles.textInput}
        placeholder="First name"
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Last name"
        value={lastName}
        onChangeText={setLastName}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Bio"
        value={bio}
        onChangeText={setBio}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.textInput}
        placeholder="Password confirmation"
        value={passwordConfirmation}
        onChangeText={setPasswordConfirmation}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
      {errorMessage && <Text style={styles.errorMessage}>{errorMessage}</Text>}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    width: '100%',
  },
  imagePickerText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginVertical: 10,
  },
  imagePicker: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    width: '100%',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#2B68E6',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  errorMessage: {
    color: 'red',
    marginBottom: 10,
  },
});

export default ProfileScreen;