import * as React from "react";
import { View, Image } from "react-native";
import styles from "./styles";
import Label from "../../components/label";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SplashScreen = ({ navigation }) => {

  React.useEffect(() => {
    const getData = async () => {
      try {
        const data = await AsyncStorage.getItem("is-logged");
        setTimeout(() => {
          data ? navigation.replace("Feed") : navigation.replace("Initial");
        }, 1500);
      } catch (e) {
        console.error(e);
      }
    };
    getData();
  }, []);

  return (
    <View style={styles.container}>
      <Image
        style={{ height: "28%", resizeMode: "contain" }}
        source={require("../../../assets/logo.png")}
      />
      <Label
        extraStyle={{ textAlign: "center", marginBottom: 70 }}
        text={"Safety Street"}
        type={"logo"}
      />
    </View>
  );
};
export default SplashScreen;
