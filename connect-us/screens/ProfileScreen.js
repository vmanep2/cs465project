import React, { useState } from 'react';
import { View, Text, TextInput, KeyboardAvoidingView, TouchableOpacity, Image, image, ScrollView, Button, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import styles from './styles';


const ProfileScreen = ({ navigation, route }) => {
// const [profilePicture, setProfilePicture] = useState(null);
const [firstName, setFirstName] = useState("");
const pickImage = async () => {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
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


 const navigateToRegisterScreen = () => {
   navigation.navigate('Register', {
     firstName: firstName,
   });
 };


 // const handleImageUpload = () => {
 //   ImagePicker.showImagePicker({
 //     title: 'Select Profile Picture',
 //     storageOptions: {
 //       skipBackup: true,
 //       path: 'images',
 //     },
 //   }, (response) => {
 //     if (response.didCancel) {
 //       console.log('Image picker cancelled');
 //     } else if (response.error) {
 //       console.log('Image picker error:', response.error);
 //     } else {
 //       setProfilePicture(response.uri);
 //     }
 //   });
 // };


 return (
   <View
   style={{
     flex: 1,
     paddingTop: 50,
     flexGrow: 1,
   }}
   >
   <KeyboardAvoidingView
     style={{ alignItems: "center", width: "100%", flex: 1 }}
     behavior={Platform.OS === "ios" ? "padding" : "height"}
   >
     <ScrollView
       style={{ width: "100%" }}
       contentContainerStyle={{ alignItems: "center" }}
     >
       <Text style={styles.headertext}>Profile Setup</Text>
       <Text style={styles.subheadertext}>Enter your profile information</Text>


       <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {image ? (
          <View style={styles.circularContainer}>
            <Image source={{ uri: "https://nico-nico-nii.com/pre-defined/user_profile_pic_1" }} style={styles.circularImage} />
          </View>
        ) : (
          <View style={styles.circularContainer}>
            <Button style={styles.profileButton} title="Choose profile picture" onPress={pickImage} />
          </View>
        )}
      </View>


       <TextInput
         placeholder="Display Name"
         placeholderTextColor={"#9a9ea6"}
         value={firstName}
         onChangeText={(text) => setFirstName(text)}
         style={styles.inputfield}
       />
      
      <Text style = {{
        fontSize: 18,
        fontWeight: '700',
        marginTop: 12,
        marginBottom: 12,
        textAlign: 'center'
      }}>
        How long have you and your partner been together?
      </Text>
      <View style={styles.durationContainer}>
          <TextInput style={styles.input} placeholder="Years" keyboardType="numeric" />
          <TextInput style={styles.input} placeholder="Months" keyboardType="numeric" />
          <TextInput style={styles.input} placeholder="Days" keyboardType="numeric" />
      </View>

       <View style={{ width: "100%", alignItems: "center" }}>
         <TouchableOpacity
           onPress={navigateToRegisterScreen}
           style={{
             backgroundColor: "#e91d63",
             marginBottom: 20,
             marginTop: 80,
             width: "87%",
             borderRadius: 20,
             height: 60,
             fontWeight: "700",
             justifyContent: "center",
           }}
         >
           <Text
             style={{
               textAlign: "center",
               fontWeight: "600",
               color: "white",
               fontSize: 16,
             }}
           >
             Next
           </Text>
         </TouchableOpacity>
       </View>
     </ScrollView>
   </KeyboardAvoidingView>
   </View>
 );
};


export default ProfileScreen;