import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function About() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>To-Do Task Manager</Text>
      
      <Text style={styles.sectionHeader}>App Version: 1.0</Text>
      <Text style={styles.sectionText}>
        The To-Do Task Manager helps users organize and manage their daily tasks efficiently.
        Users can add, edit, delete, pin, complete tasks, search, filter by status, and set due dates.
        This app aims to boost productivity and help users stay on track with their goals.
      </Text>

      <Text style={styles.sectionHeader}>Key Features:</Text>
      <Text style={styles.sectionText}>
        - Add, edit, delete tasks with due dates. {"\n"}
        - Mark tasks as completed or incomplete.{"\n"}
        - Pin important tasks for quick access. {"\n"}
        - Filter tasks based on their status 
          {"\n"}(e.g., Completed, Incomplete, Pinned). {"\n"}
        - Search for tasks using keywords. {"\n"}
        - Task persistence using local storage (AsyncStorage).
      </Text>

      <Text style={styles.sectionHeader}>Developers:</Text>
      <Text style={styles.sectionHeader}>Team 18</Text>
      <Text style={styles.sectionText}>Mr K. Sujishan [2021/CSC/071]</Text>
      <Text style={styles.sectionText}>Mr I. Anujan [2021/CSC/021]</Text>
      <Text style={styles.sectionText}>Miss SM. Pabasara [2021/CSC/050]</Text>
      <Text style={styles.sectionText}>Mr A. Nuski Ahamed [2021/CSC/097]</Text>
      <Text style={styles.sectionText}>Mr SS. Dilshan [2021/CSC/077]</Text>


      <Text style={styles.sectionHeader}>Contact:</Text>
      <Text style={styles.sectionText}>Department of Computer Science {"\n"}University of Jaffna{"\n"}Sri lanka</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ebf6fc',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
  },
  sectionHeader: {
    fontSize: 18,
    marginVertical: 10,
    fontWeight: 'bold',
    color: 'black',
  },
  sectionText: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 10,
  },
});
