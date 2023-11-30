import { Pressable, StyleSheet, Text } from "react-native";
import React from "react";

const FAB = (props) => {
    return (
        <Pressable style={styles.container}
            onPress={props.onPress}>
            <Text style={styles.title}>{props.title}</Text>
        </Pressable>
    );
};

export default FAB;

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        elevation: 3,
        height: 60,
        width: 60,
        borderRadius: 50,
        position: "absolute",
        bottom: '15%',
        right: '5%',
        backgroundColor: "#e91d63",
    },
    title: {
        fontSize: 32,
        color: "#fff",
        fontWeight: "bold",
    },
});
