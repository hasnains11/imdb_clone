import React from 'react'
import { createStackNavigator } from "@react-navigation/stack";
import Profile from '../screens/profile/profile';

const Stack = createStackNavigator();

const YouNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Profile" component={Profile} />

    </Stack.Navigator>
  )
}

export default YouNavigation