import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const HomeScreen: React.FC<{ navigation: any }> = ({ navigation }) => (
  <View style={styles.container}>
    <Text style={styles.title}>Welcome to Your Todo App</Text>
    <Text style={styles.subtitle}>Get organized and manage your tasks efficiently.</Text>
    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Todo')}>
      <Text style={styles.buttonText}>Go to Todos</Text>
    </TouchableOpacity>
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
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000', 
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 30,
    color: '#333', 
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007bff', 
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff', 
    fontWeight: 'bold',
  },
});

export default HomeScreen;
