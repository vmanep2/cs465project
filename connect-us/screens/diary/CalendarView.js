import React from "react";
import { View, StyleSheet, Text } from "react-native";
import FAB from '../utils/FAB'

export default function CalendarView() {

    const handleAddButtonPress = ({navigation}) => {
        navigation.navigate("ViewMemory");
    }

    return (
        <View style={{ flex: 1 }}>
            <Text style={styles.heading}>Diary</Text>
            <View style={styles.container}>
                <Text>calendar goes here</Text>
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
