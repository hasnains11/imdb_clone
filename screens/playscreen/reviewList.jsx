import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  Button,
  ScrollView,
  Modal,
  TouchableOpacity,
} from "react-native";
import { colors } from "../../assets/colors";
import Icon from "react-native-vector-icons/MaterialIcons";
import client from "../../api/client";
import { getUser } from "../../auth/storage";

const ReviewsList = ({ reviews, movieid }) => {
  const [user, setUser] = useState(null);
  const fetchUser = async () => {
    const currentUser = await getUser();
    setUser(currentUser);
  };
  useEffect(() => {
    fetchUser();
  }, []);
  const [newReview, setNewReview] = useState({
    review: "",
    rate: 0,
  });
  const [submittedReviews, setSubmittedReviews] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleAddReview = async () => {
    if (newReview.review && newReview.rate > 0) {
      const review = {
        movieid,
        rate: newReview.rate,
        review: newReview.review,
        userId: user?.id,
      };

      const res = await client.post("addMovieRate", review);
      console.log(res,"res++++")
      if (!res.ok) return;
      setSubmittedReviews([
        ...submittedReviews,
        {
          reviewId:  Math.random(),
          rate: newReview.rate,
          review: newReview.review,
          userId: user?.id,
          username: user?.name,
        },
      ]);

      setNewReview({
        review: "",
        rate: 0,
      });

      toggleModal();
    }
  };
  const renderReviewItem = ({ item }) => (
    <View style={styles.reviewContainer}>
      <View>
        <Text style={styles.username}>{item.username}</Text>
        <Text style={styles.reviewText}>{item.review}</Text>
      </View>
      <View>
        <Text style={styles.rating}>{`Rating: ${item.rate}/5`}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView style={styles.inputContainer}>
        <TouchableOpacity onPress={toggleModal}>
          <View style={styles.addButton}>
            <Text style={styles.addButtonText}>Add Review</Text>
          </View>
        </TouchableOpacity>
        <Modal
          animationType="slide"
          transparent={true}
          visible={isModalVisible}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TouchableOpacity
                style={styles.closeIconContainer}
                onPress={toggleModal}
              >
                <Icon name="close" size={24} color={colors.white} />
              </TouchableOpacity>
              <TextInput
                style={styles.input}
                placeholder="Enter Review.."
                multiline
                numberOfLines={3}
                placeholderTextColor={"white"}
                value={newReview.review}
                onChangeText={(text) =>
                  setNewReview({ ...newReview, review: text })
                }
              />
              <TextInput
                style={styles.input}
                placeholder="Rating (1-5)"
                keyboardType="numeric"
                value={newReview.rate.toString()}
                onChangeText={(text) =>
                  setNewReview({ ...newReview, rate: parseInt(text) || 0 })
                }
              />
              <TouchableOpacity
                style={styles.addRButton}
                onPress={handleAddReview}
              >
                <Text style={styles.addRButtonText}>Add Review</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
      <FlatList
        data={[...reviews, ...submittedReviews]}
        keyExtractor={(item) => item?.reviewId?.toString()}
        renderItem={renderReviewItem}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    backgroundColor: "black",
  },

  listContainer: {
    flexGrow: 1,
  },
  reviewContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    backgroundColor: colors.darkGrey,
    borderRadius: 8,
    padding: 8,
    paddingHorizontal: 15,
    marginBottom: 12,
    elevation: 2,
  },
  username: {
    fontSize: 14,
    color: "white",
    fontWeight: "bold",
    marginBottom: 4,
  },
  reviewText: {
    fontSize: 12,
    marginBottom: 8,
    color: "gray",
  },
  rating: {
    fontSize: 12,
    color: colors.yellow,
    fontWeight: "semibold",
  },
  inputContainer: {
    marginBottom: 8,
  },
  input: {
    verticalAlign: "top",
    borderWidth: 1,
    color: "#FFF",
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 8,
    marginBottom: 8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  modalContent: {
    backgroundColor: colors.black,
    padding: 6,
    borderRadius: 8,
    width: "85%",
    elevation: 5,
  },
  addButton: {
    backgroundColor: colors.blue,
    borderRadius: 8,
    padding: 6,
    alignItems: "center",
    marginBottom: 3,
  },
  addButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  addRButton: {
    backgroundColor: colors.yellow,
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
    marginBottom: 10,
  },
  addRButtonText: {
    color: "black", // Adjust text color based on your design
    fontWeight: "bold",
  },

  // Custom styling for Close button
  closeIconContainer: {
    alignItems: "flex-end",
    padding: 8,

    // position: 'absolute',
    // top: 8,
    // right: 8,
    // zIndex: 1,
  },
});

export default ReviewsList;
