import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { colors } from '../../../assets/colors';

const WatchlistSection = ({ watchlist }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>From Your Watchlist</Text>
      {watchlist.length > 0 ? (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {watchlist.map((movie) => (
            <View key={movie.id} style={styles.movieCard}>
              {/* Display movie information as needed */}
              <Text>{movie.title}</Text>
            </View>
          ))}
        </ScrollView>
      ) : (
        <View style={styles.content}>
          <Icon name="plus" size={32} color="dodgerblue" style={styles.ribbonIcon} />
          <Text style={styles.message}>Your watchlist is empty</Text>
          <Text style={styles.subMessage}>
            Save shows and movies to keep track of what you want to watch
          </Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Add to Watchlist</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  // ... existing styles
  container: {
    backgroundColor: colors.darkBackground,
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
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
    fontSize: 20,
    marginBottom: 16,
  },
  content: {
    alignItems: 'center',
  },
  ribbonIcon: {
    marginBottom: 16,
  },
  message: {
    fontSize: 18,
    color: '#ffffff',
    marginBottom: 10,
  },
  subMessage: {
    fontSize: 14,
    color: '#cecece',
    marginBottom: 21,
    textAlign: 'center',
  },
  button: {
    backgroundColor:"transparent",
    paddingVertical: 6,
    paddingHorizontal: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor:"grey",
  },
  buttonText: {
    color: 'dodgerblue',
    textAlign: 'center',  
    fontSize: 16,
    
  },
  movieCard: {
    width: 150,
    height: 250,
    marginRight: 16,
    elevation: 5,
    backgroundColor: '#1f1f1f',
  },
});

export default WatchlistSection;
