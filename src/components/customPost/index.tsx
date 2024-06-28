import React, { useState } from "react";
import { View, Image, Text, Pressable } from "react-native";
import styles from "./styles";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

interface Props {
  image?: string[];
  location?: string;
  description?: string;
  username?: string;
  userImage?: string;
  comments?: number;
  navigateTo?: () => void;
}

const CustomPost: React.FC<Props> = ({
  image = [],
  location,
  description,
  username,
  userImage,
  comments,
  navigateTo,
}) => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const [isPressed, setIsPressed] = useState<boolean>(false);
  const [likeQt, setLikeQt] = useState<number>(Math.floor(Math.random() * 10));

  const updateLike = () => {
    setIsPressed(!isPressed);
    !isPressed ? setLikeQt(likeQt + 1) : setLikeQt(likeQt - 1);
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={navigateTo}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
        <Image
          style={{ height: 30, width: 30, borderRadius: 30 }}
          source={{ uri: userImage }}
        />
        <Text style={styles.usernameLabel}>{username}</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          alignItems: "center",
          height: 25,
          gap: 10
        }}
      >
        <Ionicons name="location-outline" color={"white"} size={15} />
        <Text adjustsFontSizeToFit style={styles.locationLabel}>
          {location.slice(0, 40) + "..."}
        </Text>
      </View>
      <Text
        style={{
          color: "white",
        }}
      >
        {description}
      </Text>
      </Pressable>
      <View style={styles.imageContainer}>
        {image.length < 3 &&
          image.map((url, index) => (
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
        {image.length === 3 && (
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
                navigation.navigate("ZoomImage", { url: image[0] })
              }
            >
              <Image
                style={{ flex: 1, height: "100%", width: "100%" }}
                source={{ uri: image[0] }}
              />
            </Pressable>
            <View style={{ flex: 1, height: "100%", width: "50%", gap: 5 }}>
              <Pressable
                style={{ flex: 1, height: "100%" }}
                onPress={() =>
                  navigation.navigate("ZoomImage", { url: image[1] })
                }
              >
                <Image
                  style={{ flex: 1, height: "100%", width: "100%" }}
                  source={{ uri: image[1] }}
                />
              </Pressable>
              <Pressable
                style={{ flex: 1, height: "100%" }}
                onPress={() =>
                  navigation.navigate("ZoomImage", { url: image[2] })
                }
              >
                <Image
                  style={{ flex: 1, height: "100%", width: "100%" }}
                  source={{ uri: image[2] }}
                />
              </Pressable>
            </View>
          </View>
        )}
        {image.length === 4 && (
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
                  navigation.navigate("ZoomImage", { url: image[0] })
                }
              >
                <Image
                  style={{ flex: 1, height: "100%" }}
                  source={{ uri: image[0] }}
                />
              </Pressable>
              <Pressable
                style={{ flex: 1, height: "100%" }}
                onPress={() =>
                  navigation.navigate("ZoomImage", { url: image[1] })
                }
              >
                <Image
                  style={{ flex: 1, height: "100%" }}
                  source={{ uri: image[1] }}
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
                  navigation.navigate("ZoomImage", { url: image[2] })
                }
              >
                <Image
                  style={{ flex: 1, height: "100%" }}
                  source={{ uri: image[2] }}
                />
              </Pressable>
              <Pressable
                style={{ flex: 1, height: "100%" }}
                onPress={() =>
                  navigation.navigate("ZoomImage", { url: image[3] })
                }
              >
                <Image
                  style={{ flex: 1, height: "100%" }}
                  source={{ uri: image[3] }}
                />
              </Pressable>
            </View>
          </View>
        )}
      </View>
      <View
        style={{
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
          <Ionicons
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
          onPress={navigateTo}
        >
          <Text style={{ color: "white" }}>{comments > 0 ? comments : '0'}</Text>
          <Ionicons name="chatbubbles-outline" color={"white"} size={30} />
        </Pressable>
      </View>
    </View>
  );
};

export default CustomPost;
