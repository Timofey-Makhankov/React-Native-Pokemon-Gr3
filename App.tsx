import React, { useContext, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import * as SecureStore from "expo-secure-store";
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  ImageBackground,
} from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import UserService from "./src/services/UserService";

async function save(values: { email: string; password: string }) {
  await SecureStore.setItemAsync(values);
  UserService.login(values);
}

async function authenticateUser() {
  let result = await SecureStore.getItemAsync();

  if (result == null) {
    alert("Invalid Login");
  } else {
    //navigation.navigate("home")
  }
}

export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <ImageBackground
      source={require("./assets/wp10311654.png")}
      style={{ width: "100%", height: "100%" }}
      blurRadius={6}
    >
      <View style={styles.container}>
        <Image
          source={require("./assets/International_Pokémon_logo.svg.png")}
          style={styles.imageLogo}
        />
        <Text variant="displayLarge">Login</Text>
        <TextInput
          label="E-Mail"
          style={styles.inputField}
          mode="outlined"
          value={email}
          onChangeText={setEmail}
          textColor="white"
          theme={{
            colors: {
              onSurfaceVariant: "white",
              primary: "white",
            },
          }}
        />
        <TextInput
          label="Password"
          style={styles.inputField}
          mode="outlined"
          value={password}
          onChangeText={setPassword}
          textColor="white"
          theme={{
            colors: {
              onSurfaceVariant: "white",
              primary: "white",
            },
          }}
          secureTextEntry={true}
        />
        <Text style={styles.registerSwitchText} variant="titleSmall">
          Register a new Account
        </Text>
        <Button
          mode="contained"
          labelStyle={styles.buttonText}
          style={styles.loginButton}
          onPress={() => {
            save({ email, password });
            authenticateUser();
          }}
        >
          Login
        </Button>
      </View>
    </ImageBackground>
  );
}

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageLogo: {
    marginTop: -50,
    width: width * 0.9,
    height: 128,
  },
  inputField: {
    width: width * 0.8,
    height: 56,
    marginVertical: 10,
    borderRadius: 5,
    backgroundColor: "rgba(000, 000, 000, 0.5)",
    color: "#FFFFFF",
  },
  registerSwitchText: {
    color: "#FFFFFF",
  },
  loginButton: {
    marginTop: 25,
    width: width * 0.4,
    borderRadius: 10,
    borderWidth: 1.5,
    backgroundColor: "#FFCB05",
    borderColor: "#2F6DB4",
  },
  buttonText: {
    color: "#000",
  },
});
