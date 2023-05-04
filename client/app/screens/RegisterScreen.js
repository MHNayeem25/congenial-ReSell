import React, { useState } from "react";
import { StyleSheet } from "react-native";
import * as Yup from "yup";

import Screen from "../components/Screen";
import {
  Form,
  FormField,
  SubmitButton,
  ErrorMessage,
} from "../components/forms";
import { login, register } from "../api/auth";
import useAuth from "../auth/useAuth";
import ActivityIndicator from "../components/ActivityIndicator";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

function RegisterScreen() {
  const { logIn } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const handleSubmit = async (values) => {
    setLoading(true);
    // console.log(values);
    const response = await register(values);
    // console.log(response.response.data);
    if (response.status !== 200) {
      setLoading(false);
      if (response.response.data) {
        setError(response.response.data.error);
      } else {
        setError("An unexpected error occured.");
      }
      return;
    } else {
      const user = response.data.user;
      // console.log(response.data.user);
      if (user) {
        const result = await login(values.email, values.password);
        if (result.status !== 200) {
          return;
        }
        setLoading(false);
        logIn(result.data.token);
      }
    }
  };
  return (
    <>
      <ActivityIndicator visible={loading} />
      <Screen style={styles.container}>
        <Form
          initialValues={{ name: "", email: "", password: "" }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <ErrorMessage error={error} visible={error} />
          <FormField
            autoCorrect={false}
            icon="account"
            name="name"
            placeholder="Name"
          />
          <FormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="email"
            keyboardType="email-address"
            name="email"
            placeholder="Email"
            textContentType="emailAddress"
          />
          <FormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="lock"
            name="password"
            placeholder="Password"
            secureTextEntry
            textContentType="password"
          />
          <SubmitButton title="Register" />
        </Form>
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

export default RegisterScreen;
