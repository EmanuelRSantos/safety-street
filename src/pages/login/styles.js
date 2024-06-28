import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#072960",
    width: "100%",
    height: "100%",
    paddingBottom: 10,
  },
  linha: {
    height: 3,
    width: "80%",
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
  inputs: {
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
    width: "100%",
    marginTop: 40,
  },
  rowContent: {
    justifyContent: "center",
    alignItems: "center",
    labels: {
      color: "#fff",
      fontSize: 16,
      borderBottomColor: "#fff",
      borderBottomWidth: 1,
    },
    marginHorizontal: 30,
    marginTop: 15,
  },
  buttons: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
});

export default styles;
