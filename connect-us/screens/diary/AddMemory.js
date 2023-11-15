import React from "react";
import { View, Text, StyleSheet } from "react-native";

import FAB from '../utils/FAB'

export default function AddMemory({navigation}) {

    const handleFinish = () => {
        // TODO
        // Logic for adding new memory goes here
        navigation.goBack();
    }

    return (
        <View style={styles.frame}>
            <View style={styles.rowcontainer}>
                <Text style={styles.heading}>Add Memory</Text>
            </View>
            
            <View style={styles.container}>
                <Text style={styles.paragraph}>Add memory goes here</Text>
            </View>
            <FAB onPress={handleFinish} title="Done" />
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
