import React, { useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { colors } from "../../assets/colors";
import { getImagesDownloadLink } from "../../contexts/api";
import Icon from "react-native-vector-icons/FontAwesome";
import ReviewsList from "./reviewList";
import { addMovieToPlaylist } from "../../storage/playlistStorage";
import {
  addToWatchlist,
  clearWatchlist,
  isInWatchlist,
  removeFromWatchlist,
} from "../../storage/watchlistStorage";
import { useWatchlistContext } from "../../contexts/watchlistContext";

const NowPlayingSection = ({ movie }) => {
  const [isWatchlist, setIsWatchlist] = React.useState(false);
  const {
    watchlist,
    addMovieToWatchlist,
    removeMovieFromWatchlist,
  } = useWatchlistContext();


  useEffect(() => {
    setIsWatchlist(false);
    console.log("watchlist++", watchlist.some((item) => item.id === movie.id));
    if(watchlist.some((item) => item.id === movie.id)){
      setIsWatchlist(true);
    }
  }, [movie]);

  const renderMovieItem = ({ item, selected }) => (
    <TouchableOpacity style={styles.movieItemContainer} onPress={() => {}}>
      <Image source={item.poster} style={styles.moviePoster} />
      <View style={{ flexDirection: "column", alignItems: "flex-start" }}>
        <Text style={styles.movieTitle}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  const handleAddToWatchList = () => {
    console.log("add to watchlist");
    if (!isWatchlist) {
      console.log("true");
      addMovieToWatchlist(movie)
      setIsWatchlist(true);
    } else {
      removeMovieFromWatchlist(movie.id);
      setIsWatchlist(false);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <Text style={{ ...styles.sectionTitle, color: "white" }}>
          Now Playing
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          margin: 10,
          overflow: "hidden",
          height: 150,
        }}
      >
        <Image
          source={{ uri: getImagesDownloadLink(movie?.imageURL) }}
          style={{ width: 100, height: 150, resizeMode: "cover", flex: 1 }}
        />
        <View
          style={{
            flex: 2,
            padding: 10,
          }}
        >
          <Text style={{ color: "white" }}>{movie?.title}</Text>
          {/* <Text style={{color:"white"}}>{nowPlayingData[0].description}</Text> */}
        </View>
      </View>
      <TouchableOpacity onPress={handleAddToWatchList}>
        <Text
          style={{
            backgroundColor: colors.yellow,
            paddingHorizontal: 16,
            paddingVertical: 8,
            fontSize: 14,
            fontWeight: "500",
            margin: 4,
          }}
        >
          <Icon
            style={{ marginHorizontal: 8 }}
            name={!isWatchlist ? "plus" : "minus"}
          ></Icon>{" "}
          {!isWatchlist ? "Add to Watchlist" : "Remove from Watchlist"}
        </Text>
      </TouchableOpacity>
      <View style={styles.headingContainer}>
        <Text style={styles.sectionTitle}>Reviews</Text>
      </View>
      <ReviewsList reviews={movie?.rates} movieid={movie?.id} />
      {/* <FlatList
        data={movie?.rates}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.reviewId}
        renderItem={({ item }) =>  <Text>{item.review}</Text> }
        contentContainerStyle={styles.movieListContainer}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  headingContainer: {
    backgroundColor: colors.darkGrey,
    padding: 4,
    paddingVertical: 8,
  },
  container: {
    backgroundColor: colors.darkBackground,
    marginVertical: 2,
    height: "60%",
  },
  sectionTitle: {
    color: colors.yellow,
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 6,
    textTransform: "uppercase",
    // marginBottom: 10,
  },
  movieListContainer: {
    paddingLeft: 10,
  },

  movieItemContainer: {
    margin: 5,
    marginRight: 15,
    flexDirection: "row",
    alignItems: "flex-start",
  },
  moviePoster: {
    opacity: 0.6,
    width: "40%",
    height: 80,
    resizeMode: "contain",
    borderRadius: 4,
    marginRight: 10,
  },
  movieTitle: {
    color: "white",
    marginTop: 5,
    fontSize: 14,
    textAlign: "center",
  },
});

export default NowPlayingSection;
