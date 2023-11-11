import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, image, ScrollView, Button, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import styles from './styles';

const ProfileScreen = ({ navigation, route }) => {
  const [profilePicture, setProfilePicture] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const navigateToRegisterScreen = () => {
    navigation.navigate('RegisterScreen', {
      profilePicture,
      firstName,
      lastName,
    });
  };

  const handleImageUpload = () => {
    ImagePicker.showImagePicker({
      title: 'Select Profile Picture',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    }, (response) => {
      if (response.didCancel) {
        console.log('Image picker cancelled');
      } else if (response.error) {
        console.log('Image picker error:', response.error);
      } else {
        setProfilePicture(response.uri);
      }
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.headertext}>Profile Setup</Text>

        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button title="Pick an image from camera roll" onPress={pickImage} />
            {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
        </View>

        <TextInput
          placeholder="First Name"
          placeholderTextColor={"#9a9ea6"}
          value={firstName}
          onChangeText={(text) => setFirstName(text)}
          style={styles.inputfield}
        />
        <TextInput
          placeholder="Last Name"
          placeholderTextColor={"#9a9ea6"}
          value={lastName}
          onChangeText={(text) => setLastName(text)}
          style={styles.inputfield}
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={navigateToRegisterScreen}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </View>
  );
};

export default ProfileScreen;
