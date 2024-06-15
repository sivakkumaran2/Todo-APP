import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface TodoItemProps {
  title: string;
}

const TodoItem: React.FC<TodoItemProps> = ({ title }) => (
  <View style={styles.container}>
    <Text>{title}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default TodoItem;
