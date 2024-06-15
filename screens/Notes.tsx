import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

const NotesPage: React.FC = () => {
  const [notes, setNotes] = useState<string[]>([]);
  const [newNote, setNewNote] = useState('');

  useEffect(() => {
    loadNotes();
  }, []);

  const saveNotes = async (notesToSave: string[]) => {
    try {
      await AsyncStorage.setItem('notes', JSON.stringify(notesToSave));
    } catch (error) {
      console.error('Error saving notes', error);
    }
  };

  const loadNotes = async () => {
    try {
      const notesJson = await AsyncStorage.getItem('notes');
      if (notesJson !== null) {
        setNotes(JSON.parse(notesJson));
      }
    } catch (error) {
      console.error('Error loading notes', error);
    }
  };

  const addNote = () => {
    if (newNote.trim() !== '') {
      const updatedNotes = [...notes, newNote];
      setNotes(updatedNotes);
      setNewNote('');
      saveNotes(updatedNotes);
    }
  };

  const deleteNote = (index: number) => {
    const updatedNotes = [...notes];
    updatedNotes.splice(index, 1);
    setNotes(updatedNotes);
    saveNotes(updatedNotes);
  };

  const renderNote = ({ item, index }: { item: string; index: number }) => {
    return (
      <View style={styles.noteContainer}>
        <Text style={styles.noteText}>{item}</Text>
        <TouchableOpacity onPress={() => deleteNote(index)} style={styles.deleteButton}>
          <Ionicons name="trash" size={24} color="white" />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notes</Text>
      <TextInput
        style={styles.input}
        value={newNote}
        onChangeText={setNewNote}
        placeholder="Add a new note"
        onSubmitEditing={addNote}
      />
      <TouchableOpacity onPress={addNote} style={styles.addButton}>
        <Text style={styles.addButtonText}>Add Note</Text>
      </TouchableOpacity>
      <FlatList
        data={notes}
        renderItem={renderNote}
        keyExtractor={(item, index) => index.toString()}
        style={styles.notesList}
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
  notesList: {
    flex: 1,
  },
  noteContainer: {
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
  noteText: {
    fontSize: 18,
    color: '#333',
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 10,
  },
});

export default NotesPage;
