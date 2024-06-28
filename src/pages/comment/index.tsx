import React, { useEffect, useState } from "react";
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";
import Label from "../../components/label";
import styles from "./styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { addDoc, collection, doc, getFirestore } from "firebase/firestore";
import { FirebaseConn } from "../../firebase/conection";
import { Button, ButtonSpinner } from "@gluestack-ui/themed";
import { ButtonText } from "@gluestack-ui/themed";
import { ButtonIcon } from "@gluestack-ui/themed";

const Comment = ({ route, navigation }) => {
  const [userProfileImage, setUserProfileImage] = useState<string>("");
  const [user, setUser] = useState<string>("");
  const [commentText, setCommentText] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isValid, setIsValid] = useState<boolean>(false);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    setIsValid(commentText.trim() !== "");
  }, [commentText]);

  const getData = async () => {
    try {
      const username = await AsyncStorage.getItem("user-username");
      const userImage = await AsyncStorage.getItem("user-image");
      if (username !== null && userImage !== null) {
        setUser(username);
        setUserProfileImage(userImage);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const sendToStorage = async () => {
    setIsLoading(true)
    const db = getFirestore(FirebaseConn);
    const docRef = doc(db, "posts", route.params?.id);
    const colRef = collection(docRef, "comments")

    try {
      await addDoc(colRef, {
        userImage: userProfileImage,
        username: user,
        comment: commentText,
      });
      setIsLoading(false)
      Alert.alert("Sucesso", "Postagem enviada com sucesso!");
      navigation.goBack();
    } catch (error) {
      setIsLoading(false)
      console.error("Erro ao enviar postagem:", error);
      Alert.alert("Erro", "Ocorreu um erro ao enviar a postagem.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          paddingHorizontal: 20,
          marginBottom: 5,
          flexDirection: "row",
          alignItems: "center",
          gap: 20,
          borderBottomColor: "#ffffff77",
          borderBottomWidth: 1,
        }}
      >
        <TouchableOpacity style={{ marginVertical: "auto" }}>
          <Icon
            onPress={() => navigation.goBack()}
            name="arrow-back-outline"
            color={"#fff"}
            size={32}
          />
        </TouchableOpacity>

        <Label type={"primary"} text={"Comentar"} extraStyle={""} />
      </View>
      <View style={{ paddingHorizontal: 10, gap: 10 }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
          <Image
            style={{ height: 40, width: 40, borderRadius: 40 }}
            source={userProfileImage && { uri: userProfileImage }}
          />
          <Text style={styles.usernameLabel}>{user}</Text>
        </View>
      </View>
      <TextInput
        style={{ margin: 10, color: "white", fontSize: 16 }}
        placeholderTextColor="#ffffff77"
        placeholder="Escreva seu comentário..."
        onChangeText={setCommentText}
      ></TextInput>
      <Button
      style={{position: "absolute", bottom: 10, right: 10}}
        borderRadius="$full"
        h="$12"
        variant="solid"
        backgroundColor="$white"
        isDisabled={!isValid}
        onPress={!isLoading ? sendToStorage : () => {}}
      >
        {isLoading ? (
          <ButtonSpinner color="$#072960" size="large" mr="$1" />
        ) : (
          <>
          <ButtonText mr="$4" color="$#072960" fontWeight="$bold" fontSize="$lg">
            Comentar
          </ButtonText>
          <Icon name="chatbubbles-outline" color={"#072960"} size={30} />
          </>
        )}
      </Button>
    </SafeAreaView>
  );
};

export default Comment;
