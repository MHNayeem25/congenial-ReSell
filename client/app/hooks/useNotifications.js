import React, { useEffect } from "react";
import { registerPushToken } from "../api/expoPushTokens";

import * as Notifications from "expo-notifications";

export default useNotifications = (user, notificationListener) => {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: true,
    }),
  });
  async function schedulePushNotification() {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "You've got mail! 📬",
        body: "Here is the notification body",
        data: { data: "goes here" },
      },
      trigger: { seconds: 1 },
    });
  }

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
        projectId: "b74817d5-3b28-4b11-9e84-b5e2fc1d145b",
      });

      if (Platform.OS === "android") {
        Notifications.setNotificationChannelAsync("default", {
          name: "default",
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: "#FF231F7C",
        });
      }

      // console.log(token.data);
      registerPushToken(token.data, user.userId);
    } catch (error) {
      console.log("Error getting a push token", error);
    }
  };

  const sendPushNotificationHandler = () => {
    fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      header: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: "ExponentPushToken[cHgj-5JKL4kgo7HmLKYENv]",
        title: "This is test",
        body: "This is a test notification.",
      }),
    });
  };

  useEffect(() => {
    registerForPushNotifications(user);
    if (notificationListener)
      Notifications.addNotificationResponseReceivedListener(
        notificationListener
      );
  }, []);
};
