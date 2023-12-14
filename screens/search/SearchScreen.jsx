// SearchScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';


const SearchScreen = () => {

  return (
    <View style={styles.container}>
      {/* Fixed Search Title */}
      <View style={styles.header}>
        <Text style={styles.searchTitle}>Search</Text>
      </View>

      {/* Movies Heading */}
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>Movies</Text>
      </View>

      {/* Movie Trailers List */}
      <FlatList
        data={trailers}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleCardPress(item)}>
            <View style={styles.trailerCard}>
              <Image source={{ uri: item.image }} style={styles.trailerImage} />
              <Text>{item.title}</Text>
            </View>
          </TouchableOpacity>
        )}
        numColumns={2} // Display trailers in 2 columns
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    backgroundColor: '#fff',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  searchTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  headingContainer: {
    marginTop: 16,
    marginBottom: 8,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  trailerCard: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    marginHorizontal: 4,
    padding: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
  },
  trailerImage: {
    width: 150,
    height: 100,
    marginBottom: 8,
    borderRadius: 4,
  },
});

export default SearchScreen;
