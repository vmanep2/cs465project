import React, { useEffect, useState } from "react";
import { Image, TouchableOpacity, View, StyleSheet, Text, ScrollView } from "react-native";
import { collection, getDocs } from "firebase/firestore";
import { Ionicons } from '@expo/vector-icons';

import ImageCarousel from '../utils/ImageCarousel'

import { db } from '../../firebaseConfig';
import FAB from '../utils/FAB'

const data = [
    {
      uri: 'https://images.unsplash.com/photo-1607326957431-29d25d2b386f',
    }, // https://unsplash.com/photos/Jup6QMQdLnM
    {
      uri: 'https://images.unsplash.com/photo-1512238701577-f182d9ef8af7',
    }, // https://unsplash.com/photos/oO62CP-g1EA
    {
      uri: 'https://images.unsplash.com/photo-1627522460108-215683bdc9f6',
    }, // https://unsplash.com/photos/gKMmJEvcyA8
    {
      uri: 'https://images.unsplash.com/photo-1587814213271-7a6625b76c33',
    }, // https://unsplash.com/photos/N7zBDF1r7PM
    {
      uri: 'https://images.unsplash.com/photo-1588628566587-dbd176de94b4',
    }, // https://unsplash.com/photos/GsGZJMK0bJc
    {
      uri: 'https://images.unsplash.com/photo-1501577316686-a5cbf6c1df7e',
    }, // https://unsplash.com/photos/coIBOiWBPjk
  ];

export default function ViewMemory({ route, navigation }) {
    const [memoryCount, setMemoryCount] = useState(0);
    const [uriList, setUriList] = useState(["../../assets/empty.jpg", "../../assets/empty.jpg"]);
    const [memoryTitle, setMemoryTitle] = useState("Ski Trip!");

    const handleAddButtonPress = () => {
        navigation.navigate("AddLogScreen");
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
            <View style={styles.rowcontainer}>
                <Text style={styles.heading}>Diary</Text>
                <TouchableOpacity onPress={handleCalendarView}>
                    <Ionicons name="calendar-outline" size={30} color="black" />
                </TouchableOpacity>
            </View>
            
            <View style={styles.container}>
                <Text style={styles.heading2}>Today</Text>
                {/* <View style={styles.polaroidframe}>
                    <Text style={styles.captiontext}>{memoryTitle}</Text>
                </View> */}
                <ImageCarousel data={data} />
                <Text style={styles.captiontext}>{memoryTitle}</Text>
            </View>
            <FAB onPress={handleAddButtonPress} title="+" />
        </View>
    );
    
}

const styles = StyleSheet.create({
    frame: {
        flex: 1,
        marginTop: 30,
    },
    rowcontainer: {
        paddingVertical: 15,
        paddingHorizontal: 30,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        // backgroundColor: '#324'
    },
    empty_container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        paddingHorizontal: 15,
        marginTop: '10%',
    },
    heading: {
      fontSize: 28,
      fontWeight: 'bold'
    },
    heading2: {
      textAlignVertical: "center",
      textAlign: "center",
      fontSize: 16,
      marginTop: 20,
      marginBottom: 20
    },
    captiontext: {
        fontSize: 22,
        marginTop: 20,
        paddingHorizontal: 15,
        fontWeight: 'bold',
        // color: '#555'
      },
    paragraph: {
      fontSize: 18,
    },
    polaroidframe: {
        backgroundColor: 'white',
        maxWidth: '100%',
        elevation: 3,
        padding: 20,
        // backgroundColor: '#214'
    }
});
