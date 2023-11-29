import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, Button, TouchableOpacity } from 'react-native';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import styles from './styles';

const ViewTimeCapsule = ({ user }) => {
  const [timeCapsules, setTimeCapsules] = useState([]);
  const [openedCapsules, setOpenedCapsules] = useState({}); // Tracks which capsules are opened

  useEffect(() => {
    if (!user) {
      console.error('No user provided');
      return;
    }

    const q = query(collection(db, 'timeCapsules'), where('user', '==', user));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const capsules = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTimeCapsules(capsules);
    });

    return () => unsubscribe();
  }, [user]);

  const handleOpenCapsule = (id) => {
    setOpenedCapsules(prevState => ({
      ...prevState,
      [id]: true, 
    }));
  };

  return (
    <FlatList
      contentContainerStyle={styles.listContainer}
      data={timeCapsules}
      keyExtractor={item => item.id}
      renderItem={({ item }) => {
        const now = new Date();
        const openingDate = new Date(item.openingDate);
        const isPastOpeningDate = now >= openingDate;
        const isOpened = openedCapsules[item.id];

        return (
          <View style={styles.itemContainer}>
            <Text style={styles.itemTitle}>Title: {item.title}</Text>
            {isOpened ? (
              <>
                <Text style={styles.itemText}>Text: {item.text}</Text>
                {item.photos && item.photos.map((photo, index) => (
                  <Image key={index} source={{ uri: photo }} style={styles.imageStyle} />
                ))}
              </>
            ) : (
              isPastOpeningDate && (
                  <TouchableOpacity
                      style={styles.inlineButton}
                      onPress={() => handleOpenCapsule(item.id)}
                  >
                      <Text style={styles.inlineButtonText}>Open</Text>
                  </TouchableOpacity>
              )
            )}
            <Text>Opening Date: {openingDate.toLocaleDateString()}</Text>
          </View>
        );
      }}
    />
  );
};

export default ViewTimeCapsule;