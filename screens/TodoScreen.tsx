import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

const TodoScreen: React.FC = () => {
  const [taskText, setTaskText] = useState('');
  const [endDate, setEndDate] = useState('');
  const [tasks, setTasks] = useState<{ id: number; text: string; endDate: string; priority: number; completed: boolean }[]>([]);
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [editingTaskText, setEditingTaskText] = useState('');
  const [editingEndDate, setEditingEndDate] = useState('');

  useEffect(() => {
    loadTasks();
  }, []);

  const saveTasks = async (tasksToSave: { id: number; text: string; endDate: string; priority: number; completed: boolean }[]) => {
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(tasksToSave));
    } catch (error) {
      console.error('Error saving tasks', error);
    }
  };

  const loadTasks = async () => {
    try {
      const tasksJson = await AsyncStorage.getItem('tasks');
      if (tasksJson !== null) {
        setTasks(JSON.parse(tasksJson));
      }
    } catch (error) {
      console.error('Error loading tasks', error);
    }
  };

  const addTask = () => {
    if (taskText.trim() !== '') {
      const newTask = {
        id: tasks.length + 1,
        text: taskText,
        endDate: endDate,
        priority: 0,
        completed: false,
      };
      const updatedTasks = [...tasks, newTask];
      setTasks(updatedTasks);
      setTaskText('');
      setEndDate('');
      saveTasks(updatedTasks);
    }
  };

  const deleteTask = (taskId: number) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  const updateTask = () => {
    if (editingTaskId !== null && editingTaskText.trim() !== '') {
      const updatedTasks = tasks.map(task =>
        task.id === editingTaskId ? { ...task, text: editingTaskText, endDate: editingEndDate } : task
      );
      setTasks(updatedTasks);
      setEditingTaskId(null);
      setEditingTaskText('');
      setEditingEndDate('');
      saveTasks(updatedTasks);
    }
  };

  const markTaskAsCompleted = (taskId: number) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  const sortTasksByEndDate = () => {
    const sortedTasks = [...tasks].sort((a, b) => {
      const dateA = new Date(a.endDate);
      const dateB = new Date(b.endDate);
      return dateA - dateB;
    });
    setTasks(sortedTasks);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Your Tasks</Text>
        <TouchableOpacity style={styles.sortButton} onPress={sortTasksByEndDate}>
          <Text style={styles.sortButtonText}>Sort by End Date</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={tasks}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <View style={styles.taskInfo}>
              <Text style={styles.taskText}>{item.text}</Text>
              <Text style={styles.endDateText}>End Date: {item.endDate}</Text>
            </View>
            <View style={styles.taskButtons}>
              <TouchableOpacity
                style={[styles.taskButton, styles.editButton]}
                onPress={() => {
                  setEditingTaskId(item.id);
                  setEditingTaskText(item.text);
                  setEditingEndDate(item.endDate);
                }}>
                <Ionicons name="pencil" size={20} color="white" />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.taskButton, styles.deleteButton]}
                onPress={() => deleteTask(item.id)}>
                <Ionicons name="trash" size={20} color="white" />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.taskButton, styles.completeButton, item.completed && styles.completedTask]}
                onPress={() => markTaskAsCompleted(item.id)}>
                <Ionicons name={item.completed ? "checkmark-circle" : "checkmark-circle-outline"} size={20} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        )}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.taskList}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a new task"
          value={taskText}
          onChangeText={setTaskText}
        />
        <TextInput
          style={styles.input}
          placeholder="End Date (DD/MM/YYYY)"
          value={endDate}
          onChangeText={text => {
            if (/^[0-9/]*$/.test(text)) {
              setEndDate(text);
            } else {
              alert("Please enter numbers and '/' only for the date (DD/MM/YYYY).");
            }
          }}
        />
        <TouchableOpacity style={styles.addButton} onPress={addTask}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      </View>
      {editingTaskId !== null && (
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={editingTaskText}
            onChangeText={setEditingTaskText}
          />
          <TextInput
            style={styles.input}
            placeholder="End Date (DD/MM/YYYY)"
            value={editingEndDate}
            onChangeText={text => {
              if (/^[0-9/]*$/.test(text)) {
                setEditingEndDate(text);
              } else {
                alert("Please enter numbers and '/' only for the date (DD/MM/YYYY).");
              }
            }}
          />
          <TouchableOpacity style={styles.updateButton} onPress={updateTask}>
            <Text style={styles.buttonText}>Update</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f7',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
  },
  sortButton: {
    backgroundColor: '#007bff',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  sortButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  taskList: {
    paddingBottom: 20,
  },
  taskItem: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  taskInfo: {
    flex: 1,
  },
  taskText: {
    fontSize: 18,
    color: '#333',
  },
  endDateText: {
    color: '#888',
    marginTop: 5,
  },
  taskButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  taskButton: {
    borderRadius: 5,
    paddingVertical: 6,
    paddingHorizontal: 8,
    marginLeft: 5,
  },
  editButton: {
    backgroundColor: '#28a745',
  },
  deleteButton: {
    backgroundColor: '#dc3545',
  },
  completeButton: {
    backgroundColor: '#ffc107',
  },
  completedTask: {
    opacity: 0.5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginRight: 10,
    backgroundColor: '#fff',
  },
  addButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  updateButton: {
    backgroundColor: '#28a745',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
});

export default TodoScreen;
