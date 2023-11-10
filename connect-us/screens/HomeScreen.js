/*

	Color used:
 		TopGradient: #e91d63
 		TopStatsBar: rgba(255, 250, 240, 0.9)
 		LowerBackground: rgba(255, 228, 225, 0.75)
 		ButtonBackgroundColor: rgba(255, 220, 220, 0.6)
 	Font Used:
 		fontFamily: 'balsamiq-sans',

 */
import React, {
    useState,
    useRef,
    useEffect
} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Button,
    TouchableOpacity,
    Animated
} from 'react-native';
import {
    LinearGradient
} from 'expo-linear-gradient';
import * as Font from 'expo-font';
import {
    ImageBackground
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {

    const [heartCount, setHeartCount] = useState(12);
    const [missUCount, setMissUCount] = useState(14);
    const [years, setYears] = useState(2);
    const [months, setMonths] = useState(11);
    const [days, setDays] = useState(12);
    const dropAnim = useRef(new Animated.Value(-100))
        .current;
    const fadeAnim = useRef(new Animated.Value(0))
        .current;
    
    const handleLogOut = async () => {
    try {
      await AsyncStorage.removeItem("LoggedIn");
      signOut(auth)
        .then(() => {
          console.log("Sign out succesful");
          // navigation.replace("Login");
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (e) {
      console.log(e);
    }
    };
    

    const handlePress = (type) => {
        if (type === 'heart') {
            setHeartCount(heartCount + 1);
        } else if (type === 'missU') {
            setMissUCount(missUCount + 1);
            
        }

        Animated.sequence([
                Animated.parallel([
                    Animated.timing(dropAnim, {
                        toValue: 30,
                        duration: 500,
                        useNativeDriver: true,
                    }),
                    Animated.timing(fadeAnim, {
                        toValue: 1,
                        duration: 500,
                        useNativeDriver: true,
                    }),
                ]),
                Animated.delay(2000),
                Animated.parallel([
                    Animated.timing(dropAnim, {
                        toValue: -100,
                        duration: 500,
                        useNativeDriver: true,
                    }),
                    Animated.timing(fadeAnim, {
                        toValue: 0,
                        duration: 500,
                        useNativeDriver: true,
                    }),
                ]),
            ])
            .start();
    };

    
  return (
  <ImageBackground source={{ uri: 'http://chitandaeru.synology.me:80/2.gif' }} style={styles.backgroundImage} resizeMode="cover">
      <LinearGradient colors={['#e91d63', 'transparent' ]} locations={[0, 0.33]} style={styles.container}>
        <TouchableOpacity onPress={handleLogOut} style={styles.logoutButton}>
                    <Ionicons name="log-out-outline" size={30} color="black" />
                </TouchableOpacity>
          <Animated.View style={[ styles.banner, { transform: [{ translateY: dropAnim }], opacity: fadeAnim } ]}>
              <Text style={styles.bannerText}> ✉️ Message Sent! </Text>
          </Animated.View>
          <View style={styles.stats}>
              <Text style={styles.text}>You Got {heartCount} ❤️, {missUCount} MissUs</Text>
          </View>
          <View style={styles.upperContainer}>
              <View style={styles.profileContainer}>
                  <Image source={{ uri: 'http://chitandaeru.synology.me:80/d71fd1868fe46c90e03de57d9e002b94.jpeg' }} style={styles.profilePic} />
                  <Text style={styles.profileName}>John</Text>
              </View>

              <View style={styles.heartContainer}>
                  <Text style={styles.heartIcon}>❤️</Text>
              </View>

              <View style={styles.profileContainer}>
                  <Image source={{ uri: 'http://chitandaeru.synology.me:80/ef5da24618cefcaaf4d159c8a40e20ca.jpeg' }} style={styles.profilePic} />
                  <Text style={styles.profileName}>Mary</Text>
              </View>
          </View>

          <View style={styles.duration}>
              <View style={styles.durationItem}>
                  <Text style={styles.durationNumber}>{years}</Text>
                  <Text style={styles.durationText}>Years</Text>
              </View>
              <View style={styles.durationItem}>
                  <Text style={styles.durationNumber}>{months}</Text>
                  <Text style={styles.durationText}>Months</Text>
              </View>
              <View style={styles.durationItem}>
                  <Text style={styles.durationNumber}>{days}</Text>
                  <Text style={styles.durationText}>Days</Text>
              </View>
          </View>
          <View style={styles.buttons}>
              <TouchableOpacity style={styles.button} onPress={()=> handlePress('heart')}>
                  <Text style={styles.buttonText}>❤️</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={()=> handlePress('missU')}>
                  <Image source={require('../assets/miss-you-1.png')} style={styles.buttonIcon} />
              </TouchableOpacity>
          </View>
      </LinearGradient>
  </ImageBackground>
  );
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
            width: '100%',
            height: '100%',
    }

    ,
    text: {
        fontFamily: 'balsamiq-sans',
    }

    ,
    container: {
        flex: 1,
            justifyContent: 'space-around',
            alignItems: 'center',
            backgroundColor: 'rgba(255, 228, 225, 0.75)',
            paddingTop: 30,
            paddingBottom: 30,
    }

    ,
    stats: {

        backgroundColor: 'rgba(255, 250, 240, 0.9)',
        padding: 10,
        borderRadius: 10,
        width: 300,
        alignItems: 'center',
        marginTop: -30,
        fontFamily: 'balsamiq-sans',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
                height: 2,
        }

        ,
        shadowOpacity: 0.25,
        shadowRadius: 8,

    }

    ,
    upperContainer: {
        flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            width: '90%',
            marginBottom: 0,

    }

    ,
    profiles: {
        flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            width: '100%',
            marginVertical: 20,
    }

    ,
    profileContainer: {

        width: '50%',
        alignItems: 'center',
        marginHorizontal: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
                height: 2,
        }

        ,
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    }

    ,
    profilePic: {
        width: 100,
            height: 100,
            borderRadius: 50,
            marginBottom: 8,
    }

    ,
    profileName: {
        fontSize: 16,
            color: 'black',
            fontFamily: 'balsamiq-sans',
    }

    ,
    heartContainer: {

        paddingHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
                height: 2,
        }

        ,
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginBottom: 15,
    }

    ,
    heartIcon: {
        fontSize: 30,
    }

    ,
    duration: {
        flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            marginBottom: 25,
            marginTop: -70,
            marginLeft: '-1%',
    }

    ,
    durationItem: {

        alignItems: 'center',
        marginHorizontal: 29.5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
                height: 1,
        }

        ,
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
        marginBottom: -50,
    }

    ,

    durationNumber: {
        fontSize: 24,
            color: 'black',
    }

    ,
    durationText: {
        fontSize: 16,
            color: 'black',
            fontFamily: 'balsamiq-sans',
    }

    ,
    buttons: {
        flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            marginTop: -30,
            marginBottom: 0,
    }

    ,
    button: {

        backgroundColor: 'rgba(255, 220, 220, 0.6)',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        height: '45%',
        width: '25%',
        marginHorizontal: '10%',
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
                height: 1,
        }

        ,
        shadowOpacity: 0.22,
        shadowRadius: 20,
        elevation: 3,
        borderColor: 'rgba(233, 29, 99, 0.5)',
        borderWidth: 1,
        borderRadius: 20,
    }

    ,
    logoutButton: {
        position: 'absolute',
        top: 75,
        right: 20, // Change to 'left: 20' for top left
        // Add more styling as needed
    },
    buttonIcon: {
        width: 70,
            height: 70,
            resizeMode: 'contain',
            backgroundColor: 'transparent',
    }

    ,
    buttonText: {
        color: 'black',
            fontSize: 45,
            fontFamily: 'balsamiq-sans',
            backgroundColor: 'transparent',
    }

    ,
    banner: {

        position: 'absolute',
        top: 25,
        width: '55%',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFAF0',
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
                height: 10,
        }

        ,
        shadowOpacity: 0.25,
        shadowRadius: 20,
        elevation: 5,
        zIndex: 1,
    }

    ,
    bannerText: {
        fontSize: 20,
            fontFamily: 'balsamiq-sans',
    }

    ,
});
