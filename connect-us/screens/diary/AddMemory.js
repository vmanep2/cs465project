import React from "react";
import { View, Text } from "react-native";
import { useSafeArea } from "react-native-safe-area-context";
import { useNavigation } from '@react-navigation/native';

import FAB from '../utils/FAB'

export default function AddMemory() {
    const insets = useSafeArea();
    const navigation = useNavigation();

    const handleAddButtonPress = () => {
        navigation.navigate("AddMemory");
    }

    const handleBack = () => {
        navigation.navigate("Home");
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Add memory goes here</Text>
            <FAB onPress={handleAddButtonPress} title="+" />
        </View>
    );
}
