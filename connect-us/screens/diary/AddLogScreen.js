import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
  FlatList,
  TextInput,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { storage } from "../../firebaseConfig";
import { ref, uploadBytes } from "firebase/storage";

const {width} = Dimensions.get('window');

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
    console.log(userId);
  });

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      allowsMultipleSelection: true,
    });

    console.log(result);

    if (!result.canceled) {
      setImages(result.assets);
      // console.log(result.assets)
      //   setImage(result.assets[0].uri);
    }
  };

  const goBack = () => {
    navigation.goBack();
  }

  const showDate = () => {
    setShowDatePicker(true);
  }

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
    setShowDatePicker(false);
  };

  const uploadMedia = async () => {
    setUploading(true);

    try {
      console.log(images);
      console.log(userId);
      for (let i = 0; i < images.length; i++) {
        // Parse the filename out of its directory
        const filename = images[i]["uri"].substring(
          images[i]["uri"].lastIndexOf("/") + 1
        );
        // Create directory string for location in firebase storage
        const userDirectory = "users/" + userId["uid"] + "/";
        // Create reference for firebase to know where to upload the file/image
        const picRef = ref(storage, userDirectory + filename);
        // Use reference to upload
        uploadBytes(picRef, filename).then((snapshot) => {
          console.log("uploaded!");
        });
      }
      setUploading(false);
      setImages(null);
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
        <Text style={{ fontSize: 28, fontWeight: 'bold'}}>
            Add Log
        </Text>
        <Text style={{ fontSize: 14, marginTop: 30, marginBottom: 10}}>
            Select date
        </Text>
        <View style={{flexDirection: 'row'}}>
            <TouchableOpacity onPress={showDate}>
                <Ionicons name="calendar-outline" size={40} color="black" />
            </TouchableOpacity>
            <View style={{ paddingHorizontal: 5 }} />
            {!showDatePicker && (
                <TextInput
                style={{
                    height: 40,
                    width: 150,
                    borderWidth: 1,
                    borderColor: "#ccc",
                    paddingHorizontal: 15,
                    paddingVertical: 10,
                }}
                editable={false}
                value={date.toLocaleDateString()}
            />
            )} 

            {showDatePicker && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={'date'}
                    onChange={onDateChange}
                />
            )}   
        </View>
        

        <Text style={{ fontSize: 14, marginTop: 30, marginBottom: 10}}>
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
        <Text style={{ fontSize: 14, marginTop: 30, marginBottom: 10}}>
            Add description
        </Text>
        <TextInput
            style={{
                height: 50,
                borderWidth: 1,
                borderColor: "#ccc",
                paddingHorizontal: 15,
                paddingVertical: 10,
            }}
            placeholder="Describe your memory"
            value={description}
            onChangeText={setDescription}
        />
        
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
            <Text style={{ color: "white", fontSize: 20 }}>Post</Text>
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
            <Text style={{ color: "white", fontSize: 20 }}>Cancel</Text>
            </TouchableOpacity>
        </View>
        </View>
    </View>
  );
}
