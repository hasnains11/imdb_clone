import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { colors } from "../../assets/colors";
import { useAuthContext } from "../../auth/context";

const ProfileScreen = () => {
    const {logout}=useAuthContext();
  return (
    <View style={styles.container}>
      {/* Header */}
      <Text
        style={{
          marginLeft: 16,
          fontSize: 28,
          textAlign: "center",
          fontWeight: "bold",
          color: colors.yellow,
          marginBottom: 10,
        }}
      >
        User Profile
      </Text>
      <View style={styles.header}>
        <Image
          source={ "https://unsplash.com/photos/a-tunnel-with-a-clock-on-the-side-of-it-1HRshxtR4Ok"}
          style={styles.avatar}
        />
        <Text style={styles.username}>Daud Waleed</Text>
      </View>

      {/* User Details */}
      <View style={styles.detailsContainer}>
        <Text style={styles.detailsText}>Email: Daud@gmail.com</Text>
        <Text style={styles.detailsText}>Location: Rawalpindi, Pakistan</Text>
        {/* Add more user details as needed */}
      </View>

      {/* User Actions */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ ...styles.actionButton, backgroundColor: "red" }} onPress={()=>logout()}
        >
          <Text style={styles.actionButtonText}>Logout</Text>
        </TouchableOpacity>
        {/* Add more user actions as needed */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    color: "white",
    paddingTop: 100,
    backgroundColor: "black",
    flex: 1,
    width: "100%",
  },
  header: {
    alignItems: "center",
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  avatar: {
    backgroundColor: "#ccc",
    width: 140,
    height: 140,
    borderRadius: 140,
    marginBottom: 10,
  },
  username: {
    color: "white",
    marginTop: 10,
    fontSize: 26,
    fontWeight: "bold",
  },
  detailsContainer: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    paddingBottom: 40,
    marginBottom: 20,
  },
  detailsText: {
    color: "#fff",
    fontSize: 18,
    marginBottom: 10,
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 20,
  },
  actionButton: {
    backgroundColor: colors.yellow,
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 10,
  },
  actionButtonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default ProfileScreen;
