import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { Button, Card, Title, Paragraph } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { colors } from "./../../../assets/colors";
import { useNavigation } from "@react-navigation/native";
import { useMovieContext } from "../../../contexts/moviescontext";
import { getImagesDownloadLink } from './../../../contexts/api';

const ComingSoonSection = () => {
  const movieContext = useMovieContext();
  const navigator = useNavigation();
  const comingSoonData = [...movieContext.comingSoonMovies];
 
  function MovieCard(movie) {
    let ratings=0;
    if (movie.rates.length !== 0) {
      ratings =
        movie.rates.map((r) => r.rate).reduce((a, b) => a + b, 0) /
        movie.rates.length;
    } 
    const year = movie.releaseDate.split("/")[2];

    return (
      <Card
        key={movie.id}
        style={styles.movieCard}
        onPress={() => {
          navigator.navigate("VideoPlayer",{movie});
        }}
      >
        <Card.Cover source={{uri: getImagesDownloadLink(movie.imageURL)}} style={styles.movieImage} />
        <Card.Content>
          <View style={styles.ratingContainer}>
            <Icon
              name="star"
              size={20}
              color="#FFD700"
              style={styles.starIcon}
            />
            <Text style={styles.rating}>{ratings.toFixed(1)}</Text>
          </View>
          <Title style={styles.movieTitle}>{movie.title}</Title>
          <Paragraph style={styles.releaseYear}>
            Release Year: {year}
          </Paragraph>
        </Card.Content>
      </Card>
    );
  }
 
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View >
          <Text style={styles.heading}>Coming Soon</Text>
          <Text style={styles.description}>
            These are coming soon movies
          </Text>
        </View>
        <Button mode="text" textColor="dodgerblue" style={styles.seeAllButton}
      onPress={()=>navigator.navigate("MovieViewScreen",{movies:comingSoonData,screenTitle:"Coming Soon"})}
    >
          SEE ALL
        </Button>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {comingSoonData.reverse().map((movie) => MovieCard(movie))}
      </ScrollView>
    </View>
  );


};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#333333",
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  heading: {
    fontSize: 24,
    borderRadius: 3,
    borderLeftWidth: 4,
    borderLeftColor: colors.yellow,
    paddingLeft: 13,
    marginBottom: 4,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  description: {
   
    fontSize: 14,
    color: "#CCCCCC",
  },
  seeAllButton: {
   
    backgroundColor: "transparent",
    color: "dodgerblue",
  },
  movieCard: {
    width: 150,
    height: 350,
    marginRight: 10,
    shadowColor: "#000000",
    shadowRadius: 4,
    // Elevation for Android

    elevation: 5,
    backgroundColor: "#1f1f1f",
  },
  movieImage: {
    height: "60%",
    resizeMode: "contain",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 2,
  },
  rating: {
    fontSize: 16,
    color: "#FFFFFF",
    marginRight: 4,
  },
  starIcon: {
    width: 20,
    height: 20,
    // tintColor: '#FFD700',
  },
  movieTitle: {
    fontSize: 14,
    lineHeight:22,
    color: "#FFFFFF",
  },
  releaseYear: {
    fontSize: 12,
    color: "#CCCCCC",
  },
});

export default ComingSoonSection;
