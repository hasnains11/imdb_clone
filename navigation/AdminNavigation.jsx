import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AdminPortalScreen from '../screens/admin/AdminPortalScreen';
import AddMovieScreen from '../screens/admin/AddMovieScreen';
import AddUserScreen from '../screens/admin/AddUserScreen';
import RemoveMovieScreen from '../screens/admin/RemoveMovieScreen';
const Stack = createStackNavigator();

const AdminNavigator = () => {
  return (
 
      <Stack.Navigator initialRouteName="AdminPortal">
        <Stack.Screen name="AdminPortal" component={AdminPortalScreen} />
        <Stack.Screen name="AddMovie" component={AddMovieScreen} />
        <Stack.Screen name="AddUser" component={AddUserScreen} />
        <Stack.Screen name="RemoveMovie" component={RemoveMovieScreen} />
      </Stack.Navigator>
   
  );
};

export default AdminNavigator;
