import React, { createContext, useEffect, useState,useContext } from "react";
import {
  addToWatchlist,
  getWatchlist,
  removeFromWatchlist,
} from "../storage/watchlistStorage";

// Create the watchlist context
export const WatchlistContext = createContext();

// Create the watchlist provider component
export const WatchlistProvider = ({ children }) => {
  // State to store the watchlist
  const [watchlist, setWatchlist] = useState([]);

  // Function to add a movie to the watchlist
  const addMovieToWatchlist = async (movie) => {
      await addToWatchlist(movie);
      setWatchlist([...watchlist, movie]);
  };

  // Function to remove a movie from the watchlist
  const removeMovieFromWatchlist = (movieId) => {
    removeFromWatchlist(movieId);
    setWatchlist(watchlist.filter((movie) => movie.id !== movieId));
  };

  // Function to get the watchlist
  const fetchWatchlist = async () => {
    const watchlist = await getWatchlist();
    setWatchlist(watchlist);
    return watchlist;
  };
  useEffect(() => {
    fetchWatchlist();
  }, []);

  // Provide the watchlist context value to the children components
  return (
    <WatchlistContext.Provider
      value={{
        watchlist,
        addMovieToWatchlist,
        removeMovieFromWatchlist,
        fetchWatchlist,
      }}
    >
      {children}
    </WatchlistContext.Provider>
  );
};
export const useWatchlistContext = () => {
    const context = useContext(WatchlistContext);
    if (!context) {
      throw new Error('useWatchListContext must be used within a MovieProvider');
    }
    return context;
  };