import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuthContext } from '../../auth/context';
const AdminPortalScreen = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const {logout}=useAuthContext();
  const navigateToAddMovie = () => {
    navigation.navigate('AddMovie');
  };

  const navigateToAddUser = () => {
    navigation.navigate('AddUser');
  };

  const navigateToRemoveMovie = () => {
    navigation.navigate('RemoveMovie');
  };

  const handleSearch = () => {
    // Implement search functionality here
    console.log('Search Query:', searchQuery);
  };
  
  const handleLogout = () => {
    // Implement logout functionality here
    // For example, navigate to the login screen
    logout();
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Admin Portal</Text>

      <Text style={styles.welcomeText}>Welcome, Admin!</Text>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        />
        <Button title="Search" onPress={handleSearch} />
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Add Movie" onPress={navigateToAddMovie} color="#3498db" />
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Add User" onPress={navigateToAddUser} color="#2ecc71" />
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Remove Movie" onPress={navigateToRemoveMovie} color="#e74c3c" />
      </View>
      
      <View style={{...styles.buttonContainer,borderRadius:30,marginTop:"20%"}}>
        <Button title="Logout" onPress={handleLogout} color="red" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    paddingTop:"13%",
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#ecf0f1',
  },
  welcomeText: {
    fontSize: 18,
    marginBottom: 8,
    color: '#34495e',
    textAlign: 'left',
},
  heading: {
    fontSize: 24,
    marginBottom: 30,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 35,

  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#bdc3c7',
    borderRadius: 8,
    padding: 8,
    marginRight: 8,
  },
  buttonContainer: {
    marginBottom: 16,
    width: '70%',
  },
});

export default AdminPortalScreen;
