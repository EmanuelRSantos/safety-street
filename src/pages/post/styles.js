import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    backgroundColor: "#072960",
    gap: 15,
  },
  goBackContainer: {
    position: "absolute",
    top: 20,
    left: 20,
    zIndex: 10,
  },
  logo: {
    position: 'absolute',
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    height: 80,
    alignSelf: 'center'
  },
  post: {
    width: 350,
  },
  txtLocal: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 22,
    color: "#fff",
  },
  txtDescricao: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 22,
    color: "#fff",
  },
  imageContainer: {
    width: "100%",
    alignItems: "center",
  },
  image: {
    width: '70%',
    height: 200,
    borderRadius: 5,
    marginTop: 10,
  },
});

export default styles;
