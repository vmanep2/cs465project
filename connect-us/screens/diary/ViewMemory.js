import React, { useEffect, useState } from "react";
import { TouchableOpacity, View, StyleSheet, Text, ScrollView } from "react-native";
import { collection, getDocs } from "firebase/firestore";
import { Ionicons } from '@expo/vector-icons';

import { db } from '../../firebaseConfig';
import FAB from '../utils/FAB'

export default function ViewMemory({navigation}) {
    const [memoryCount, setMemoryCount] = useState(0);
    const [memoryTitle, setMemoryTitle] = useState("Ski Trip!");

    const handleAddButtonPress = () => {
        navigation.navigate("AddMemory");
    }

    const handleCalendarView = () => {
        navigation.navigate("CalendarView");
    }

    useEffect(() => {
        const fetchMemories = async () => {
            let count = 0;
            const querySnapshot = await getDocs(collection(db, "memories"));

            querySnapshot.forEach((doc) => {
                count += 1;
                console.log(doc.id, " => ", doc.data());
            });

            setMemoryCount(count);
        }

        fetchMemories()
    })

    if (memoryCount == 0) {
        return (
            <View style={styles.frame}>
                <View style={styles.rowcontainer}>
                    <Text style={styles.heading}>Diary</Text>
                    <TouchableOpacity onPress={handleCalendarView}>
                        <Ionicons name="calendar-outline" size={30} color="black" />
                    </TouchableOpacity>
                </View>
                
                <View style={styles.empty_container}>
                    <Text style={styles.paragraph}>No memories today, create one!</Text>
                    <FAB onPress={handleAddButtonPress} title="+" />
                </View>
            </View>
        );
    }

    return (
        <View style={styles.frame}>
            <ScrollView>
                <View style={styles.rowcontainer}>
                    <Text style={styles.heading}>Diary</Text>
                    <TouchableOpacity onPress={handleCalendarView}>
                        <Ionicons name="calendar-outline" size={30} color="black" />
                    </TouchableOpacity>
                </View>
                
                <View style={styles.container}>
                    <Text style={styles.heading2}>Today</Text>
                    <Ionicons name="boat-outline" size={200} color="black" />
                    <Text style={styles.heading2}>{memoryTitle}</Text>
                </View>
            </ScrollView>
            <FAB onPress={handleAddButtonPress} title="+" />
        </View>
    );
    
}

const styles = StyleSheet.create({
    frame: {
        flex: 1,
        marginTop: 30,
        // backgroundColor: '#235'
    },
    rowcontainer: {
        paddingVertical: 15,
        paddingHorizontal: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        // backgroundColor: '#324'
    },
    empty_container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 50,
    },
    container: {
        flex: 1,
        paddingHorizontal: 20,
        marginBottom: 50,
    },
    heading: {
      fontSize: 28,
      fontWeight: 'bold'
    },
    heading2: {
      fontSize: 22,
      marginTop: 30,
      marginBottom: 40
    },
    paragraph: {
      fontSize: 18,
    }
});
