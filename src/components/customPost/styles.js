import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "#1A1933",
    gap: 5,
    marginBottom: 10
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
    fontSize: 16,
  },
  locationLabel: {
    color: "white",
    width: "auto",
  },
});

export default styles;
