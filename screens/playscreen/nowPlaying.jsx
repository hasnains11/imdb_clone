import React, { useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
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
import MovieCast from "./movieCast";
import StarRating from "./ratings";

const NowPlayingSection = ({ movie }) => {
  const [isWatchlist, setIsWatchlist] = React.useState(false);
  const {
    watchlist,
    addMovieToWatchlist,
    removeMovieFromWatchlist,
  } = useWatchlistContext();


  useEffect(() => {
    setIsWatchlist(false);
 
    if(watchlist.some((item) => item.id === movie.id)){
      setIsWatchlist(true);
    }
  }, [movie]);
  const formatBreakTime = (breakTime) => {
    const breakSegments = breakTime.split(',');
    const formattedBreaks = breakSegments.map((segment, index) => {
      const [breakName, startTime, endTime] = segment.trim().split('-');
      const formattedBreak = `${breakName}: ${startTime.trim()} - ${endTime.trim()}`;
      return formattedBreak;
    });
  
    const formattedBreakTime = formattedBreaks.join(',');
    return formattedBreakTime;
  };

  const formattedBreakTime = formatBreakTime(movie.breakTime);

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
    if (!isWatchlist) {
      addMovieToWatchlist(movie)
      setIsWatchlist(true);
    } else {
      removeMovieFromWatchlist(movie.id);
      setIsWatchlist(false);
    }
  };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.headingContainer}>
        <Text style={{ ...styles.sectionTitle, color: "white" }}>
          Now Playing
        </Text>
      </View>
      <View style={styles.movieBreakpointsContainer}>
    {
    formattedBreakTime.split(",").map((breakTime,index) => (
    <View style={styles.timeCapsule} key={index}>
      <Text style={styles.movieTime}>{breakTime}</Text>
    </View>))
    }
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
          <Text style={{color:"white"}}>{movie?.description}</Text>
        </View>
      </View>
      <StarRating size={30}/>
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
        <Text style={styles.sectionTitle}>Cast</Text>
      </View>
      <MovieCast cast={movie?.actor} />
      <View style={styles.headingContainer}>
        <Text style={styles.sectionTitle}>Directors</Text>
      </View>
      <MovieCast cast={movie?.director} />
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  movieBreakpointsContainer: {
    flexDirection: "row",
    justifyContent: "start",
    margin: 2, 
  },
  timeCapsule: {
    backgroundColor: "#5C5470",
    borderRadius: 10, 
    paddingVertical: 4,
    paddingHorizontal: 8, 
    marginHorizontal:4,
    marginTop: 4,
  },
  movieTime: {
    fontSize: 10, // Adjust the font size
    fontWeight: "500", // Adjust the font weight
    color: "black", // Adjust the color
  },
  headingContainer: {
    backgroundColor: colors.darkGrey,
    padding: 4,
    paddingVertical: 8,
  },
  container: {
    backgroundColor: colors.darkBackground,
    marginVertical: 2,
    height: "50%",
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
