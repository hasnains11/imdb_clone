import React, { useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Video } from "expo-av";
import { colors } from "../../assets/colors";

const MoviePlayerScreen = ({ route }) => {
  const [videoIsReady, setVideoIsReady] = useState(false);
  console.log(route);
  // Sample video source
  const videoSource = require("./../../assets/videos/mv.mp4");
  return (
    <Video
      source={videoSource}
      useNativeControls
      resizeMode="contain"
      onReadyForDisplay={() => setVideoIsReady(true)}
      style={styles.videoPlayer}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // width: "100%",
    // backgroundColor: "black",
  },
  videoPlayer: {
    // flex: 1,
    // height:400,
    height: "40%",
    top: 0,
    left: 0,

    width: "100%",
    resizeMode: "contain",
  },
  detailsContainer: {
    backgroundColor: colors.darkBackground,
  },
  title: {
    fontSize: 24,
    paddingHorizontal: 20,
    fontWeight: "bold",
    color: "white",
    marginBottom: 4,
  },
  smallPoster: {
    width: 100,
    height: 150,
    borderRadius: 8,
    marginRight: 10,
  },
  description: {
    fontSize: 16,
    color: "white",
    flex: 1,
  },
});

export default MoviePlayerScreen;
