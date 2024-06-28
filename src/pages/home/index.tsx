import React, { useState, useEffect, useRef } from "react";
import { Image, View, ScrollView, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";
import Label from "../../components/label";
import styles from "./styles";
import MapComponent from "../../components/mapComponent";
import MapView from "react-native-maps";
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
  LocationObject,
  watchPositionAsync,
  LocationAccuracy,
} from "expo-location";
import { Button, ButtonSpinner, ButtonText } from "@gluestack-ui/themed";
import { FirebaseConn } from "../../firebase/conection";
import {
  collection,
  getCountFromServer,
  getDocs,
  getFirestore,
  limit,
  query,
} from "firebase/firestore";
import CustomPost from "../../components/customPost";

const Home = ({ navigation }) => {
  const [location, setLocation] = useState<LocationObject | null>(null);
  const mapRef = useRef<MapView>(null);
  const [postsData, setPostsData] = useState([]);

  useEffect(() => {
    requestLocationPermissions();
    fetchPost();
    watchPositionAsync(
      {
        accuracy: LocationAccuracy.Highest,
        timeInterval: 1000,
        distanceInterval: 1,
      },
      (response) => {
        setLocation(response);
        mapRef.current?.animateCamera({
          center: response.coords,
        });
      }
    );
  }, []);

  const fetchPost = async () => {
    try {
      const db = getFirestore(FirebaseConn);
      const q = query(collection(db, "posts"));
      const querySnapshot = await getDocs(q);
      const posts = [];
      querySnapshot.forEach(async (doc) => {
        const c = query(collection(db, "posts", doc.id, "comments"));
        const count = await getCountFromServer(c);
        const postsFormated = {
          id: doc.id,
          data: doc.data(),
          comments: count.data().count,
        };
        posts.push(postsFormated);
      });
      setPostsData(posts);
    } catch (error) {
      console.error("erro erro erro", error);
    }
  };

  async function requestLocationPermissions() {
    const { granted } = await requestForegroundPermissionsAsync();
    if (granted) {
      const currentPosition = await getCurrentPositionAsync();
      setLocation(currentPosition);
    }
  }

  return (
    <SafeAreaView style={{ backgroundColor: "#072960", flex: 1, gap: 10 }}>
      <Image style={styles.logo} source={require("../../../assets/logo.png")} />
      {postsData.length < 1 && (
        <ButtonSpinner m={"auto"} color={"white"} size="large" />
      )}
      {postsData.length > 1 && (
        <FlatList
          style={{ gap: 10 }}
          data={postsData}
          renderItem={({ item }) => (
            <CustomPost
              image={item.data.images}
              description={item.data.description}
              location={item.data.location}
              userImage={item.data.userImage}
              username={item.data.username}
              comments={item.comments}
              navigateTo={() =>
                navigation.navigate("PostFocused", {
                  data: item.data,
                  id: item.id,
                  comments: item.comments,
                })
              }
            />
          )}
        ></FlatList>
      )}
      <Button
        style={{ position: "absolute", bottom: 10, right: 10 }}
        borderRadius="$full"
        h="$12"
        variant="solid"
        backgroundColor="$white"
        onPress={() => navigation.navigate("map")}
      >
        <ButtonText mr="$4" color="$#072960" fontWeight="$bold" fontSize="$lg">
          Nova avaria
        </ButtonText>
        <Icon name="map-outline" color={"#072960"} size={30} />
      </Button>
    </SafeAreaView>
  );
};

export default Home;
