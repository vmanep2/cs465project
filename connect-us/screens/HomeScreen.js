import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useSafeArea } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";

export default function HomeScreen({ navigation }) {
  const insets = useSafeArea();

  const handleLogOut = async () => {
    try {
      await AsyncStorage.removeItem("LoggedIn");
      signOut(auth)
        .then(() => {
          console.log("Sign out succesful");
          // navigation.replace("Login");
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        paddingTop: insets.top,
      }}
    >
      <Text>HomeScreen</Text>
      <TouchableOpacity
        style={{ alignItems: "center", backgroundColor: "red", width: "50%" }}
        onPress={handleLogOut}
      >
        <Text>Log Out Button</Text>
      </TouchableOpacity>
    </View>
  );
}
