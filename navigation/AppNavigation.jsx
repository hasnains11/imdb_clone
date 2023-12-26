import React, { memo } from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeNavigation from "./HomeNavigation";
import SearchNavigation from "./SearchNavigation";
import VideoNavigation from "./VideoNavigation.jsx";
import Icon from "react-native-vector-icons/Ionicons";
import { colors } from "../assets/colors";
import Profile from "../screens/profile/profile";
import YouNavigation from "./YouNavigation";
import { MovieProvider } from "../contexts/moviescontext";
import { WatchlistProvider } from "../contexts/watchlistContext";
const Tab = createBottomTabNavigator();
const AppNavigator = () => {
  return (
    <WatchlistProvider>
      <MovieProvider>
        <Tab.Navigator
          initialRouteName="Video"
          screenOptions={{
            tabBarActiveTintColor: colors.yellow,
            // tabBarIconStyle: {color: colors.yellow},
            tabBarStyle: {
              backgroundColor: colors.darkBackground,
              borderColor: "transparent",
              paddingTop: 2,
              borderTopColor: "transparent",
              // height: 60,
            },
            headerShown: false,
            tabBarLabelStyle: {
              fontSize: 12,
              fontWeight: "500",
              color: "white",
            },

            tabBarHideOnKeyboard: true,
          }}
        >
          <Tab.Screen
            name="Home"
            component={HomeNavigation}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Icon name="home-outline" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="Search"
            component={SearchNavigation}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Icon name="search-outline" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="Video"
            component={VideoNavigation}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Icon name="play-circle-outline" color={color} size={size} />
              ),
            }}
          />

          <Tab.Screen
            name="You"
            component={YouNavigation}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Icon name="person-outline" color={color} size={size} />
              ),
            }}
          />
        </Tab.Navigator>
      </MovieProvider>
    </WatchlistProvider>
  );
};

export default AppNavigator;

// const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       backgroundColor: "dodgerblue",
//       alignItems: "center",
//       justifyContent: "center",
//     },
//     // tabLabel: {
//     //   fontSize: 12,
//     //   fontWeight: "500",
//     //   color: "white",
//     // },
//   });
