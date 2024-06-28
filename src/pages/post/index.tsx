import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";
import styles from "./styles";
import MapComponent from "../../components/mapComponent";
import { View, Image, ScrollView, Alert, TouchableOpacity } from "react-native";
import { reverseGeocodeAsync } from "expo-location";
import * as ImagePicker from "expo-image-picker";
import {
  Center,
  Text,
  Divider,
  Button,
  HStack,
  Textarea,
  TextareaInput,
  ButtonText,
  ButtonGroup,
  ButtonSpinner,
} from "@gluestack-ui/themed";
import { getDownloadURL, uploadBytesResumable, ref } from "firebase/storage";
import { FirebaseConn, StorageConn } from "../../firebase/conection";
import { getFirestore, addDoc, collection } from "firebase/firestore";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Label from "../../components/label";

interface ImageData {
  uri: string;
  fileName: string;
}

const Post = ({ route, navigation }) => {
  const [descricao, setDescricao] = useState('');
  const [address, setAddress] = useState<string | null>(null);
  const [image, setImage] = useState<ImageData[] | null>([]);
  const [imageName, setImageName] = useState<string[] | null>([]);
  const [thing, setThing] = useState<number | null>(null);
  const [formComplete, setFormComplete] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [user, setUser] = useState<string | null>(null)
  const [userProfileImage, setUserProfileImage] = useState<string | null>(null)
  const [cameraPermission, requestCameraPermission] =
    ImagePicker.useCameraPermissions();
  const latitude = route.params?.markerLat;
  const longitude = route.params?.markerLong;

  useEffect(() => {
    getData();
  }, [])

  useEffect(() => {
    async function getAddressFromCoords() {
      try {
        const geocodeLocationAddress = await reverseGeocodeAsync({
          latitude: latitude,
          longitude: longitude,
        });

        if (geocodeLocationAddress && geocodeLocationAddress.length > 0) {
          setAddress(geocodeLocationAddress[0].formattedAddress);
        } else {
          setAddress("Endereço não encontrado");
        }
      } catch (error) {
        console.error("Erro ao buscar endereço:", error);
        setAddress("Erro ao buscar endereço");
      }
    }

    getAddressFromCoords();
  }, [latitude, longitude]);

  useEffect(() => {
    setFormComplete(descricao.trim() !== '' && image.length >= 1)
  }, [descricao, image]);

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        allowsEditing: true,
      });

      if (!result.canceled) {
        const imageData = {
          fileName: result.assets[0].fileName,
          uri: result.assets[0].uri,
        };
        setImage([...image, imageData]);
        setImageName([...imageName, result.assets[0].fileName]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const openCamera = async () => {
    if (!cameraPermission?.granted) {
      const { status } = await requestCameraPermission();
      if (status !== "granted") {
        Alert.alert(
          "Permissão Necessária",
          "Precisamos de permissão para acessar a câmera."
        );
        return;
      }
    }

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const imageData = {
        fileName: result.assets[0].fileName,
        uri: result.assets[0].uri,
      };
      setImage([...image, imageData]);
      setImageName([...imageName, result.assets[0].fileName]);
    }
  };

  const SendToStorage = async () => {
    setIsLoading(true);
    const db = getFirestore(FirebaseConn);
    const responses = await Promise.all(image.map((img) => fetch(img.uri)));
    const blobs = await Promise.all(
      responses.map((response) => response.blob())
    );

    const uploadPromises = blobs.map((file, index) => {
      const imagesRef = ref(StorageConn, `posts/${imageName[index]}`);
      const uploadTask = uploadBytesResumable(imagesRef, file);

      return new Promise((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
          },
          (error) => {
            console.error("Erro durante o upload:", error);
            reject(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref)
              .then((downloadURL) => {
                resolve(downloadURL);
              })
              .catch((error) => {
                console.error("Erro ao obter URL de download:", error);
                reject(error);
              });
          }
        );
      });
    });

    try {
      const downloadURLs = await Promise.all(uploadPromises);

      await addDoc(collection(db, "posts"), {
        description: descricao,
        location: address,
        images: downloadURLs,
        longitude: longitude,
        latitude: latitude,
        userImage: userProfileImage,
        username: user
      });
      Alert.alert("Sucesso", "Postagem enviada com sucesso!");
      navigation.replace('Feed');
    } catch (error) {
      setIsLoading(false)
      console.error("Erro ao enviar postagem:", error);
      Alert.alert("Erro", "Ocorreu um erro ao enviar a postagem.");
    }
  };

  const DeleteImage = (index: number) => {
    const newImages = [...image];
    const newImageNames = [...imageName];

    newImages.splice(index, 1);
    newImageNames.splice(index, 1);

    setImage(newImages);
    setImageName(newImageNames);
  };

  const getData = async () => {
    try {
      const username = await AsyncStorage.getItem('user-username');
      const userImage = await AsyncStorage.getItem('user-image');
      if (username !== null && userImage !== null) {
        setUser(username)
        setUserProfileImage(userImage)
      }
    } catch (e) {
      console.error(e)
    }
  };

  return (
    <SafeAreaView style={styles.container}>
       <View
        style={{
          paddingHorizontal: 20,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 20
        }}
      >
        <TouchableOpacity style={{marginVertical: 'auto'}}>
          <Icon
            onPress={() => navigation.goBack()}
            name="arrow-back-outline"
            color={"#fff"}
            size={32}
          />
        </TouchableOpacity>

        <Label
          type={"primary"}
          text={"Postar"}
          extraStyle={''}
        />
      </View>
      <ScrollView
        style={{ width: "100%" }}
        showsVerticalScrollIndicator={false}
      >
        <Center>
          <Image
            style={styles.logo}
            source={require("../../../assets/logo.png")}
          />
          <MapComponent
            hole
            coordinate={{
              latitude: latitude,
              longitude: longitude,
            }}
            initialRegion={{
              latitude: latitude,
              longitude: longitude,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
            }}
          />
        </Center>
        <Center>
          <Divider w="85%" mt="$5" bg="$white" />
          <HStack>
            <Divider w="$6" mt="$5" bg="$white" />
            <Text mx="$4" mt="$1" style={styles.txtLocal}>
              LOCAL
            </Text>
            <Divider w="$6" mt="$5" bg="$white" />
          </HStack>
          <Textarea
            size="lg"
            isReadOnly={true}
            w="85%"
            backgroundColor="$white"
            h="auto"
          >
            <TextareaInput
              minHeight="$32"
              fontFamily="Poppins_400Regular"
              placeholder={address}
            />
          </Textarea>
          <HStack>
            <Divider w="$6" mt="$5" bg="$white" />
            <Text mx="$4" mt="$1" style={styles.txtLocal}>
              DESCRIÇÃO
            </Text>
            <Divider w="$6" mt="$5" bg="$white" />
          </HStack>
          <Textarea size="lg" w="85%" backgroundColor="$white" h="auto">
            <TextareaInput
              onChangeText={setDescricao}
              minHeight="$32"
              fontFamily="Poppins_400Regular"
              placeholder="Fale um pouco sobre a avaria."
            />
          </Textarea>
          <HStack>
            <Divider w="$6" mt="$5" bg="$white" />
            <Text mx="$4" mt="$1" style={styles.txtLocal}>
              FOTO
            </Text>
            <Divider w="$6" mt="$5" bg="$white" />
          </HStack>
          
            <ButtonGroup>
              <Button
                borderRadius="$full"
                h="$12"
                w="45%"
                isDisabled={image.length >= 4}
                borderColor="white"
                variant="outline"
                onPress={pickImage}
              >
                <ButtonText
                  justifyContent="center"
                  color="$white"
                  fontWeight="$bold"
                  fontSize="$lg"
                >
                  Galeria
                </ButtonText>
              </Button>
              <Button
                borderRadius="$full"
                h="$12"
                w="45%"
                isDisabled={image.length >= 4}
                borderColor="white"
                variant="outline"
                onPress={openCamera}
              >
                <ButtonText
                  justifyContent="center"
                  color="$white"
                  fontWeight="$bold"
                  fontSize="$lg"
                >
                  Câmera
                </ButtonText>
              </Button>
            </ButtonGroup>
          
          {image.length >= 1 && (
            <View style={styles.imageContainer}>
              {image.map((image, index) => (
                <View key={index} style={{ flexDirection: "row" }}>
                  <Image source={{ uri: image.uri }} style={styles.image} />
                  <TouchableOpacity
                    onPress={() => DeleteImage(index)}
                    style={{
                      width: "15%",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Ionicons
                      name="trash-outline"
                      color={"#ffffff"}
                      size={30}
                    />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}

          <Button
            borderRadius="$full"
            my="$6"
            h="$12"
            w="85%"
            isDisabled={!formComplete}
            backgroundColor="white"
            variant="solid"
            onPress={!isLoading ? SendToStorage : () => {}}
          >
            {isLoading ? (
              <ButtonSpinner color="$#072960" size="large" mr="$1" />
            ) : (
              <ButtonText
                justifyContent="center"
                color="#072960"
                fontWeight="$bold"
                fontSize="$lg"
              >
                Postar
              </ButtonText>
            )}
          </Button>
        </Center>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Post;
