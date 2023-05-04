import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import Text from "../components/Text";

import Screen from "../components/Screen";
import {
  ListItem,
  ListItemDeleteAction,
  ListItemSeparator,
} from "../components/lists";
import useAuth from "../auth/useAuth";

import messagesApi from "../api/messages";

function MessagesScreen(props) {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const recieveMessages = async (userId) => {
    const response = await messagesApi.getMessages(userId);
    setMessages(response.data);
    return response.data;
  };
  useEffect(() => {
    recieveMessages(user.userId);
  }, []);

  const handleDelete = async (message) => {
    // Delete the message from messages
    const response = await messagesApi.delMessage(message._id);
    if (response.status === 200) {
      setMessages(messages.filter((m) => m.id !== message.id));
    }
  };

  return (
    <Screen>
      {messages.length === 0 ? (
        <View style={styles.empty}>
          <Text>No Messages!</Text>
        </View>
      ) : (
        <FlatList
          data={messages}
          keyExtractor={(message) => message._id.toString()}
          renderItem={({ item }) => (
            <GestureHandlerRootView>
              <ListItem
                title={"Title"}
                subTitle={item.content}
                image={require("../assets/mosh.jpg")}
                onPress={() => console.log("Message selected", item)}
                renderRightActions={() => (
                  <ListItemDeleteAction onPress={() => handleDelete(item)} />
                )}
              />
            </GestureHandlerRootView>
          )}
          ItemSeparatorComponent={ListItemSeparator}
          refreshing={refreshing}
          onRefresh={() => {
            recieveMessages(user.userId);
          }}
        />
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  empty: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default MessagesScreen;
