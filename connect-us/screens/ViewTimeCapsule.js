import React, { useState, useEffect } from 'react';
import {View, Text, FlatList, Image, Button, TouchableOpacity, SafeAreaView, ScrollView, ImageBackground} from 'react-native';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import styles from './styles';

const lockIcon = require('../assets/lock_icon.jpg');

const ViewTimeCapsule = ({ user }) => {
  const [timeCapsules, setTimeCapsules] = useState({});
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
        // First sort the capsules
        const sortedCapsules = capsules.sort((a, b) => new Date(a.openingDate) - new Date(b.openingDate));

        // Then group them by year
        const groupedByYear = sortedCapsules.reduce((acc, capsule) => {
            const year = new Date(capsule.openingDate).getFullYear();
            if (!acc[year]) {
                acc[year] = [];
            }
            acc[year].push(capsule);
            return acc;
        }, {});

      setTimeCapsules(groupedByYear);

    });

    return () => unsubscribe();
  }, [user]);

  const handleOpenCapsule = (id) => {
    setOpenedCapsules(prevState => ({
      ...prevState,
      [id]: true, 
    }));
  };
  
  const handleToggleCapsule = (id) => {
    setOpenedCapsules(prevState => ({
      ...prevState,
      [id]: !prevState[id], // Toggle the open/close state
    }));
  };


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <Text style={styles.titleHeader}>Time Capsule</Text>
        {Object.keys(timeCapsules).sort((a, b) => b - a).map(year => (
          <View key={year}>
            <Text style={styles.yearHeader}>{year}</Text>
            {timeCapsules[year].map(capsule => {
              const now = new Date();
              const openingDate = new Date(capsule.openingDate);
              const isPastOpeningDate = now >= openingDate;
              const isOpened = openedCapsules[capsule.id];

              return (
                <View style={styles.itemContainer}>
                  <Image source={require('../assets/9555a0b521676af5806153cc19267ab5.jpg')} style={styles.imageStyles} />
                  <Text style={styles.itemTitle}>Title: {capsule.title}</Text>

                  {isOpened ? (
                    <>
                      <Text style={styles.itemText}>Text: {capsule.text}</Text>
                      {capsule.photos && capsule.photos.map((photo, photoIndex) => (
                        <Image key={photoIndex} source={{ uri: photo }} style={styles.imageStyle} />
                      ))}
                      <TouchableOpacity
                        style={styles.inlineCloseButton}
                        onPress={() => handleToggleCapsule(capsule.id)}
                      >
                        <Text style={styles.inlineCloseButtonText}>Close</Text>
                      </TouchableOpacity>
                    </>
                  ) : (
                    isPastOpeningDate ? (
                      <TouchableOpacity
                        style={styles.inlineButton}
                        onPress={() => handleToggleCapsule(capsule.id)}
                      >
                        <Text style={styles.inlineButtonText}>Open</Text>
                      </TouchableOpacity>
                    ) : (
                      <Image source={lockIcon} style={styles.lockIconStyle} />
                    )
                  )}

                  <Text style={styles.itemText}>Opening Date: {openingDate.toLocaleDateString()}</Text>
                </View>
              );
            })}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );

};

export default ViewTimeCapsule;
