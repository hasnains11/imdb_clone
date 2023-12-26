import React from "react";
import { Card, Title, Paragraph } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { getImagesDownloadLink } from "./../../../contexts/api";

const MovieCard = ({ movie, onPress }) => {
  const year = movie.releaseDate.split("/")[2];

  let ratings = 0;
  if (movie.rates.length !== 0) {
    ratings =
      movie.rates.map((r) => r.rate).reduce((a, b) => a + b, 0) /
      movie.rates.length;
  }
  return (
    <TouchableOpacity onPress={onPress} style={styles.cardContainer}>
      <Card style={styles.movieCard}>
        <Card.Cover
          source={{ uri: getImagesDownloadLink(movie.imageURL) }}
          style={styles.movieImage}
        />
        <Card.Content style={{ height: "50%", justifyContent: "space-around" }}>
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
          <Paragraph style={styles.releaseYear}>Release Year: {year}</Paragraph>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    // Take up all screen space
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 12,
  },
  movieCard: {
    width: "100%",
    height: 250,
    backgroundColor: "#1f1f1f",
  },
  movieImage: {
    height: "50%",

    resizeMode: "cover",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 4,
    marginVertical: 2,
  },
  rating: {
    fontSize: 16,
    color: "#FFFFFF",
    marginRight: 4,
  },
  starIcon: {
    width: 20,
    height: 20,
  },
  movieTitle: {
    fontSize: 14,
    lineHeight: 22,
    color: "#FFFFFF",
  },
  releaseYear: {
    fontSize: 12,
    color: "#CCCCCC",
  },
});

export default MovieCard;
