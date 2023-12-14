import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Video, ResizeMode } from "expo-av";
import MoviePlayerScreen from "./screens/playscreen/moviePlayerScreen";
import { colors } from "./assets/colors";
import NowPlayingSection from "./screens/playscreen/nowPlaying";
import MoviePlayer from "./screens/playscreen/moviePlayer";
import { NavigationContainer } from "@react-navigation/native";
import AuthNavigator from "./navigation/AuthNavigation";
import LoginScreen from "./screens/login/Login";
import Welcome from "./screens/welcome/Welcome";
import { useEffect, useState } from "react";
import AppNavigator from "./navigation/AppNavigation";
import { AuthContext } from "./auth/context";
import { getUser } from "./auth/storage";
export default function App() {
  const [isReady, setIsReady] = useState(false);
  const [user, setUser] = useState(null);

  const restoreUser = async () => {
    const currentUser = await getUser();
    if (currentUser) setUser(currentUser);
  };
  useEffect(() => {
    restoreUser();
  }, [user]);

  return (
    <View style={styles.container}>
    <AuthContext.Provider value={{ user,setUser }}>
      <NavigationContainer>
        {user==null ? <AuthNavigator /> : <AppNavigator />}
      </NavigationContainer>
    </AuthContext.Provider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.black,
    flex: 1,
  },
});
