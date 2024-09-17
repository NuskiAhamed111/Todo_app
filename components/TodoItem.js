import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ToDoItem({
  task,
  setTasks,
  setEditTaskId,
  setTask,
  setDate,
}) {

  const saveTasks = async (tasksToSave) => {
    try {
      const jsonValue = JSON.stringify(tasksToSave);
      await AsyncStorage.setItem('tasks', jsonValue);
    } catch (e) {
      console.error('Failed to save tasks:', e);
      Alert.alert('Error', `Failed to save tasks: ${e.message}`);
    }
  };

  const toggleCompleteTask = async (id) => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      );
      saveTasks(updatedTasks);
      return updatedTasks;
    });
  };

  const togglePinTask = async (id) => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.map((item) =>
        item.id === id ? { ...item, pinned: !item.pinned } : item
      );
      saveTasks(updatedTasks);
      return updatedTasks;
    });
  };

  const confirmDeleteTask = (id) => {
    Alert.alert(
      "Delete Task",
      "Are you sure you want to delete this task?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => deleteTask(id),
          style: "destructive",
        },
      ],
      { cancelable: true }
    );
  };


  const deleteTask = async (id) => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.filter((item) => item.id !== id);
      saveTasks(updatedTasks);
      return updatedTasks;
    });
  };

  const editTask = (item) => {
    setEditTaskId(item.id);
    setTask(item.text);
    setDate(new Date(item.dueDate));
  };

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && !task.completed;

  return (
    <View style={styles.item}>
      <View style={styles.itemTextContainer}>
        <TouchableOpacity style={styles.textContainer} onPress={() => toggleCompleteTask(task.id)}>
          <Icon
            name={
              task.completed
                ? 'checkbox'
                : 'square-outline'
            }
            size={24}
            color="#27709c"
          />
        </TouchableOpacity>


        <TouchableOpacity onPress={() => toggleCompleteTask(task.id)}>
          <Text
            style={[
              styles.itemText,
              task.completed && styles.completedText,
              isOverdue && styles.overdueText,
            ]}
          >
            {task.text}
          </Text>
          {task.dueDate && (
            <Text style={[styles.dueDateText, isOverdue && styles.overdueText]}>
              Due: {new Date(task.dueDate).toLocaleDateString()}
            </Text>
          )}
        </TouchableOpacity>
      </View>

      
      <View style={styles.actions}>
       
        {/* Pin Task */}
        <TouchableOpacity onPress={() => togglePinTask(task.id)}>
          <Icon
            name={task.pinned ? 'star' : 'star-outline'}
            size={24}
            color="#27709c"
          />
        </TouchableOpacity>

        {/* Edit Task */}
        <TouchableOpacity onPress={() => editTask(task)}>
          <Icon name="create-outline" size={24} color="#27709c" />
        </TouchableOpacity>

        {/* Delete Task */}
        <TouchableOpacity onPress={() => confirmDeleteTask(task.id)}>
          <Icon name="trash-outline" size={24} color="#27709c" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 15,
    backgroundColor: '#87c6ec',
    marginBottom: 5,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    flexWrap: 'nowrap', // Ensures that content doesn't wrap and push buttons down
  },
  itemTextContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap:15,
  },
  itemText: {
    fontSize: 18,
    color: 'black',
  },
  dueDateText: {
    fontSize: 15,
    color: 'grey',
    marginTop: 4,
  },
  overdueText: {
    color: 'red',
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#666666',

  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginLeft: 10,
    gap:10,
  },
});


