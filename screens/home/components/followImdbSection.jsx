import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { colors } from '../../../assets/colors';

const FollowImdbSection = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Follow IMDb</Text>
      <View style={styles.socialIcons}>
        <TouchableOpacity style={styles.iconContainer}>
          <Icon name="twitter" size={30} color="#1DA1F2" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconContainer}>
          <Icon name="instagram" size={30} color="#E4405F" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconContainer}>
          <Icon name="youtube" size={30} color="#FF0000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconContainer}>
          <Icon name="facebook" size={30} color="#1877F2" />
        </TouchableOpacity>
        {/* <TouchableOpacity style={styles.iconContainer}>
          <Icon name="tiktok" size={30} color="#69C9D0" />
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
  socialIcons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  iconContainer: {
    alignItems: 'center',
  },
  
});

export default FollowImdbSection;
