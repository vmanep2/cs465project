import React, { useState } from 'react';
import { View, TextInput, Image, ScrollView, Text, Alert, TouchableOpacity, SafeAreaView, Dimensions, FlatList } from 'react-native';
import { db, storage } from '../firebaseConfig'; 
import { ref, uploadBytes } from "firebase/storage";
import { collection, addDoc, doc, setDoc } from 'firebase/firestore';
import { launchImageLibrary } from 'react-native-image-picker';
import * as ImagePicker from "expo-image-picker";
import styles from './styles';

const CreateTimeCapsule = ({ user, onTimeCapsuleCreated }) => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [duration, setDuration] = useState({ years: 0, months: 0, days: 0 });
  const [images, setImages] = useState(null);
  
  const { width } = Dimensions.get('window');

  const updateDuration = (field, value) => {
    setDuration({ ...duration, [field]: parseInt(value, 10) });
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      aspect: [4, 3],
      quality: 1,
      allowsMultipleSelection: true,
    });

    if (!result.canceled) {
      setImages(result.assets);
    }
  };

  const handleCreate = async () => {
    if (title == "") {
      Alert.alert('Error!', 'You have not added a title');
      return;
    }

    if (text == "") {
      Alert.alert('Error!', 'You have not added any text');
      return;
    }

    if (images == null) {
        Alert.alert('Error!', 'You have not added any images');
        return;
    }

    try {
        const creationDate = new Date();
        const openingDate = new Date(creationDate);
        openingDate.setFullYear(openingDate.getFullYear() + duration.years);
        openingDate.setMonth(openingDate.getMonth() + duration.months);
        openingDate.setDate(openingDate.getDate() + duration.days);

        let photos = [];

        // File upload logic
        for (let i = 0; i < images.length; i++) {
            const response = await fetch(images[i].uri)
            const blob = await response.blob()

            // Parse the filename out of its directory
            const filename = images[i]["uri"].substring(
                images[i]["uri"].lastIndexOf("/") + 1
            );
            // Create directory string for location in firebase storage
            const userDirectory = "users/" + user + "/timecapsule/";

            // Create reference for firebase to know where to upload the file/image
            const picRef = ref(storage, userDirectory + filename);

            // Use reference to upload
            await uploadBytes(picRef, blob).then((snapshot) => {
                console.log("Uploaded file to Firebase storage!");
            });

            photos.push(userDirectory + filename);

            const docRef = await addDoc(collection(db, 'timeCapsules'), {
                user,
                title,
                text,
                photos,
                creationDate: creationDate.toISOString(),
                openingDate: openingDate.toISOString(),
            });
    
            // Success handling
            Alert.alert('Success', 'Time Capsule created successfully!');
            onTimeCapsuleCreated(docRef.id); 
        }

    } catch (error) {
        console.error(error);
        Alert.alert('Error', 'Failed to create Time Capsule!');
    }
  };

  return (
      <SafeAreaView style={{ flex: 1 }}>
          <ScrollView contentContainerStyle={styles.createContainer}>
              <TextInput style={styles.timecapsuleinputfield} placeholder="Title" value={title} onChangeText={setTitle} />
              <View
                style={{
                alignItems: "center",
                justifyContent: "center",
                }}>
                {images ? (
                <FlatList
                    horizontal
                    data={images}
                    renderItem={({ item }) => (
                    <Image
                        source={{ uri: item.uri }}
                        style={{ width: 200, height: 200, margin: 10 }}
                    />
                    )}
                    keyExtractor={(_, index) => index.toString()}
                />
                ) : (
                <TouchableOpacity onPress={pickImage}>
                    <Image
                    source={require("../assets/empty.jpg")}
                    style={{
                        width: width - 80,
                        height: 200,
                        alignContent: "center",
                    }}
                    />
                </TouchableOpacity>
                )}
              </View>
              <TextInput style={styles.inputfieldmultiline} placeholder="Add Text" value={text} multiline onChangeText={setText} />
              <View style={styles.durationContainer}>
                  <TextInput style={styles.timecapsuledatefield} placeholder="Years" keyboardType="numeric" onChangeText={(value) => updateDuration('years', value)} />
                  <TextInput style={styles.timecapsuledatefield} placeholder="Months" keyboardType="numeric" onChangeText={(value) => updateDuration('months', value)} />
                  <TextInput style={styles.timecapsuledatefield} placeholder="Days" keyboardType="numeric" onChangeText={(value) => updateDuration('days', value)} />
              </View>
              <TouchableOpacity style={styles.button} onPress={handleCreate}>
                  <Text style={styles.buttonText}>Create Time Capsule</Text>
              </TouchableOpacity>
          </ScrollView>
      </SafeAreaView>
  );
};

export default CreateTimeCapsule;
