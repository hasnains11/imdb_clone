import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';

const AddMovieScreen = () => {
  const [movieName, setMovieName] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [breakPoint, setBreakPoint] = useState('');
  const [pgRating, setPgRating] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [genre, setGenre] = useState('');
  const [actors, setActors] = useState('');
  const [directors, setDirectors] = useState('');
  const [writers, setWriters] = useState('');
  const [summary, setSummary] = useState('');

  const handleSubmit = () => {
    const movieData = {
      movieName,
      thumbnailUrl,
      videoUrl,
      breakPoint,
      pgRating,
      releaseDate,
      genre,
      actors,
      directors,
      writers,
      summary,
    };
    console.log(movieData);
    // Add logic to handle the submitted data (e.g., API call to save movie)
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Add Movie Form</Text>

      <View style={styles.formGroup}>
        <Text>Movie Name:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter movie name"
          value={movieName}
          onChangeText={(text) => setMovieName(text)}
        />
      </View>

      <View style={styles.formGroup}>
        <Text>Thumbnail URL:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter thumbnail URL"
          value={thumbnailUrl}
          onChangeText={(text) => setThumbnailUrl(text)}
        />
      </View>

      <View style={styles.formGroup}>
        <Text>Video URL:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter video URL"
          value={videoUrl}
          onChangeText={(text) => setVideoUrl(text)}
        />
      </View>

      <View style={styles.formGroup}>
        <Text>Break Point:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter break point"
          value={breakPoint}
          onChangeText={(text) => setBreakPoint(text)}
        />
      </View>

      <View style={styles.formGroup}>
        <Text>PG Rating:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter PG rating"
          value={pgRating}
          onChangeText={(text) => setPgRating(text)}
        />
      </View>

      <View style={styles.formGroup}>
        <Text>Release Date:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter release date"
          value={releaseDate}
          onChangeText={(text) => setReleaseDate(text)}
        />
      </View>

      <View style={styles.formGroup}>
        <Text>Genre:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter genre"
          value={genre}
          onChangeText={(text) => setGenre(text)}
        />
      </View>

      <View style={styles.formGroup}>
        <Text>Actors:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter actors (comma-separated)"
          value={actors}
          onChangeText={(text) => setActors(text)}
        />
      </View>

      <View style={styles.formGroup}>
        <Text>Directors:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter directors (comma-separated)"
          value={directors}
          onChangeText={(text) => setDirectors(text)}
        />
      </View>

      <View style={styles.formGroup}>
        <Text>Writers:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter writers (comma-separated)"
          value={writers}
          onChangeText={(text) => setWriters(text)}
        />
      </View>

      <View style={styles.formGroup}>
        <Text>Summary:</Text>
        <TextInput
          style={[styles.input, { height: 80 }]}
          placeholder="Enter summary"
          multiline
          numberOfLines={4}
          value={summary}
          onChangeText={(text) => setSummary(text)}
        />
      </View>
      <Button style={{marginBottom:10}} title="Submit" onPress={handleSubmit} />

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
   
    // justifyContent: 'center',
    // alignItems: 'center',
    paddingHorizontal: 16,
   
    
  },
  heading: {
    fontSize: 20,
    marginBottom: 16,
  },
  formGroup: {
    marginBottom: 16,
    width: '100%',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 8,
    width: '100%',
  },
});

export default AddMovieScreen;
