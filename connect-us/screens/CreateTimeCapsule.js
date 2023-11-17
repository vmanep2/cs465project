import React, { useState } from 'react';
import { View, TextInput, Button, ScrollView, Text, Alert } from 'react-native';
import { db, storage } from '../firebaseConfig'; 
import { collection, addDoc } from 'firebase/firestore';
import { launchImageLibrary } from 'react-native-image-picker';
import styles from './styles';

const CreateTimeCapsule = ({ user, onTimeCapsuleCreated }) => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [duration, setDuration] = useState({ years: 0, months: 0, days: 0 });
  const [photos, setPhotos] = useState([]);

  const updateDuration = (field, value) => {
    setDuration({ ...duration, [field]: parseInt(value, 10) });
  };

  const handlePhotoUpload = () => {
    const options = {
      noData: true,
    };

    launchImageLibrary(options, async (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
        Alert.alert('Error', 'Image selection error!');
      } else {
        const filename = response.fileName || `temp-${Date.now()}`;
        const uploadUri = response.uri;
        const storageRef = storage.ref(`photos/${filename}`);

        try {
          await storageRef.putFile(uploadUri);
          const url = await storageRef.getDownloadURL();
          setPhotos(photos => [...photos, url]);
        } catch (e) {
          console.error(e);
          Alert.alert('Upload error', 'Failed to upload photo.');
        }
      }
    });
  };

  const handleCreate = async () => {
    const creationDate = new Date();
    const openingDate = new Date(creationDate);
    openingDate.setFullYear(openingDate.getFullYear() + duration.years);
    openingDate.setMonth(openingDate.getMonth() + duration.months);
    openingDate.setDate(openingDate.getDate() + duration.days);

    try {
        const docRef = await addDoc(collection(db, 'timeCapsules'), {
            user,
            title,
            text,
            photos,
            creationDate: creationDate.toISOString(),
            openingDate: openingDate.toISOString(),
        });

        Alert.alert('Success', 'Time Capsule created successfully!');
        onTimeCapsuleCreated(docRef.id); 
    } catch (error) {
        console.error(error);
        Alert.alert('Error', 'Failed to create Time Capsule!');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.createContainer}>
        <TextInput style={styles.input} placeholder="Title" value={title} onChangeText={setTitle} />
        <Button title="Upload Photo" onPress={handlePhotoUpload} />
        <TextInput style={styles.input} placeholder="Add Text" value={text} multiline onChangeText={setText} />
        <View style={styles.durationContainer}>
            <TextInput style={styles.input} placeholder="Years" keyboardType="numeric" onChangeText={(value) => updateDuration('years', value)} />
            <TextInput style={styles.input} placeholder="Months" keyboardType="numeric" onChangeText={(value) => updateDuration('months', value)} />
            <TextInput style={styles.input} placeholder="Days" keyboardType="numeric" onChangeText={(value) => updateDuration('days', value)} />
        </View>
        <Button style={styles.button} title="Create Time Capsule" onPress={handleCreate} />
    </ScrollView>
  );
};

export default CreateTimeCapsule;