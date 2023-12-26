import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Modal,
  Pressable,
} from "react-native";
// import { useNavigation } from "@react-navigation/native";
import { colors } from "../../../assets/colors";
import MovieCard from "./MovieCard";
import { useNavigation } from "@react-navigation/native";

const MovieViewScreen = ({ route }) => {
  const screenTitle = route.params.screenTitle;
  const movies = route.params.movies;
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterModalVisible, setFilterModalVisible] = useState(false);
  const [yearFilter, setYearFilter] = useState(""); // State for year filter
  const [ratingFilter, setRatingFilter] = useState("");
  const navigator=useNavigation();
  console.log("movies++++", movies)
  const toggleFilterModal = () => {
    setFilterModalVisible(!isFilterModalVisible);
  };

  const applyFilters = (movie) => {
    let ratings=0;
    if (movie.rates.length !== 0) {
      ratings =
        movie.rates.map((r) => r.rate).reduce((a, b) => a + b, 0) /
        movie.rates.length;
    } 
    const movieYear=movie.releaseDate.split("/")[2];
    const titleMatch = movie.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const yearMatch = !yearFilter || movieYear === yearFilter;
    const ratingMatch = !ratingFilter || ratings >= ratingFilter;

    return titleMatch && yearMatch && ratingMatch;
  };

  const filteredMovies = movies.filter(applyFilters);
  //   const filteredMovies = movies.filter((movie) =>
  //     movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  //   );

  const handleMoviePress = (movieId) => {};

  const renderMovieItem = ({ item }) => {
    return (
    <MovieCard movie={item} onPress={() => {
      navigator.navigate("VideoPlayer", { movie: item });
    }} />
  )};

  const renderFilterModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isFilterModalVisible}
      onRequestClose={toggleFilterModal}
    >
      <View style={styles.modalContainer}>
      
        {/* Add filter UI components here (year and rating filters) */}
        <View style={{margin:10,width:"70%"}}>
          <TextInput
            style={styles.filterInput}
            placeholderTextColor={"#FFFFFF"}
            placeholder="Filter by Year"
            value={yearFilter}
            onChangeText={(text) => setYearFilter(text)}
          />
          <TextInput
            style={styles.filterInput}
            placeholder="Filter by Rating"
            placeholderTextColor={"#FFFFFF"}
            value={ratingFilter}
            onChangeText={(text) => setRatingFilter(text)}
            keyboardType="numeric"
          />
            <Pressable style={styles.modalCloseButton} onPress={toggleFilterModal}>
          <Text style={styles.modalCloseButtonText}>Done</Text>
        </Pressable>
        </View>
      </View>
    </Modal>
  );

  return (
    <View style={styles.container}>
      {renderFilterModal()}

      <Text style={styles.heading}>{screenTitle}</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Search movies"
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
      />

      <TouchableOpacity style={styles.filterButton} onPress={toggleFilterModal}>
        <Text style={styles.filterButtonText}>Filter</Text>
      </TouchableOpacity>
      <FlatList
        data={filteredMovies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderMovieItem}
        showsVerticalScrollIndicator={false}
        numColumns={2}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    flex: 1,
    backgroundColor: "#333333",
    padding: 16,
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
    fontSize: 20,
    marginBottom: 16,
  },
  searchInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 16,
    padding: 8,
    color: "#FFFFFF",
    fontSize: 16,
  },
  filterButton: {
    backgroundColor: "#FFD700", // Yellow color
    padding: 10,
    borderRadius: 5,
    marginBottom: 16,
    alignItems: "center",
  },
  filterButtonText: {
    color: "#333333",
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  modalCloseButton: {
    backgroundColor: "#FFFFFF",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    
  },
  modalCloseButtonText: {
    color: "#333333",
    textAlign: "center",
    fontWeight: "bold",
  },
  filterInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 16,
    padding: 8,
    color: "#FFFFFF",
    fontSize: 16,
  },
});

export default MovieViewScreen;
