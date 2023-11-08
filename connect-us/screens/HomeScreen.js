import React, { useState, useRef, useEffect} from 'react';
import { StyleSheet, Text, View, Image, Button, TouchableOpacity, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Font from 'expo-font';
import { ImageBackground } from 'react-native';


export default function App() {

  const [heartCount, setHeartCount] = useState(12);
  const [missUCount, setMissUCount] = useState(14);
  // This would be your duration state, which you would update based on actual time
  const [years, setYears] = useState(2);
  const [months, setMonths] = useState(11);
  const [days, setDays] = useState(12);
  const dropAnim = useRef(new Animated.Value(-100)).current; // For the drop-down banner
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial opacity is 0
  
  
  
  const handlePress = (type) => {
    if (type === 'heart') {
      setHeartCount(heartCount + 1);
    } else if (type === 'missU') {
      setMissUCount(missUCount + 1);
    }

    Animated.sequence([
    Animated.parallel([
      Animated.timing(dropAnim, {
        toValue: 30, // Move banner to this position
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1, // Fade in (appear)
        duration: 500,
        useNativeDriver: true,
      }),
    ]),
    Animated.delay(2000), // Leave banner for 2 seconds
    Animated.parallel([
      Animated.timing(dropAnim, {
        toValue: -100, // Move banner out of view
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 0, // Fade out (dissolve)
        duration: 500,
        useNativeDriver: true,
      }),
    ]),
  ]).start();
  };


  return (
  <ImageBackground
      source={{ uri: 'http://chitandaeru.synology.me:80/2.gif' }} // Replace with your image URL
      style={styles.backgroundImage}
      resizeMode="cover"
    >
    <LinearGradient
      colors={['#e91d63', 'transparent']} // This sets the gradient colors
      locations={[0, 0.33]} // This sets the points at which the color changes
      style={styles.container} // Your container style will be applied here
    >
      
      <Animated.View
  style={[
    styles.banner,
    { transform: [{ translateY: dropAnim }], opacity: fadeAnim } // Add the opacity style here
  ]}
>
  <Text style={styles.bannerText}> ✉️ Message Sent! </Text>
</Animated.View>
      <View style={styles.stats}>
        <Text style={styles.text}>You Got {heartCount} ❤️, {missUCount} MissUs</Text>
      </View>
      <View style={styles.upperContainer}>
        <View style={styles.profileContainer}>
          <Image 
            source={{ uri: 'http://chitandaeru.synology.me:80/d71fd1868fe46c90e03de57d9e002b94.jpeg' }} 
            style={styles.profilePic} 
          />
          <Text style={styles.profileName}>John</Text>
        </View>

        <View style={styles.heartContainer}>
          <Text style={styles.heartIcon}>❤️</Text>
        </View>

        <View style={styles.profileContainer}>
          <Image 
            source={{ uri: 'http://chitandaeru.synology.me:80/ef5da24618cefcaaf4d159c8a40e20ca.jpeg' }} 
            style={styles.profilePic} 
          />
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
    <TouchableOpacity style={styles.button} onPress={() => handlePress('heart')}>
      <Text style={styles.buttonText}>❤️</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.button} onPress={() => handlePress('heart')}>
  <Image
    source={require('../assets/miss-you-1.png')} // Replace with the correct path to your PNG image
    style={styles.buttonIcon}
  />
</TouchableOpacity>
  </View>
</LinearGradient>
   </ImageBackground>
  );
}

const styles = StyleSheet.create({
backgroundImage: {
    flex: 1,
    width: '100%', // Ensure it covers the full width of the screen
    height: '100%', // Ensure it covers the full height of the screen
  },
  text: {
    fontFamily: 'balsamiq-sans',
    // ... other text styles
  },
   container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 228, 225, 0.75)', // Light pink background color
    paddingTop: 30,
    paddingBottom: 30,
  },
  stats: {
    // ... your existing stats styles
    backgroundColor: '#FFFAF0', // Set the background color to white
    padding: 10, // Add some padding to create space inside the shape
    borderRadius: 10, // Optional: if you want rounded corners
    // Add shadow to give depth, if desired
	width: 300,
	alignItems: 'center',
    // You might need to adjust your layout to accommodate the new shape
    marginTop: -40, // Adjust the margin to position the stats accordingly
    fontFamily: 'balsamiq-sans',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    
  },
    upperContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '83%',
    marginBottom: 0, // Reduce this value to move the entire block up
    
  },
profiles: {
    flexDirection: 'row', // Align items in a row
    alignItems: 'center', // Center items vertically
    justifyContent: 'space-evenly', // Even space between the items
    width: '100%',
    marginVertical: 20, // Add vertical space around the profiles section
  },
  profileContainer: {
    alignItems: 'center',
    marginHorizontal: 5,
    // Shadow properties
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // This is for Android
  },
  profilePic: {
    width: 100,        // Increased width
    height: 100,       // Increased height
    borderRadius: 50,  // Makes it round
    marginBottom: 8,   // Space between the image and the name
  },
  profileName: {
    fontSize: 16,
    color: 'black',
    fontFamily: 'balsamiq-sans',
    // Add any additional styling for the name text if required
  },
  heartContainer: {
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    // Shadow properties
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // This is for Android
    marginBottom: 15,
  },
  heartIcon: {
    fontSize: 30, // You can adjust the size of the heart icon if needed
    // Add any additional styling for the heart icon if required
  },
    duration: {
    flexDirection: 'row',
    justifyContent: 'center', // Change to 'center' to bring them closer together
    alignItems: 'center', // Vertically centers the items if they are of different heights
    width: '100%',
    marginBottom: 25,
    marginTop: -70, 
  },
  durationItem: {
    alignItems: 'center',
    marginHorizontal: 31,
    // Shadow properties
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3, // This is for Android
  },

  durationNumber: {
    fontSize: 24, // Larger font size for the number
    color: 'black', // Set the color for the number
    
    // Add any additional styling for the number if required
  },
  durationText: {
    fontSize: 16, // Smaller font size for the label
    color: 'black', // Set the color for the label
    fontFamily: 'balsamiq-sans',
    // Add any additional styling for the label if required
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '92.5%', // Adjust the width as needed
    marginTop: 20, 
    marginBottom: 100,
  },
    button: {
    backgroundColor: 'rgba(255, 220, 220, 1)', // Button background color
    padding: 10, // Padding inside the button
    // borderRadius: 20, // Comment this out if you want sharp corners
    alignItems: 'center',
    justifyContent: 'center',
    height: 100, // Fixed height for square shape
    width: 110,  // Equal width to height for square shape
    marginHorizontal: 10, // Space between buttons
    // Optional: if you want slightly rounded corners, uncomment the following line
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 20,
    elevation: 3, // This is for Android
    borderColor: 'rgba(233, 29, 99, 0.5)',
    borderWidth: 1,
    borderRadius: 20,
  },
  buttonIcon: {
    width: 80, // Set the width of the icon
    height: 80, // Set the height of the icon
    resizeMode: 'contain', // This ensures the image scales correctly within the button
  },
  buttonText: {
    color: 'black', // Text color inside the button
    fontSize: 50, // Font size for the button text
    fontFamily: 'balsamiq-sans',
    // Add any other styling for the button text if required
  },
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
    },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 5,
    zIndex: 1,
  },
  bannerText: {
    fontSize: 20, // Choose your desired size
    fontFamily: 'balsamiq-sans',
    // Any additional styling for the banner text
  },
  // ... any other styles you need
});
