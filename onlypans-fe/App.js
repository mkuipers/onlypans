import React, { useEffect, useState } from 'react';
import { View } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as SecureStore from 'expo-secure-store';
import FlashMessage from "react-native-flash-message";

import { AuthContext } from './src/AppContext';

import HomeScreen from './src/screens/HomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';
import UploadScreen from './src/screens/UploadScreen';
import PansScreen from './src/screens/PansScreen';
import PanDetailScreen from './src/screens/PanDetailScreen';
import ProfileScreen from './src/screens/ProfileScreen';


const Stack = createStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);

  useEffect(() => {
    async function fetchToken() {
      const token = await SecureStore.getItemAsync('userToken');
      setIsLoading(false);
      setUserToken(token);
    }

    fetchToken();
  }, []);

  const authContext = React.useMemo(() => {
    return {
      signIn: async (token) => {
        await SecureStore.setItemAsync('userToken', token);
        setIsLoading(false);
        setUserToken(token);
      },
      signOut: async () => {
        await SecureStore.deleteItemAsync('userToken');
        setIsLoading(false);
        setUserToken(null);
      },
    };
  }, []);

  if (isLoading) {
    return null; // or a loading screen
  }

  return (
    <View style={{ flex: 1 }}>
      <NavigationContainer>
        <AuthContext.Provider value={authContext}>
          <Stack.Navigator>
            
            {userToken ? (
              <>
                <Stack.Screen name="Home" component={HomeScreen}/>
                <Stack.Screen name="Profile" component={ProfileScreen}/>
                <Stack.Screen name="Upload" component={UploadScreen}/>
                <Stack.Screen name="Pans" component={PansScreen}/>
                <Stack.Screen name="PanDetail" component={PanDetailScreen}/>
              </>
            ) : (
              <>
                <Stack.Screen name="Login" component={LoginScreen}/>
                <Stack.Screen name="Signup" component={SignupScreen} />
              </>
            )}
          </Stack.Navigator>
        </AuthContext.Provider>
      </NavigationContainer>
      <FlashMessage position="top" /> 
    </View>
  );
}
