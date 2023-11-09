import React, { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  SafeAreaView,
  Image,
  Text,
} from "react-native";
import { Chip, Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { LOGIN_PAGE } from "../../util/ScreenRouterLinks";
import AuthorizationService from "../../services/AuthorisationService";

function ProfilePage() {
  const navigation = useNavigation();
  const [user, setUser] = useState<UserDetail | undefined>(undefined);

  useEffect(() => {
    SecureStore.getItemAsync("user_detail").then((result: string | null) => {
      if (result !== null) {
        setUser(JSON.parse(result));
      }
    });
  }, []);

  return (
    <ImageBackground
      source={require("../../../assets/wp10311654.png")}
      style={styles.backgroundImage}
      blurRadius={8}
    >
      <SafeAreaView style={[styles.screen]}>
        {user && (
          <React.Fragment>
            <Image
              source={require("../../../assets/profile_icon.png")}
              style={styles.logo}
            />

            <Chip style={styles.field}>
              <Text style={styles.chipText}>{user.email}</Text>
            </Chip>
            <Chip style={styles.field}>
              <Text style={styles.chipText}>{user.firstName}</Text>
            </Chip>
            <Chip style={styles.field}>
              <Text style={styles.chipText}>{user.lastName}</Text>
            </Chip>
            <Chip style={styles.field}>
              <Text style={styles.chipText}>{user.age}</Text>
            </Chip>
            <Button
              mode="contained"
              labelStyle={styles.buttonText}
              style={styles.registerButton}
              onPress={() => {
                AuthorizationService()
                  .logOut()
                  .then(() => {
                    console.log("Log Out successful");
                    navigation.navigate(LOGIN_PAGE as never);
                  })
                  .catch((error) => {
                    console.error(
                      "An error occurred during Logging out:",
                      error
                    );
                    alert("An error occurred during Log Out.");
                  });
              }}
            >
              Log Out
            </Button>
          </React.Fragment>
        )}
      </SafeAreaView>
    </ImageBackground>
  );
}

export type UserDetail = {
  id?: number;
  email: string;
  firstName?: string;
  lastName?: string;
  age?: number;
};

const styles = StyleSheet.create({
  screen: {
    display: "flex",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backgroundImage: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  logo: {
    width: 150,
    height: 150,
  },
  field: {
    width: Dimensions.get("window").width * 0.8,
    height: 56,
    marginVertical: 10,
    borderRadius: 5,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    color: "#fff",
    alignItems: "center",
  },
  chipText: {
    color: "white",
    fontSize: 15,
  },
  registerButton: {
    marginTop: 25,
    width: Dimensions.get("window").width * 0.4,
    borderRadius: 10,
    borderWidth: 1.5,
    backgroundColor: "#FFCB05",
    borderColor: "#2F6DB4",
  },
  buttonText: {
    color: "#000",
  },
});

export default ProfilePage;
