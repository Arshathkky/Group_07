import React, { useState, useEffect } from 'react';
import { View, Text,StyleSheet, Pressable, ScrollView } from 'react-native';
import PushNotification from 'react-native-push-notification';

const SetSchedule = ({practiceSessions}) => {
    const [notificationPermission, setNotificationPermission] = useState('default');
    

    
    useEffect(() => {
        const requestNotificationPermission = async () => {
          try {
            const { alert } = await PushNotification.requestPermissions();
            setNotificationPermission(alert);
          } catch (error) {
            console.error('Error requesting notification permission:', error);
          }
        };
      
        requestNotificationPermission();
      }, []);
      

  const handleScheduleNotification = (title, startTime) => {
    alert("notification set")
    // Check if notification permission is granted
    if (notificationPermission === 'authorized') {
      // Calculate time difference for notification
      const timeDifference = new Date(startTime) - Date.now();

      // Schedule notification for 10 minutes before the practice session
      if (timeDifference > 0) {
        setTimeout(() => {
          PushNotification.localNotification({
            title: `Upcoming Practice Session: ${title}`,
            message: `The practice session "${title}" is starting in 10 minutes!`,
          });

          PushNotification.setApplicationIconBadgeNumber(0); // Reset badge number
        }, timeDifference - 600000); // 10 minutes before the practice session
      }
    }
  };

  return (
    
    <View style={styles.container}>

      <Text style={styles.label}>Practice Schedule</Text>

      <ul>
      <ScrollView>
        {practiceSessions.map((session) => (
          <View key={session._id}>
            <Text>{session.sport}</Text>
            <Text>Start Time: {session.startTime}</Text>
            <Pressable style={styles.button} onPress={() => handleScheduleNotification(session.sport, session.startTime)}>
              <Text>Schedule Notification</Text>
            </Pressable>
          </View>
        ))}
      </ScrollView>
      </ul>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: 16,
    },
    label: {
      fontSize: 25,
    },
    input: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 10,
      paddingHorizontal: 8,
      borderRadius: 5,
    },
    button:{
        backgroundColor:'red',
        color:'black'
    }
  });
export default SetSchedule;
