import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { createStackNavigator } from '@react-navigation/stack';
import AddLogScreen from './AddLogScreen';
import ViewMemory from "./ViewMemory";
import CalendarView from "./CalendarView";

const Stack = createStackNavigator();


export default function DiaryScreen({ route }) {

    const [userId, setUserId] = useState();

    useEffect(() => {
        setUserId(route.params);
    });

    if (userId) {
        return (
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="ViewMemory" component={ViewMemory} initialParams={userId} />
                <Stack.Screen name="AddLogScreen" component={AddLogScreen} initialParams={userId} />
                <Stack.Screen name="CalendarView" component={CalendarView} initialParams={userId} />
            </Stack.Navigator>
        );
    }
   
    return (<></>);
}
