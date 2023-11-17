import React, { useState, useEffect } from 'react';
import { View, Button, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { SafeAreaView } from 'react-native-safe-area-context';
import { format, utcToZonedTime } from 'date-fns-tz';
import {Text} from "react-native-ui-lib";
import {Image, TouchableOpacity} from "react-native";
import axios from 'axios';

const LocationDisplay = () => {
    const [location, setLocation] = useState(null);
    const [otherHalfLocation,setOtherHalfLocation] = useState(null);
    const [userId, setUserId] = useState(null);
    const [firstName,setFirstName] = useState(null);
    const [loading, setLoading] = useState(true); // Start with loading true
    const [permission, setPermission] = useState(false);
    const mapRef = React.useRef(null);
    const [otherHalfLocalTime, setOtherHalfLocalTime] = useState('');
    const [showEnableLocationButton, setShowEnableLocationButton] = useState(false);
    const [locationPermissionMessage, setLocationPermissionMessage] = useState('');
    const [partnerPermission, setPartnerPermission] = useState(null);
    const [isDataFetched, setIsDataFetched] = useState(false);

    const otherHalfId = 'EmaQTMOMmmdCnRLQH7IJd9M6P1K2';

    const disableMyLocation = async () => {
        if (!userId) {
            Alert.alert('No user', 'Please log in to disable location tracking.');
            return;
        }

        const userLocationRef = doc(db, 'users', userId, 'locations', 'location');
        try {
            await setDoc(userLocationRef, {
                locationPermission: false,
                // You can also update latitude and longitude to null or some default values
            });
            setPermission(false);
            Alert.alert('Location Disabled', 'Your location sharing is now disabled.');
        } catch (error) {
            console.error('Error disabling location:', error);
            Alert.alert('Error', `Failed to disable location: ${error.message}`);
        }
    };

    const fetchData = async (uid) => {
        try {
            await checkAndRequestPermissions(uid);
            await fetchOtherHalfLocation();
            setIsDataFetched(true);
        } catch (error) {
            console.error('Error in fetchData:', error);
            // Handle error (e.g., set an error state, show alert, etc.)
        }
    };

    const fitAllMarkers = () => {
        if (mapRef.current && location && otherHalfLocation) {
            mapRef.current.fitToCoordinates([location, otherHalfLocation], {
                edgePadding: { top: 100, right: 100, bottom: 100, left: 100 },
                animated: true,
            });
        }
    };

    const checkAndRequestPermissions = async (uid) => {
        let systemPermissionStatus = await Location.getForegroundPermissionsAsync();
        const dbPermissionStatus = await checkDBLocationPermission(uid);

        if (systemPermissionStatus.status !== 'granted' || !dbPermissionStatus) {
            // Set the UI to show the enable location button and message
            setPermission(true);
            setShowEnableLocationButton(true);
            setLocationPermissionMessage('Your location is not enabled. Enable it to share your location.');
            setLoading(false);
        } else {
            // Permissions are granted, proceed with location fetching
            setShowEnableLocationButton(false);
            fetchOtherHalfLocation();
            updateMyLocation(uid);
        }
    };

    const checkDBLocationPermission = async (uid) => {
        const docRef = doc(db, 'users', uid, 'locations', 'location');
        const docSnap = await getDoc(docRef);
        return docSnap.exists() && docSnap.data().locationPermission;
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
                updateOtherHalfLocalTime(locationData.latitude, locationData.longitude);
                setPartnerPermission(true);
            } else {
                setPartnerPermission(false);
            }
        } else {
            setPartnerPermission(false);
        }
    };

    const updateOtherHalfLocalTime = async (latitude, longitude) => {
        const apiKey = 'FUCA9CNRLUNI'; // Replace with your actual API key
        const url = `https://api.timezonedb.com/v2.1/get-time-zone?key=${apiKey}&format=json&by=position&lat=${latitude}&lng=${longitude}`;

        try {
            const response = await axios.get(url);
            const data = response.data;

            if (data.status === 'OK') {
                setOtherHalfLocalTime(data.formatted);
            } else {
                console.error('TimeZoneDB API error:', data.message);
            }
        } catch (error) {
            console.error('Error fetching timezone:', error);
        }
    };

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserId(user.uid);
                setLoading(true);  // Set loading to true at the start of data fetching
                fetchData(user.uid);
            } else {
                Alert.alert('No user', 'No user is signed in');
                setLoading(false);
            }
        });

        return () => {
            unsubscribe();
        };
    }, []);

    useEffect(() => {
        let locationInterval, locationUpdateInterval;

        if (isDataFetched) {
            locationInterval = setInterval(() => fetchOtherHalfLocation(), 10000);
            locationUpdateInterval = setInterval(() => updateMyLocation(userId), 10000);
        }

        return () => {
            clearInterval(locationInterval);
            clearInterval(locationUpdateInterval);
        };
    }, [isDataFetched, userId]);



    useEffect(() => {
        if (location && otherHalfLocation) {
            setTimeout(() => {
                fitAllMarkers();
            }, 500);
        }
    }, [location, otherHalfLocation]); // This effect depends on location and otherHalfLocation

    useEffect(() => {
        if (!permission) {
            setPermission(true);
            setShowEnableLocationButton(true);
            setLocationPermissionMessage('Your location is not enabled. Enable it to share your location.');
        }
        // You might also want to handle what happens when permission is true
    }, [permission]);


    const updateMyLocation = async (userId) => {
        try {
            const currentPermission = await checkDBLocationPermission(userId);
            if (!currentPermission) {
                console.log('Location permission is not granted.');
                return; // Exit if permission is not granted
            }

            let actualLocation = await Location.getCurrentPositionAsync({});
            const { latitude, longitude } = actualLocation.coords;
            setLocation({
                latitude,
                longitude,
            });

            const userLocationRef = doc(db, 'users', userId, 'locations', 'location');
            await setDoc(userLocationRef, {
                locationPermission: true, // Keep this as true since permission is granted
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
            Alert.alert('Success', 'Location Enabled!');
        } catch (error) {
            console.error('Error storing location:', error);
            Alert.alert('Error', `Failed to store location: ${error.message}`);
        } finally {
            setLoading(false);
        }
        setShowEnableLocationButton(false);
        await checkAndRequestPermissions(userId);
    };

    if (!isDataFetched) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" />
            </View>
        );
    }
    return (
        <View style={styles.container}>
            {showEnableLocationButton || !permission ? (
                <View style={styles.permissionScreen}>
                    <Text style={styles.permissionMessage}>
                        {locationPermissionMessage}
                    </Text>
                    <Button title="Enable Location" onPress={enableMyLocation} />
                </View>
            ) : partnerPermission ? (
                // MapView and other components
                <>
                    <MapView
                        ref={mapRef}
                        style={styles.map}
                        // other props
                    >
                        <Marker coordinate={location} anchor={{ x: 0.5, y: 1 }} title="My Location">
                            <View style={styles.customMarkerContainer}>
                                <Image
                                    source={{ uri: 'https://nico-nico-nii.com/pre-defined/user_profile_pic_1' }}
                                    style={styles.profileImage}
                                />
                            </View>
                        </Marker>
                        <Marker coordinate={otherHalfLocation} anchor={{ x: 0.5, y: 1 }} title="Partner's Location">
                            <View style={styles.customMarkerContainer}>
                                <Image
                                    source={{ uri: 'https://nico-nico-nii.com/pre-defined/user_profile_pic_2' }}
                                    style={styles.profileImage}
                                />
                            </View>
                        </Marker>
                    </MapView>
                    <TouchableOpacity style={styles.disableLocationButton} onPress={disableMyLocation}>
                        <Text style={styles.disableLocationButtonText}>Stop Sharing</Text>
                    </TouchableOpacity>
                    <SafeAreaView style={styles.overlay}>
                        <View style={styles.partnerTimeContainer}>
                            <Text style={styles.partnerTimeText}>
                                Partner's Local Time: {otherHalfLocalTime}
                            </Text>
                        </View>
                    </SafeAreaView>
                </>
            ) : (
                // View when partner's location permissions are not enabled
                <View style={styles.partnerPermissionScreen}>
                    <Text style={styles.permissionMessage}>
                        Partner's location is not enabled.
                    </Text>
                    {/* Add any other UI elements if needed */}
                </View>
            )}
        </View>
    );

};

