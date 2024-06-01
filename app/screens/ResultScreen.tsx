import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Linking } from 'react-native';
import { ResultScreenProps } from '../types';

const ResultScreen: React.FC<ResultScreenProps> = ({ route }) => {
  const { className, confidence } = route.params;
  const link = "https://s.id/" + className;
  const handlePress = () => {
    Linking.openURL(link);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
          <iframe 
            src={link} 
            style={styles.webview} 
            title="WebView"
            width="100%"
          />
        <Text style={styles.text}>Kode Produk: {className}</Text>
        <TouchableOpacity style={styles.button} onPress={handlePress}>
          <Text style={styles.buttonText}>Kunjungi Situs</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    padding: 20,
  },
  webview: {
    width: '100%',
    height: 460,
    marginBottom: 20,
  },
  text: {
    fontSize: 20,
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
    width: '80%',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ResultScreen;
