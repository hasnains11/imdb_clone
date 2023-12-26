import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../assets/colors';

const WelcomeScreen = () => {
  const navigation = useNavigation();

 

  return (
    <View style={styles.container}>
      <Text style={{...styles.welcomeText,color:colors.yellow}}>Welcome Back!</Text>
      <Text style={styles.welcomeText}>Please go to Home Screen to continue with app!</Text>
       
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.darkBackground,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#FFFFFF',  
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#3498db',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default WelcomeScreen;
