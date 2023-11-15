import React, { useState, useEffect } from 'react';
import { View, Button, Text } from 'react-native';
import ViewTimeCapsule from './ViewTimeCapsule';
import CreateTimeCapsule from './CreateTimeCapsule';
import styles from './styles';

const TimeCapsulePage = ({ userId }) => {
  const [currentView, setCurrentView] = useState('view');
  
  const handleTimeCapsuleCreated = (newCapsuleId) => {
    console.log('New time capsule created with ID:', newCapsuleId);
    setCurrentView('view'); 
  };

  useEffect(() => {
    if (!userId) {
      console.error('TimeCapsulePage: No userId provided');
    }
  }, [userId]);

  if (!userId) {
    return <Text>Please log in to view this page.</Text>;
  }

  return (
    <View style={styles.timecapsulecontainer}>
      {currentView === 'view' ? (
        <ViewTimeCapsule userId={userId} />
      ) : (
        <CreateTimeCapsule userId={userId} onTimeCapsuleCreated={handleTimeCapsuleCreated} />
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

export default TimeCapsulePage;
