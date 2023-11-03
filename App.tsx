import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginPage from "./src/components/pages/LoginPage";
import HomePage from "./src/components/pages/HomePage";
import { PaperProvider } from "react-native-paper";
import PokedexPage from "./src/components/pages/PokedexPage";

const Tab = createMaterialBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <PaperProvider>
       <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Home" component={HomePage} />
          <Tab.Screen name="Login" component={LoginPage} />
          <Tab.Screen name="Pokédex" component={PokedexPage} />
        </Tab.Navigator>
        </NavigationContainer>
        <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginPage} />
        </Stack.Navigator>
        </NavigationContainer>
    </PaperProvider>
  );
}
