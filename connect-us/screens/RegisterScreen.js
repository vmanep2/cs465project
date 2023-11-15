import {
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React from "react";
import { useSafeArea } from "react-native-safe-area-context";
import { auth } from "../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { sendEmailVerification } from "firebase/auth";
import { useState, useEffect } from "react";
import styles from "./styles";
import {
  RegExpMatcher,
  TextCensor,
  englishDataset,
  englishRecommendedTransformers,
} from "obscenity";

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUserName] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [partnerUserName, setPartnerUserName] = useState("");

  const insets = useSafeArea();

  const matcher = new RegExpMatcher({
    ...englishDataset.build(),
    ...englishRecommendedTransformers,
  });

  const userHasProfanity = () => {
    return matcher.hasMatch(username);
  };

  const handleSignUp = () => {
    console.log("Begin handle sign up")
    if (!confirmPassword()) {
      alert("Passwords must match.");
      return;
    }

    if (userHasProfanity()) {
      alert("Please choose a different username.");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("Registered with:", user.email);
      })
      .catch((error) => {
        alert("An error occured. Please try again.")
        console.log(error.message)})
      .then(() => {
        sendEmailVerification(auth.currentUser, {
          handleCodeInApp: true,
          url: "https://connectus-fb453.firebaseapp.com",
        })
          .then(() => {
            alert(
              "Verification email sent. Please log in after verifying your email."
            );
          })
          .catch((error) => {
            alert("An error occured. Please try again.");
            console.log("Verification email send:")
            console.log(error.message)
          })
          .then(navigateSignIn());
      });
  };

  const navigateSignIn = () => {
    console.log("Navigate to sign in")
    navigation.navigate("Login");
  };

  const confirmPassword = () => {
    console.log(password)
    console.log(confirmPass)
    return password === confirmPass;
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
          <Text style={styles.headertext}>Create new account</Text>
          <Text style={styles.subheadertext}>Please enter your login information</Text>

          <TextInput
            placeholder="Username"
            placeholderTextColor={"#9a9ea6"}
            autoComplete="username"
            value={username}
            onChangeText={(text) => setUserName(text)}
            style={styles.inputfield}
          />
          <TextInput
            placeholder="Email Address"
            autoComplete="email"
            placeholderTextColor={"#9a9ea6"}
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={styles.inputfield}
          />
          <TextInput
            placeholder="Password"
            placeholderTextColor={"#9a9ea6"}
            value={password}
            onChangeText={(text) => setPassword(text)}
            style={styles.inputfield}
            secureTextEntry
          />
          <TextInput
            placeholder="Confirm Password"
            placeholderTextColor={"#9a9ea6"}
            value={confirmPass}
            onChangeText={(text) => setConfirmPass(text)}
            style={styles.inputfield}
            secureTextEntry
          />
          <TextInput
            placeholder="Partner Username"
            placeholderTextColor={"black"}
            autoComplete="username"
            value={partnerUserName}
            onChangeText={(text) => setPartnerUserName(text)}
            style={styles.partnerinputfield}
          />

          <View style={{ width: "100%", alignItems: "center" }}>
            <TouchableOpacity
              onPress={handleSignUp}
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
          <View style={{ justifyContent: "center", flexDirection: "row" }}>
            <Text style={{ color: "#666666" }}>Have an Account? </Text>
            <TouchableOpacity onPress={navigateSignIn}>
              <Text style={{ color: "#e91d63" }}>Sign in</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
  //   .then((userCredentials) => {
  //       const user = userCredentials.user;
  //       console.log("Registered with:", user.email);
  //     })
  //     .catch((error) => alert(error.message));
};

export default RegisterScreen;
