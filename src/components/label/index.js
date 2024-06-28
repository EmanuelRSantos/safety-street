import React from "react";
import { StyleSheet, Text } from "react-native";

const Label = ({ type, text, extraStyle }) => {
  let font = "";

  switch (type) {
    case "primary":
      font = styles.primary;
      break;
    case "secundary":
      font = styles.secundary;
      break;
    case "logo":
      font = styles.logo;
      break;
  }

  const selected = font;

  return <Text style={[selected, extraStyle]}>{text}</Text>;
};

const styles = StyleSheet.create({
  primary: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 24,
    color: "#fff",
  },
  secundary: {
    backgroundColor: "#fff",
    color: "#010101",
    fontSize: 24,
    borderRadius: 10,
    padding: 5,
  },
  logo: {
    fontFamily: "MedulaOne_400Regular",
    fontSize: 64,
    color: "#fff",
  },
});

export default Label;
