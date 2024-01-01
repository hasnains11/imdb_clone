import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";

const AddUserScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [nationality, setNationality] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = () => {
    const userData = { name, email, gender, nationality, image };
    console.log(userData);
    // Add logic to handle the submitted data (e.g., API call to save user)
  };

  return (
    <View style={styles.container}>
      <View style={{width:"98%"}}>
        <Text style={styles.heading}>Add User Form</Text>

        <View style={styles.formGroup}>
          <Text>Name:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter name"
            value={name}
            onChangeText={(text) => setName(text)}
          />
        </View>

        <View style={styles.formGroup}>
          <Text>Email:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter email"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </View>

        <View style={styles.formGroup}>
          <Text>Gender:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter gender"
            value={gender}
            onChangeText={(text) => setGender(text)}
          />
        </View>

        <View style={styles.formGroup}>
          <Text>Nationality:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter nationality"
            value={nationality}
            onChangeText={(text) => setNationality(text)}
          />
        </View>

        <View style={styles.formGroup}>
          <Text>Image URL:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter image URL"
            value={image}
            onChangeText={(text) => setImage(text)}
          />
        </View>

        <Button title="Submit" onPress={handleSubmit} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    alignItems: "center",
    paddingHorizontal: 16,
  },
  heading: {
    fontSize: 20,
    marginBottom: 16,
    textAlign: "center",
    fontWeight: "bold",
  },
  formGroup: {
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 8,
    width: "100%",
  },
});

export default AddUserScreen;
