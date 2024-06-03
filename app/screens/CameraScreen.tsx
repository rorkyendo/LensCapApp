import React, { useRef, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Platform, Image, Dimensions } from 'react-native';
import Webcam from 'react-webcam';
import { Chase } from 'react-native-animated-spinkit';

interface CameraScreenProps {
  navigation: any; // Gantilah dengan tipe yang lebih spesifik jika Anda memiliki tipe untuk navigation
}

interface CameraComponentProps {
  hasPhoto: string | null;
  webcamRef: React.RefObject<Webcam>;
  handleCapture: () => void;
  process: () => void;
  styles: any;
}

const CameraComponent: React.FC<CameraComponentProps> = ({ hasPhoto, webcamRef, handleCapture, process, styles }) => {
  return (
    <View style={styles.container}>
      {!hasPhoto ? (
        <View style={styles.container}>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width="90%"
            style={{ borderRadius: 50 }}
            videoConstraints={{ facingMode: 'environment' }}
          />
          <TouchableOpacity style={styles.button} onPress={handleCapture}>
            <Text style={styles.buttonText}>Capture</Text>
          </TouchableOpacity>
        </View>
      ) : (
          <View style={styles.cameraContainer}>
            <Image source={{ uri: hasPhoto }} style={styles.camera} />
            <TouchableOpacity style={styles.button} onPress={process}>
              <Text style={styles.buttonText}>Process</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonRemove} onPress={handleCapture}>
              <Text style={styles.buttonText}>Re Capture</Text>
            </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

interface MainComponentProps {
  isLoading: boolean;
  hasPhoto: string | null;
  webcamRef: React.RefObject<Webcam>;
  handleCapture: () => void;
  process: () => void;
  styles: any;
}

const MainComponent: React.FC<MainComponentProps> = ({ isLoading, hasPhoto, webcamRef, handleCapture, process, styles }) => {
  return (
        
    <View style={{marginTop:40}}>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <Chase size={48} color="#007AFF" />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      ) : (
        <CameraComponent
          hasPhoto={hasPhoto}
          webcamRef={webcamRef}
          handleCapture={handleCapture}
          process={process}
          styles={styles}
        />
      )}
    </View>
  );
};

const CameraScreen: React.FC<CameraScreenProps> = ({ navigation }) => {
  const webcamRef = useRef<Webcam>(null);
  const [hasPhoto, setHasPhoto] = useState<string | null>(null);
  const [className, setClassName] = useState<string | null>(null);
  const [confidence, setConfidence] = useState<string | null>(null);
  const [isLoading, setLoading] = useState(false);

  const handleCapture = async () => {
    if (Platform.OS !== 'web') {
      // Handle non-web capture
    } else {
      if (hasPhoto) {
        setHasPhoto(null);
        setClassName(null);
        setConfidence(null);
      } else {
        if (webcamRef.current) {
          const imageSrc = webcamRef.current.getScreenshot();
          if (imageSrc) {
            setHasPhoto(imageSrc);
          } else {
            console.error('Failed to capture image');
          }
        }
      }
    }
  };

  const process = async () => {
    setLoading(true);
    try {
      const token = "7900559f8926ee70d702b79a68625d262659289c5497f194aff4a3ce15b627f2";
      const formData = new FormData();
      formData.append("filename", hasPhoto as string);
      formData.append("token", token);
      const res = await fetch("https://lenscap.id/deteksi", {
        method: "POST",
        body: formData,
      });
      try {
        let result = await res.json();
        if (result.status === 200) {
          setClassName(result.data.class_name as string);
          setConfidence(result.data.confidence as string);
          navigation.navigate('Result', { className: result.data.class_name, confidence: result.data.confidence, hasPhoto:hasPhoto });
          // alert("Foto berhasil di proses");
        } else {
          // alert("Foto gagal di proses");
        }
        setLoading(false);
      } catch (err) {
        console.log("gagal 2: " + err);
        setLoading(false);
      }
    } catch (err) {
      console.log("gagal 1: " + err);
      setLoading(false);
    }
  };

  return (
    <MainComponent
      isLoading={isLoading}
      hasPhoto={hasPhoto}
      webcamRef={webcamRef}
      handleCapture={handleCapture}
      process={process}
      styles={styles}
    />
  );
};

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: width/1.2,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 20,
    paddingHorizontal: 50,
    borderRadius: 5,
    marginTop: 40,
    width: '80%',
  },
  buttonRemove: {
    backgroundColor: 'red',
    paddingVertical: 20,
    paddingHorizontal: 50,
    borderRadius: 5,
    marginTop: 10,
    width: '80%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  camera: {
    width: '100%',
    borderRadius: 50,
    aspectRatio: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 120,
  },
  loadingText: {
    fontSize: 20,
  },
});

export default CameraScreen;
