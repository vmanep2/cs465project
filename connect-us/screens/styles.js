import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: 0,
    },
    inputfield: {
        backgroundColor: "#cccccc",
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
      backgroundColor: 'blue',
      padding: 10,
      marginVertical: 12,
    },
    buttonText: {
      color: 'white',
    },
    durationContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      alignItems: 'center',
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
    itemContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 10,
      marginVertical: 5,
    },
    itemTitle: {
      fontSize: 18,
    },
    createContainer: {
      flexGrow: 1,
      justifyContent: 'flex-start',
      // padding: 10,
    },
    buttonContainer: {
      padding: 10,
      position: 'absolute', 
      bottom: 150, 
      left: 0,
      right: 0,
      zIndex: 5, 
      backgroundColor: 'red', 
    }

  });
  
  export default styles;