import React from "react";
import { Alert, Keyboard } from "react-native";
import * as Notifications from "expo-notifications";
import * as Yup from "yup";
import Bugsnag from "@bugsnag/expo";

import { Form, FormField, SubmitButton } from "./forms";
import messagesApi from "../api/messages";
import useAuth from "../auth/useAuth";

function ContactSellerForm({ listing }) {
  const { user } = useAuth();
  // console.log(user);
  const handleSubmit = async ({ message }, { resetForm }) => {
    Keyboard.dismiss();

    const result = await messagesApi.sendMessage(
      message,
      listing._id,
      user.userId
    );

    // console.log(result.status);
    if (result.status !== 201) {
      console.log("Error", result);
      Bugsnag.notify(
        new Error("Could not send the message to the seller. Token Error")
      );
      return Alert.alert("Error", "Could not send the message to the seller.");
    }

    resetForm();
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: true,
      }),
    });
    Notifications.scheduleNotificationAsync({
      content: {
        title: "Awesome!",
        body: "Your message was sent to the seller.",
      },
      trigger: { seconds: 1 },
    });
  };

  return (
    <Form
      initialValues={{ message: "" }}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      <FormField
        maxLength={255}
        multiline
        name="message"
        numberOfLines={3}
        placeholder="Message..."
      />
      <SubmitButton title="Contact Seller" />
    </Form>
  );
}

const validationSchema = Yup.object().shape({
  message: Yup.string().required().min(1).label("Message"),
});

export default ContactSellerForm;
