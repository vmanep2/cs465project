import React, { useState, useEffect } from 'react';
import {View, Text, FlatList, Image, Button, TouchableOpacity, SafeAreaView, ScrollView, ImageBackground, Alert} from 'react-native';
import { collection, query, where, onSnapshot, doc, deleteDoc } from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { db, storage } from '../firebaseConfig';
import { Ionicons } from 'react-native-vector-icons';
import styles from './styles';

const lockIcon = require('../assets/lock_icon.jpg');

const ViewTimeCapsule = ({ user }) => {
  const [timeCapsules, setTimeCapsules] = useState({});
  const [openedCapsules, setOpenedCapsules] = useState({}); 

  const fetchImages = async (uri) => {
    const imageURI = await getDownloadURL(ref(storage, uri))
    return imageURI;
  }

  useEffect(() => {
    if (!user) {
      console.error('No user provided');
      return;
    }

    const q = query(collection(db, 'timeCapsules'), where('user', '==', user));
    const unsubscribe = onSnapshot(q, async (snapshot) => {
      const capsules = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Store capsule URI from firebase into uriList property of object
      for (let i = 0; i < capsules.length; i++) {
        let downloadImageUriList = [];

        for (let j = 0; j < capsules[i].photos.length; j++) {
            const imageURI = await fetchImages(capsules[i].photos[j]);
            downloadImageUriList.push(imageURI);
        }
        capsules[i].uriList = downloadImageUriList;
      }

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
      [id]: !prevState[id], 
    }));
  };

  const deleteTimeCapsule = async (capsuleId) => {
    try {
      await deleteDoc(doc(db, 'timeCapsules', capsuleId));
      Alert.alert('Success', 'Time Capsule deleted successfully!');

      setTimeCapsules(prevCapsules => {
        const updatedCapsules = { ...prevCapsules };
        Object.keys(updatedCapsules).forEach(year => {
          updatedCapsules[year] = updatedCapsules[year].filter(capsule => capsule.id !== capsuleId);
        });
        return updatedCapsules;
      });
    } catch (error) {
      console.error('Error deleting time capsule:', error);
      Alert.alert('Error', 'Failed to delete Time Capsule!');
    }
  };

  const confirmDelete = (capsuleId) => {
    Alert.alert(
      'Delete Time Capsule',
      'Are you sure you want to delete this time capsule?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'OK', onPress: () => deleteTimeCapsule(capsuleId) },
      ],
      { cancelable: false }
    );
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
                      <FlatList
                            horizontal
                            data={capsule.uriList}
                            renderItem={({ item }) => (
                            <Image
                                source={{ uri: item }}
                                style={{ width: 150, height: 150, margin: 10 }}
                            />
                            )}
                            keyExtractor={(_, index) => index.toString()}
                        />
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
                      // <Image source={lockIcon} style={styles.lockIconStyle} />
                      <Ionicons name="lock-closed" size={50} style={styles.lockIconStyle} />
                    )
                  )}

                  <Text style={styles.itemText}>Opening Date: {openingDate.toLocaleDateString()}</Text>
                  <TouchableOpacity onPress={() => confirmDelete(capsule.id)} style={styles.trashIcon}>
                    <Ionicons name="trash" size={30} color="#D73E02" />
                  </TouchableOpacity>
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
