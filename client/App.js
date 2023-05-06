import React, { useCallback, useEffect, useState } from "react";
import { View } from "react-native";

import axios from "axios";
import { NavigationContainer } from "@react-navigation/native";
import AuthNavigator from "./app/navigation/AuthNavigator";
import navigationTheme from "./app/navigation/navigationTheme";
import AppNavigator from "./app/navigation/AppNavigator";
import OfflineNotice from "./app/components/OfflineNotice";
import AuthContext from "./app/auth/context";
import authStorage from "./app/auth/storage";
import { navigationRef } from "./app/navigation/rootNavigation";

import * as SplashScreen from "expo-splash-screen";

import { AXIOS_URL } from "@env";
import settings from "./app/config/settings";
axios.defaults.baseURL = settings.AXIOS_URL;
// axios.defaults.baseURL = "http://192.168.16.77:4000/api"; //for emulator

export default function App() {
  const [user, setUser] = useState();
  const [isReady, setIsReady] = useState(false);

  const restoreUser = async () => {
    try {
      SplashScreen.preventAutoHideAsync();
      const user = await authStorage.getUser();
      if (user) setUser(user);
    } catch (error) {
    } finally {
      setIsReady(true);
    }
  };

  useEffect(() => {
    restoreUser();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (isReady) {
      try {
        //Hide the splash screen
        await SplashScreen.hideAsync();
      } catch (error) {}
    }
  }, [isReady]);

  if (!isReady) {
    return null;
  }

  return (
    <View onLayout={onLayoutRootView} style={{ flex: 1 }}>
      <AuthContext.Provider value={{ user, setUser }}>
        <OfflineNotice />
        <NavigationContainer ref={navigationRef} theme={navigationTheme}>
          {user ? <AppNavigator /> : <AuthNavigator />}
        </NavigationContainer>
      </AuthContext.Provider>
    </View>
  );
}
