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
          style={styles.logoImage}
          source={require("../../../assets/International_Pokémon_logo.svg.png")}
          resizeMode="contain"
        />
        <Image
          style={styles.pickachuImage}
          source={require("../../../assets/pikachu.png")}
          resizeMode="contain"
        ></Image>
        <View style={styles.textContainer}>
          <Text style={styles.text}>
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
  logoImage: {
    width: "100%", 
    height: "15%", 
    marginTop: 32
  },
  pickachuImage: {
    width: "100%", 
    height: "50%", 
    marginTop: 20
  },
  textContainer: {
    alignItems: "center"
  },
  text: {
    fontSize: 28, 
    color: "white"
  },
  backgroundImage: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  }
});
