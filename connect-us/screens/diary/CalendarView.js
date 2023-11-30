import React, { useState, useEffect } from "react";
import {Calendar} from 'react-native-calendars';
import { View, StyleSheet, Text, Button } from "react-native";
import { collection, getDocs, query } from "firebase/firestore";

import { db, storage } from '../../firebaseConfig';

export default function CalendarView({route, navigation}) {
    const [userId, setUserId] = useState();
    const [selected, setSelected] = useState('');
    const [memDates, setMemDates] = useState([]);

    const handleViewMemoryPress = () => {
        navigation.navigate("ViewMemory", { uid: userId.uid, targetDate: selected });
    }

    const fetchDates = async () => {
        console.log("inside fetch dates")

        let dates = [];

        const querySnapshot = await getDocs(collection(db, "users", userId.uid, "memories"));

        querySnapshot.forEach(async (doc) => {
            let data = doc.data();
            let memoryDate = new Date(data["date"]["seconds"] * 1000);
            memoryDate = memoryDate.toISOString().slice(0, 10);
            dates.push(memoryDate);
        });

        setMemDates(dates);

    }

    useEffect(() => {
        setUserId(route.params);
    });

    useEffect(() => {
        if (userId) {
            fetchDates()
        }

    }, [userId])

    let marked = {};
    
    marked[selected] = {
        selected: true,
        selectedColor: '#e91d63',
        disableTouchEvent: true,
        marked: (memDates.includes(selected) ? true : false)
    };

    memDates.map((date) => {
        marked[date] = {
            selected: (selected == date ? true : false),
            marked: true,
            dotColor: (selected == date ? 'white' : '#e91d63'),
            selectedColor: '#e91d63'
        }
    });

    return (
        <View style={styles.frame}>
            <View style={styles.rowcontainer}>
                <Text style={styles.heading}>Calendar</Text>
            </View>

            <View style={styles.calendarcontainer}>
                <Text style={{marginBottom: 20, fontFamily: 'balsamiq-sans'}}>
                    Select a date to view memory
                </Text>
                <Calendar
                    onDayPress={day => {
                        setSelected(day.dateString);
                    }}
                    theme={{
                        todayTextColor: '#00adf5',
                        selectedDayBackgroundColor: '#00adf5',
                    }}
                    markedDates={marked}
                />

                <Button
                    title="View memory"
                    disabled={!memDates.includes(selected) ? true: false}
                    onPress={handleViewMemoryPress}
                    color='#e91d63'
                />
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    frame: {
        flex: 1,
        marginTop: 30,
        marginBottom: 100,
        paddingHorizontal: 20
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
    calendarcontainer: {
        flex: 1,
        justifyContent: 'center',
    },
    heading: {
      fontSize: 28,
      fontFamily: 'balsamiq-sans'

    },
    paragraph: {
      fontSize: 18,
    }
});