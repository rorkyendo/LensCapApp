import { StackScreenProps } from '@react-navigation/stack';

export type RootStackParamList = {
  Home: undefined;
  CameraPermission: undefined; // Update type for CameraPermission
  Camera: undefined;
  Result: { className: string; confidence: string }; // Perbarui ini
};

export type HomeScreenProps = StackScreenProps<RootStackParamList, 'Home'>;
export type CameraPermissionScreenProps = StackScreenProps<RootStackParamList, 'CameraPermission'>;
export type CameraScreenProps = StackScreenProps<RootStackParamList, 'Camera'>;
export type ResultScreenProps = StackScreenProps<RootStackParamList, 'Result'>;
