import { isLoaded, useFonts } from "expo-font";
import React from "react";
import { useState, useEffect } from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import { auth } from "./firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

import LoadingScreen from "./screens/LoadingScreen";
import HomeScreen from "./screens/HomeScreen";
import DiaryScreen from "./screens/DiaryScreen";
import LoginScreen from "./screens/LoginScreen";
import LocationScreen from "./screens/LocationScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ForgotPassScreen from "./screens/ForgotPassScreen";
import TimeCapsuleScreen from "./screens/TimeCapsuleScreen";
import AddLogScreen from "./screens/AddLogScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const Tabs = ({ user }) => {
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
      <Tab.Screen name="Location" component={LocationScreen} />
      <Tab.Screen
        name="AddLog"
        component={AddLogScreen}
        initialParams={{ uid: user?.uid }}
      />
    </Tab.Navigator>
  );
};

export default function ConnectUs() {
  const [isLoading, setIsLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser && auth.currentUser.emailVerified) {
        console.log("Logged in");
        setLoggedIn(true);
        setUser(currentUser);
        // console.log(currentUser)
      } else {
        setLoggedIn(false);
      }
      setIsLoading(false);
    });

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

  return <Tabs user={user} />;
}

export { Tabs };
