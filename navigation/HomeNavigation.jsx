import React from 'react'
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from '../screens/home/Home';
import MovieViewScreen from '../screens/home/components/MovieViewScreen';
import WatchListScreen from '../screens/home/components/WatchlistScreen';
const Stack = createStackNavigator();

const HomeNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="MovieViewScreen" component={MovieViewScreen} />
      <Stack.Screen name="WatchListScreen" component={WatchListScreen} />
    </Stack.Navigator>
  )
}

export default HomeNavigation