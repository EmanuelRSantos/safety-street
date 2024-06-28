import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#072960",
    gap: 10,
    padding: 10
  },
  labels: {
    margin: "auto",
    color: "#fff",
    fontSize: 16,
    borderBottomColor: "#fff",
    borderBottomWidth: 1,
  },
  userImage: {
    width: 200,
    height: 200,
    borderRadius: 200,
    resizeMode: "contain",
    marginHorizontal: "auto",
  },
});

export default styles;
