import React, { useState, useEffect } from 'react';
import { View, Button, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { SafeAreaView } from 'react-native-safe-area-context';

const LocationDisplay = () => {
    const [location, setLocation] = useState(null);
    const [userId, setUserId] = useState(null);
    const [loading, setLoading] = useState(true); // Start with loading true
    const [permission, setPermission] = useState(false);

    // Mocked location for the "other half" in Illinois
    const mockOtherLocation = {
        latitude: 40.7128, // Should be adjusted to a location closer to the user's real location
        longitude: -74.0060,
    };

    useEffect(() => {
        (async () => {
            const auth = getAuth();
            const unsubscribe = onAuthStateChanged(auth, async (user) => {
                if (user) {
                    setUserId(user.uid);
                    // Check system permission first
                    let { status } = await Location.getForegroundPermissionsAsync();
                    if (status === 'granted') {
                        // System permission granted, now check Firestore
                        await checkLocationPermission(user.uid);
                    } else {
                        // System permission not granted, show enable button
                        setPermission(false);
                        setLoading(false);
                    }
                } else {
                    Alert.alert('No user', 'No user is signed in');
                    setLoading(false);
                }
            });

            return () => unsubscribe();
        })();
    }, []);

    const checkLocationPermission = async (uid) => {
        const docRef = doc(db, 'users', uid, 'locations', 'location');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists() && docSnap.data().locationPermission) {
            // Firestore permission granted, get the last known location and display it
            const locationData = docSnap.data();
            setLocation({
                latitude: locationData.latitude,
                longitude: locationData.longitude,
                latitudeDelta: Math.abs(locationData.latitude - mockOtherLocation.latitude) * 2.2,
                longitudeDelta: Math.abs(locationData.longitude - mockOtherLocation.longitude) * 2.2,
            });
            setPermission(true);
        } else {
            // Firestore permission not granted, show enable button
            setPermission(false);
        }
        setLoading(false);
    };

    const enableMyLocation = async () => {
        if (!userId) {
            Alert.alert('No user', 'Please log in to enable location tracking.');
            return;
        }

        setLoading(true);

        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission Denied', 'Permission to access location was denied');
            setLoading(false);
            return;
        }



        try {
            let actualLocation = await Location.getCurrentPositionAsync({});
            const { latitude, longitude } = actualLocation.coords;
            setLocation({
                latitude,
                longitude,
                // Calculate the deltas to include both locations
                latitudeDelta: Math.abs(mockOtherLocation.latitude - latitude) * 2.2,
                longitudeDelta: Math.abs(mockOtherLocation.longitude - longitude) * 2.2,
            });

            const userLocationRef = doc(db, 'users', userId,'locations','location');
            await setDoc(userLocationRef, {
                locationPermission: true,
                latitude,
                longitude,
                timestamp: new Date().toISOString()
            });

            setPermission(true);
            Alert.alert('Success', 'Location stored successfully');
        } catch (error) {
            console.error('Error storing location:', error);
            Alert.alert('Error', `Failed to store location: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                {location && permission ? (
                    <MapView style={styles.map} initialRegion={location}>
                        <Marker coordinate={location} title="My Location" />
                        <Marker coordinate={mockOtherLocation} title="Other Location" />
                    </MapView>
                ) : (
                    <View style={styles.buttonContainer}>
                        <Button title="Enable My Location" onPress={enableMyLocation} disabled={loading} />
                    </View>
                )}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: 'white',
    },
    container: {
        flex: 1,
        justifyContent: 'flex-start',
    },
    map: {
        flex: 1,
    },
    buttonContainer: {
        margin: 20,
        paddingHorizontal: 10,
    }
});

export default LocationDisplay;
