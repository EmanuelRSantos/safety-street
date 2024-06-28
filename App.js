import { GluestackUIProvider } from "@gluestack-ui/themed";
import Routes from "./src/routes";
import { useFonts, MedulaOne_400Regular } from "@expo-google-fonts/medula-one";
import {
  Poppins_100Thin,
  Poppins_200ExtraLight,
  Poppins_300Light,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_800ExtraBold,
  Poppins_900Black,
  Poppins_400Regular,
} from "@expo-google-fonts/poppins";
import { config } from "@gluestack-ui/config";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as NavigationBar from "expo-navigation-bar";
import React, { useEffect, useState } from "react";

const App = () => {
  let [fontsLoaded] = useFonts({
    MedulaOne_400Regular,
    Poppins_100Thin,
    Poppins_200ExtraLight,
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_800ExtraBold,
    Poppins_900Black,
  });

  NavigationBar.setBackgroundColorAsync("#072960");

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <GluestackUIProvider config={config}>
        <Routes />
        <StatusBar style="light" />
      </GluestackUIProvider>
    </SafeAreaProvider>
  );
};

export default App;
