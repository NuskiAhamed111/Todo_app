import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';

const CalendarComponent = () => {
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    // Get the system's current date
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0]; // Format as YYYY-MM-DD
    setCurrentDate(formattedDate); // Set as the current date in the calendar
  }, []);

  return (
    <View style={styles.container}>
      {currentDate ? (
        <Calendar
          current={currentDate} // Control the current date via state
          markedDates={{
            [currentDate]: { selected: true, marked: true, selectedColor: 'blue' },
          }}
          minDate={'2024-01-01'}
          maxDate={'2024-12-31'}
          monthFormat={'yyyy MM'}
          showWeekNumbers={true}
          onDayPress={(day) => {
            console.log('Selected day: ', day);
          }}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});

export default CalendarComponent;
