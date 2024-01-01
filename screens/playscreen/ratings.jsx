import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const StarRating = ({ initialRating = 0, onRatingPress ,size }) => {
  const [rating, setRating] = useState(initialRating);

  const handleStarPress = (selectedRating) => {
    setRating(selectedRating);
    if (onRatingPress) {
      onRatingPress(selectedRating);
    }
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      const starValue = i; // Half-star increments
      const iconName =
        starValue <= rating ? 'star' : starValue - 0.5 <= rating ? 'star-half' : 'star-outline';

      stars.push(
        <TouchableOpacity key={i} onPress={()=>handleStarPress(i)}>
          <Ionicons name={iconName} size={size} color="#f39c12" />
        </TouchableOpacity>
      );
    }
    return stars;
  };


  return (
    <View style={styles.container}>
      <View style={styles.starContainer}>{renderStars()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    margin:3,
},
  ratingText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  starContainer: {
    flexDirection: 'row',
  },
});

export default StarRating;
