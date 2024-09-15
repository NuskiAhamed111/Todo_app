import React from 'react';
import { Text, StyleSheet, ScrollView,} from 'react-native';

export default function CreditsPage() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Credits</Text>

      <Text style={styles.sectionHeader}>Developed By:</Text>
      <Text style={styles.sectionText}>Team 18 - App Developers</Text>

       <Text style={styles.sectionHeader}>Special Thanks To:</Text>
      <Text style={styles.sectionText}>
        Sayooran Nagulendra{"\n"} M.Sc.(Canada), B.Sc. Eng.[Hons] (Moratuwa)
      </Text>

      <Text style={styles.sectionHeader}>Acknowledgements:</Text>
      <Text style={styles.sectionText}>
        - React Native {"\n"}
        - React Native Vector Icons {"\n"}
        - react-native-picker-select {"\n"}
        - @react-native-community/datetimepicker {"\n"}
        - AsyncStorage
      </Text>

     

      <Text style={styles.sectionHeader}>Open Source Libraries:</Text>
      <Text style={styles.sectionText}>
        - React {"\n"}
        - React Native {"\n"}
        - React Native Vector Icons {"\n"}
        - RNPickerSelect {"\n"}
        - @react-native-community/datetimepicker
      </Text>

      <Text style={styles.sectionHeader}>License:</Text>
      <Text style={styles.sectionText}>
        Team 18{"\n"}Department of Computer Science {"\n"}University of Jaffna{"\n"}Sri lanka
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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
