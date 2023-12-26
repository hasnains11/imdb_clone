// Import necessary components from React Native
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, FlatList,Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import  Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../../assets/colors';
import { getImagesDownloadLink } from '../../contexts/api';
import client from '../../api/client';
import { ActivityIndicator } from 'react-native-paper';
// Functional component for the IMDb search screen

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  
  const handleSearch = async () => {
    try {
      setIsLoading(true);
      const response = await client.get(`showMovies?toSearch=${searchQuery}`);
      if(!response.ok) return console.log("error");
      const data = await response.data;
      setSearchResults(data);
    } catch (error) {
      console.error('Error fetching search results:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!searchQuery) {
      setSearchResults([]);
      return; // Skip making the API call if the searchQuery is empty
    }
    handleSearch();
  }, [searchQuery]);


  const handleCardPress = (trailer) => {
    navigation.navigate('VideoPlayer', { movie:trailer });
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
      <View style={styles.headingContainer}>
      <Icon name="movie" size={24} color={colors.yellow} style={styles.movieIcon} />
        <Text style={styles.heading}>Search Results</Text>
      </View>
      <View style={styles.resultsContainer}>
        {(searchResults.length==0 && !isLoading) && <Text style={{ color: 'white', }}>No Results!</Text>}
      {isLoading ? (
         <ActivityIndicator size="small"  color={colors.white} style={{margin:10}} speed={6} />
        ) : (
          <FlatList
            data={searchResults}
            style={{width:"100%",height:"100%"}}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleCardPress(item)}>
                <View style={styles.trailerCard}>
                  <Image source={{ uri: getImagesDownloadLink(item.imageURL) }} style={styles.trailerImage} />
                  <Text style={{ color: 'white', marginTop: 8,fontWeight:"500" }}>{item.title}</Text>

                </View>
              </TouchableOpacity>
            )}
          />
        )}
      </View>
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
    fontSize: 16,
    fontWeight: 'bold',
    color:"white"
  },
  trailerCard: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    backgroundColor:colors.darkGrey,
    marginHorizontal: 8,
    padding: 8,
    borderWidth: 0,
    borderRadius: 8,
  },
  trailerImage: {
    width:"100%",
    height: 150,
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
    justifyContent: 'center',
    alignItems: 'center',
    width:"100%"
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
