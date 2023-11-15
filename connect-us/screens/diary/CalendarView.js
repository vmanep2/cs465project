import React from "react";
import { View, StyleSheet, Text } from "react-native";

export default function CalendarView() {

    const handleAddButtonPress = ({navigation}) => {
        navigation.navigate("ViewMemory");
    }

    return (
        <View style={styles.frame}>
            <View style={styles.rowcontainer}>
                <Text style={styles.heading}>Calendar</Text>
            </View>
            
            <View style={styles.container}>
                <Text style={styles.paragraph}>calendar goes here</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    frame: {
        flex: 1,
        marginTop: 30,
    },
    rowcontainer: {
        margin: 5,
        paddingVertical: 15,
        paddingHorizontal: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 50,
    },
    heading: {
      fontSize: 28,
      fontWeight: 'bold'
    },
    paragraph: {
      fontSize: 18,
    }
});