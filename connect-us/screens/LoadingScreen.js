import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { View, Text } from "react-native";

const LoadingScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "space-around",
        backgroundColor: "#e5e5e5"
      }}
    >
      <Text
        style={{
          marginBottom: 220,
          fontSize: 60,
          fontWeight: "600",
          color: "#e91d63",
        }}
      >
        Connect<Text style={{ color: "white" }}>Us</Text>
      </Text>
    </View>
  );
};

export default LoadingScreen;
