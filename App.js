import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import ToDoScreen from './components/ToDoScreen'; // This contains ToDoList
import CalendarComponent from './components/CalendarComponent';
import About from './components/About';
import Credits from './components/Credits';
const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="ToDoScreen">
        <Drawer.Screen name="To-Do List" component={ToDoScreen} />
        <Drawer.Screen name="Calender" component={CalendarComponent} />
        <Drawer.Screen name="About" component={About} />
        <Drawer.Screen name="Credits" component={Credits} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
