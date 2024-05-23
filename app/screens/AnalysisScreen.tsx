import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Button } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';

type AnalysisScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Analysis'>;

type Props = {
  navigation: AnalysisScreenNavigationProp;
};

const AnalysisScreen: React.FC<Props> = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Result');
    }, 3000); // Simulate analysis time

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Text>Proses Analisa</Text>
      <Text>
        produk yang kamu capture ada pada database kami
      </Text>
      <ActivityIndicator size="large" color="#007BFF" />
      <Button
        title="Lihat Profil Produk"
        onPress={() => navigation.navigate('Result')}
        color="#007BFF"
      />
      <Button
        title="Batalkan Proses"
        onPress={() => navigation.goBack()}
        color="#FF0000"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});

export default AnalysisScreen;
