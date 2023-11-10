import React from "react";
// import { SafeAreaView, SafeAreaProvider, useSafeAreaInsets  } from 'react-native-safe-area-context';
import ConnectUs from "./ConnectUs";
// import {
//   TextField,
//   View,
//   Text,
//   Button,
//   LoaderScreen,
//   Colors,
//   Gradient,
// } from "react-native-ui-lib";
// import { ThemeManager } from "react-native-ui-lib";
import LoadingScreen from "./screens/LoadingScreen";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useState } from "react"; // Add useState here
import AppLoading from 'expo-app-loading'; // Ensure AppLoading is imported from 'expo-app-loading'
import * as Font from 'expo-font';
// ... other imports


// ThemeManager.setComponentTheme("Text", (props, context) => {
//   return {
//     color: Colors.rgba("#FBF4F4", 1.0), // #FBF4F4
//   };
// });

// ThemeManager.setComponentTheme("View", (props, context) => {
//   return {
//     backgroundColor: Colors.rgba("#181a20", 1.0), //maybe #424242? #2e2e2e #1a1e23
//   };
// });

// ThemeManager.setComponentTheme("Button", (props, context) => {
//   return {
//     backgroundColor: Colors.rgba("#39AFEA", 1.0),
//   };
// });

function handleClick() {
  console.log("idk");
}
const fetchFonts = () => {
  return Font.loadAsync({
    DMBold: require("./assets/fonts/DMSans-Bold.ttf"),
    DMMedium: require("./assets/fonts/DMSans-Medium.ttf"),
    DMRegular: require("./assets/fonts/DMSans-Regular.ttf"),
    'balsamiq-sans' : require('./assets/fonts/BalsamiqSans-Regular.ttf'),
    'balsamiq-sans-bold' : require('./assets/fonts/BalsamiqSans-Bold.ttf'),
  });
};

export default function App() {

  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
        onError={(error) => console.warn(error)}
      />
    );
  }
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <ConnectUs />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

