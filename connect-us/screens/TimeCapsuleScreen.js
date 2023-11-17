import React, { useState, useEffect } from 'react';
import { View, Button, Text } from 'react-native';
import ViewTimeCapsule from './ViewTimeCapsule';
import CreateTimeCapsule from './CreateTimeCapsule';
import styles from './styles';

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
      <View style={styles.buttonContainer}>
        <Button
          title={currentView === 'view' ? "Create Time Capsule" : "View Time Capsules"}
          onPress={() => setCurrentView(currentView === 'view' ? 'create' : 'view')}
          color="#FFC0CB" 
        />
      </View>
    </View>
  );
};

export default TimeCapsuleScreen;