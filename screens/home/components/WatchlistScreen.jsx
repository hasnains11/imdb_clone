import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet, FlatList,  TouchableOpacity } from "react-native";
import { Card, Title, List,Paragraph, Divider } from "react-native-paper";
import { useWatchlistContext } from "../../../contexts/watchlistContext";
import { colors } from "../../../assets/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { getImagesDownloadLink } from "../../../contexts/api";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
const WatchListScreen = () => {
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const { watchlists,movies, getMoviesInWatchList} = useWatchlistContext();

  const navigator=useNavigation();
console.log(movies,"selectedPlaylist+++++")
  const handlePlaylistSelect = (playlist) => {
    getMoviesInWatchList(playlist.id);
    setSelectedPlaylist(playlist);
  };
  const renderPlaylistItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.playlistCapsule, selectedPlaylist === item && styles.selectedCapsule]}
      onPress={() => handlePlaylistSelect(item)}
    >
      <Text style={styles.playlistTitle}>{item.title}</Text>
    </TouchableOpacity>
  );
  return (
    <SafeAreaView style={{ height: "100%" }}>
      <ScrollView style={styles.container}>
        <Text style={styles.heading}>Your Watchlists</Text>
        <FlatList
          data={watchlists}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderPlaylistItem}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ marginVertical: 5 }}
        />

        <Divider style={styles.divider} />

        {selectedPlaylist ? (
          <>
            <Text style={styles.heading}>{selectedPlaylist.title}</Text>
            <FlatList
              data={movies}
              keyExtractor={(item) => item.id.toString()}
              numColumns={2}
              renderItem={({ item }) => MovieCard(item,navigator)}
              contentContainerStyle={styles.movieGrid}
            />
          </>
        ) : (
          <Text>Please select a playlist to see movies.</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: colors.darkBackground,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 14,
    color: colors.yellow
  },
  playlistCapsule: {
    backgroundColor: "#e0e0e0",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
  },
  selectedCapsule: {
    backgroundColor: "dodgerblue",
  },
  playlistTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
  movieCard: {
    flex: 1, // Set flex to 1 to distribute the width evenly
    margin: 8, 
    backgroundColor:colors.darkGrey// Add margin for spacing between movie cards
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
  movieGrid: {
    justifyContent: 'space-between', // Add this to evenly space the columns
  }
});

export default WatchListScreen;

function MovieCard(movie,navigator) {
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