const styles = StyleSheet.create({
    container: {
        flex: 1, // The container takes up the full screen
        backgroundColor: 'transparent', // Set to transparent
    },
    map: {
        ...StyleSheet.absoluteFillObject, // Make the map extend to the edges
    },
    overlay: {
        marginTop: 20,
        justifyContent: 'space-between', // Space children out between top and bottom
        padding: 10, // Add padding if you want to avoid the notch slightly
        alignItems: "center",
    },
    partnerTimeContainer: {
        position: "relative",
        backgroundColor: "rgba(255, 250, 240, 0.9)",
        padding: 10.5,
        borderRadius: 10,
        width: 290,
        alignItems: "center",
        marginTop: -30,
        fontFamily: "balsamiq-sans",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 8,
    },

    partnerTimeText: {
        fontSize: 14, // Increased font size
        fontFamily: "balsamiq-sans",
        // Add other text styles if needed
    },

    permissionScreen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff', // White background for the permission screen
    },
    permissionMessage: {
        marginBottom: 20,
        fontSize: 18,
        textAlign: 'center',
        fontFamily: "balsamiq-sans",
        // Add any other styling you want for the message
    },
    partnerPermissionScreen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff', // White background for the partner permission screen
    },
    customMarkerContainer: {
        alignItems: 'center',
    },
    profileImage: {
        width: 40, // Adjust size as needed
        height: 40, // Adjust size as needed
        borderRadius: 20, // Half of width and height for circle shape
        borderWidth: 2,
        borderColor: 'white',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    disableLocationButton: {
        position: 'absolute', // Position absolutely within parent
        bottom: 100, // Adjust for top-right or use 'bottom' for bottom-right
        right: 10, // Adjust as needed for right alignment
        backgroundColor: '#ff6347',
        padding: 13,
        borderRadius: 5,
        zIndex: 1, // Ensure it's above the map
    },
    disableLocationButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: "balsamiq-sans",
    },
});

export default LocationDisplay;