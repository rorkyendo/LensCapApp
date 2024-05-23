import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, StyleSheet, Platform } from 'react-native';
import HomeScreen from './screens/HomeScreen';
// import LoginScreen from './screens/LoginScreen';
import CameraScreen from './screens/CameraScreen';
import AnalysisScreen from './screens/AnalysisScreen';

const Stack = createStackNavigator();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" options={{ headerTitle: '', headerShown: false }} component={HomeScreen} />
          <Stack.Screen name="Camera" component={CameraScreen} />
          <Stack.Screen name="Analysis" component={AnalysisScreen} initialParams={{ photoUri: 'your_photo_uri_here' }} />
        </Stack.Navigator>
      </View>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...Platform.select({
      web: {
        maxWidth: 480, // Set maximum width for desktop screens
        marginHorizontal: 'auto', // Center content horizontally
      },
    }),
  },
});

export default App;
