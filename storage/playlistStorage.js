import * as SecureStore from 'expo-secure-store';

const USER_PLAYLISTS_KEY_PREFIX = 'user_playlists_';

export const createPlaylist = async (userId, playlistName) => {
  try {
    const userPlaylistsKey = `${USER_PLAYLISTS_KEY_PREFIX}${userId}`;

    // Retrieve existing playlists or initialize an empty array
    const existingPlaylists = await SecureStore.getItemAsync(userPlaylistsKey);
    const playlists = existingPlaylists ? JSON.parse(existingPlaylists) : [];

    // Check if a playlist with the same name already exists
    const existingPlaylist = playlists.find((playlist) => playlist.name === playlistName);
    if (existingPlaylist) {
      throw new Error('Playlist with the same name already exists.');
    }

    // Create a new playlist
    const newPlaylist = {
      id: Date.now().toString(), // You can use a more robust method to generate IDs
      name: playlistName,
      movies: [],
    };

    // Add the new playlist to the array
    playlists.push(newPlaylist);

    // Save the updated playlists array
    await SecureStore.setItemAsync(userPlaylistsKey, JSON.stringify(playlists));

    return newPlaylist;
  } catch (error) {
    throw new Error(`Failed to create playlist: ${error.message}`);
  }
};

export const getPlaylists = async (userId) => {
  try {
    const userPlaylistsKey = `${USER_PLAYLISTS_KEY_PREFIX}${userId}`;
    const playlists = await SecureStore.getItemAsync(userPlaylistsKey);
    return playlists ? JSON.parse(playlists) : [];
  } catch (error) {
    throw new Error(`Failed to retrieve playlists: ${error.message}`);
  }
};

export const addMovieToPlaylist = async (userId, playlistId, movie) => {
  try {
    const userPlaylistsKey = `${USER_PLAYLISTS_KEY_PREFIX}${userId}`;
    const playlists = await getPlaylists(userId);

    // Find the playlist by ID
    const playlistIndex = playlists.findIndex((playlist) => playlist.id === playlistId);

    if (playlistIndex !== -1) {
      // Add the movie to the playlist
      playlists[playlistIndex].movies.push(movie);

      // Save the updated playlists array
      await SecureStore.setItemAsync(userPlaylistsKey, JSON.stringify(playlists));

      return playlists[playlistIndex];
    } else {
      throw new Error('Playlist not found.');
    }
  } catch (error) {
    throw new Error(`Failed to add movie to playlist: ${error.message}`);
  }
};

export const removeMovieFromPlaylist = async (userId, playlistId, movieId) => {
  try {
    const userPlaylistsKey = `${USER_PLAYLISTS_KEY_PREFIX}${userId}`;
    const playlists = await getPlaylists(userId);

    // Find the playlist by ID
    const playlistIndex = playlists.findIndex((playlist) => playlist.id === playlistId);

    if (playlistIndex !== -1) {
      // Remove the movie from the playlist
      playlists[playlistIndex].movies = playlists[playlistIndex].movies.filter(
        (movie) => movie.id !== movieId
      );

      // Save the updated playlists array
      await SecureStore.setItemAsync(userPlaylistsKey, JSON.stringify(playlists));

      return playlists[playlistIndex];
    } else {
      throw new Error('Playlist not found.');
    }
  } catch (error) {
    throw new Error(`Failed to remove movie from playlist: ${error.message}`);
  }
};
export const storeMoviesInWatchlistLocally = async (movies) => {
  try {
    const userPlaylistsKey = `${USER_PLAYLISTS_KEY_PREFIX}${userId}`;
    const playlists = await getPlaylists(userId);

    // Find the watchlist by ID (assuming watchlist has a specific ID)
    const watchlistIndex = playlists.findIndex((playlist) => playlist.name === 'Watchlist');

    if (watchlistIndex !== -1) {
      // Update the movies in the watchlist
      playlists[watchlistIndex].movies = movies;

      // Save the updated playlists array
      await SecureStore.setItemAsync(userPlaylistsKey, JSON.stringify(playlists));

      return playlists[watchlistIndex];
    } else {
      throw new Error('Watchlist not found.');
    }
  } catch (error) {
    throw new Error(`Failed to store movies in watchlist: ${error.message}`);
  }
};
