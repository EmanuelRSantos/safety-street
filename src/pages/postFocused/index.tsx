import React, { useEffect, useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";
import styles from "./styles";
import Label from "../../components/label";
import { collection, getDocs, getFirestore, query } from "firebase/firestore";
import { FirebaseConn } from "../../firebase/conection";

const PostFocused = ({ route, navigation }) => {
  const [isPressed, setIsPressed] = useState<boolean>(false);
  const [likeQt, setLikeQt] = useState<number>(Math.floor(Math.random() * 10));
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const updateLike = () => {
    setIsPressed(!isPressed);
    !isPressed ? setLikeQt(likeQt + 1) : setLikeQt(likeQt - 1);
  };

  const getData = async () => {
    try {
      const db = getFirestore(FirebaseConn);
      const q = query(collection(db, "posts", route.params?.id, "comments"));
      const querySnapshot = await getDocs(q);
      const posts = [];
      querySnapshot.forEach((doc) => {
        const postsFormated = {
          data: doc.data(),
        };
        posts.push(postsFormated);
      });
      setData(posts);
    } catch (error) {
      console.error("erro erro erro", error);
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

        <Label type={"primary"} text={"Postar"} extraStyle={""} />
      </View>
      <ScrollView
        style={{ paddingHorizontal: 10 }}
        contentContainerStyle={{ gap: 10 }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
          <Image
            style={{ height: 40, width: 40, borderRadius: 40 }}
            source={{ uri: route.params?.data.userImage }}
          />
          <Text style={styles.usernameLabel}>
            {route.params?.data.username}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            alignItems: "center",
          }}
        >
          <Icon name="location-outline" color={"white"} size={30} />
          <Text style={styles.locationLabel}>
            {route.params?.data.location}
          </Text>
        </View>
        <Text
          style={{
            color: "white",
            fontSize: 16,
          }}
        >
          {route.params?.data.description}
        </Text>
        <View style={styles.imageContainer}>
          {route.params?.data.images.length < 3 &&
            route.params?.data.images.map((url, index) => (
              <Pressable
                key={index}
                style={{ flex: 1, height: "100%" }}
                onPress={() => navigation.navigate("ZoomImage", { url: url })}
              >
                <Image
                  style={{ flex: 1, height: "100%" }}
                  source={{ uri: url }}
                />
              </Pressable>
            ))}
          {route.params?.data.images.length === 3 && (
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                height: "100%",
                width: "100%",
                gap: 5,
              }}
            >
              <Pressable
                style={{ flex: 1, height: "100%", width: "50%" }}
                onPress={() =>
                  navigation.navigate("ZoomImage", {
                    url: route.params?.data.images[0],
                  })
                }
              >
                <Image
                  style={{ flex: 1, height: "100%", width: "100%" }}
                  source={{ uri: route.params?.data.images[0] }}
                />
              </Pressable>
              <View style={{ flex: 1, height: "100%", width: "50%", gap: 5 }}>
                <Pressable
                  style={{ flex: 1, height: "100%" }}
                  onPress={() =>
                    navigation.navigate("ZoomImage", {
                      url: route.params?.data.images[1],
                    })
                  }
                >
                  <Image
                    style={{ flex: 1, height: "100%", width: "100%" }}
                    source={{ uri: route.params?.data.images[1] }}
                  />
                </Pressable>
                <Pressable
                  style={{ flex: 1, height: "100%" }}
                  onPress={() =>
                    navigation.navigate("ZoomImage", {
                      url: route.params?.data.images[2],
                    })
                  }
                >
                  <Image
                    style={{ flex: 1, height: "100%", width: "100%" }}
                    source={{ uri: route.params?.data.images[2] }}
                  />
                </Pressable>
              </View>
            </View>
          )}
          {route.params?.data.images.length === 4 && (
            <View style={{ flex: 1, width: "100%", gap: 5 }}>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  height: "50%",
                  width: "100%",
                  gap: 5,
                }}
              >
                <Pressable
                  style={{ flex: 1, height: "100%" }}
                  onPress={() =>
                    navigation.navigate("ZoomImage", {
                      url: route.params?.data.images[0],
                    })
                  }
                >
                  <Image
                    style={{ flex: 1, height: "100%" }}
                    source={{ uri: route.params?.data.images[0] }}
                  />
                </Pressable>
                <Pressable
                  style={{ flex: 1, height: "100%" }}
                  onPress={() =>
                    navigation.navigate("ZoomImage", {
                      url: route.params?.data.images[1],
                    })
                  }
                >
                  <Image
                    style={{ flex: 1, height: "100%" }}
                    source={{ uri: route.params?.data.images[1] }}
                  />
                </Pressable>
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  height: "50%",
                  width: "100%",
                  gap: 5,
                }}
              >
                <Pressable
                  style={{ flex: 1, height: "100%" }}
                  onPress={() =>
                    navigation.navigate("ZoomImage", {
                      url: route.params?.data.images[2],
                    })
                  }
                >
                  <Image
                    style={{ flex: 1, height: "100%" }}
                    source={{ uri: route.params?.data.images[2] }}
                  />
                </Pressable>
                <Pressable
                  style={{ flex: 1, height: "100%" }}
                  onPress={() =>
                    navigation.navigate("ZoomImage", {
                      url: route.params?.data.images[3],
                    })
                  }
                >
                  <Image
                    style={{ flex: 1, height: "100%" }}
                    source={{ uri: route.params?.data.images[3] }}
                  />
                </Pressable>
              </View>
            </View>
          )}
        </View>
        <View
          style={{
            borderTopColor: "#ffffffaa",
            borderTopWidth: 2,
            borderBottomColor: "#ffffffaa",
            borderBottomWidth: 2,
            width: "100%",
            padding: 5,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-evenly",
          }}
        >
          <Pressable
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
            }}
            onPress={updateLike}
          >
            <Text style={{ color: "white" }}>{likeQt}</Text>
            <Icon
              name={isPressed ? "arrow-up-circle" : "arrow-up-circle-outline"}
              color={"white"}
              size={30}
            />
          </Pressable>
          <Pressable
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
            }}
            onPress={() =>
              navigation.navigate("Comment", { id: route.params?.id })
            }
          >
            <Text style={{ color: "white" }}>{route.params?.comments}</Text>
            <Icon name="chatbubbles-outline" color={"white"} size={30} />
          </Pressable>
        </View>
        <View style={{gap: 10}}>
          {data.length > 0 ? (
            data.map((data, index) => (
              <View style={{width: "100%", height: "auto", borderBottomColor: "#ffffffaa", borderBottomWidth: 2}} key={index}>
                <View
                  style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
                >
                  <Image
                    style={{ height: 40, width: 40, borderRadius: 40 }}
                    source={{ uri: data.data.userImage }}
                  />
                  <Text style={styles.usernameLabel}>{data.data.username}</Text>
                </View>
                <Text
                  style={{
                    color: "white",
                    fontSize: 16,
                    padding: 15
                  }}
                >
                  {data.data.comment}
                </Text>
              </View>
            ))
          ) : (
            <Text style={{margin: "auto", color: "white", fontSize: 20}}> Seja o primeiro a comentar! </Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PostFocused;
