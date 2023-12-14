import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, ImageBackground, StyleSheet, Image,Text } from "react-native";
import Button from "../../components/Button";
const Welcome = () => {
  const navigator = useNavigation();
  return (
    <ImageBackground
      blurRadius={8}
      source={require("../../assets/images/background.jpg")}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={require("../../assets/images/imdb.png")}
          />
             <Text style={styles.tagline}>Welcome to IMDb</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="Login"
            color="yellow"
            textStyle={{ color: "black",fontWeight:"bold" }}
            onPress={() => navigator.navigate("Login")}
          />
          <Button
            color="yellow"
            title="Signup"
            textStyle={{ color: "black",fontWeight:"bold" }}
            onPress={() => navigator.navigate("Register")}
          />
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  logo: {
    width: 140,
    height: 140,
  },
  logoContainer: {
    position: "absolute",
    top: 220,
    width: "100%",
    alignItems: "center",
  },
  tagline: {
      color: "white",
      fontSize: 28,
      fontWeight: 'bold',
      marginBottom: 10,
      letterSpacing: 1.7,
      opacity: 0.9,
      
  },
  buttonContainer: {
    width: "100%",
    rowGap: 10,
    paddingHorizontal: 20,
    marginBottom: "40%",
  },
  backgroundImage: {
    height: "100%",
    resizeMode: "contain",
    justifyContent: "center",
    opacity: 0.99,
  },
});

export default Welcome;
