import * as React from 'react';
import { Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import CameraPermissionScreen from './screens/CameraPermissionScreen';
import CameraScreen from './screens/CameraScreen';
import ResultScreen from './screens/ResultScreen';
import { RootStackParamList } from './types';

const Stack = createStackNavigator<RootStackParamList>();

const Navigation: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" options={{ headerShown: false }} component={HomeScreen} />
        <Stack.Screen name="CameraPermission" options={{ headerShown: false }} component={CameraPermissionScreen} />
        <Stack.Screen name="Camera" 
          options={{
            headerTitle: () => (
              <Image
                source={require('../assets/images/logo_text.png')}
                style={{ width: 120, height: 40 }}
                resizeMode="contain"
              />
            ),
            headerTitleAlign: 'center',
          }} 
        component={CameraScreen} />
        <Stack.Screen name="Result" options={{
            headerTitle: () => (
              <Image
                source={require('../assets/images/logo_text.png')}
                style={{ width: 120, height: 40 }}
                resizeMode="contain"
              />
            ),
            headerTitleAlign: 'center',
          }} 
        component={ResultScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
