import React from "react";
import { useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useSafeArea } from "react-native-safe-area-context";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendEmailVerification,
  OAuthProvider,
  signInWithCredential,
} from "firebase/auth";
import { auth } from "../firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RegisterScreen from "./RegisterScreen";
import ForgotPassScreen from "./ForgotPassScreen";
import styles from "./styles";

const Stack = createStackNavigator();

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const insets = useSafeArea();

  //   useEffect(() => {
  //   });

  const userVerified = () => {
    return auth.currentUser.emailVerified;
  };

  const navigateSignUp = () => {
    navigation.navigate("Register");
  };

  const navigateForgotPassword = () => {
    navigation.navigate("ForgotPass");
  };

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        if (userVerified()) {
          const user = userCredentials.user;
          console.log("Logged in with:", user.email);
          // navigation.replace("Tabs");
          AsyncStorage.setItem("LoggedIn", JSON.stringify(true));
        } else {
          alert("Please verify your email.");
        }
      })
      .catch((error) => {
        console.log(error.message)
        alert(error.message)}
      );
  };

  return (
    <View
      style={{
        flex: 1,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
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
          <Text style={styles.headertext}>Welcome to ConnectUs!</Text>
          <Text style={styles.subheadertext}>Please sign in to continue</Text>

          <TextInput
            placeholder="Email"
            placeholderTextColor={"#9a9ea6"}
            autoComplete="email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={styles.inputfield}
          />
          <TextInput
            placeholder="Password"
            placeholderTextColor={"#9a9ea6"}
            autoComplete="password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            style={styles.inputfield}
            secureTextEntry
            enableShadow
          />
          <TouchableOpacity
            onPress={navigateForgotPassword}
            style={{ width: "100%" }}
          >
            <Text
              style={{
                textAlign: "right",
                paddingRight: 30,
                fontSize: 13,
                marginTop: 3,
                color: "#e91d63"
              }}
            >
              Forgot Password?
            </Text>
          </TouchableOpacity>
          <View
            style={{
              width: "100%",
              alignItems: "center",
              textAlign: "center",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity
              onPress={handleLogin}
              style={{
                backgroundColor: "#e91d63",
                marginBottom: 20,
                marginTop: 50,
                width: "87%",
                borderRadius: 20,
                height: 60,
                fontWeight: "700",
                textAlign: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{ textAlign: "center", fontWeight: "900", fontSize: 16, color: "white" }}
              >
                Login
              </Text>
            </TouchableOpacity>
            <View style={{ justifyContent: "center", flexDirection: "row" }}>
              <Text>Don't have an Account? </Text>
              <TouchableOpacity onPress={navigateSignUp}>
                <Text style={{ color: "#e91d63" }}>Sign up</Text>
              </TouchableOpacity>
            </View>
            {/* label="Login"
              labelStyle={{ fontWeight: "600" }} */}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default LoginScreen;
