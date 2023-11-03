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

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <ConnectUs />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

