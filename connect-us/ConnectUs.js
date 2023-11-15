
// import { isLoaded, useFonts } from "expo-font";
// import React from "react";
// import { useState, useEffect } from "react";

// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { createStackNavigator } from "@react-navigation/stack";

// import { auth } from "./firebaseConfig";
// import { onAuthStateChanged } from "firebase/auth";

// import LoadingScreen from "./screens/LoadingScreen";
// import HomeScreen from "./screens/HomeScreen";
// import DiaryScreen from "./screens/DiaryScreen"
// import LoginScreen from "./screens/LoginScreen";
// import LocationScreen from "./screens/LocationScreen";
// import RegisterScreen from "./screens/RegisterScreen";
// import ForgotPassScreen from "./screens/ForgotPassScreen";
// import ProfileScreen from "./screens/ProfileScreen";
// import TimeCapsuleScreen from "./screens/TimeCapsulePage";

// const Tab = createBottomTabNavigator();
// const Stack = createStackNavigator();

// const Tabs = () => {
//   return (
//       <Tab.Navigator
//           screenOptions={{
//             headerShown: false,
//             tabBarActiveTintColor: "#e91d63",
//             tabBarLabelStyle: { fontSize: 11, color: "#e91d63" },
//             tabBarStyle: {
//               position: "absolute",
//               backgroundColor: "#666666",
//               borderTopWidth: 0,
//               color: "#e91d63",

//             },
//           }}
//       >
//         <Tab.Screen name="Home" component={HomeScreen} />
//         <Tab.Screen name="Diary" component={DiaryScreen} />
//         <Tab.Screen name="Location" component={LocationScreen} />
//         <Tab.Screen name="Time Capsule" component={TimeCapsuleScreen} />

//       </Tab.Navigator>
//   );
// };


// export default function ConnectUs() {

  

//   const [isLoading, setIsLoading] = useState(true);
//   const [loggedIn, setLoggedIn] = useState(false);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (user && auth.currentUser.emailVerified) {
//         console.log("Logged in");
//         setLoggedIn(true);
//       } else {
//         setLoggedIn(false);
//       }
//       setIsLoading(false);
//     });

//     return unsubscribe;
//   }, []);

//   if (isLoading) {
//     return <LoadingScreen />;
//   }

//   if (!loggedIn) {
//     return (
//         <Stack.Navigator screenOptions={{ headerShown: false }}>
//           <Stack.Screen name="Login" component={LoginScreen} />
//           <Stack.Screen name="Profile" component={ProfileScreen} />
//           <Stack.Screen name="Register" component={RegisterScreen} />
//           <Stack.Screen name="ForgotPass" component={ForgotPassScreen} />
//         </Stack.Navigator>
//     );
//   }

//   return (
//       <Tabs/>
//   );
// }

import React, { useState, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebaseConfig";

import LoadingScreen from "./screens/LoadingScreen";
import HomeScreen from "./screens/HomeScreen";
import DiaryScreen from "./screens/DiaryScreen";
import LoginScreen from "./screens/LoginScreen";
import LocationScreen from "./screens/LocationScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ForgotPassScreen from "./screens/ForgotPassScreen";
import ProfileScreen from "./screens/ProfileScreen";
import TimeCapsuleScreen from "./screens/TimeCapsulePage";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const Tabs = ({ userId }) => {
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
        name="Time Capsule"
        children={() => <TimeCapsuleScreen userId={userId} />}
      />
    </Tab.Navigator>
  );
};

// The main ConnectUs component
export default function ConnectUs() {
  const [isLoading, setIsLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null); 

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && auth.currentUser.emailVerified) {
        console.log("Logged in");
        setLoggedIn(true);
        setUserId(user.uid); 
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
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="ForgotPass" component={ForgotPassScreen} />
      </Stack.Navigator>
    );
  }

  return <Tabs userId={userId} />;
}