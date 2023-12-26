import React, { useEffect, useState } from 'react'
import { View } from 'react-native';
import UserProfile from './userProfile';
import { getUser } from '../../auth/storage';
const Profile = () => {
  const [user,setUser]=useState({});
  const fetchUser = async () => {
    const currentUser = await getUser();
    setUser(currentUser);
  };
  useEffect(()=>{
    fetchUser();
  },[])
  return (
    <View style={styles.container}>
    <UserProfile
    user={user}
      username={user?.name}
      avatarUrl="https://example.com/avatar.jpg"
      totalRatings={12}
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