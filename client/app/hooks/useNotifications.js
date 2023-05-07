import React, { useEffect } from "react";
import { registerPushToken } from "../api/expoPushTokens";
import Bugsnag from "@bugsnag/expo";
import * as Notifications from "expo-notifications";

export default useNotifications = (user, notificationListener) => {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: true,
    }),
  });

  const registerForPushNotifications = async (user) => {
    try {
      await Notifications.requestPermissionsAsync();

      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }

      // const permission = await Notifications.getPermissionsAsync();
      // if (!permission.granted) return;
      const token = await Notifications.getExpoPushTokenAsync({
        projectId: "d3caacf8-1ad8-4cf9-86ac-3e01d901f305",
      });

      if (Platform.OS === "android") {
        Notifications.setNotificationChannelAsync("default", {
          name: "default",
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: "#FF231F7C",
        });
      }

      /**     */
      const metadata = {
        token,
      };
      Bugsnag.leaveBreadcrumb("Token", metadata);
      /**      */

      // console.log(token.data);
      registerPushToken(token.data, user.userId);
    } catch (error) {
      Bugsnag.notify(error);
      console.log("Error getting a push token", error);
    }
  };

  useEffect(() => {
    registerForPushNotifications(user);
    if (notificationListener)
      Notifications.addNotificationResponseReceivedListener(
        notificationListener
      );
  }, []);
};
