import React, { useEffect,useState } from "react";

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

import { useWatchlistContext } from "../../contexts/watchlistContext";
import MovieCast from "./movieCast";

import StarRating from "./ratings";
import { Modal, List, Button, Portal } from "react-native-paper";

import { useAuthContext } from "../../auth/context";

const NowPlayingSection = ({ movie }) => {

  const [isWatchlist, setIsWatchlist] = useState(false);
  const [isWatchlistModalVisible, setWatchlistModalVisible] = useState(false);

  const [selectedWatchlist, setSelectedWatchlist] = useState(null);

  const { user } = useAuthContext();
  
  const {
    watchlists,
    addMovieToWatchlist,
  } = useWatchlistContext();

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
    setWatchlistModalVisible(true);
  
  };

  const handleWatchlistSelection = (watchlist) => {
    setWatchlistModalVisible(false);
    setSelectedWatchlist(watchlist);
    addMovieToWatchlist(user.id,movie, watchlist.id);
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
      <TouchableOpacity onPress={()=>setWatchlistModalVisible(true)}>
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
     <Portal>
        <Modal
          visible={isWatchlistModalVisible}
          onDismiss={() => setWatchlistModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <List.Section>
              <List.Subheader style={styles.subheader}>
                Select Watchlist
              </List.Subheader>
              {watchlists.map((watchlist) => (
                <List.Item
                  key={watchlist.id.toString()}
                  title={watchlist.title}
                  onPress={() => handleWatchlistSelection(watchlist)}
                  style={styles.listItem}
                />
              ))}
            </List.Section>
            <Button
              mode="contained"
              onPress={() => setWatchlistModalVisible(false)}
              style={styles.closeButton}
            >
              Close
            </Button>
          </View>
        </Modal>
      </Portal>
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
  button: {
    backgroundColor: '#FFD700',
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    fontWeight: 'bold',
    margin: 10,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginHorizontal: 8,
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  subheader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  listItem: {
    marginVertical: 8,
  },
  closeButton: {
    marginTop: 20,
  },
});

export default NowPlayingSection;
