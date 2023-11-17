import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, Button } from "react-native";

import {Calendar, LocaleConfig} from 'react-native-calendars';

export default function CalendarView({route, navigation}) {
    const [userId, setUserId] = useState();
    const [selected, setSelected] = useState('');

    const handleViewMemoryPress = () => {
        navigation.navigate("ViewMemory");
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
                <Text style={{marginBottom: 20}}>
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
                        [selected]: {selected: true, disableTouchEvent: true},
                        // '2023-11-20': {textColor: 'green'},
                        // '2023-11-22': {startingDay: true, color: 'green'},
                        // '2023-11-23': {selected: true, endingDay: true, color: 'green', textColor: 'gray'},
                        // '2023-11-04': {disabled: true, startingDay: true, color: 'green', endingDay: true}
                      }}
                />

                <Button
                    title="View memory"
                    disabled={selected == '' ? true: false}
                    onPress={handleViewMemoryPress}
                    color='#e91d63'
                />
            </View>
        </View>
    );
}

                        // '2023-11-01': {marked: true, selectedColor: '#e91d63'},
                        // '2023-11-14': { marked: true, selectedColor: 'grey'},
                        // '2023-11-11': {marked: true, selectedColor: '#e91d63'}

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
      fontWeight: 'bold'
    },
    paragraph: {
      fontSize: 18,
    }
});