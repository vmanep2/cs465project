import React, { useEffect, useState } from "react";
import { Alert, TouchableOpacity, View, StyleSheet, Text } from "react-native";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
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
    const [memoryCount, setMemoryCount] = useState(0);
    const [uriList, setUriList] = useState([]);
    const [memoryTitle, setMemoryTitle] = useState("");
    const [memoryId, setMemoryId] = useState("");
    const [date, setDate] = useState("");
    const [userData, setUserData] = useState(null);

    const handleAddButtonPress = () => {
        navigation.navigate("AddLogScreen");
    }

    const handleCalendarView = () => {
        navigation.navigate("CalendarView");
    }

    const handleDelete = () => {
        Alert.alert(
            'Delete Memory',
            'Are you sure you want to delete this memory?',
            [
              {
                text: 'Cancel',
                style: 'cancel',
              },
              {
                text: 'Delete',
                onPress: async () => {
                  // Handle deletion logic here
                  const docRef = doc(db, 'users', userData.uid, 'memories', memoryId);
                  await deleteDoc(docRef);

                  console.log('Memory deleted!');

                  navigation.navigate("ViewMemory");
                },
                style: 'destructive',
              },
            ],
            { cancelable: true }
        );
    }

    const fetchMemories = async () => {
        console.log("Inside fetch memories")

        let count = 0;
        let queryDate = new Date();
        let dateString = "Today";

        if (userData.targetDate) {
            queryDate = new Date(userData.targetDate + " 00:00:00");
            dateString = queryDate.toDateString();
        }
        
        queryDate.setHours(0, 0, 0, 0); // We're only interested in the date portion
        
        const querySnapshot = await getDocs(collection(db, "users", userData.uid, "memories"));

        querySnapshot.forEach(async (doc) => {
            let data = doc.data();

            let memoryDate = new Date(data["date"]["seconds"] * 1000);
            memoryDate.setHours(0, 0, 0, 0);

            // console.log("memoryDate" + memoryDate.getTime())
            // console.log("queryDate" + queryDate.getTime())

            if (memoryDate.getTime() == queryDate.getTime()) {
                count += 1;
                
                let downloadImageUriList = [];

                for (let i = 0; i < data["uri"].length; i++) {
                    const imageURI = await getDownloadURL(ref(storage, data["uri"][i]))
                    downloadImageUriList.push(imageURI);
                }
                
                setDate(dateString);
                setMemoryTitle(data["caption"]);
                setUriList(downloadImageUriList);
                setMemoryId(doc.id);

                // console.log(downloadImageUriList)
           
            }
        });
        
        setMemoryCount(count);
    }

    useEffect(() => {
        if (userData) {
            fetchMemories()
        }

    }, [userData])

    useEffect(() => {
        // console.log("inside use effect bare")
        // console.log(route.params);
        setUserData(route.params);

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
                </View>
                <FAB onPress={handleAddButtonPress} title="+" />
            </View>
        );
    }

    return (
        <View style={styles.frame}>
            <View style={styles.rowcontainer}>
                <Text style={styles.heading}>Diary</Text>
                <TouchableOpacity onPress={handleCalendarView} style={{marginRight: 10}}>
                    <Ionicons name="calendar-outline" size={30} color="black" />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleDelete}>
                    <Ionicons name="trash" size={30} color="#D73E02" />
                </TouchableOpacity>
            </View>
            
            <View style={styles.container}>
                <Text style={styles.heading2}>{date}</Text>
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
        alignItems: "center",
        borderBottomWidth: 2,
        borderBottomColor: '#e0e0e0',
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
      flex: 1
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
