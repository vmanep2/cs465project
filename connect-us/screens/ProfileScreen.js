import React, { useState } from 'react';
import { View, Text, TextInput, KeyboardAvoidingView, TouchableOpacity, Image, image, ScrollView, Button, Platform, FlatList } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import styles from './styles';


const ProfileScreen = ({ navigation, route }) => {
// const [profilePicture, setProfilePicture] = useState(null);
const [firstName, setFirstName] = useState("");
const [image, setImage] = useState(null);
const pickImage = async () => {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    aspect: [4, 3],
    quality: 1,
    allowsMultipleSelection: false,
  });

  // console.log(result);

  if (!result.canceled) {
    setImage(result.assets);
    // console.log(result.assets)
    //   setImage(result.assets[0].uri);
  }
};

 const navigateToRegisterScreen = () => {
   navigation.navigate('Register', {
     firstName: firstName,
   });
 };


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
          <FlatList
            horizontal
            data={image}
            renderItem={({ item }) => (
            <Image
              source={{ uri: item.uri }}
              style={styles.circularContainer}
            />
            )}
            keyExtractor={(_, index) => index.toString()}
          />
          ) : (
          <View style={styles.circularContainer}>
            <Button color='#e91d63' style={styles.profileButton} title="Choose profile picture" onPress={pickImage} />
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
      <View style={styles.profileDurationContainer}>
          <TextInput style={{fontSize: 16}} placeholder="Years" keyboardType="numeric" />
          <TextInput style={{fontSize: 16}} placeholder="Months" keyboardType="numeric" />
          <TextInput style={{fontSize: 16}} placeholder="Days" keyboardType="numeric" />
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