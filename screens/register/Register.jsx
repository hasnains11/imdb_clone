// Import necessary components from React Native
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image
} from "react-native";
import { colors } from "../../assets/colors";
// Functional component for the IMDb registration screen
const RegisterScreen = () => {
  // State to store the user input for email, password, and username
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  // Function to handle the registration button press
  const handleRegister = () => {
    // Perform registration logic here
    // For simplicity, just log the user credentials for now
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Username:", username);
  };

  return (
    <View style={styles.container}>
      {/* IMDb logo or banner */}
      {/* IMDb logo or banner */}
      <Image
        style={styles.logoImage}
        source={require("../../assets/images/imdb.png")}
      />
      {/* <Text style={styles.logo}>IMDb</Text> */}

      {/* Email input field */}
      <Text style={styles.registrationHeading}>Registration</Text>

      {/* Username input field */}
      <TextInput
        style={styles.input}
        placeholder="Username"
        autoCapitalize="none"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />

      {/* Email input field */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />

      {/* Password input field */}
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />

      {/* Register button */}
      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

// Styles for the components
const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    alignItems: "center",
    backgroundColor: "#141414",
    padding: 20,
  },
  
  registrationHeading: {
    alignSelf: "flex-start",
    color: colors.white,
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
  },
  logoImage: {
    marginTop: "35%",
    marginBottom: 20,
    width: 120,
    height: 120,
  },
  input: {
    height: 50,
    fontSize: 18,
    backgroundColor: colors.white,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  registerButton: {
    marginTop: 20,
    backgroundColor: colors.yellow,
    fontWeight: 'bold',
    padding: 10,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color:colors.white,
    fontWeight: 'bold',
    fontSize: 18,
  },
});

// Export the component for use in the app
export default RegisterScreen;
