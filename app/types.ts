import { StackScreenProps } from '@react-navigation/stack';
import { Float } from 'react-native/Libraries/Types/CodegenTypes';

export type RootStackParamList = {
  Home: undefined;
  CameraPermission: undefined; // Update type for CameraPermission
  Camera: undefined;
  Result: { className: string; confidence: Float; hasPhoto: string; }; // Perbarui ini
};

export type HomeScreenProps = StackScreenProps<RootStackParamList, 'Home'>;
export type CameraPermissionScreenProps = StackScreenProps<RootStackParamList, 'CameraPermission'>;
export type CameraScreenProps = StackScreenProps<RootStackParamList, 'Camera'>;
export type ResultScreenProps = StackScreenProps<RootStackParamList, 'Result'>;
