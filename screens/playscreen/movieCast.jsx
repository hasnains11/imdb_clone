import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { colors } from '../../assets/colors';

const MovieCast = ({ cast }) => {
  const renderActorItem = ({ item }) => (
    <View style={styles.actorItem}>
      <View style={styles.actorCapsule}>
        <Text style={styles.actorName}>{item.name}</Text>
      </View>
    </View>
  );
    if(cast.length===0) return (<View>
        <Text style={{color:colors.white,textAlign:"center",margin:2}}>No cast found</Text>
    </View>)
  return (
    <View style={styles.container}>
      <FlatList
        data={cast}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderActorItem}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical:2,
    marginHorizontal: 6,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  actorItem: {
    marginRight: 6,
    alignItems: 'center',
  },
  actorCapsule: {
    backgroundColor: colors.accentColor ,
    opacity:0.84, // Adjust the background color of the capsule
    borderRadius: 20, // Adjust the border radius for a rounded appearance
    paddingHorizontal: 10,
    paddingVertical: 3,
    marginVertical: 5,
},
  actorName: {
    color: '#ffffff', // Adjust the text color
    fontWeight: 'bold',
    fontSize: 12,
  },
});

export default MovieCast;
