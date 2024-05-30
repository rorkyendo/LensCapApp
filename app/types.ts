import { StackScreenProps } from '@react-navigation/stack';

export type RootStackParamList = {
  Home: undefined;
  CameraPermission: undefined; // Update type for CameraPermission
  Camera: undefined;
  Analysis: { photoUri: string };
  Result: undefined;
};

export type HomeScreenProps = StackScreenProps<RootStackParamList, 'Home'>;
export type CameraPermissionScreenProps = StackScreenProps<RootStackParamList, 'CameraPermission'>;
export type CameraScreenProps = StackScreenProps<RootStackParamList, 'Camera'>;
export type AnalysisScreenProps = StackScreenProps<RootStackParamList, 'Analysis'>;
export type ResultScreenProps = StackScreenProps<RootStackParamList, 'Result'>;
