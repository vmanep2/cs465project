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
    }
  });
  
  export default styles;