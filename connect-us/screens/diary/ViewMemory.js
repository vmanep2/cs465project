import React, { useEffect, useState } from "react";
import { Image, TouchableOpacity, View, StyleSheet, Text, ScrollView } from "react-native";
import { collection, getDocs } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { Ionicons } from '@expo/vector-icons';

import ImageCarousel from '../utils/ImageCarousel'
import { db, storage } from '../../firebaseConfig';
import FAB from '../utils/FAB'

/**
 * TODOs:
 * #1: Add delete button for memory
 * #2: Figure out how to make ViewMemory dynamically linked to calendar
 * #6: Enhancement idea: figure out how to make the app actually work for the partner
 */

export default function ViewMemory({ route, navigation }) {

    const queryDate = new Date(); // TODO: Make this dynamic so that ViewMemory can be rendered from calendar
    queryDate.setHours(0, 0, 0, 0); // We're only interested in the date portion

    const [memoryCount, setMemoryCount] = useState(0);
    const [uriList, setUriList] = useState([]);
    const [memoryTitle, setMemoryTitle] = useState("Ski trip!!");
    const [userId, setUserId] = useState(null);

    const handleAddButtonPress = () => {
        navigation.navigate("AddLogScreen");
    }

    const handleCalendarView = () => {
        navigation.navigate("CalendarView");
    }

    useEffect(() => {
        setUserId(route.params);

        const fetchMemories = async () => {
            let count = 0;
            const querySnapshot = await getDocs(collection(db, "users", userId.uid, "memories"));

            querySnapshot.forEach(async (doc) => {
                let data = doc.data();
                console.log(doc.id, " => ", data);

                let memoryDate = new Date(data["date"]["seconds"] * 1000);
                memoryDate.setHours(0, 0, 0, 0);

                if (memoryDate.getTime() == queryDate.getTime()) {
                    count += 1;
                    
                    let downloadImageUriList = [];

                    for (let i = 0; i < data["uri"].length; i++) {
                        const imageURI = await getDownloadURL(ref(storage, data["uri"][i]))
                        downloadImageUriList.push(imageURI);
                    }

                    setMemoryTitle(data["caption"]);
                    setUriList(downloadImageUriList);

                    console.log(downloadImageUriList)
                }
            });
            
            setMemoryCount(count);
        }

        if (userId) {
            fetchMemories()
        }

    }, [userId])

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
                </View>
                <FAB onPress={handleAddButtonPress} title="+" />
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
                <ImageCarousel data={uriList} />
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
      fontFamily: "balsamiq-sans",
    },
    heading2: {
      textAlignVertical: "center",
      textAlign: "center",
      fontSize: 16,
      marginTop: 20,
      marginBottom: 20,
      fontFamily: "balsamiq-sans",
    },
    captiontext: {
        fontSize: 22,
        marginTop: 20,
        paddingHorizontal: 15,
        fontFamily: "balsamiq-sans",
      // color: '#555'
      },
    paragraph: {
      fontSize: 18,
      fontFamily: "balsamiq-sans",
    }
});
