import { useTheme } from "native-base";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";

import { AppRoutes } from "./app.routes";
import { Notification } from "../components/Notification";
import { useEffect, useState } from "react";
import OneSignal, { OSNotification } from "react-native-onesignal";
import * as Linking from "expo-linking";

const linking = {
  prefixes: ["igniteshoesapp://", "com.giovannymassuia.igniteshoesapp://"],
  config: {
    screens: {
      details: {
        path: "details/:productId",
        parse: {
          productId: (productId: string) => productId,
        },
      },
    },
  },
};

export function Routes() {
  const { colors } = useTheme();
  const [notification, setNotification] = useState<OSNotification>();

  useEffect(() => {
    const unsubscribe = OneSignal.setNotificationWillShowInForegroundHandler(
      (notificationReceivedEvent) => {
        const response = notificationReceivedEvent.getNotification();
        setNotification(response);
      }
    );

    return () => unsubscribe;
  }, []);

  const theme = DefaultTheme;
  theme.colors.background = colors.gray[700];

  return (
    <NavigationContainer theme={theme} linking={linking}>
      <AppRoutes />

      {notification?.title && (
        <Notification
          data={notification}
          onClose={() => setNotification(undefined)}
        />
      )}
    </NavigationContainer>
  );
}
