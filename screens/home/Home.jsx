import React, { memo } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
// import Carousel from "react-native-snap-carousel";
import Slide from "./components/slide";
import FanFavouritesSection from "./components/fanFavouritesSection";
import WatchlistSection from "./components/watchListSection";
import { colors } from "../../assets/colors";
import FollowImdbSection from "./components/followImdbSection";
import Carousel from "react-native-snap-carousel";
import { useNavigation } from "@react-navigation/native";
import { useMovieContext } from "../../contexts/moviescontext";
import ComingSoonSection from "./components/ComingSoonSection";
import { useAuthContext } from "../../auth/context";

// Functional component for the IMDb homepage
const HomeScreen = () => {
  // const { logout } = useAuthContext();
    const navigator = useNavigation();
    const {user}=useAuthContext();
    console.log("user",user);
  console.log("rendering home screen");
  const moviecontext = useMovieContext();

  const topBannerMovies = moviecontext.topBannerMovies;

  // console.log("moviecontext",topBannerMovies[0]);
  // console.log("featuredMovies",featuredMovies[0]);
  // console.log("comingSoonMovies",comingSoonMovies[0]);
 const top=topBannerMovies.map((movie) => {
    return {
      title: movie.title,
      poster: movie.imageURL,
      description: movie.description,
      video: movie.videoURL,
      cast: movie.cast,
      rating: movie.rating,
      genre: movie.genre,
      id: movie.id,
      trailerId: movie.trailerId,
    }
  });
  // console.log(top[2]);
  // console.log("")

  return (
    <ScrollView style={styles.container}>
      <View style={{ ...styles.section, height: 320 }}>
        <Carousel
          data={topBannerMovies.slice(0, 3)}
          renderItem={({ item,index }) => (
            <TouchableOpacity
              onPress={() => navigator.navigate("VideoPlayer",{ movie: item})}
            >
              <Slide item={item} />
            </TouchableOpacity>
          )}
          sliderWidth={400}
          itemWidth={400}
          layout="stack"
          autoplay={true} // Set autoplay to true
          autoplayInterval={4500}
          loop={true} // Set loop to true
        />
      </View>

      <View style={styles.section}>
        <FanFavouritesSection />
      </View>
      <View style={styles.section}>
       <ComingSoonSection/>
      </View>
      {/* <Image
        source={require('../assets/images/imdb.jpg')}
        style={styles.logo}
      /> */}

      {/* Featured Movies or TV Shows */}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>What to Watch</Text>
        <WatchlistSection watchlist={[]} />
      </View>
      {/* Popular Movies or TV Shows */}

      <View style={styles.section}>
        <FollowImdbSection />
      </View>
      {/* <Button title="Sign Out" onPress={() => {logout();console.log("logout");console.log(logout)}} /> */}
      {/* Continue adding sections based on your app's design */}
    </ScrollView>
  );
};

// Styles for the components
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#141414", // IMDb dark theme background color
    marginTop: 34,
    shadowRadius: 10,
    shadowColor: "#ffffff",
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.5,
  },
  logo: {
    width: "100%",
    height: 50, // Adjust the height based on your logo dimensions
    resizeMode: "contain",
    marginBottom: 20,
  },
  section: {
    shadowColor: "white",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    // Elevation for Android
    elevation: 4,
    marginBottom: 14,
  },
  sectionTitle: {
    marginLeft: 16,
    fontSize: 24,
    fontWeight: "bold",
    color: colors.yellow,
    marginBottom: 10,
  },
  featuredImage: {
    width: "100%",
    height: 200, // Adjust the height based on your design
    resizeMode: "cover",
    borderRadius: 8,
    marginBottom: 10,
  },
  popularImage: {
    width: "100%",
    height: 150, // Adjust the height based on your design
    resizeMode: "cover",
    borderRadius: 8,
    marginBottom: 10,
  },
  carouselImage: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  // Add more styles for other sections as needed
});

// Export the component for use in the app
export default HomeScreen;
