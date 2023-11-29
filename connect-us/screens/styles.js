import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: 0,
    },
    inputfield: {
        backgroundColor: "#cccccc",
        width: "100%", // Adjusted to fit within the screen
        height: 50, // Reduced height
        color: "white",
        paddingHorizontal: 15,
        borderRadius: 15, // Reduced border radius
        marginTop: 5,
        marginBottom: 10,
        fontWeight: "700",
        paddingLeft: 30,
    },
    inputfieldmultiline: {
        backgroundColor: "#cccccc",
        width: "100%", // Adjusted to fit within the screen
        height: 100, // Reduced height
        color: "white",
        paddingHorizontal: 15,
        borderRadius: 15, // Reduced border radius
        marginTop: 5,
        marginBottom: 10,
        fontWeight: "700",
        paddingLeft: 30,
    },
    partnerinputfield: {
        backgroundColor: "#e91d63",
        justifyContent: "center",
        width: "87%",
        height: 60,
        color: "white",
        opacity: 0.5,
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 22,
        marginTop: 5,
        marginBottom: 10,
        fontWeight: "700",
        paddingLeft: 30
    },
    inputbutton: {
        backgroundColor: "#33363d",
        justifyContent: "center",
        width: "87%",
        height: 60,
        color: "white",
        opacity: 1,
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 22,
        marginTop: 5,
        marginBottom: 10,
        fontWeight: "700",
        paddingLeft: 30,
    },
    headertext: {
        marginTop: 70,
          fontSize: 30,
          fontWeight: "700",
          color: "#333333",
          textAlign: "center",
          width: "100%"
    },
    subheadertext: {
        marginTop: 10,
        marginBottom: 60,
        opacity: 0.5,
          fontSize: 13,
          fontWeight: "600",
          color: "#666666",
          textAlign: "center",
          width: "100%"
    },
    timecapsulecontainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'stretch', 
      padding: 10,
    },
    footerButtonContainer: {
      position: 'absolute',
      bottom: 10,
      alignSelf: 'center',
    },  
    yearsinput: {
      height: 40,
      marginVertical: 12,
      borderWidth: 1,
      padding: 10,
      width: '100%',
      borderColor: 'gray',
    },
    monthsinput: {
      height: 40,
      marginVertical: 12,
      borderWidth: 1,
      padding: 10,
      width: '100%',
      borderColor: 'gray',
    },
    daysinput: {
      height: 40,
      marginVertical: 12,
      borderWidth: 1,
      padding: 10,
      width: '100%',
      borderColor: 'gray',
    },
    button: {
        backgroundColor: '#e91d63',
        padding: 10,
        marginVertical: 12,
        alignItems: 'center',
        borderRadius: 15,
    },
    buttonText: {
        fontFamily:"balsamiq-sans",
        color: 'white',
        fontWeight: 'bold',
    },
    durationContainer: {
        flexDirection: 'column', // Stack inputs vertically
        justifyContent: 'space-between',
        width: '100%', // Full width
        alignItems: 'center',
        marginBottom: 10,
    },
    durationInput: {
      width: '22%', 
    },
    tabBar: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      borderTopWidth: 1,
      paddingTop: 10,
    },
    tabItem: {
      alignItems: 'center',
    },
    listContainer: {
      flexGrow: 1,
      justifyContent: 'center',
    },
    titleHeader: {
        fontSize: 28,
        fontFamily: "balsamiq-sans",
        color: '#000',
        paddingVertical: 0,
        paddingHorizontal: 20,
        flexDirection: "row",
        justifyContent: "space-between",

        width: '100%',
        borderBottomWidth: 2,
        borderBottomColor: '#e0e0e0',
        marginBottom: 20,
    },
    heading: {
        fontSize: 28,
        fontFamily: "balsamiq-sans",
    },
    itemContainer: {
        flex: 1,
        flexDirection: 'column', // Changed to column
        justifyContent: 'flex-start', // Align items to the start
        alignItems: 'flex-start', // Align items to the start
        padding: 10,
        marginVertical: 5,
        backgroundColor: '#D4D5D3',
        borderRadius: 10,
        fontFamily: "balsamiq-sans",
        overflow: 'hidden',
        position: 'relative',
    },
    imageStyles: {
        opacity: 0.5,
        width: '120%',
        height: '150%',
        position: 'absolute',
        top: 0,
        left: 0,
        resizeMode: 'cover', // This makes sure the image covers the entire container
    },
    itemTitle: {
        fontSize: 18,
        fontWeight: 'bold', // Optional: make title bold
        marginBottom: 5,
        fontFamily: "balsamiq-sans"
    },
    itemText: {
        fontFamily: "balsamiq-sans"
    },
    imageStyle: {
        width: 100,
        height: 100,
        marginVertical: 5, // Space around the image
    },
    inlineButton: {
        backgroundColor: "#e91d63",
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 5,
    },
    inlineButtonText: {
        fontSize: 16, // Adjust as needed
        color: "#fff", // White text color
        fontWeight: "bold", // Bold text
        fontFamily: "balsamiq-sans"
    },
    yearHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        padding: 10,
        // ... other styling for year headers ...
    },
    createContainer: {
        flexGrow: 1,
        justifyContent: 'flex-start',
        padding: 20,
    },
    buttonContainer: {
        padding: 10,
        position: 'absolute',
        bottom: 150,
        left: 0,
        right: 0,
        zIndex: 5,
        backgroundColor: 'red',
    },
    circularContainer: {
      width: 200,
      height: 200,
      borderRadius: 100,
      overflow: 'hidden',
      marginVertical: 20,
      backgroundColor: '#e0e0e0',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
    },
  });
  
  export default styles;