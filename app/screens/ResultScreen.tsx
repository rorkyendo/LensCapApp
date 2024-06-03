import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Linking, Dimensions, Image } from 'react-native';
import { ResultScreenProps } from '../types';

const ResultScreen: React.FC<ResultScreenProps> = ({ route,navigation }) => {
  const { className, confidence, hasPhoto } = route.params;
  const link = "https://s.id/" + className;
  const handlePress = () => {
    if (confidence < 0.7) {
      navigation.navigate("Camera")      
    }else{
      Linking.openURL(link);
    }
  };

  const handleBack = () => {
    navigation.navigate("Camera")      
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {
        confidence > 0.7  && (
            <View style={styles.container}>
              <iframe 
                src={link} 
                style={styles.webview} 
                title="WebView"
                width="100%"
              />
            <Text style={styles.text}>Nilai Kecocokan : {Number(confidence*100).toFixed(2)}% {"\n"}Kode Produk: {className}</Text>
            <TouchableOpacity style={styles.button} onPress={handlePress}>
              <Text style={styles.buttonText}>Kunjungi Situs</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonBack} onPress={handleBack}>
              <Text style={styles.buttonText}>Ambil Gambar Lain</Text>
            </TouchableOpacity>
          </View>
        )
      }
      {
        confidence < 0.7  && (
          <View style={styles.container}>
            <Image source={{ uri: hasPhoto }} style={styles.camera} />
            <Text style={styles.text}>Nilai Kecocokan : <Text style={{color:"red"}}>{Number(confidence*100).toFixed(2)}%</Text></Text>
            <Text style={[styles.text,{fontSize:12,color:"red",fontWeight:"bold"}]}>*Nilai kecocokan dibawah 70%*</Text>
            <Text style={styles.text}>Mohon maaf produk yang anda maksud tidak ditemukan.{"\n"} Silahkan coba lagi..</Text>
            <TouchableOpacity style={styles.button} onPress={handlePress}>
              <Text style={styles.buttonText}>Coba Lagi</Text>
            </TouchableOpacity>
          </View>
        )
      }

    </ScrollView>
  );
};

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    width: '100%',
    borderRadius: 50,
    aspectRatio: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    padding: 20,
  },
  webview: {
    width: '100%',
    height: 340,
    marginBottom: 20,
  },
  text: {
    fontSize: 20,
    marginVertical: 10,
    textAlign:"center"
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
    width: '80%',
    marginBottom: 20,
  },
  buttonBack: {
    backgroundColor: 'green',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginTop:-10,
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
