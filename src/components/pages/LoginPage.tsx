import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  ImageBackground,
} from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import AuthorizationService from "../../../src/services/AuthorisationService";
import { useNavigation } from "@react-navigation/native";
import { REGISTER_PAGE, BOTTOM_NAV_BAR } from "../../util/ScreenRouterLinks";

export default function App() {
  const navigation = useNavigation();

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={Yup.object({
        email: Yup.string().email().required("Required"),
        password: Yup.string().required("Required"),
      })}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          const authService = AuthorizationService(); // Call the function to get an instance of AuthorizationService
          const accessToken = await authService.logInUser(
            values.email,
            values.password
          );

          console.log(accessToken);

          if (accessToken) {
            console.log("Login successful. Access Token:", accessToken);
            navigation.navigate(BOTTOM_NAV_BAR as never);
          } else {
            console.log("Login failed. No access token received.");
            alert("Invalid Login");
          }
        } catch (error) {
          console.error("An error occurred during login:", error);
          alert("An error occurred during login.");
        }

        setSubmitting(false);
      }}
    >
      {({ handleSubmit, values, handleChange, errors }) => (
        <ImageBackground
          source={require("../../../../assets/wp10311654.png")}
          style={{ width: "100%", height: "100%" }}
          blurRadius={6}
        >
          <View style={styles.container}>
            <Image
              source={require("../../../../assets/International_Pokémon_logo.svg.png")}
              style={styles.imageLogo}
            />
            <Text variant="displayLarge">Login</Text>
            <TextInput
              label="E-Mail"
              style={styles.inputField}
              mode="outlined"
              value={values.email} // The current email input value
              onChangeText={handleChange("email")}
              textColor="white"
              theme={{
                colors: {
                  onSurfaceVariant: "white",
                  primary: "white",
                },
              }}
            />
            {errors.email ? (
              <Text style={styles.errorText}>{errors.email}</Text>
            ) : null}
            <TextInput
              label="Password"
              style={styles.inputField}
              mode="outlined"
              value={values.password}
              onChangeText={handleChange("password")}
              textColor="white"
              theme={{
                colors: {
                  onSurfaceVariant: "white",
                  primary: "white",
                },
              }}
              secureTextEntry={true}
            />
            {errors.password ? (
              <Text style={styles.errorText}>{errors.password}</Text>
            ) : null}
            <Text
              style={styles.registerSwitchText}
              variant="titleSmall"
              onPress={() => navigation.navigate(REGISTER_PAGE as never)}
            >
              Register a new Account
            </Text>
            <Button
              mode="contained"
              labelStyle={styles.buttonText}
              style={styles.loginButton}
              onPress={() => {
                handleSubmit();
              }}
            >
              Login
            </Button>
          </View>
        </ImageBackground>
      )}
    </Formik>
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
  errorText: {
    color: "#D62D2D",
    fontWeight: "700",
    textShadowColor: "#FFFFFF",
  },
  buttonText: {
    color: "#000",
  },
});
