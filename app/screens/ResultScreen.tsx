import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';

type ResultScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Result'>;

type Props = {
  navigation: ResultScreenNavigationProp;
};

const ResultScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Profil Produk</Text>
      <Button title="Home" onPress={() => navigation.navigate('Home')} color="#007BFF" />
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

export default ResultScreen;
