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
    const [otherHalfLocation,setOtherHalfLocation] = useState(null);
    const [userId, setUserId] = useState(null);
    const [loading, setLoading] = useState(true); // Start with loading true
    const [permission, setPermission] = useState(false);
    const mapRef = React.useRef(null);

    const otherHalfId = 'EmaQTMOMmmdCnRLQH7IJd9M6P1K2';

    const fitAllMarkers = () => {
        if (mapRef.current && location && otherHalfLocation) {
            mapRef.current.fitToCoordinates([location, otherHalfLocation], {
                edgePadding: { top: 100, right: 100, bottom: 100, left: 100 },
                animated: true,
            });
        }
    };

    const fetchOtherHalfLocation = async () => {
        const otherHalfLocationRef = doc(db, 'users', otherHalfId, 'locations', 'location');
        const docSnap = await getDoc(otherHalfLocationRef);

        if (docSnap.exists()) {
            const locationData = docSnap.data();
            if (locationData.locationPermission) {
                setOtherHalfLocation({
                    latitude: locationData.latitude,
                    longitude: locationData.longitude,
                });
            } else {
                setOtherHalfPermission(false);
            }
        } else {
            setOtherHalfPermission(false);
        }
    };

    useEffect(() => {
        const auth = getAuth();

        // This function will be called to set up intervals and other stuff when the component mounts
        const initialize = async (user) => {
            setUserId(user.uid);
            let { status } = await Location.getForegroundPermissionsAsync();
            if (status === 'granted') {
                await checkLocationPermission(user.uid);
                await fetchOtherHalfLocation();
                return true;
            } else {
                setPermission(false);
                setLoading(false);
                return false;
            }
        };

        // This function will be called to clear intervals when the component unmounts
        const cleanUp = (locationInterval, locationUpdateInterval) => {
            clearInterval(locationInterval);
            clearInterval(locationUpdateInterval);
        };

        // This will hold our intervals
        let locationInterval;
        let locationUpdateInterval;

        // Subscribe to auth state changes
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const isGranted = await initialize(user);
                if (isGranted) {
                    locationInterval = setInterval(fetchOtherHalfLocation, 10000); // fetch every 10 seconds
                    locationUpdateInterval = setInterval(() => {
                        updateMyLocation(user.uid);
                    }, 10000);
                }
            } else {
                Alert.alert('No user', 'No user is signed in');
                setLoading(false);
            }
        });

        // This will be called when the component unmounts
        return () => {
            unsubscribe(); // Unsubscribe from auth state changes
            cleanUp(locationInterval, locationUpdateInterval); // Clear intervals
        };
    }, []); // The effect should depend on nothing and behave like componentDidMount

    useEffect(() => {
        if (location && otherHalfLocation) {
            setTimeout(() => {
                fitAllMarkers();
            }, 500);
        }
    }, [location, otherHalfLocation]); // This effect depends on location and otherHalfLocation



    const updateMyLocation = async (userId) => {
        try {
            let actualLocation = await Location.getCurrentPositionAsync({});
            const { latitude, longitude } = actualLocation.coords;
            setLocation({
                latitude,
                longitude,
            });

            const userLocationRef = doc(db, 'users', userId,'locations','location');
            await setDoc(userLocationRef, {
                locationPermission: true,
                latitude,
                longitude,
                timestamp: new Date().toISOString()
            });

            console.log('Location updated');
        } catch (error) {
            console.error('Error updating location:', error);
        }
    };

    const checkLocationPermission = async (uid) => {
        const docRef = doc(db, 'users', uid, 'locations', 'location');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists() && docSnap.data().locationPermission) {
            // Firestore permission granted, get the last known location and display it
            const locationData = docSnap.data();
            setLocation({
                latitude: locationData.latitude,
                longitude: locationData.longitude,
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
                {location && permission && otherHalfLocation ? (
                    <MapView
                        ref={mapRef}
                        style={styles.map}
                    >
                        <Marker coordinate={location} pinColor="blue" title="My Location" />
                        <Marker coordinate={otherHalfLocation} pinColor="pink" title="Other Location" />
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