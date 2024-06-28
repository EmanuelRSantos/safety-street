import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./styles";
import { Image, Text, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

const User = ({ navigation }) => {
  const [userImage, setUserImage] = useState("");
  useEffect(() => {
    const getData = async () => {
      try {
        const data = await AsyncStorage.getItem("user-image");
        setUserImage(data);
      } catch (e) {
        console.error(e);
      }
    };
    getData();
  }, []);
  const userLogout = async () => {
    try {
      await AsyncStorage.clear();
      navigation.reset({
        index: 0,
        routes: [{ name: "SplashScreen" }],
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.userImage} source={{ uri: userImage }} />
      <TouchableOpacity onPress={() => userLogout()}>
        <Text style={styles.labels}>Sair da conta</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default User;
