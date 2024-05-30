import React, { useRef } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Platform, Dimensions } from 'react-native';
import { Camera } from 'expo-camera';
import { CameraScreenProps } from '../types';
import Webcam from 'react-webcam'; // Import Webcam from react-webcam

const CameraScreen: React.FC<CameraScreenProps> = ({ navigation }) => {
  const cameraRef = useRef<Camera | null>(null); // Menggunakan 'Camera' sebagai tipe data
  const webcamRef = useRef<Webcam | null>(null); // Add webcamRef for web platform

  const handleCapture = async () => {
    if (Platform.OS !== 'web') {
      if (cameraRef.current && cameraRef.current.takePictureAsync) { // Tambahkan pengecekan takePictureAsync
        const photo = await cameraRef.current.takePictureAsync();
        console.log(photo.uri);
        navigation.navigate('Analysis', { photoUri: photo.uri });
      }
    } else {
      if (webcamRef.current) {
        const imageSrc = webcamRef.current.getScreenshot();
        if (imageSrc) {
          console.log(imageSrc);
          navigation.navigate('Analysis', { photoUri: imageSrc });
        } else {
          console.error('Failed to capture image');
        }
      }
    }
  };

  return (
    <View style={styles.container}>
      {Platform.OS !== 'web' ? (
        <Camera style={styles.camera} ref={cameraRef} />
      ) : (
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width="80%"
          videoConstraints={{ facingMode: 'environment' }}
        />
      )}
      <TouchableOpacity style={styles.button} onPress={handleCapture}>
        <Text style={styles.buttonText}>Capture</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    width: '50%',
    height: '90%',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 20,
    paddingHorizontal: 50,
    borderRadius: 5,
    marginTop:50,
    width:"80%"
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default CameraScreen;
