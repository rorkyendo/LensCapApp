import * as React from 'react';
import { Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import CameraPermissionScreen from './screens/CameraPermissionScreen';
import CameraScreen from './screens/CameraScreen';
import AnalysisScreen from './screens/AnalysisScreen';
import ResultScreen from './screens/ResultScreen';
import { RootStackParamList } from './types';

const Stack = createStackNavigator<RootStackParamList>();

const Navigation: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" options={{ headerShown: false }} component={HomeScreen} />
        <Stack.Screen name="CameraPermission" options={{ headerShown: false }} component={CameraPermissionScreen} />
        <Stack.Screen name="Camera" component={CameraScreen} />
        <Stack.Screen name="Analysis" component={AnalysisScreen} />
        <Stack.Screen name="Result" component={ResultScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
