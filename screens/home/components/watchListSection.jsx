import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { colors } from "../../../assets/colors";
import { useWatchlistContext } from "../../../contexts/watchlistContext";
import MovieCard from "./MovieCard";
import { useNavigation } from "@react-navigation/native";
import {
  Modal,
  Portal,
  TextInput,
  Button,
  Card,
  Title,
} from "react-native-paper";
import { useAuthContext } from "../../../auth/context";
const WatchlistSection = () => {
  const { watchlists, createWatchList } = useWatchlistContext();
  const { user } = useAuthContext();

  console.log("watchlistSection", watchlists);

  const navigator = useNavigation();
  const [isCreateWatchlistModalVisible, setCreateWatchlistModalVisible] =
    useState(false);
  const [newWatchlistName, setNewWatchlistName] = useState("");

  const handleCreateWatchlist = async () => {
    // Add logic to handle the creation of the new watchlist
    console.log(`Creating watchlist with name: ${newWatchlistName}`);
    createWatchList(newWatchlistName, user.id);
    setCreateWatchlistModalVisible(false);
  };

  console.log(watchlists, "watchlists++++++++");

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={styles.heading}>Your Watchlists</Text>
        <TouchableOpacity onPress={() => navigator.navigate("WatchListScreen")}>
          <Text
            style={{
              backgroundColor: "transparent",
              fontSize: 14,
              fontWeight: "500",
              color: "dodgerblue",
            }}
          >
            SEE ALL
          </Text>
        </TouchableOpacity>
      </View>

      {watchlists.length > 0 ? (
        <View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {watchlists.map((watchlist, index) => (
              <Card key={index} style={styles.card}>
                <Card.Content>
                  <Title style={styles.cardHeading}>{watchlist.title}</Title>
                </Card.Content>
              </Card>
              //  <MovieCard key={index} movie={movie} onPress={()=>{ navigator.navigate("VideoPlayer", { movie: movie })}}/>
            ))}
          </ScrollView>
          <TouchableOpacity
            onPress={() => setCreateWatchlistModalVisible(true)}
          >
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                marginTop: 15,
                flexDirection: "row",
              }}
            >
              <Icon name="plus" size={23} color="dodgerblue" />
              <Text
                style={{
                  color: "white",
                  fontSize: 14,
                  fontWeight: "500",
                  marginLeft: 5,
                }}
              >
                Create New Watchlist
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.content}>
          <TouchableOpacity
            onPress={() => setCreateWatchlistModalVisible(true)}
          >
            <Icon
              name="plus"
              size={32}
              color="dodgerblue"
              style={styles.ribbonIcon}
            />
          </TouchableOpacity>
          <Text style={styles.message}>Your watchlist is empty</Text>
          <Text style={styles.subMessage}>
            Save shows and movies to keep track of what you want to watch
          </Text>

          {/* <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Add to Watchlist</Text>
          </TouchableOpacity> */}
        </View>
      )}
      <Portal>
        <Modal
          visible={isCreateWatchlistModalVisible}
          onDismiss={() => setCreateWatchlistModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <Text style={styles.subheader}>Create Watchlist</Text>
            <TextInput
              label="Watchlist Name"
              value={newWatchlistName}
              onChangeText={(text) => setNewWatchlistName(text)}
              style={styles.input}
            />
            <Button
              mode="contained"
              onPress={handleCreateWatchlist}
              style={styles.createButton}
            >
              Create
            </Button>
            <Button
              mode="outlined"
              onPress={() => setCreateWatchlistModalVisible(false)}
              style={styles.closeButton}
            >
              Cancel
            </Button>
          </View>
        </Modal>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  // ... existing styles
  container: {
    backgroundColor: colors.darkBackground,
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
  },
  heading: {
    fontSize: 24,
    borderRadius: 3,
    borderLeftWidth: 4,
    borderLeftColor: colors.yellow,
    paddingLeft: 13,
    marginBottom: 4,
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 16,
  },
  content: {
    alignItems: "center",
  },
  ribbonIcon: {
    marginBottom: 16,
  },
  message: {
    fontSize: 18,
    color: "#ffffff",
    marginBottom: 10,
  },
  subMessage: {
    fontSize: 14,
    color: "#cecece",
    marginBottom: 21,
    textAlign: "center",
  },
  button: {
    backgroundColor: "transparent",
    paddingVertical: 6,
    paddingHorizontal: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "grey",
  },
  buttonText: {
    color: "dodgerblue",
    textAlign: "center",
    fontSize: 16,
  },
  movieCard: {
    width: 150,
    height: 250,
    marginRight: 16,
    elevation: 5,
    backgroundColor: "#1f1f1f",
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
  subheader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    marginBottom: 10,
  },
  createButton: {
    marginTop: 10,
  },
  closeButton: {
    marginTop: 10,
  },
  cardHeading: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.yellow,
  },
  card: {
    marginHorizontal: 6,
    marginVertical: 3,
    width: 120,

    padding: 0,
    elevation: 5,
    backgroundColor: "#1f1f1f",
  },
});

export default WatchlistSection;
