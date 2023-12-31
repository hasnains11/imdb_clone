import React from 'react'
import SearchScreen from '../screens/search/SearchScreen';
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();
const SearchNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="SearchScreen" component={SearchScreen} />
    </Stack.Navigator>
  )
}

export default SearchNavigation