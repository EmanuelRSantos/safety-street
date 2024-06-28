import React, { useState, useEffect, useRef } from "react";
import { Image, Text, TouchableOpacity, View, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./styles";
import MapView, { Callout, Marker } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";
import {
  getCurrentPositionAsync,
  LocationObject,
  watchPositionAsync,
  LocationAccuracy,
  reverseGeocodeAsync,
} from "expo-location";
import { MAP_STYLE } from "../../components/mapComponent/map-style";
import { collection, getCountFromServer, getDocs, getFirestore, query } from "firebase/firestore";
import { FirebaseConn } from "../../firebase/conection";
import { ButtonText, Button } from "@gluestack-ui/themed";

const Map = ({ navigation }) => {
  const [location, setLocation] = useState<LocationObject | null>(null);
  const [markers, setMarkers] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [firstViewVisible, setFirstViewVisible] = useState(true);
  const [secondViewVisible, setSecondViewVisible] = useState(false);
  const [address, setAddress] = useState<string | null>(null);
  const [postsData, setPostsData] = useState([]);
  const mapRef = useRef<MapView>(null);

  useEffect(() => {
    fetchPost();
    requestLocationPermissions();
    watchPositionAsync(
      {
        accuracy: LocationAccuracy.Balanced,
        timeInterval: 1000,
        distanceInterval: 3,
      },
      (response) => {
        setLocation(response);
      }
    );
  }, []);

  async function requestLocationPermissions() {
    const currentPosition = await getCurrentPositionAsync();
    setLocation(currentPosition);
    if (mapRef.current && currentPosition) {
      mapRef.current.animateCamera({
        center: {
          latitude: currentPosition.coords.latitude,
          longitude: currentPosition.coords.longitude,
        },
      });
    }
  }

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

  const handleMapPress = async (event: any) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setMarkers({ latitude, longitude });
    if (mapRef.current && latitude && longitude) {
      mapRef.current.animateCamera({
        center: {
          latitude,
          longitude,
        },
      });
    }
    setFirstViewVisible(false);
    setSecondViewVisible(true);

    const geocodeLocationAddress = await reverseGeocodeAsync({
      longitude: longitude,
      latitude: latitude,
    });
    if (geocodeLocationAddress && geocodeLocationAddress.length > 0) {
      setAddress(geocodeLocationAddress[0].formattedAddress);
    } else {
      setAddress("Endereço não encontrado");
    }
  };

  const SendAddress = () => {
    navigation.navigate("Post", {
      address: address,
      markerLat: markers.latitude,
      markerLong: markers.longitude,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {location && (
        <MapView
          onPress={handleMapPress}
          toolbarEnabled={false}
          pitchEnabled={false}
          ref={mapRef}
          style={styles.map}
          customMapStyle={MAP_STYLE}
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
        >
          <Marker
            tracksViewChanges={false}
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
          >
            <View
              style={{
                height: 15,
                width: 15,
                borderRadius: 10,
                backgroundColor: "#f5f5f5",
              }}
            />
          </Marker>
          {markers && (
            <Marker
              tracksViewChanges={false}
              coordinate={{
                latitude: markers.latitude,
                longitude: markers.longitude,
              }}
            >
              <Ionicons name="alert-circle" color="#fff" size={30} />
            </Marker>
          )}
          {postsData &&
            postsData.map((data, index) => (
              <Marker
                key={index}
                tracksViewChanges={false}
                coordinate={{
                  latitude: data.data.latitude,
                  longitude: data.data.longitude,
                }}
              >
                <Ionicons name="flag" color="#fff" size={30} />
                <Callout
                  onPress={() =>
                    navigation.navigate("PostFocused", {
                      data: data.data,
                      id: data.id,
                      comments: data.comments,
                    })
                  }
                  tooltip
                >
                  <View
                    style={{
                      borderRadius: 20,
                      height: 80,
                      width: 200,
                      backgroundColor: "white",
                    }}
                  >
                    <Button m="auto" h="$12" w="80%" backgroundColor="#072960">
                      <ButtonText
                        color="$white"
                        fontWeight="$bold"
                        fontSize="$lg"
                      >
                        Ver Post
                      </ButtonText>
                    </Button>
                  </View>
                </Callout>
              </Marker>
            ))}
        </MapView>
      )}
      {firstViewVisible && (
        <View style={styles.overlay}>
          <Ionicons name="chevron-up-outline" size={30} color={"white"} />
          <Text style={{ fontSize: 20, color: "white" }}>
            INDIQUE A AVARIA NO MAPA
          </Text>
        </View>
      )}
      {secondViewVisible && (
        <View style={styles.secondOverlay}>
          <Ionicons name="chevron-up-outline" size={30} color={"white"} />
          <Text style={{ fontSize: 20, color: "white" }}>
            {address ? `Endereço: ${address}` : "Procurando endereço..."}
          </Text>
          <TouchableOpacity style={styles.addBtn} onPress={SendAddress}>
            <Text style={{ color: "white", fontSize: 20 }}>Próxima etapa</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Map;
