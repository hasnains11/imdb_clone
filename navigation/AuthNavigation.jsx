import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '../screens/login/Login';
import RegisterScreen from '../screens/register/Register';
import Welcome from '../screens/welcome/Welcome';

export default function AuthNavigator() {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator screenOptions={{headerShown:false}}>
            <Stack.Screen
                component={Welcome}
                name="Welcome"
                options={{ headerShown: false }}
            />
            <Stack.Screen component={LoginScreen} name="Login" 
 />
            <Stack.Screen component={RegisterScreen} name="Register" />
        </Stack.Navigator>
    );
}
