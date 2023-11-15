import React, { useEffect, useState } from "react";
import { TouchableOpacity, View, StyleSheet, Text } from "react-native";
import { collection, getDocs } from "firebase/firestore";
import { Ionicons } from '@expo/vector-icons';

import { db } from '../../firebaseConfig';
import FAB from '../utils/FAB'

export default function ViewMemory({navigation}) {
    const [memoryCount, setMemoryCount] = useState(0);

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
            <View style={{ flex: 1 }}>
                <Text style={styles.heading}>Diary</Text>
                <TouchableOpacity onPress={handleCalendarView}>
                    <Ionicons name="calendar-outline" size={30} color="black" />
                </TouchableOpacity>
                <View style={styles.container}>
                    <Text>No memories today, create one!</Text>
                    <FAB onPress={handleAddButtonPress} title="+" />
                </View>
            </View>
        );
    }

    return (
        <View style={{ flex: 1 }}>
            <Text style={styles.heading}>Diary</Text>
            <TouchableOpacity onPress={handleCalendarView}>
                    <Ionicons name="calendar-outline" size={30} color="black" />
                </TouchableOpacity>
            <View style={styles.container}>
                <Text>memory goes here</Text>
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
