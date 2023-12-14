import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { colors } from "../../assets/colors";

const NowPlayingSection = (p) => {
  console.log(p);
  // Sample data for the "Now Playing" section
  const nowPlayingData = [
    {
      id: "1",
      title: "Inception",
      poster: require("../../assets/images/movie1.jpg"),
      description: "A mind-bending thriller about dreams and reality.",
    },
    {
      id: "2",
      title: "The Dark Knight",
      poster: require("../../assets/images/movie2.jpg"),
      description: "A gripping superhero film featuring Batman and the Joker.",
    },
    {
      id: "3",
      title: "Sherlock Holmes",
      poster: require("../../assets/images/movie3.jpg"),
      description: "An intriguing detective story with the brilliant Sherlock Holmes.",
    },
    // Add more movies to the list as needed
  ];

  // Render individual movie item
  const renderMovieItem = ({ item, selected }) => (
    <TouchableOpacity style={styles.movieItemContainer} onPress={()=>{ }}>
      <Image source={item.poster} style={styles.moviePoster} />
      <View style={{ flexDirection: "column", alignItems: "flex-start" }}>
        <Text style={styles.movieTitle}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <Text style={styles.sectionTitle}>Now Playing</Text>
      </View>
      <View style={{
    flexDirection: 'row',
    margin: 10,
    overflow: 'hidden',
    height: 150,
  
}}>
        <Image
          source={require("../../assets/images/movie1.jpg")}
          style={{ width: 100, height: 150, resizeMode: "cover" ,flex:1 }}
        />
        <View
          style={{
            flex: 2,
            padding: 10,
          }}
        >
          <Text style={{color:"white"}}>{nowPlayingData[0].description}</Text>
        </View>
      </View>

      <View style={styles.headingContainer}>
        <Text style={styles.sectionTitle}>PlayList</Text>
      </View>

      <FlatList
        data={nowPlayingData}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={renderMovieItem}
        contentContainerStyle={styles.movieListContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  headingContainer: {
    backgroundColor: "grey",
    padding: 4,
    // marginBottom: 10,
  },
  container: {
    backgroundColor: colors.darkBackground,
    marginVertical: 2,
    height: "60%",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 6,
    color: "white",
    textTransform: "uppercase",
    // marginBottom: 10,
  },
  movieListContainer: {
    paddingLeft: 10,
  },

  movieItemContainer: {
    margin: 5,
    marginRight: 15,
    flexDirection: "row",
    alignItems: "flex-start",
  },
  moviePoster: {
    opacity: 0.6,
    width: "40%",
    height: 80,
    resizeMode: "contain",
    borderRadius: 4,
    marginRight: 10,
  },
  movieTitle: {
    color: "white",
    marginTop: 5,
    fontSize: 14,
    textAlign: "center",
  },
});

export default NowPlayingSection;
