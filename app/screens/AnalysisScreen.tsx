import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Button } from 'react-native';
import { AnalysisScreenProps } from '../types';

const AnalysisScreen: React.FC<AnalysisScreenProps> = ({ navigation, route }) => {
  const { photoUri } = route.params;

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Result');
    }, 3000); // Simulate analysis time

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text>Proses Analisa</Text>
      <Text>produk yang kamu capture ada pada database kami</Text>
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
