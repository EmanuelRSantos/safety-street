import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./styles";
import { Image, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as NavigationBar from "expo-navigation-bar";
import { useEffect } from "react";

const ZoomImage = ({ route, navigation }) => {
  useEffect(() => {
    NavigationBar.setBackgroundColorAsync("#1C1C1C");
  }, []);

  useEffect(
    () => () => {
      NavigationBar.setBackgroundColorAsync("#072960");
    },
    []
  );
  return (
    <SafeAreaView style={styles.container}>
      <Pressable
        onPress={() => navigation.goBack()}
        style={{ alignSelf: "flex-start", marginHorizontal: 10 }}
      >
        <Ionicons name="arrow-back-outline" color="white" size={30} />
      </Pressable>
      <Image style={styles.image} source={{ uri: route.params?.url }} />
    </SafeAreaView>
  );
};

export default ZoomImage;
