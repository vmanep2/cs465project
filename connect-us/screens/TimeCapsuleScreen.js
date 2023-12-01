import React, { useState, useEffect } from 'react';
import { View, Button } from 'react-native';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import ViewTimeCapsule from './ViewTimeCapsule';
import CreateTimeCapsule from './CreateTimeCapsule';
import styles from './styles';
import { Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';


const windowHeight = Dimensions.get('window').height;
const bottomDistance = windowHeight * 0.15;


const TimeCapsuleScreen = ({ user }) => {
  const [currentView, setCurrentView] = useState('view');
  
  const handleTimeCapsuleCreated = (newCapsuleId) => {
    console.log('New time capsule created with ID:', newCapsuleId);
    setCurrentView('view'); 
  };

  useEffect(() => {
    if (!user) {
      console.error('TimeCapsulePage: No user provided');
    }
    else{
      console.log('userId', user);
    }
  }, [user]);

  if (!user) {
    return <Text>Please log in to view this page.</Text>;
  }

  return (
    <View style={styles.timecapsulecontainer}>
      {currentView === 'view' ? (
        <ViewTimeCapsule user={user} />
      ) : (
        <CreateTimeCapsule user={user} onTimeCapsuleCreated={handleTimeCapsuleCreated} />
      )}
        <TouchableOpacity onPress={() => setCurrentView(currentView === 'view' ? 'create' : 'view')} style={style.TouchableOpacity}>
          <MaterialIcons
              name={currentView === 'view' ? 'add' : 'visibility'}
              size={32}
              color="white"
              style={styles.iconStyle}
          />
        </TouchableOpacity>
    </View>
  );
};

const style = StyleSheet.create({
  buttonText: {
    fontSize: 18,
    fontFamily: 'balsamiq-sans',
    color: 'white',
    textAlign: 'center',
  },
  TouchableOpacity: {
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
    height: 60, 
    width: 60, 
    borderRadius: 30, 
    position: "absolute",
    bottom: '11%', 
    right: '5%', 
    backgroundColor: "#e91d63",
  },
  iconStyle: {
    fontSize: 32, 
    color: "#fff",
  },
});

export default TimeCapsuleScreen;