import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { HomeScreenProps } from '../types';

const Home: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { width } = Dimensions.get('window');
  const mobileWidth = 375; // Fixed width for mobile layout

  return (
    <View style={styles.outerContainer}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            source={require('../../assets/images/bgLogin.png')}
            style={styles.logo}
          />
        </View>
        <View style={styles.separator} />
        <View style={styles.content}>
          <Image
            source={require('../../assets/images/logo_text.png')}
            style={styles.logoText}
          />
          <Text style={styles.welcomeText}>Selamat Datang</Text>
          <Text style={styles.descriptionText}>
            hanya perlu gunakan kamera pada smartphone kamu arahkan dan capture
          </Text>
          <View style={styles.indicatorContainer}>
            <View style={[styles.indicator, styles.activeIndicator]} />
            <View style={styles.indicator} />
            <View style={styles.indicator} />
          </View>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CameraPermission')}>
            <Text style={styles.buttonText}>Ayo Mulai</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const mobileWidth = 375; // Fixed width for mobile layout
const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  container: {
    width: mobileWidth, // Fixed width for mobile view
    maxWidth: '100%', // Ensure it doesn't expand beyond screen
    height: '100%',
    backgroundColor: '#fff',
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center', // Center content horizontally
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  separator: {
    width: '100%', // Separator width slightly less than container width
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 20,
  },
  logo: {
    width: mobileWidth * 0.8,
    height: mobileWidth * 0.8,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  logoText: {
    width: mobileWidth * 0.4,
    height: mobileWidth * 0.1,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 100,
    flex: 1,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  descriptionText: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 20,
  },
  indicatorContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  indicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#ddd',
    marginHorizontal: 5,
  },
  activeIndicator: {
    backgroundColor: '#007BFF',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
    width:"100%"
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign:"center"
  },
});

export default Home;
