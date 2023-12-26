import * as SecureStore from "expo-secure-store";
import { getUser } from "../auth/storage";

const USER_WATCHLIST_KEY = "user_watchlist1";
const getWatchlist = async () => {
  try {
    const user = await getUser();
    const watchlistString = await SecureStore.getItemAsync(
      `${USER_WATCHLIST_KEY}${user.id}`
    );
    return watchlistString ? JSON.parse(watchlistString) : [];
  } catch (error) {
    console.error("Error getting watchlist:", error);
    return [];
  }
};

// Function to add a movie to the watchlist
const addToWatchlist = async (movie) => {
  try {
    // if (isInWatchlist(movie.id)) return console.log("Movie already in watchlist");
    const watchlist = await getWatchlist();
    const updatedWatchlist = [...watchlist, movie];
    const user= await getUser();
    const res=await SecureStore.setItemAsync(
        `${USER_WATCHLIST_KEY}${user.id}`,
      JSON.stringify(updatedWatchlist)
    );
    console.log("Movie added to watchlist",res);
    return updatedWatchlist;
  } catch (error) {
    console.error("Error adding to watchlist:", error);
    return [];
  }
};

// Function to remove a movie from the watchlist
const removeFromWatchlist = async (movieId) => {
  try {
    const watchlist = await getWatchlist();
    const updatedWatchlist = watchlist.filter((movie) => movie.id !== movieId);
    await SecureStore.setItemAsync(
      USER_WATCHLIST_KEY,
      JSON.stringify(updatedWatchlist)
    );
    return updatedWatchlist;
  } catch (error) {
    console.error("Error removing from watchlist:", error);
    return [];
  }
};
// Function to check if a movie is already in the watchlist
const isInWatchlist = async (movieId) => {
  try {
    const watchlist = await getWatchlist();
    return watchlist.some((movie) => movie.id == movieId);
  } catch (error) {
    console.error("Error checking watchlist:", error);
    return false;
  }
};
const clearWatchlist = async () => {
  try {
    const user = await getUser();
    await AsyncStorage.removeItem(`${USER_WATCHLIST_KEY}${user.id}`);
    console.log("Watchlist cleared.");
  } catch (error) {
    console.error("Error clearing watchlist:", error);
  }
};
export {
  getWatchlist,
  addToWatchlist,
  removeFromWatchlist,
  isInWatchlist,
  clearWatchlist,
};
