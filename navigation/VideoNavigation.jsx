import React from 'react'
import { createStackNavigator } from "@react-navigation/stack";
import MoviePlayer from './../screens/playscreen/moviePlayer';

const Stack = createStackNavigator();

const VideoNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="VideoPlayer" component={MoviePlayer} />

    </Stack.Navigator>
  )
}

export default VideoNavigation