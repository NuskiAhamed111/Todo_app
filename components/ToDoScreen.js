import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Animated, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import RNPickerSelect from 'react-native-picker-select';
import ToDoList from './TodoList'; 
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [editTaskId, setEditTaskId] = useState(null);
  const [isSearchVisible, setSearchVisible] = useState(false);
  const [filter, setFilter] = useState('All');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const searchBarWidth = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    loadTasks();
  }, []);

  useEffect(() => {
    Animated.timing(searchBarWidth, {
      toValue: isSearchVisible ? 150 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [isSearchVisible, searchBarWidth]);

  const saveTasks = async (tasksToSave) => {
    try {
      const jsonValue = JSON.stringify(tasksToSave);
      await AsyncStorage.setItem('tasks', jsonValue);
    } catch (e) {
      console.error('Failed to save tasks:', e);
      Alert.alert('Error', `Failed to save tasks: ${e.message}`);
    }
  };

  const loadTasks = async () => {
    try {
      const savedTasks = await AsyncStorage.getItem('tasks');
      if (savedTasks) {
        setTasks(JSON.parse(savedTasks));
      }
    } catch (e) {
      Alert.alert('Error', 'Failed to load tasks.');
      console.error('Load error:', e);
    }
  };

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  const addTask = async () => {
    if (task.length > 0) {
      let updatedTasks;
      if (editTaskId) {
        updatedTasks = tasks.map((item) =>
          item.id === editTaskId ? { ...item, text: task, dueDate: date } : item
        );
        setEditTaskId(null);
      } else {
        updatedTasks = [
          ...tasks,
          { id: Date.now().toString(), text: task, completed: false, pinned: false, dueDate: date },
        ];
      }
      setTasks(updatedTasks);
      await saveTasks(updatedTasks);
      setTask('');
      setSearchText('');
      setSearchVisible(false);
      setFilter('All');
      setDate(new Date());
    } else {
      Alert.alert('Error', 'Task cannot be empty.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>To-Do App</Text>
        <View style={styles.searchContainer}>
          <TouchableOpacity onPress={() => setSearchVisible(!isSearchVisible)}>
            <Icon name="search-outline" size={28} color="black" />
          </TouchableOpacity>
          <Animated.View style={[styles.animatedSearch, { width: searchBarWidth }]}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search Task"
              value={searchText}
              onChangeText={(text) => {
                setSearchText(text);
                setFilter('All');
              }}
            />
          </Animated.View>
        </View>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Enter Task"
        value={task}
        onChangeText={(text) => {
          setTask(text);
          setSearchText('');
          setSearchVisible(false);
        }}
      />

      <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.datePickerButton}>
        <Text style={styles.datePickerText}>
          Select Due Date: {date.toLocaleDateString()}
        </Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker value={date} mode="date" display="default" onChange={onDateChange} />
      )}

      <TouchableOpacity onPress={addTask} style={styles.addButton}>
        <Text style={styles.addButtonText}>
          {editTaskId ? 'Update Task' : 'Add Task'}
        </Text>
      </TouchableOpacity>

     

      <RNPickerSelect
        onValueChange={(value) => setFilter(value)}
        value={filter}
        items={[
          { label: 'All', value: 'All' },
          { label: 'Completed', value: 'Completed' },
          { label: 'Incomplete', value: 'Incomplete' },
          { label: 'Pinned', value: 'Pinned' },
        ]}
        placeholder={{}}
        style={pickerSelectStyles}
        useNativeAndroidPickerStyle={false}
      />
       

      

      <ToDoList
        tasks={tasks}
        setTasks={setTasks}
        setEditTaskId={setEditTaskId}
        setTask={setTask}
        setDate={setDate}
        searchText={searchText}
        filter={filter}
        date={date}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F8FF',
    padding: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  animatedSearch: {
    overflow: 'hidden',
    marginLeft: 10,
  },
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10,
    borderRadius: 5,
    width: 150,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  datePickerButton: {
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  datePickerText: {
    color: '#27709c',
  },
  addButton: {
    backgroundColor: '#27709c',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 14,
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: '#666',
    borderRadius: 10,
    color: 'black',
    paddingRight: 20,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  inputAndroid: {
    fontSize: 14,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30,
    backgroundColor: '#fff',
    marginBottom: 20,
  },
});


