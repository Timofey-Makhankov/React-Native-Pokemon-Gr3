import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import LoginPage from "./src/components/pages/LoginPage";
import HomePage from "./src/components/pages/HomePage";
import { PaperProvider } from "react-native-paper";
import PokedexPage from "./src/components/pages/PokedexPage";
import ProfilePage from "./src/components/pages/ProfilePage";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CreateEditPage from "./src/components/pages/CreateEditPage/CreateEditPage";
import AuthorizationService from "./src/services/AuthorisationService";
import { useEffect, useState } from "react";
import RegistrationPage from "./src/components/pages/RegistrationPage";

const Tab = createMaterialBottomTabNavigator();
const Stack = createNativeStackNavigator();

/**
 * Entry Point of the App
 * @returns App Component
 */
export default function App() {
  const [initialRoute, setInitialRoute] = useState("Login");

  useEffect(() => {
    const checkToken = async () => {
      const hasToken = await AuthorizationService().checkActiveToken();
      setInitialRoute(hasToken ? "Home" : "Login");
    };

    checkToken();
  }, []);

  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={initialRoute}
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Main" component={MainTabs} />
          {/* <Stack.Screen name="CreateEdit" component={CreateEditPage} /> */}
          <Stack.Screen name="Login" component={LoginPage} />
          <Stack.Screen name="Registration" component={RegistrationPage} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen
        name="Home"
        component={HomePage}
        options={{ tabBarIcon: "home" }}
      />
      <Tab.Screen
        name="Pokédex"
        component={PokedexPage}
        options={{ tabBarIcon: "book" }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfilePage}
        options={{ tabBarIcon: "account" }}
      />
    </Tab.Navigator>
  );
}
