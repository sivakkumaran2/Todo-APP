import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AboutPage: React.FC = () => (
  <View style={styles.container}>
    <Text style={styles.title}>About Page</Text>
    <Text style={styles.description}>
      This app is a simple Todo application built with React Native and Expo. It allows you to manage your tasks efficiently and stay organized.
    </Text>
    <Text style={styles.author}>
      Developed by: SivaKKumaran
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fff', 
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#007bff', 
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  author: {
    fontSize: 14,
    color: '#666',
  },
});

export default AboutPage;
