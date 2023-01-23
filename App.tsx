import { StatusBar } from "react-native";
import { NativeBaseProvider } from "native-base";
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";
import OneSignal, { OSNotification } from "react-native-onesignal";
import { Routes } from "./src/routes";

import { THEME } from "./src/theme";
import { Loading } from "./src/components/Loading";

import { CartContextProvider } from "./src/contexts/CartContext";
import { useEffect, useState } from "react";
import { Notification } from "./src/components/Notification";

// get from env file
const ONESIGNAL_APP_ID_ENV = process.env.ONE_SIGNAL_APP_ID!;
console.log("ONESIGNAL_APP_ID_ENV", ONESIGNAL_APP_ID_ENV);
OneSignal.setAppId(ONESIGNAL_APP_ID_ENV);

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  useEffect(() => {
    const unsubscribe = OneSignal.setNotificationOpenedHandler((event) => {
      console.log("notification opened a", event.action);
      console.log("notification opened n", event.notification);
    });

    return () => unsubscribe;
  }, []);

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <CartContextProvider>
        {fontsLoaded ? <Routes /> : <Loading />}
      </CartContextProvider>
    </NativeBaseProvider>
  );
}
