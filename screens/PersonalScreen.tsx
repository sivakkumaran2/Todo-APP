import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

const PersonalScreen: React.FC = () => {
  const [items, setItems] = useState<string[]>([]);
  const [newItem, setNewItem] = useState('');

  useEffect(() => {
    loadItems();
  }, []);

  const saveItems = async (itemsToSave: string[]) => {
    try {
      await AsyncStorage.setItem('personalItems', JSON.stringify(itemsToSave));
    } catch (error) {
      console.error('Error saving items', error);
    }
  };

  const loadItems = async () => {
    try {
      const itemsJson = await AsyncStorage.getItem('personalItems');
      if (itemsJson !== null) {
        setItems(JSON.parse(itemsJson));
      }
    } catch (error) {
      console.error('Error loading items', error);
    }
  };

  const addItem = () => {
    if (newItem.trim() !== '') {
      const updatedItems = [...items, newItem];
      setItems(updatedItems);
      setNewItem('');
      saveItems(updatedItems);
    }
  };

  const deleteItem = (index: number) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
    saveItems(updatedItems);
  };

  const renderShoppingItem = ({ item, index }: { item: string; index: number }) => {
    return (
      <View style={styles.itemContainer}>
        <Text style={styles.itemText}>{item}</Text>
        <TouchableOpacity onPress={() => deleteItem(index)} style={styles.deleteButton}>
          <Ionicons name="trash" size={24} color="white" />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Personal List</Text>
      <TextInput
        style={styles.input}
        value={newItem}
        onChangeText={setNewItem}
        placeholder="Add a new item"
        onSubmitEditing={addItem}
      />
      <TouchableOpacity onPress={addItem} style={styles.addButton}>
        <Text style={styles.addButtonText}>Add Item</Text>
      </TouchableOpacity>
      <FlatList
        data={items}
        renderItem={renderShoppingItem}
        keyExtractor={(item, index) => index.toString()}
        style={styles.shoppingList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  addButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 2,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  shoppingList: {
    flex: 1,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 2,
  },
  itemText: {
    fontSize: 18,
    color: '#333',
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 10,
  },
});

export default PersonalScreen;
