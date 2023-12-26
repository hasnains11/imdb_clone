// Import necessary components from React Native
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  KeyboardAvoidingView,
  ScrollView
} from "react-native";
import { colors } from "../../assets/colors";
import { registerUser } from "./api";
import { useNavigation } from "@react-navigation/native";
// Functional component for the IMDb registration screen
const RegisterScreen = () => {
  const navigator=useNavigation();
  // State to store the user input for email, password, and username
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [nationality, setNationality] = useState("");
  const [gender, setGender] = useState("");
  const [error, setError] = useState(null);

  const showSuccessPopup = () => {
    Alert.alert(
      "Registration Successful",
      "You have successfully registered!",
      [{text: "Login", onPress: () =>  navigator.navigate("Login") }]
    );
  };

  const handleRegister = async () => {
    // Basic validation
    if (!email || !password || !username || !nationality || !gender) {
     setError("Please enter all the fields");
      return;
    }

    // Simple email validation using a regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }
    if (!(gender.toLowerCase() == "male" || gender.toLowerCase() == "female")) {
      setError("Gender must be either Male or Female");
      return;
    }
    const user={
      name:username,
      email:email,
      password,
      nationality,
      gender
    }
    // Perform registration logic here (For now, just show a success popup)
   const result=await registerUser(user);
    console.log("apiRequestResule",result);
   if(!result.ok){
      setError(result.data);
      return;
    }
    else if (result.ok && typeof result.data === "string") {
      setError(result.data);
    }
    else{
      setError(null);
      showSuccessPopup();
    }
  };

  return (
    <KeyboardAvoidingView
    style={styles.container} 
    behavior={"height"} // Adjust behavior based on the platform
  >
    <ScrollView style={{width:"100%"}}>
    <View style={{alignItems:"center"}}>
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
      <TextInput
        style={styles.input}
        placeholder="Nationality"
        keyboardType="default"
        autoCapitalize="none"
        value={nationality}
        onChangeText={(text) => setNationality(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Gender"
        keyboardType="default"
        autoCapitalize="none"
        value={gender}
        onChangeText={(text) => setGender(text)}
      />

      {/* Password input field */}
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
      {/* Register button */}
      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </View>
    </ScrollView>
    </KeyboardAvoidingView>
  );
};

// Styles for the components
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    backgroundColor: "#141414",
    padding: 20,
  },
  errorText: {
    color: "red",
    marginTop: 5,
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
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  registerButton: {
    marginTop: 20,
    backgroundColor: colors.yellow,
    fontWeight: "bold",
    padding: 10,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: colors.white,
    fontWeight: "bold",
    fontSize: 18,
  },
});

// Export the component for use in the app
export default RegisterScreen;
