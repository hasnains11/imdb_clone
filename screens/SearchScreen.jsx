// Import necessary components from React Native
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, FlatList,Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../assets/colors';
import  Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// Functional component for the IMDb search screen

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    // Implement search logic based on the searchQuery
    console.log('Search Query:', searchQuery);
  };

  // Sample data for each section
  const navigation = useNavigation();

  const [trailers, setTrailers] = useState([
    { id: 1, title: 'Popular movies', image: require('../assets/images/movie1.jpg')},
    { id: 2, title: 'Top Box OFfice', image: require('../assets/images/movie2.jpg') },
    { id: 3, title: 'Trailer 3', image: require('../assets/images/movie3.jpg') },
    { id: 4, title: 'Trailer 4', image: require('../assets/images/movie4.jpg') },
    { id: 5, title: 'Trailer 4', image: require('../assets/images/movie5.jpg') },
    { id: 6, title: 'Trailer 4', image: require('../assets/images/movie1.jpg') },
    { id: 7, title: 'Trailer 4', image: require('../assets/images/movie2.jpg') },
    { id: 8, title: 'Trailer 4', image: require('../assets/images/movie3.jpg') },
    { id: 9, title: 'Trailer 4', image: require('../assets/images/movie4.jpg') },
    { id: 10, title: 'Trailer 4', image: require('../assets/images/movie5.jpg') },
    
  ]);

  const handleCardPress = (trailer) => {
    // navigation.navigate('TrailerListScreen', { trailer });
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
      <ScrollView style={styles.resultsContainer}>
      <View style={styles.headingContainer}>
      <Icon name="movie" size={30} color={colors.yellow} style={styles.movieIcon} />

        <Text style={styles.heading}>Movies</Text>
      </View>

      {/* Movie Trailers List */}
      <FlatList
        data={trailers}
        keyExtractor={(item) => item.id.toString()}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleCardPress(item)}>
            <View style={styles.trailerCard}>
              <Image source={item.image } style={styles.trailerImage} />
              <Text style={{color:"white",marginTop:8}}>{item.title}</Text>
            </View>
          </TouchableOpacity>
        )}
        numColumns={2} // Display trailers in 2 columns
      />
        {/* Add more sections as needed */}
      </ScrollView>
    </View>
  );
};

// Styles for the components
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141414', // IMDb dark theme background color
    padding: 20,
    marginTop: 30,
  },
 
  header: {
    backgroundColor: '#fff',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },

  headingContainer: { 
    display:"flex",
    flexDirection:"row",
    alignItems:"center",
    gap:10,
    marginTop: 12,
    marginBottom: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color:"white"
  },
  trailerCard: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    backgroundColor:colors.darkBackground,
    marginHorizontal: 8,
    padding: 16,
    borderWidth: 0,
    borderRadius: 8,
  },
  trailerImage: {
    width:120,
    height: 130,
    borderRadius: 4,
    resizeMode: 'contain',
  },
  searchBarContainer: {
    marginBottom: 20,
  },
  searchInput: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    color: 'black',
  },
  resultsContainer: {
    flex: 1,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 10,
  },
  cardImage: {
    width: '100%',
    height: 150, // Adjust the height based on your design
    resizeMode: 'cover',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  cardTitle: {
    padding: 10,
    fontSize: 16,
  },
  row: {
    flex: 1,
    justifyContent: 'space-around',
  },
  // Add more styles as needed
});

// Export the component for use in the app
export default SearchScreen;
