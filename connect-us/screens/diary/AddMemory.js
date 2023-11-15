import React from "react";
import { View, Text } from "react-native";

import FAB from '../utils/FAB'

export default function AddMemory({navigation}) {

    const handleBack = () => {
        navigation.goBack();
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Add memory goes here</Text>
            <FAB onPress={handleBack} title="Done" />
        </View>
    );
}
