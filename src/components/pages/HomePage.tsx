import { Text } from "react-native-paper"
import NavBar from "../molecules/NavBar"
import { View } from "react-native"

export default function HomePage () {
    return(
        <View style={{ flex: 1 }}>
        <Text>Home Page</Text>
        <NavBar/>
        </View>
    )
}