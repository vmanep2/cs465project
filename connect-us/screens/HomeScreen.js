/*

	Color used:
 		TopGradient: #e91d63
 		TopStatsBar: rgba(255, 250, 240, 0.9)
 		LowerBackground: rgba(255, 228, 225, 0.75)
 		ButtonBackgroundColor: rgba(255, 220, 220, 0.6)
 	Font Used:
 		fontFamily: 'balsamiq-sans',

 */
import React, { useState, useRef, useEffect, useCallback, memo } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Animated,
  ImageBackground,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, SimpleLineIcons } from "@expo/vector-icons";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import * as Haptics from 'expo-haptics';

const IconComponent = memo(({ type, style }) => (
    <Icon name={type} size={14} color={"rgba(233, 29, 99, 0.2)"} style={style} />
  ));

export default function App() {
  const options = {
    enableVibrateFallback: true,
    ignoreAndroidSystemSettings: false,
  };

  const [heartCount, setHeartCount] = useState(12);
  const [missUCount, setMissUCount] = useState(14);
  const [years, setYears] = useState(2);
  const [months, setMonths] = useState(11);
  const [days, setDays] = useState(12);
  const dropAnim = useRef(new Animated.Value(-100)).current;
  const [liked, setLiked] = useState(false);
  const handleLogOut = useCallback(async () => {
    try {
      await AsyncStorage.removeItem("LoggedIn");
      signOut(auth)
        .then(() => console.log("Sign out successful"))
        .catch((error) => console.log(error));
    } catch (e) {
      console.log(e);
    }
  }, []);
  const [isBannerVisible, setIsBannerVisible] = useState(false);
  const [rapidPressCount, setRapidPressCount] = useState(0);
  const rapidPressTimer = useRef(null);

  const showBanner = useCallback(() => {
    setIsBannerVisible(true);
    dropAnim.setValue(-100);
    Animated.timing(dropAnim, {
      toValue: 30,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [dropAnim]);

  const hideBanner = useCallback(() => {
    Animated.timing(dropAnim, {
      toValue: -100,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      setIsBannerVisible(false);
      setRapidPressCount(0); 
    });
  }, [dropAnim]);

  const handlePress = useCallback((type) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);

    if (type === "heart") {
      setHeartCount(heartCount + 1);
    } else if (type === "missU") {
      setMissUCount(missUCount + 1);
    }

    setRapidPressCount((curr) => curr + 1);
    if (!isBannerVisible) {
      showBanner();
    }

    clearTimeout(rapidPressTimer.current);
    rapidPressTimer.current = setTimeout(() => {
      hideBanner();
    }, 2000);
    addIcon(type);
    icons.forEach((icon) => startIconAnimation(icon.key));
}, [heartCount, missUCount, isBannerVisible, rapidPressTimer, iconsRef]);

  const heartButtonScale = useRef(new Animated.Value(1)).current;
  const missUButtonScale = useRef(new Animated.Value(1)).current;
  const [profilePicScale, setProfilePicScale] = useState(new Animated.Value(1)); 

  const animateButton = (buttonScale, toValue) => {
    Animated.spring(buttonScale, {
      toValue,
      useNativeDriver: true,
    }).start();
  };
  const animateHeartPopIn = () => animateButton(heartButtonScale, 1.2);
  const animateHeartPopOut = () => animateButton(heartButtonScale, 1);
  const animateMissUPopIn = () => animateButton(missUButtonScale, 1.2);
  const animateMissUPopOut = () => animateButton(missUButtonScale, 1);
  const popInProfilePic = () => {
    Animated.spring(profilePicScale, {
      toValue: 1.15, 
      useNativeDriver: true,
    }).start();
  };

  const popOutProfilePic = () => {
    Animated.spring(profilePicScale, {
      toValue: 1, 
      useNativeDriver: true,
    }).start();
  };

  const [icons, setIcons] = useState([]);
  const iconsRef = useRef([]);

  const generateUniqueKey = () =>
    `icon_${new Date().getTime()}_${Math.random()}`;

  const addIcon = (type) => {
    let newIcon; 

    if (type === "heart") {
      newIcon = {
        key: generateUniqueKey(),
        yPosition: new Animated.Value(-200),
        xPosition: new Animated.Value(-100),
        scale: new Animated.Value(1),
      };
    } else if (type === "missU") {
      newIcon = {
        key: generateUniqueKey(),
        yPosition: new Animated.Value(-200),
        xPosition: new Animated.Value(100),
        scale: new Animated.Value(1),
      };
    }

    if (newIcon) {
      iconsRef.current.push(newIcon);
      setIcons([...iconsRef.current]);
      startIconAnimation(newIcon);
    }
  };

  const startIconAnimation = (icon) => {
    if (icon.yPosition && icon.xPosition && icon.scale) {
      Animated.parallel([
        Animated.timing(icon.yPosition, {
          toValue: -1000,
          duration: 4500,
          useNativeDriver: true,
        }),
        Animated.timing(icon.xPosition, {
          toValue: Math.random() * 300 - 150,
          duration: 4500,
          useNativeDriver: true,
        }),
        Animated.timing(icon.scale, {
          toValue: 3, 
          duration: 4500,
          useNativeDriver: true,
        }),
      ]).start(() => {
        iconsRef.current = iconsRef.current.filter((i) => i.key !== icon.key);
        setIcons([...iconsRef.current]);
      });
    }
  };

  useEffect(() => {
    return () => {
      iconsRef.current.forEach((icon) => {
        icon.yPosition.stopAnimation();
        icon.xPosition.stopAnimation();
      });
      clearTimeout(rapidPressTimer.current);
    };
  }, []);

  return (
    <ImageBackground
      source={{ uri: "https://nico-nico-nii.com/pre-defined/background" }}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <LinearGradient
        colors={["#e91d63", "transparent"]}
        locations={[0, 0.33]}
        style={styles.container}
      >
        <TouchableOpacity onPress={handleLogOut} style={styles.MenuButton}>
          <SimpleLineIcons
            name="menu"
            size={22}
            color="rgba(255, 220, 220, 0.7)"
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={handleLogOut} style={styles.logoutButton}>
          <Ionicons
            name="log-out-outline"
            size={30}
            color="rgba(255, 220, 220, 0.7)"
          />
        </TouchableOpacity>
        {isBannerVisible && (
          <Animated.View
            style={[styles.banner, { transform: [{ translateY: dropAnim }] }]}
          >
            <Text style={styles.bannerText}>
              ✉️ Message Sent!
              {rapidPressCount > 1 ? ` x${rapidPressCount}` : ""}
            </Text>
          </Animated.View>
        )}

        <View style={styles.stats}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={styles.text}> You Got {heartCount} </Text>
            <Icon
              name="heart"
              size={20}
              color="#e91d63"
              style={{ paddingTop: 2, paddingLeft: 1 }}
            />
            <Text style={styles.text}>, {missUCount} MissUs</Text>
          </View>
          <TouchableOpacity onPress={handleLogOut} style={styles.MenuButton}>
            <SimpleLineIcons
              name="menu"
              size={22}
              color="rgba(255, 220, 220, 0.7)"
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={handleLogOut} style={styles.logoutButton}>
            <Ionicons
              name="log-out-outline"
              size={30}
              color="rgba(255, 220, 220, 0.7)"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.upperContainer}>
          <View style={styles.profileContainer}>
            <Image
              source={{
                uri: "https://nico-nico-nii.com/pre-defined/user_profile_pic_1",
              }}
              style={styles.profilePic}
            />
            <Text style={styles.profileName}>John</Text>
          </View>
          <View style={styles.heartContainer}>
            <Text style={styles.heartIcon}>❤️</Text>
          </View>
          <View style={styles.profileContainer}>
            <Animated.Image
              source={{
                uri: "https://nico-nico-nii.com/pre-defined/user_profile_pic_2",
              }}
              style={[
                styles.profilePic,
                { transform: [{ scale: profilePicScale }] },
              ]}
            />
            <Animated.Text
              style={[
                styles.profileName,
                { transform: [{ scale: profilePicScale }] },
              ]}
            >
              Mary
            </Animated.Text>
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
          <TouchableOpacity
            onPressIn={animateHeartPopIn}
            onPressOut={animateHeartPopOut}
            style={[
              styles.button,
              { transform: [{ scale: heartButtonScale }] },
            ]}
            activeOpacity={1}
            onPress={() => {
              handlePress("heart");
              setLiked((isLiked) => !isLiked);
              popInProfilePic(); 
              setTimeout(popOutProfilePic, 100);
            }}
          >
            <Icon
              name={liked ? "heart" : "heart"}
              size={50}
              color={
                liked ? "rgba(233, 29, 99, 0.75)" : "rgba(233, 29, 99, 0.75)"
              }
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPressIn={animateMissUPopIn}
            onPressOut={animateMissUPopOut}
            style={[
              styles.button,
              { transform: [{ scale: missUButtonScale }] },
            ]}
            activeOpacity={1}
            onPress={() => {
              handlePress("missU");
              popInProfilePic(); 
              setTimeout(popOutProfilePic, 100);
            }}
          >
            <Image
              source={require("../assets/miss-you-1.png")}
              style={styles.buttonIcon}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.floatingIconsContainer}>
          {icons.map((icon) => (
            <Animated.View
              key={icon.key}
              style={{
                position: "absolute",
                bottom: 0,
                transform: [
                  { translateY: icon.yPosition },
                  { translateX: icon.xPosition },
                  { scale: icon.scale },
                ],
              }}
            >
              <IconComponent type={"heart"} />
            </Animated.View>
          ))}
        </View>
      </LinearGradient>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  floatingIconsContainer: {
    position: "absolute",
    left: "50%",
    right: 0,
    bottom: 0, 
    height: 30, 
    zIndex: -1, 
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  text: {
    fontFamily: "balsamiq-sans",
    marginTop: 4,
  },
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "rgba(255, 228, 225, 0.75)",
    paddingTop: 30,
    paddingBottom: 30,
  },
  stats: {
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
  upperContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: "90%",
    marginBottom: 0,
  },
  profileContainer: {
    width: "50%",
    alignItems: "center",
    marginHorizontal: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 8,
  },
  profileName: {
    fontSize: 16,
    color: "black",
    fontFamily: "balsamiq-sans",
  },
  heartContainer: {
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 15,
  },
  heartIcon: {
    fontSize: 30,
  },
  duration: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginBottom: 25,
    marginTop: -70,
    marginLeft: "-1%",
  },
  durationItem: {
    alignItems: "center",
    marginHorizontal: 29.5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    marginBottom: -50,
  },
  durationNumber: {
    fontSize: 24,
    color: "black",
    fontFamily: "balsamiq-sans",
  },
  durationText: {
    fontSize: 16,
    color: "black",
    fontFamily: "balsamiq-sans",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginTop: -30,
    marginBottom: 0,
  },
  button: {
    backgroundColor: "rgba(255, 220, 220, 0.6)",
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    height: "45%",
    width: "25%",
    marginHorizontal: "10%",
    borderRadius: 8,
    shadowColor: "rgba(233, 29, 99, 0.5)",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 20,
    elevation: 3,
    borderColor: "rgba(233, 29, 99, 0.5)",
    borderWidth: 1,
    borderRadius: 20,
  },
  logoutButton: {
    position: "absolute",
    top: "25%", 
    right: "-19%", 
    transform: [{ translateY: 0 }],
  },
  MenuButton: {
    position: "absolute",
    top: "50%", 
    left: "-17%", 
    transform: [{ translateY: 0 }],
  },
  buttonIcon: {
    width: 70,
    height: 70,
    resizeMode: "contain",
    backgroundColor: "transparent",
  },
  buttonText: {
    color: "black",
    fontSize: 45,
    fontFamily: "balsamiq-sans",
    backgroundColor: "transparent",
  },
  banner: {
    position: "absolute",
    top: 25,
    width: "auto",
    minWidth: "58%",
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFAF0",
    borderColor: "#ddd",
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
    fontSize: 20,
    fontFamily: "balsamiq-sans",
  },
});
