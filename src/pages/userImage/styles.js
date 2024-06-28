import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#072960",
    padding: 10,
  },
  headerLabel: {
    alignSelf: "center",
    fontFamily: "Poppins_500Medium",
    color: "white",
    fontSize: 25,
  },
  imageContainer: {
    height: 200,
    width: 200,
    margin: "auto",
    borderRadius: 10,
    borderColor: "white",
    borderWidth: 2
  },
  linha: {
    height: 3,
    width: "100%",
    backgroundColor: "#FFFFFF",
    marginVertical: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  lineLabel: {
    position: "absolute",
    left: "auto",
    color: "#fff",
    fontSize: 25,
    paddingHorizontal: 10,
    paddingBottom: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#072960",
    fontWeight: "bold",
  },
});

export default styles;
