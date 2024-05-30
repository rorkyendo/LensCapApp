import React, { useEffect } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import Navigation from './Navigation';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync(); // Mencegah splash screen secara otomatis menghilang

const App: React.FC = () => {
  useEffect(() => {
    const prepare = async () => {
      try {
        // Simulate loading or other async tasks
        await new Promise(resolve => setTimeout(resolve, 2000)); // Simulasi 2 detik
      } catch (e) {
        console.warn(e);
      } finally {
        SplashScreen.hideAsync(); // Sembunyikan splash screen
      }
    };

    prepare();
  }, []);

  return (
    <View style={styles.container}>
      <Navigation />
    </View>
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
