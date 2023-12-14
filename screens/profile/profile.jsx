import React from 'react'
import { View } from 'react-native';
import UserProfile from './userProfile';
const Profile = () => {
  return (
    <View style={styles.container}>
    <UserProfile
      username="Daud Suleiman"
      avatarUrl="https://example.com/avatar.jpg"
      totalRatings={42}
      totalReviews={18}
      onEditProfile={() => {}}
    />
  </View>)
}
const styles = {
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  };
export default Profile