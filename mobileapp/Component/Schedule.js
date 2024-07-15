import React, { useState,useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import SetSchedule from './SetSchedule';
import axios from 'axios';

const Schedule = () => {
  const [schedule,AddSchedule] =  useState([])

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/schedules');
        AddSchedule(response.data);
      } catch (error) {
        console.error('Error fetching schedules: ', error.message);
      }
    };

    fetchSchedule();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.text}>Welcome to the CoachScreen!</Text>
        <SetSchedule practiceSessions={schedule}/>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
  },
});

export default Schedule;
