import React, { useState, useEffect } from "react";
import {
  Alert,
  View,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
  FlatList,
  TextInput,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { storage } from "../../firebaseConfig";
import { ref, uploadBytes } from "firebase/storage";
import { collection, addDoc, doc, setDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

const { width } = Dimensions.get('window');

export default function AddLogScreen({ route, navigation }) {
  const insets = useSafeAreaInsets();
  const [images, setImages] = useState(null);
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [userId, setUserId] = useState();

  useEffect(() => {
    setUserId(route.params);
  });

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      aspect: [4, 3],
      quality: 1,
      allowsMultipleSelection: true,
    });

    // console.log(result);

    if (!result.canceled) {
      setImages(result.assets);
      // console.log(result.assets)
      //   setImage(result.assets[0].uri);
    }
  };

  const goBack = () => {
    navigation.navigate("ViewMemory");
  }

  const unhideDatePicker = () => {
    setShowDatePicker(true);
  }

  const handleConfirm = (date) => {
    setDate(date);
    setShowDatePicker(false);
  }

  const handleCancel = () => {
    setShowDatePicker(false);
  }

  const uploadMedia = async () => {
    // Sanity check!!
    // Prevent upload if user has not provided photos or user has not entered a description
    
    let descriptionInputString = description.trim();

    if (images == null) {
        if (descriptionInputString.length == 0) {
            Alert.alert('Error!', 'You have not added any photos or description text');
        
        } else {
            Alert.alert('Error!', 'You have not added any photos');
        }
        return;
    }

    if (descriptionInputString.length == 0) {
        Alert.alert('Error!', 'You have not added any description text');
        return;
    }

    setUploading(true);

    try {
    //   console.log(images);
    //   console.log(userId);

      let uriList = [];

      // File upload logic
      for (let i = 0; i < images.length; i++) {
        const response = await fetch(images[i].uri)
        const blob = await response.blob()

        // Parse the filename out of its directory
        const filename = images[i]["uri"].substring(
          images[i]["uri"].lastIndexOf("/") + 1
        );
        // Create directory string for location in firebase storage
        const userDirectory = "users/" + userId.uid + "/memories/";
        // Create reference for firebase to know where to upload the file/image
        const picRef = ref(storage, userDirectory + filename);
        // Use reference to upload
        await uploadBytes(picRef, blob).then((snapshot) => {
          console.log("Uploaded file to Firebase storage!");
        });

        uriList.push(userDirectory + filename);
      }

    //   console.log(uriList);
            
      const docRef = await addDoc(collection(db, 'users', userId.uid, 'memories'), {
        caption: description,
        date: date,
        uri: uriList
      });
      console.log('Updated in firestore with id ' + docRef.id);


      // Success handling
    
      Alert.alert('Success!', 'Memory has been added');

      setUploading(false);
      setDescription("");
      setDate(new Date());
      setImages(null);
      goBack();
    
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        marginTop: insets.top,
        marginBottom: insets.bottom,
        paddingVertical: 15,
        paddingHorizontal: 30,
      }}
    >
      <View style={{flex: 1, 
            // justifyContent: "center",
            marginBottom: 50}}>
        <Text style={{ fontSize: 28, fontFamily: 'balsamiq-sans', borderBottomWidth: 2, borderBottomColor: '#e0e0e0', paddingBottom: 15}}>
            Add Log
        </Text>
        <Text style={{ fontSize: 14, marginTop: 30, marginBottom: 10, fontFamily: 'balsamiq-sans'}}>
            Add description
        </Text>
            <TextInput
                style={{
                    height: 50,
                    borderWidth: 1,
                    borderColor: "#ccc",
                    paddingHorizontal: 15,
                    paddingVertical: 10,
                    fontFamily: 'balsamiq-sans'
                }}
                placeholder="Describe your memory"
                value={description}
                onChangeText={setDescription}
            />
        <Text style={{ fontSize: 14, marginTop: 30, marginBottom: 10, fontFamily: 'balsamiq-sans'}}>
            Select images
        </Text>
        <View
            style={{
            alignItems: "center",
            justifyContent: "center",
            }}
        >
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
                source={require("../../assets/empty.jpg")}
                style={{
                    width: width - 60,
                    height: 200,
                    alignContent: "center",
                }}
                />
            </TouchableOpacity>
            )}
        </View>
        <Text style={{ fontSize: 14, marginTop: 30, marginBottom: 10, fontFamily: 'balsamiq-sans'}}>
            Select date
        </Text>
        <View style={{flexDirection: 'row'}}>
            <TouchableOpacity onPress={unhideDatePicker}>
                <Ionicons name="calendar-outline" size={40} color="black" />
            </TouchableOpacity>
            <View style={{ paddingHorizontal: 5 }} />
            <TextInput
                style={{
                    height: 40,
                    width: 150,
                    borderWidth: 1,
                    borderColor: "#ccc",
                    paddingHorizontal: 15,
                    paddingVertical: 10,
                    fontFamily: 'balsamiq-sans'
                }}
                editable={false}
                value={date.toLocaleDateString()}
            />
            <DateTimePickerModal 
                date={date}
                isVisible={showDatePicker}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={handleCancel}
                themeVariant="light"
            />
        </View>
        <View
            style={{
            flexDirection: 'row',
            justifyContent:'space-between',
            marginTop: 50,
            }}
        >
            <TouchableOpacity
            style={{
                width: 100,
                height: 50,
                backgroundColor: "#e91d63",
                padding: 10,
                alignItems: "center",
                borderRadius: 30
            }}
            onPress={uploadMedia}
            >
            <Text style={{ color: "white", fontSize: 20, fontFamily: 'balsamiq-sans' }}>Post</Text>
            </TouchableOpacity>
            <TouchableOpacity
            style={{
                width: 100,
                height: 50,
                backgroundColor: "#999",
                padding: 10,
                alignItems: "center",
                borderRadius: 30
            }}
            onPress={goBack}
            >
            <Text style={{ color: "white", fontSize: 20, fontFamily: 'balsamiq-sans' }}>Cancel</Text>
            </TouchableOpacity>
        </View>
        </View>
    </View>
  );
}
