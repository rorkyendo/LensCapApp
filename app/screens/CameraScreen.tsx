import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Text, Dimensions, Platform, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import Webcam from 'react-webcam';

type CameraScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Camera'>;

type Props = {
  navigation: CameraScreenNavigationProp;
};

const CameraScreen: React.FC<Props> = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const cameraRef = useRef<Camera | null>(null);
  const webcamRef = useRef<Webcam>(null);

  useEffect(() => {
    if (Platform.OS !== 'web') {
      (async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setHasPermission(status === 'granted');
      })();
    } else {
      setHasPermission(true); // Web doesn't need explicit camera permission handling
    }
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const handleCapture = async () => {
    if (Platform.OS !== 'web') {
      if (cameraRef.current) {
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
    <View style={styles.outerContainer}>
      <View style={styles.container}>
        {Platform.OS !== 'web' ? (
          <Camera style={styles.camera} ref={cameraRef} />
        ) : (
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={Dimensions.get('window').width}
            videoConstraints={{ facingMode: 'environment' }}
          />
        )}
        <TouchableOpacity style={styles.button} onPress={handleCapture}>
          <Text style={styles.buttonText}>Ambil Gambar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    width: '100%',
    height: '90%',
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
    width: '60%',
    margin: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default CameraScreen;
