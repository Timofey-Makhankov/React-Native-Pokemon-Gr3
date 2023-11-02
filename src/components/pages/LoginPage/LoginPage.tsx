import React, { useState } from "react";
import { View, StyleSheet, Image, Dimensions } from "react-native";
import {
  TextInput,
  Button,
  Text,
  Provider as PaperProvider,
} from "react-native-paper";
import { Formik } from "formik";
import * as Yup from "yup";

function Loginpage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const style = useState;

  const handleLogin = () => {
    console.log("E-Mail:", email);
    console.log("Password:", password);
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(5, "Password must be at least 5 characters")
      .required("Password is required"),
  });

  function handleChange(
    arg0: string
  ): (((text: string) => void) & Function) | undefined {
    throw new Error("Function not implemented.");
  }

  return (
    <Formik
      enableReinitialize
      validate={(values) => {
        const errors: { email?: string } = {};

        if (!values.email) {
          errors.email = "Required";
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = "Invalid email address";
        }

        return errors;
      }}
      // onSubmit={(values, { setSubmitting }) => {
      //   UserService()
      //     .logIn(values.email, values.password)
      //     .then((response) => {
      //       localStorage.setItem("accessToken", response["accessToken"])
      //       navigate("/author", { replace: true });
      //     });
      //   setSubmitting(false);
      // }}
    >
      {({ isSubmitting, isValid }) => (
        <PaperProvider theme={customTheme}>
          <View style={styles.container}>
            <Image
              source={{
                uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/2560px-International_Pok%C3%A9mon_logo.svg.png",
              }}
              style={styles.imageLogo}
            />
            <Text variant="displayLarge">Login</Text>
            <TextInput
              style={styles.inputField}
              label="E-Mail"
              value={values.email}
              onChangeText={handleChange("email")}
              mode="outlined"
            />
            <TextInput
              style={styles.inputField}
              label="Password"
              value={values.password}
              onChangeText={handleChange("password")}
              mode="outlined"
              secureTextEntry={true}
            />
            <Text style={styles.registerSwitchText} variant="titleSmall">
              Register a new Account
            </Text>
            <Button
              mode="contained"
              onPress={handleSubmit}
              labelStyle={styles.buttonText}
              style={styles.loginButton}
              disabled={isSubmitting || !isValid}
            >
              Login
            </Button>
          </View>
        </PaperProvider>
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
    backgroundColor: "#000000",
    color: "#FFFFFF",
    opacity: 0.5,
  },
  registerSwitchText: {
    // color: "#FFFFFF",
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

export default Loginpage();
