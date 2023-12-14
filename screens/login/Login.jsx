// Import necessary components from React Native
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { colors } from "../../assets/colors";
import { useAuthContext } from "../../auth/context";
import { useNavigation } from "@react-navigation/native";

const isEmailValid = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};
// Functional component for the IMDb login screen
const LoginScreen = ({setUser}) => {
  // State to store the user input for email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigator = useNavigation();
  const {login}  = useAuthContext();
  // Function to handle the login button press
  const handleLogin = async () => {
    // Perform authentication logic here
    // For simplicity, just log the user credentials for now
    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }
    if (!isEmailValid(email)) {
      setError("Invalid email address");
      return;
    }

    // Password validation
    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }
    // login(email,password);
    // const result = await login(email, password);
    // console.log(result);
    //   if (!result.ok) {
    //       setError(result.data);
    //       return;
    //   }
    setError(null);
    // login(result.data);
    await login({email:email,password:password});
       
    // Clear any previous errors
    setError(null);
  };

  return (
    <View style={styles.container}>
      {/* IMDb logo or banner */}
      <Image
        style={styles.logoImage}
        source={require("../../assets/images/imdb.png")}
      />

      <Text style={styles.loginHeading}>Welcome Back</Text>
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
      {error && <Text style={styles.errorText}>{error}</Text>}
      {/* Login button */}
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      {/* Forgot password link */}
      <Text style={styles.forgotPassword}>Forgot Password?</Text>
    </View>
  );
};

// Styles for the components
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.black,
    flex: 1,
    justifyContent: "start",
    alignItems: "center",
    padding: 20,
  },
  logoImage: {
    marginTop: "35%",
    marginBottom: 20,
    width: 140,
    height: 140,
  },
  loginHeading: {
    alignSelf: "flex-start",
    color: colors.white,
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
  },
  errorText: {
    color: "red",
    marginTop: 5,
  },
  // logo: {
  //   color:colors.white,
  //   fontSize: 36,
  //   fontWeight: 'bold',
  //   marginBottom: 20,
  // },
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
  loginButton: {
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
  forgotPassword: {
    marginTop: 10,
    color: "black",
  },
});

// Export the component for use in the app
export default LoginScreen;
