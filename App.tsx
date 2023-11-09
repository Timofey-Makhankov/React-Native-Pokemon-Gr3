import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import LoginPage from "./src/components/pages/LoginPage";
import HomePage from "./src/components/pages/HomePage";
import { PaperProvider } from "react-native-paper";
import PokedexPage from "./src/components/pages/PokedexPage";
import ProfilePage from "./src/components/pages/ProfilePage";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CreateEditPage from "./src/components/pages/CreateEditPage";
import AuthorizationService from "./src/services/AuthorisationService";
import { useEffect, useState } from "react";
import RegistrationPage from "./src/components/pages/RegistrationPage";
import {
  BOTTOM_NAV_BAR,
  CREATE_PAGE,
  EDIT_PAGE,
  HOME_PAGE,
  LOGIN_PAGE,
  POKEDEX_PAGE,
  PROFILE_PAGE,
  REGISTER_PAGE,
} from "./src/util/ScreenRouterLinks";

const Tab = createMaterialBottomTabNavigator();
const Stack = createNativeStackNavigator();

/**
 * Entry Point of the App
 * @returns App Component
 */
export default function App() {
  const [initialRoute, setInitialRoute] = useState(LOGIN_PAGE);

  useEffect(() => {
    const checkToken = async () => {
      const hasToken = await AuthorizationService().checkActiveToken();
      setInitialRoute(hasToken ? HOME_PAGE : LOGIN_PAGE);
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
          <Stack.Screen name={BOTTOM_NAV_BAR} component={MainTabs} />
          <Stack.Screen
            name={CREATE_PAGE}
            initialParams={{ pokemonId: undefined, buttonText: "Create" }}
            component={CreateEditPage}
          />
          <Stack.Screen
            name={EDIT_PAGE}
            initialParams={{ pokemonId: undefined, buttonText: "Update" }}
            component={CreateEditPage}
          />
          <Stack.Screen name={LOGIN_PAGE} component={LoginPage} />
          <Stack.Screen name={REGISTER_PAGE} component={RegistrationPage} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator initialRouteName={HOME_PAGE}>
      <Tab.Screen
        name={HOME_PAGE}
        component={HomePage}
        options={{ tabBarIcon: "home" }}
      />
      <Tab.Screen
        name={POKEDEX_PAGE}
        component={PokedexPage}
        options={{ tabBarIcon: "book" }}
      />
      <Tab.Screen
        name={PROFILE_PAGE}
        component={ProfilePage}
        options={{ tabBarIcon: "account" }}
      />
    </Tab.Navigator>
  );
}
