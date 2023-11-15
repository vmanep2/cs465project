import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { createStackNavigator } from '@react-navigation/stack';
import AddMemory from "./AddMemory";
import ViewMemory from "./ViewMemory";
import CalendarView from "./CalendarView";

const Stack = createStackNavigator();


export default function DiaryScreen() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="ViewMemory" component={ViewMemory} />
            <Stack.Screen name="AddMemory" component={AddMemory} />
            <Stack.Screen name="CalendarView" component={CalendarView} />
        </Stack.Navigator>
    );
}
