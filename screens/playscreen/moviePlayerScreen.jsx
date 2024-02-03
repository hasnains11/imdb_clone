import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Video } from "expo-av";
import { colors } from "../../assets/colors";
import { getVideoDownloadLink } from "../../contexts/api";
import NowPlayingSection from "./nowPlaying";
import WelcomeScreen from "./welcome";

const MoviePlayerScreen = ({ route }) => {
  const [videoIsReady,setVideoIsReady]=useState(false);
  console.log("route", route);
  const movie = route?.params?.movie;
  // Sample video source
  console.log("MoviePlayerScreen");
  
  if(!movie) return <WelcomeScreen/>
  const videoSource = movie
    ? { uri: getVideoDownloadLink(movie.videoURL) }
    : require("../../assets/videos/mv.mp4");
 
 
  return (
    <View style={{ backgroundColor: colors.black ,flex:1}}>
      <Video
        source={videoSource}
        useNativeControls
        resizeMode="contain"
        shouldPlay={false}
        rate={1.0}
        volume={1.0}
        isMuted={false}
        onReadyForDisplay={() => setVideoIsReady(true)}
        style={styles.videoPlayer}
      />
      <NowPlayingSection movie={movie} />
    </View>
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
    height: "35%",
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
