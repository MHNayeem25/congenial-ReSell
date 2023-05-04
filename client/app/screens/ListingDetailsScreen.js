import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Platform,
  Keyboard,
  KeyboardAvoidingView,
} from "react-native";

import { Image } from "react-native-expo-image-cache";

import colors from "../config/colors";
import ListItem from "../components/lists/ListItem";
import Text from "../components/Text";
import ContactSellerForm from "../components/ContactSellerForm";
import { getUserById } from "../api/user";

function ListingDetailsScreen({ route }) {
  const { listing, user } = route.params;
  const [author, setAuthor] = useState();
  const userId = listing.userId;

  const findAuthor = async (userId) => {
    const response = await getUserById(userId);
    if (response.status === 200) {
      const data = response.data.user;
      setAuthor(data);
    }
  };
  useEffect(() => {
    findAuthor(userId);
    // console.log(author);
  }, []);
  // console.log(listing);
  //get the user who posted the current listing by using listing.userId
  return (
    <KeyboardAvoidingView
      behavior="position"
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 100}
    >
      <Image
        style={styles.image}
        tint="light"
        preview={{ uri: listing.image[0].thumbnailUrl }}
        uri={listing.image[0].imageUri}
      />
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{listing.title}</Text>
        <Text style={styles.price}>{"$" + listing.price}</Text>
        <View style={styles.userContainer}>
          {author ? (
            <ListItem
              image={require("../assets/mosh.jpg")}
              title={author.name}
              subTitle="5 Listings"
            />
          ) : null}
        </View>
        {user ? null : <ContactSellerForm listing={listing} />}
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  detailsContainer: {
    padding: 20,
  },
  image: {
    width: "100%",
    height: 300,
  },
  price: {
    color: colors.secondary,
    fontWeight: "bold",
    fontSize: 20,
    marginVertical: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "500",
  },
  userContainer: {
    marginVertical: 40,
  },
});

export default ListingDetailsScreen;
