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
import { LOGIN_PAGE, BOTTOM_NAV_BAR } from "../../util/ScreenRouterLinks";

function RegistrationPage() {
  const navigation = useNavigation();

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        age: "",
      }}
      validationSchema={Yup.object({
        email: Yup.string().email().required("Required"),
        password: Yup.string().required("Required"),
        age: Yup.string()
          .matches(/^[0-9]+$/, "Age must contain only numbers")
          .max(2),
      })}
      onSubmit={async (values, { setSubmitting }) => {
        AuthorizationService()
          .registerUser(
            values.email,
            values.password,
            values.firstName,
            values.lastName,
            values.age
          )
          .then((accessToken) => {
            console.log("Registration successful. Access Token:", accessToken);
            navigation.navigate(BOTTOM_NAV_BAR as never);
          })
          .catch((error) => {
            console.error("An error occurred during Registration:", error);
            alert("An error occurred during Registration.");
          });

        values.email = "";
        values.password = "";
        values.firstName = "";
        values.lastName = "";
        values.age = "";
        setSubmitting(false);
      }}
    >
      {({ handleSubmit, values, handleChange, errors }) => (
        <ImageBackground
          source={require("../../../assets/wp10311654.png")}
          style={{ width: "100%", height: "100%" }}
          blurRadius={6}
        >
          <View style={styles.container}>
            <Image
              source={require("../../../assets/International_Pokémon_logo.svg.png")}
              style={styles.imageLogo}
            />
            <Text style={{ fontWeight: "600" }} variant="displayMedium">
              Regsiter
            </Text>
            <TextInput
              label="E-Mail"
              style={styles.inputField}
              mode="outlined"
              value={values.email}
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
            <TextInput
              label="Firstname"
              style={styles.inputField}
              mode="outlined"
              value={values.firstName}
              onChangeText={handleChange("firstName")}
              textColor="white"
              theme={{
                colors: {
                  onSurfaceVariant: "white",
                  primary: "white",
                },
              }}
            />
            {errors.firstName ? (
              <Text style={styles.errorText}>{errors.firstName}</Text>
            ) : null}
            <TextInput
              label="Lastname"
              style={styles.inputField}
              mode="outlined"
              value={values.lastName}
              onChangeText={handleChange("lastName")}
              textColor="white"
              theme={{
                colors: {
                  onSurfaceVariant: "white",
                  primary: "white",
                },
              }}
            />
            {errors.lastName ? (
              <Text style={styles.errorText}>{errors.lastName}</Text>
            ) : null}
            <TextInput
              label="Age"
              style={styles.inputField}
              mode="outlined"
              value={values.age}
              onChangeText={handleChange("age")}
              textColor="white"
              theme={{
                colors: {
                  onSurfaceVariant: "white",
                  primary: "white",
                },
              }}
            />
            {errors.age ? (
              <Text style={styles.errorText}>{errors.age}</Text>
            ) : null}
            <Text
              variant="titleSmall"
              style={styles.registerSwitchText}
              onPress={() => navigation.navigate(LOGIN_PAGE as never)}
            >
              Already Registered? Login
            </Text>
            <Button
              mode="contained"
              labelStyle={styles.buttonText}
              style={styles.registerButton}
              onPress={() => {
                handleSubmit();
              }}
            >
              Register
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
    marginTop: -10,
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
  registerButton: {
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
    textShadowColor: "FFFFFF",
  },
  buttonText: {
    color: "#000",
  },
});

export default RegistrationPage;
