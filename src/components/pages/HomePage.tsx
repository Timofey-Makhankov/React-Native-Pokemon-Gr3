import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Image,
  Text,
  View,
  SafeAreaView,
} from "react-native";

/**
 * The Homepage of the Application
 * @returns Home Page component
 */
export default function HomePage() {
  return (
    <ImageBackground
      source={require("../../../assets/wp10311654.png")}
      style={styles.backgroundImage}
      blurRadius={8}
    >
      <SafeAreaView style={[styles.screen]}>
        <Image
          style={{ width: "100%", height: "15%", marginTop: 32 }}
          source={require("../../../assets/International_Pokémon_logo.svg.png")}
          resizeMode="contain"
        />
        <Image
          style={{ width: "100%", height: "50%", marginTop: 20 }}
          source={require("../../../assets/pikachu.png")}
          resizeMode="contain"
        ></Image>
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontSize: 28, color: "white" }}>
            Gotta Catch 'Em All!
          </Text>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  screen: {
    display: "flex",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  backgroundImage: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  }
});
