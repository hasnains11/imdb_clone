import React from 'react';
import { View, Text, FlatList, StyleSheet,Image } from 'react-native';
import { colors } from '../../assets/colors';
import { getImagesDownloadLink, getUserImageLink } from '../../contexts/api';

const MovieCast = ({ cast }) => {
  const ActorCard = ( {item} ) => {
    console.log(getUserImageLink(item.imageURL),"item++++++");
    return (<View style={styles.cardContainer}>
      <Image source={{uri:getUserImageLink(item.imageURL) }} style={styles.actorImage} />
      <Text style={styles.actorName}>{item.name}</Text>
      <Text style={styles.actorDetails}>{item.nationality}, {item.gender}</Text>
      <Text style={styles.actorDetails}>DOB: {item.dob}</Text>
    </View>
  )
}
    if(cast.length===0) return (<View>
        <Text style={{color:colors.white,textAlign:"center",margin:2}}>No cast found</Text>
    </View>)
  return (
    <View style={styles.container}>
      <FlatList
        data={cast}
        keyExtractor={(item) => item.id.toString()}
        renderItem={ActorCard}
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
  actorImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 8,
  },
  actorName: {
    color: '#fff', // White text color
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  actorDetails: {
    color: '#ccc', // Light gray text color
    fontSize: 12,
  },
});

export default MovieCast;
