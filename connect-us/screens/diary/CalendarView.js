import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, Button } from "react-native";

import {Calendar} from 'react-native-calendars';

// TODO: make this calendar dynamic

const dates = [
    '2023-10-05',
    '2023-10-14',
    '2023-10-22',
    '2023-11-02',
    '2023-11-09',
    '2023-11-17',
    '2023-11-25',
    '2023-12-03',
    '2023-12-11',
    '2023-12-18',
    '2023-10-08',
    '2023-10-16',
    '2023-10-26',
    '2023-11-04',
    '2023-11-12',
    '2023-11-20',
    '2023-12-01',
    '2023-12-09',
    '2023-12-15',
    '2023-12-23',
]

export default function CalendarView({route, navigation}) {
    const [userId, setUserId] = useState();
    const [selected, setSelected] = useState('');
    const [marked, setMarked] = useState();

    const handleViewMemoryPress = () => {
        navigation.navigate("ViewMemory", { uid: userId.uid, targetDate: selected });
    }

    useEffect(() => {
        setUserId(route.params);
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
                    markedDates={{
                        [selected]: {selected: true, selectedColor: '#e91d63', disableTouchEvent: true, marked: (dates.includes(selected) ? true : false)},
                        '2023-10-05': {selected: (selected == "2023-10-05" ? true : false), marked: true, dotColor: (selected == "2023-10-05" ? 'white' : '#e91d63'), selectedColor: '#e91d63'},
                        '2023-10-08': {selected: (selected == "2023-10-08" ? true : false), marked: true, dotColor: (selected == "2023-10-08" ? 'white' : '#e91d63'), selectedColor: '#e91d63'},
                        '2023-10-14': {selected: (selected == "2023-10-14" ? true : false), marked: true, dotColor: (selected == "2023-10-14" ? 'white' : '#e91d63'), selectedColor: '#e91d63'},
                        '2023-10-16': {selected: (selected == "2023-10-16" ? true : false), marked: true, dotColor: (selected == "2023-10-16" ? 'white' : '#e91d63'), selectedColor: '#e91d63'},
                        '2023-10-26': {selected: (selected == "2023-10-26" ? true : false), marked: true, dotColor: (selected == "2023-10-26" ? 'white' : '#e91d63'), selectedColor: '#e91d63'},
                        '2023-10-22': {selected: (selected == "2023-10-22" ? true : false), marked: true, dotColor: (selected == "2023-10-22" ? 'white' : '#e91d63'), selectedColor: '#e91d63'},
                        '2023-11-02': {selected: (selected == "2023-11-02" ? true : false), marked: true, dotColor: (selected == "2023-11-02" ? 'white' : '#e91d63'), selectedColor: '#e91d63'},
                        '2023-11-04': {selected: (selected == "2023-11-04" ? true : false), marked: true, dotColor: (selected == "2023-11-04" ? 'white' : '#e91d63'), selectedColor: '#e91d63'},
                        '2023-11-09': {selected: (selected == "2023-11-09" ? true : false), marked: true, dotColor: (selected == "2023-11-09" ? 'white' : '#e91d63'), selectedColor: '#e91d63'},
                        '2023-11-12': {selected: (selected == "2023-11-12" ? true : false), marked: true, dotColor: (selected == "2023-11-12" ? 'white' : '#e91d63'), selectedColor: '#e91d63'},
                        '2023-11-17': {selected: (selected == "2023-11-17" ? true : false), marked: true, dotColor: (selected == "2023-11-17" ? 'white' : '#e91d63'), selectedColor: '#e91d63'},
                        '2023-11-20': {selected: (selected == "2023-11-20" ? true : false), marked: true, dotColor: (selected == "2023-11-20" ? 'white' : '#e91d63'), selectedColor: '#e91d63'},
                        '2023-11-25': {selected: (selected == "2023-11-25" ? true : false), marked: true, dotColor: (selected == "2023-11-25" ? 'white' : '#e91d63'), selectedColor: '#e91d63'},
                        '2023-12-01': {selected: (selected == "2023-12-01" ? true : false), marked: true, dotColor: (selected == "2023-12-01" ? 'white' : '#e91d63'), selectedColor: '#e91d63'},
                        '2023-12-03': {selected: (selected == "2023-12-03" ? true : false), marked: true, dotColor: (selected == "2023-12-03" ? 'white' : '#e91d63'), selectedColor: '#e91d63'},
                        '2023-12-09': {selected: (selected == "2023-12-09" ? true : false), marked: true, dotColor: (selected == "2023-12-09" ? 'white' : '#e91d63'), selectedColor: '#e91d63'},
                        '2023-12-11': {selected: (selected == "2023-12-11" ? true : false), marked: true, dotColor: (selected == "2023-12-11" ? 'white' : '#e91d63'), selectedColor: '#e91d63'},
                        '2023-12-15': {selected: (selected == "2023-12-15" ? true : false), marked: true, dotColor: (selected == "2023-12-15" ? 'white' : '#e91d63'), selectedColor: '#e91d63'},
                        '2023-12-18': {selected: (selected == "2023-12-18" ? true : false), marked: true, dotColor: (selected == "2023-12-18" ? 'white' : '#e91d63'), selectedColor: '#e91d63'},
                        '2023-12-23': {selected: (selected == "2023-12-23" ? true : false), marked: true, dotColor: (selected == "2023-12-23" ? 'white' : '#e91d63'), selectedColor: '#e91d63'},
                    }}
                />

                <Button
                    title="View memory"
                    disabled={!dates.includes(selected) ? true: false}
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