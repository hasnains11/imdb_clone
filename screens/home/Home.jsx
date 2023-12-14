import React from "react";
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
import Button from "../../components/Button";
import { useAuthContext } from "../../auth/context";
import Carousel from "react-native-snap-carousel";
import { useNavigation } from "@react-navigation/native";
const movies = [
  {
    title: "Cosmopolis",
    poster: require("./../../assets/images/movie1.jpg"),
    trailerId: "your_youtube_trailer_id",
    description: `Twenty-eight-year-old billionaire currency speculator Eric Packer rides slowly across Manhattan amid traffic jams, in his state-of-the-art luxury stretch limousine office, to his preferred barber. 
    Various visitors discuss the meaning of life and inconsequential trivia. `,
    cast: "Actor 1, Actor 2, Actor 3",
  },
  {
    title: "Dog Days",
    poster: require("./../../assets/images/movie2.jpg"),
    trailerId: "your_youtube_trailer_id",
    description: "A group of people living in Los Angeles find their paths interconnected because of their pets, which changes their lives forever.",
    cast: "Actor 1, Actor 2, Actor 3",
  },
  {
    title: "Hotel Transylvania",
    poster: require("./../../assets/images/movie3.jpg"),
    trailerId: "your_youtube_trailer_id",
    description: `Hotel Transylvania is an American animated media franchise created by comedy writer Todd Durham and produced by Sony Pictures Animation. It consists
     of four feature films, three short films, a flash-animated TV series, and several video games.`,
    cast: "Actor 1, Actor 2, Actor 3",
  },
  // Add more movies as needed
];
// Functional component for the IMDb homepage
const HomeScreen = () => {
  const {logout}=useAuthContext();
  const navigator = useNavigation();
  return (
    <ScrollView style={styles.container}>
     <View style={{ ...styles.section, height: 320 }}> 
         <Carousel
          data={movies}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigator.navigate("Video", { movie: item })
              }
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
