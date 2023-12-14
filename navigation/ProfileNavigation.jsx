import React from 'react'
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

const ProfileNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Profile" component={MoviePlayer} />
    </Stack.Navigator>
  )
}

export default ProfileNavigation