import { View, Text } from "react-native";
import React from "react";
import { useSafeArea } from "react-native-safe-area-context";
import {Marker} from "react-native-maps";

export default function DiaryScreen() {
  const insets = useSafeArea();

  return (
    <View
      style={{
        flex: 1,
        paddingTop: insets.top,
      }}
    ><Text>DiaryScreen</Text></View>
  );
}
