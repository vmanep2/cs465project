import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import { useSafeArea } from "react-native-safe-area-context";
import styles from "./styles";
import { useState } from "react";
import { auth } from "../firebaseConfig";
import { sendPasswordResetEmail } from "firebase/auth";

const ForgotPassScreen = ({ navigation }) => {
  const insets = useSafeArea();
  const [email, setEmail] = useState("");

  const navigateSignUp = () => {
    navigation.navigate("Register");
  };

  const handleForgotPassword = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert("A reset password link has been sent to your provided email.");
        navigation.navigate("Login");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <View
      style={{
        flex: 1,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        alignItems: "center",
      }}
    >
      <ScrollView
        style={{ width: "100%" }}
        contentContainerStyle={{ alignItems: "center" }}
      >
        <Text style={styles.headertext}>Forgot Password?</Text>
        <View style={{ width: "87%", marginTop: 60 }}>
          <Text
            style={{
              marginTop: 10,
              marginBottom: 8,
              opacity: 0.5,
              fontSize: 13,
              fontWeight: "600",
              color: "#666666",
              textAlign: "center",
              width: "100%",
            }}
          >
            Enter the email address associated with your account and we'll send
            you a link to reset your password
          </Text>
        </View>
        <TextInput
          placeholder="Email"
          placeholderTextColor={"#9a9ea6"}
          autoComplete="email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.inputfield}
        />
        <TouchableOpacity
          onPress={handleForgotPassword}
          style={{
            backgroundColor: "#e91d63",
            marginBottom: 20,
            marginTop: 8,
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
            Continue
          </Text>
        </TouchableOpacity>
        <View style={{ justifyContent: "center", flexDirection: "row" }}>
          <Text style={{ color: "#666666" }}>Don't have an Account? </Text>
          <TouchableOpacity onPress={navigateSignUp}>
            <Text style={{ color: "#e91d63" }}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default ForgotPassScreen;
