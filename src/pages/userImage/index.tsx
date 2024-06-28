import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./styles";
import { Text, View, Image, Pressable } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Button, ButtonText, ButtonSpinner } from "@gluestack-ui/themed";
import { Ionicons } from "@expo/vector-icons";
import { getDownloadURL, uploadBytesResumable, ref } from "firebase/storage";
import { StorageConn } from "../../firebase/conection";
import { updateUser } from "../../services/user.service";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomAlertDialog from "../../components/customAlertDialog";

interface ImageData {
  uri: string;
  fileName: string;
}

const UserImage = ({ route, navigation }) => {
  const [successfulAlertDialog, setSuccessfulAlertDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState<ImageData | null>(null);
  const [imageName, setImageName] = useState<string | null>(null);
  const defaultImage =
    "https://firebasestorage.googleapis.com/v0/b/safety-street-65d5f.appspot.com/o/users%2Fdefault.png?alt=media&token=1393cc6a-51c5-4a4c-ab67-4bb0a0c3fab1";

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true,
      });

      if (!result.canceled) {
        const imageData = {
          fileName: result.assets[0].fileName,
          uri: result.assets[0].uri,
        };
        setImage(imageData);
        setImageName(result.assets[0].fileName);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const SendToStorage = async () => {
    setIsLoading(true);
    const response = await fetch(image.uri);
    const blob = await response.blob();

    const imagesRef = ref(StorageConn, `users/${imageName}`);
    const uploadTask = uploadBytesResumable(imagesRef, blob);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        console.error("Erro durante o upload:", error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then(async (downloadURL) => {
            await saveData(downloadURL);
            updateUser({ image: downloadURL }, route.params?.uid)
              .then(() => {
                setSuccessfulAlertDialog(true);
                setIsLoading(false);
              })
              .catch((e) => {
                setIsLoading(false);
                console.error(e);
              });
          })
          .catch((error) => {
            console.error("Erro ao obter URL de download:", error);
          });
      }
    );
  };

  const withoutImage = async () => {
    await saveData(defaultImage);
    navigation.reset({
      index: 0,
      routes: [{ name: "Feed" }],
    });
  };

  const saveData = async (value: string) => {
    try {
      await AsyncStorage.setItem("user-image", value);
      return "Success";
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {route.params?.newImage ? (
        <Text style={styles.headerLabel}>
          Ops! Parece que você ainda não escolheu uma imagem...
        </Text>
      ) : (
        <Text style={styles.headerLabel}>
          Agora coloque uma foto para interagir com outros usuários!
        </Text>
      )}

      <View style={styles.imageContainer}>
        <Pressable style={{ flex: 1 }} onPress={pickImage}>
          {!image && !isLoading && (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Ionicons name="camera" size={50} color="white" />
            </View>
          )}
          {image && (
            <Image
              source={{ uri: image.uri }}
              style={{ width: "100%", height: "100%", borderRadius: 10 }}
            />
          )}
        </Pressable>
      </View>
      <Button
        borderRadius="$full"
        h="$12"
        w="100%"
        variant="solid"
        backgroundColor="$white"
        isDisabled={!image}
        onPress={!isLoading ? SendToStorage : () => {}}
      >
        {isLoading ? (
          <ButtonSpinner color="$#072960" size="large" mr="$1" />
        ) : (
          <ButtonText color="$#072960" fontWeight="$bold" fontSize="$lg">
            Continuar
          </ButtonText>
        )}
      </Button>
      <View style={styles.linha}>
        <Text style={styles.lineLabel}>ou</Text>
      </View>
      <Button
        borderRadius="$full"
        h="$12"
        w="100%"
        mb="$6"
        borderColor="$white"
        variant="outline"
        onPress={() => withoutImage()}
      >
        <ButtonText color="$white" fontWeight="$bold" fontSize="$lg">
          Continuar sem foto
        </ButtonText>
      </Button>
      <CustomAlertDialog
        successful
        navigate={() =>
          navigation.reset({
            index: 0,
            routes: [{ name: "Feed" }],
          })
        }
        bodyText="Parabéns, você foi cadastrado com sucesso! Continue navegando para conhecer o aplicativo."
        isOpen={successfulAlertDialog}
        onClose={() => setSuccessfulAlertDialog(false)}
      />
    </SafeAreaView>
  );
};

export default UserImage;
