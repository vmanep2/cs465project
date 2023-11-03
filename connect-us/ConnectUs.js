import { isLoaded, useFonts } from "expo-font";
import React from "react";
import { useState, useEffect } from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from "@react-navigation/stack";
// import { SafeAreaProvider } from "react-native-safe-area-context";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { auth } from "./firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

import LoadingScreen from "./screens/LoadingScreen";
import HomeScreen from "./screens/HomeScreen";
import DiaryScreen from "./screens/DiaryScreen"
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ForgotPassScreen from "./screens/ForgotPassScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#e91d63",
        tabBarLabelStyle: { fontSize: 11, color: "#e91d63" },
        tabBarStyle: {
          position: "absolute",
          backgroundColor: "#666666",
          borderTopWidth: 0,
          color: "#e91d63",
          
        },
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Diary" component={DiaryScreen} />
    </Tab.Navigator>
  );
};

export default function ConnectUs() {
  const [fontsLoaded] = useFonts({
    DMBold: require("./assets/fonts/DMSans-Bold.ttf"),
    DMMedium: require("./assets/fonts/DMSans-Medium.ttf"),
    DMRegular: require("./assets/fonts/DMSans-Regular.ttf"),
  });

  const [isLoading, setIsLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  getLoginStatus = async () => {
    try {
      // const jsonValue = JSON.stringify(value);
      const logInState = await AsyncStorage.getItem("LoggedIn");
      if (logInState !== null) {
        setLoggedIn(logInState);
        console.log(logInState);
      } else {
        console.log("Not logged in");
      }
    } catch (e) {
      // saving error
      console.log(e);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && auth.currentUser.emailVerified) {
        const uid = user.uid;
        console.log("Logged in");
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    });

    setTimeout(() => {
      getLoginStatus();
      setIsLoading(false);
    }, 1500);

    return unsubscribe;
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!loggedIn) {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
				<Stack.Screen name="Register" component={RegisterScreen} />
				<Stack.Screen name="ForgotPass" component={ForgotPassScreen} />
      </Stack.Navigator>
    );
  }

  return (
    <Tabs/>
  );
}

export { Tabs };
