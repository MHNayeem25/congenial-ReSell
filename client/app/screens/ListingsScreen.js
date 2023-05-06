import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, RefreshControl } from "react-native";

import Card from "../components/Card";
import colors from "../config/colors";
import Screen from "../components/Screen";
import routes from "../navigation/routes";
import ActivityIndicator from "../components/ActivityIndicator";
import useApi from "../hooks/useApi";
import { getListings } from "../api/listings";
import useAuth from "../auth/useAuth";

function ListingsScreen({ navigation }) {
  const { user } = useAuth();
  const {
    data: listings,
    error,
    loading,
    request: loadListings,
  } = useApi(getListings);

  useEffect(() => {
    loadListings();
    // loadListings(user.userId);
  }, []);
  return (
    <>
      <ActivityIndicator visible={loading} />
      <Screen style={styles.screen}>
        <FlatList
          data={listings}
          keyExtractor={(listing) => listing._id.toString()}
          refreshControl={
            <RefreshControl refreshing={false} onRefresh={loadListings} />
          }
          renderItem={({ item }) => (
            <Card
              title={item.title}
              subTitle={"$" + item.price}
              imageUrl={item.image[0].imageUri}
              onPress={() =>
                navigation.navigate(routes.LISTING_DETAILS, {
                  listing: item,
                  user: false,
                })
              }
              thumbnailUrl={item.image[0].thumbnailUrl}
            />
          )}
        />
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 20,
    backgroundColor: colors.light,
  },
});

export default ListingsScreen;
