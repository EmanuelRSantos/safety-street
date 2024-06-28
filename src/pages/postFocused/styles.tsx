import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#072960",
  },
  imageContainer: {
    width: "100%",
    height: 350,
    flexWrap: "wrap",
    flexDirection: "row",
    gap: 3,
  },
  usernameLabel: {
    fontFamily: "Poppins_500Medium",
    color: "white",
    fontSize: 22,
  },
  locationLabel: {
    color: "white",
    width: "80%",
    borderLeftColor: "white",
    borderLeftWidth: 2,
    paddingLeft: 10
  },
});

export default styles;
