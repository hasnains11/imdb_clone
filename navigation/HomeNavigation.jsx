import React from 'react'
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from '../screens/home/Home';
import MovieViewScreen from '../screens/home/components/MovieViewScreen';
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
    </Stack.Navigator>
  )
}

export default HomeNavigation