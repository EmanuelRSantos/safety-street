import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Register from "../pages/register";
import SplashScreen from "../pages/splashScreen";
import Login from "../pages/login";
import Initial from "../pages/initial";
import TabRoutes from "./tab.routes";
import Post from "../pages/post";
import ZoomImage from "../pages/zoomImage";
import UserImage from "../pages/userImage";
import PostFocused from "../pages/postFocused";
import Comment from "../pages/comment";

const Stack = createNativeStackNavigator();
const StackRoutes = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="SplashScreen"
    >
      <Stack.Screen name="ZoomImage" component={ZoomImage} />
      <Stack.Screen name="Comment" component={Comment} />
      <Stack.Screen name="PostFocused" component={PostFocused} />
      <Stack.Screen name="UserImage" component={UserImage} />
      <Stack.Screen name="Feed" component={TabRoutes} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Initial" component={Initial} />
      <Stack.Screen name="Post" component={Post} />
    </Stack.Navigator>
  );
};

export default StackRoutes;
