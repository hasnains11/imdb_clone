import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const AddReviewButton = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
      <Text style={styles.buttonText}>Add Review</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    width: "52%",
    alignSelf:"center",
   backgroundColor: '#38419D',
    padding: 4,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#EEF5FF',
    fontSize: 13,
    fontWeight: 'bold',
  },
});

export default AddReviewButton;
