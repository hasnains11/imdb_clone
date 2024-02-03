// Import necessary components from React Native
import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
  Modal,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { colors } from "../../assets/colors";
import { getImagesDownloadLink } from "../../contexts/api";
import client from "../../api/client";
import { ActivityIndicator } from "react-native-paper";
import { useMovieContext } from "./../../contexts/moviescontext";
// Functional component for the IMDb search screen

const SearchScreen = () => {
  const { allMovies } = useMovieContext();

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [selectedAgeLimit, setSelectedAgeLimit] = useState(null);
  const [selectedReleaseDate, setSelectedReleaseDate] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const genres = [...new Set(allMovies.map((movie) => movie.genera))];
  const ageLimits = [...new Set(allMovies.map((movie) => movie.ageLimit))]; 
  const releaseDates =  [...new Set(allMovies.map((movie) => movie.releaseDate.split("/")[2]))];

  const handleGenreSelect = (genre) => {setSelectedGenre(genre)};
  const handleAgeLimitSelect = (ageLimit) => {setSelectedAgeLimit(ageLimit)};
  const handleReleaseDateSelect = (releaseDate) => {setSelectedReleaseDate(releaseDate)};
  const handleClearFilters = () => {
    setSelectedGenre(null);
    setSelectedAgeLimit(null);
    setSelectedReleaseDate(null);
    handleSearch();
  };
  const navigation = useNavigation();
  const [isAdvancedSearchVisible, setAdvancedSearchVisible] = useState(false);
  // console.log(selectedAgeLimit, selectedGenre, selectedReleaseDate, searchQuery,"+++++++")
  const handleSearch = async () => {
    console.log("searching+++++");
    console.log(selectedAgeLimit, selectedGenre, selectedReleaseDate, searchQuery,"+++++++")
    try {
      setIsLoading(true);

      // Filter movies based on the search query
      let filteredMovies=allMovies;
      if(searchQuery && searchQuery !== "") {
        filteredMovies = allMovies.filter((movie) =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      console.log(filteredMovies,"filteredMovies+++")
      // Apply additional filters based on selectedGenre, selectedAgeLimit, and selectedReleaseDate
      if (selectedGenre) {
        filteredMovies = filteredMovies.filter(
          (movie) => movie.genera === selectedGenre
        );
      }

      if (selectedAgeLimit) {
        filteredMovies = filteredMovies.filter(
          (movie) => movie.ageLimit === selectedAgeLimit
        );
      }

      if (selectedReleaseDate) {
        filteredMovies = filteredMovies.filter(
          (movie) => movie.releaseDate.split("/")[2] === selectedReleaseDate
        );
      }
      if(!searchQuery && !selectedAgeLimit && !selectedGenre && !selectedReleaseDate){
        filteredMovies=[];
      }
      console.log(filteredMovies,"filteredMovies_____")
      setSearchResults(filteredMovies);
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
  
    handleSearch();
    console.log("useEffect++++++")
  }, [searchQuery, selectedGenre, selectedAgeLimit, selectedReleaseDate]);

  const openAdvancedSearch = () => setAdvancedSearchVisible(true);
  const closeAdvancedSearch = () => setAdvancedSearchVisible(false);

  const handleCardPress = (trailer) => {
    navigation.navigate("VideoPlayer", { movie: trailer });
  };

  return (
    <View style={styles.container}>
      {/* Search bar */}
      <View style={styles.searchBarContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search IMDb"
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
          onSubmitEditing={handleSearch}
        />
      </View>
      <View style={styles.filtersContainer}>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={openAdvancedSearch}
        >
          <Text style={styles.filterButtonText}>Advanced Search</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.headingContainer}>
        <Icon
          name="movie"
          size={24}
          color={colors.yellow}
          style={styles.movieIcon}
        />
        <Text style={styles.heading}>Search Results</Text>
      </View>
      <View style={styles.resultsContainer}>
        {searchResults.length == 0 && !isLoading && (
          <Text style={{ color: "white" }}>No Results!</Text>
        )}
        {isLoading ? (
          <ActivityIndicator
            size="small"
            color={colors.white}
            style={{ margin: 10 }}
            speed={6}
          />
        ) : (
          <FlatList
            data={searchResults}
            style={{ width: "100%", height: "100%" }}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleCardPress(item)}>
                <View style={styles.trailerCard}>
                  <Image
                    source={{ uri: getImagesDownloadLink(item.imageURL) }}
                    style={styles.trailerImage}
                  />
                  <Text
                    style={{ color: "white", marginTop: 8, fontWeight: "500" }}
                  >
                    {item.title}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          />
        )}
      </View>
      <Modal
        animationType="slide"
        transparent={false}
        visible={isAdvancedSearchVisible}
        onRequestClose={closeAdvancedSearch}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={closeAdvancedSearch}
          >
            <AntDesign name="close" size={24} color="white" />
          </TouchableOpacity>

          <Text style={styles.heading}>Advanced Search</Text>

          <ScrollView style={styles.contentContainer}>
            <Text style={styles.subHeading}>Genre</Text>
            <View style={styles.optionsContainer}>
              {genres.map((genre) => (
                <TouchableOpacity
                  key={genre}
                  style={[
                    styles.option,
                    selectedGenre === genre && styles.selectedOption,
                  ]}
                  onPress={() => handleGenreSelect(genre)}
                >
                  <Text style={styles.optionText}>{genre}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.subHeading}>Age Limit</Text>
            <View style={styles.optionsContainer}>
              {ageLimits.map((ageLimit) => (
                <TouchableOpacity
                  key={ageLimit}
                  style={[
                    styles.option,
                    selectedAgeLimit === ageLimit && styles.selectedOption,
                  ]}
                  onPress={() => handleAgeLimitSelect(ageLimit)}
                >
                  <Text style={styles.optionText}>{ageLimit}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.subHeading}>Release Date</Text>
            <View style={styles.optionsContainer}>
              {releaseDates.map((releaseDate) => (
                <TouchableOpacity
                  key={releaseDate}
                  style={[
                    styles.option,
                    selectedReleaseDate === releaseDate &&
                      styles.selectedOption,
                  ]}
                  onPress={() => handleReleaseDateSelect(releaseDate)}
                >
                  <Text style={styles.optionText}>{releaseDate}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity
              style={styles.clearButton}
              onPress={handleClearFilters}
            >
              <Text style={styles.clearButtonText}>Clear Advanced Search</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

// Styles for the components
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black, // IMDb dark theme background color
    padding: 20,
    marginTop: 30,
  },

  header: {
    backgroundColor: "#fff",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },

  headingContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 12,
    marginBottom: 16,
  },
  heading: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  trailerCard: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
    backgroundColor: colors.darkGrey,
    marginHorizontal: 8,
    padding: 8,
    borderWidth: 0,
    borderRadius: 8,
  },
  trailerImage: {
    width: "100%",
    height: 150,
    borderRadius: 4,
    resizeMode: "contain",
  },
  searchBarContainer: {
    marginBottom: 20,
  },
  searchInput: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    color: "black",
  },
  resultsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 10,
  },
  cardImage: {
    width: "100%",
    height: 150, // Adjust the height based on your design
    resizeMode: "cover",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  cardTitle: {
    padding: 10,
    fontSize: 16,
  },
  row: {
    flex: 1,
    justifyContent: "space-around",
  },
  filtersContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  filterInput: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 8,
    padding: 10,
    marginRight: 10,
  },
  filterButton: {
    backgroundColor: colors.yellow,
    borderRadius: 8,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  filterButtonText: {
    color: "black",
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: colors.black,
    padding: 20,
  },
  closeButton: {
    alignSelf: "flex-end",
    margin: 10,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
  },
  subHeading: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginTop: 10,
  },
  contentContainer: {
    marginTop: 20,
  },
  optionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
  },
  option: {
    backgroundColor: colors.yellow,
    borderRadius: 20,
    padding: 10,
    margin: 5,
  },
  selectedOption: {
    backgroundColor: "dodgerblue",
  },
  optionText: {
    color: "black",
  },
  clearButton: {
    backgroundColor: colors.red,
    borderRadius: 8,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  clearButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

// Export the component for use in the app
export default SearchScreen;
