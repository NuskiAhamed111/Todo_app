import React from 'react';
import { FlatList } from 'react-native';
import ToDoItem from './TodoItem'; 

export default function ToDoList({ tasks, searchText, filter, setTasks,setDate,date,setEditTaskId,setTask }) {
  const applyFilter = (task) => {
    switch (filter) {
      case 'Completed':
        return task.completed;
      case 'Pinned':
        return task.pinned;
      case 'Incomplete':
        return !task.completed;
      default:
        return true;
    }
  };

  const searchFilter = (task) => {
    return task.text.toLowerCase().includes(searchText.toLowerCase());
  };

  const sortTasks = (a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    return 0;
  };
  

  return (
    <FlatList
      data={tasks.filter(applyFilter).filter(searchFilter).sort(sortTasks)}
      renderItem={({ item }) => (
        <ToDoItem
          task={item}
          setTasks={setTasks}
          setEditTaskId={setEditTaskId}
          setTask={setTask}
          setDate={setDate} // Pass setDate to each ToDoItem
          date={date} // Pass the date to each ToDoItem
        />
      )}
      keyExtractor={(item) => item.id}
    />
  );
}
