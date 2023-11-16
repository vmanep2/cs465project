import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  TextInput,
} from "react-native";
import { useSafeArea } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import { storage } from "../../firebaseConfig";
import { ref, uploadBytes } from "firebase/storage";

export default function AddLogScreen({ route, navigation }) {
  const insets = useSafeArea();
  const [images, setImages] = useState(null);
  const [description, setDescription] = useState("");
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
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }}
    >
      <Text style={{ marginLeft: 45, fontSize: 30, marginBottom: 30 }}>
        Add Log
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
                width: 350,
                height: 250,
                alignContent: "center",
              }}
            />
          </TouchableOpacity>
        )}
      </View>
      <TextInput
        style={{
          height: 50,
          width: 350,
          borderWidth: 1,
          borderColor: "black",
          marginTop: 20,
          marginLeft: 30,
        }}
        placeholder="Describe your memory"
        value={description}
        onChangeText={setDescription}
      />
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TouchableOpacity
          style={{
            width: 100,
            height: 50,
            backgroundColor: "red",
            padding: 10,
            marginTop: 300,
            alignItems: "center",
          }}
          onPress={uploadMedia}
        >
          <Text style={{ color: "white", fontSize: 20 }}>Post</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
