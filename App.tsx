import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import LoginPage from "./src/components/pages/LoginPage";
import HomePage from "./src/components/pages/HomePage";
import { PaperProvider } from "react-native-paper";
import PokedexPage from "./src/components/pages/PokedexPage";
import ProfilePage from "./src/components/pages/ProfilePage";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CreateEditPage from "./src/components/pages/CreateEditPage";

const Tab = createMaterialBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Main" component={MainTabs} />
          <Stack.Screen name="CreateEdit" component={CreateEditPage} />
          <Stack.Screen name="Login" component={LoginPage} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen name="Home" component={HomePage} options={{ tabBarIcon: 'home' }} />
      <Tab.Screen name="Pokédex" component={PokedexPage} options={{ tabBarIcon: 'book' }} />
      <Tab.Screen name="Profile" component={ProfilePage} options={{ tabBarIcon: 'account' }} />
    </Tab.Navigator>
  );
}

