import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { useSafeArea } from "react-native-safe-area-context";
import { useNavigation } from '@react-navigation/native';

import FAB from '../utils/FAB'

export default function DiaryScreen() {
    const insets = useSafeArea();
    const navigation = useNavigation();

    const handleAddButtonPress = () => {
        navigation.navigate("AddMemory");
    }

    const handleBack = () => {
        navigation.navigate("Home");
    }

    return (
        <View style={{ flex: 1 }}>
            <Text style={styles.heading}>Diary</Text>
            <View style={styles.container}>
                <Text>No memories today, create one!</Text>
                <FAB onPress={handleAddButtonPress} title="+" />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 50,
    },
    heading: {
      fontSize: 28,
      fontWeight: 'bold',
      margin: 10,
      marginTop: 50,
    }
});
