import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { Button, Card, Title, Paragraph } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from './../../../assets/colors';
import { useNavigation } from '@react-navigation/native';
const fanFavouritesData = [
  {
    id: 1,
    title: 'Cosmopolis',
    image: require('../../../assets/images/movie1.jpg'),
    rating: 4.5,
    year: 2021,
  },
  {
    id: 2,
    title: 'Dog Days',
    image: require('../../../assets/images/movie2.jpg'),
    rating: 4.2,
    year: 2020,
  },
  {
    id: 3,
    title: 'Transylvania',
    image: require('../../../assets/images/movie3.jpg'),
    rating: 4.2,
    year: 2020,
  },
  {
    id: 4,
    title: 'J.I Joe',
    image: require('../../../assets/images/movie4.jpg'),
    rating: 4.2,
    year: 2020,
  },
  {
    id: 5,
    title: 'Ted',
    image: require('../../../assets/images/movie5.jpg'),
    rating: 4.2,
    year: 2020,
  },
  // Add more movies as needed
];

const FanFavouritesSection = () => {
 const navigator= useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.heading}>Fan Favourites</Text>
          <Text style={styles.description}>
            Check out what fans are loving right now
          </Text>
        </View>
        <Button mode="text" textColor='dodgerblue' style={styles.seeAllButton}>
          SEE ALL
        </Button>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {fanFavouritesData.map((movie) => (
          MovieCard(movie)
        ))}
      </ScrollView>
    </View>
  );

  function MovieCard(movie) {
    return <Card key={movie.id} style={styles.movieCard} onPress={()=>{navigator.navigate("Video")}}>
      <Card.Cover source={movie.image} style={styles.movieImage} />
      <Card.Content>
        <View style={styles.ratingContainer}>
          <Icon name="star" size={20} color="#FFD700" style={styles.starIcon} />
          <Text style={styles.rating}>{movie.rating}</Text>
        </View>
        <Title style={styles.movieTitle}>{movie.title}</Title>
        <Paragraph style={styles.releaseYear}>
          Release Year: {movie.year}
        </Paragraph>
      </Card.Content>
    </Card>;
  }
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#333333',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  heading: {
    fontSize: 24,
    borderRadius: 3,
    borderLeftWidth: 4,
    borderLeftColor: colors.yellow,
    paddingLeft: 13,
    marginBottom: 4,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: '#CCCCCC',
  },
  seeAllButton: {
    backgroundColor: 'transparent',
    color: 'dodgerblue',
  },
  movieCard: {
    width: 150,
    height: 350,
    marginRight: 10,
    shadowColor: '#000000',
    shadowRadius: 4,
    // Elevation for Android

    elevation: 5,
    backgroundColor: '#1f1f1f',
  },
  movieImage: {
    height: '60%',
    resizeMode: 'contain',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  rating: {
    fontSize: 16,
    color: '#FFFFFF',
    marginRight: 4,
  },
  starIcon: {
    width: 20,
    height: 20,
    // tintColor: '#FFD700',
  },
  movieTitle: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  releaseYear: {
    fontSize: 12,
    color: '#CCCCCC',
  },
});

export default FanFavouritesSection;
