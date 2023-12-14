import React from "react";
import { View, StyleSheet, Text, Image, Dimensions } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
const { width, height } = Dimensions.get("window");

const Slide = ({ item }) => {
  return (
    <View style={styles.cardView}>
      <Icon style={styles.playButton} name="play-circle-outline" size={50} color="#FFFFFF" />
      <Image style={styles.image} source={item.poster} />
      <View style={styles.overlay}>
        <Image source={item.poster} style={styles.smallPoster} />
        <View style={{backgroundColor: "rgba(0, 0, 0, 0.9)", flex:1,height:"82%" ,paddingLeft:7}}>
          <Text style={styles.overlayDescription}>{item.title}</Text>
          <Text style={styles.itemDescription}  numberOfLines={3} ellipsizeMode="tail" >
           {item.description}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardView: {
    height: "100%",
    width: "100%",
  },
  playButton: {
    width: 150,
    top:"30%",
    left:"46%",
    opacity: 0.9,
    position: 'absolute',
    zIndex: 1,
  },
  textView: {
    position: "absolute",
    bottom: 10,
    margin: 10,
    left: 5,
  },
  image: {
    width: width,
    height: "100%",
    borderRadius: 10,
    resizeMode: "cover",
  },
  itemTitle: {
    color: "white",
    fontSize: 22,
    shadowColor: "#000",
    shadowOffset: { width: 0.8, height: 0.8 },
    shadowOpacity: 1,
    shadowRadius: 3,
    marginBottom: 2,
    fontWeight: "bold",
    elevation: 5,
  },
  itemDescription: {
    color: "white",
    fontSize: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0.8, height: 0.8 },
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 5,
 
    // Set a fixed height for three lines to make sure ellipsis is triggered
  },
  overlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    padding: 7,
    flexDirection: "row",
    alignItems: "flex-end",
  },
  smallPoster: {
    width: 80,
    height: 100,
    borderRadius: 5,
    resizeMode: "contain",

  },
  overlayDescription: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default Slide;
