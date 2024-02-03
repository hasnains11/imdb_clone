import React, { createContext, useEffect, useState, useContext } from "react";
import { getUser } from "../auth/storage";
import client from "../api/client";

// Create the watchlists context
export const WatchlistContext = createContext();

// Create the watchlists provider component
export const WatchlistProvider = ({ children }) => {
  // State to store the watchlists
  const [watchlists, setWatchlist] = useState([]);
  const [user, setUser] = useState(null);
  const [movies, setMovies] = useState([]);
  // Function to add a movie to the watchlists
  const addMovieToWatchlist = async (userId, movie, catId) => {
    const movieId = movie.id;
    const res = await client.post(`addMovieToWatchList`, {
      userId,
      movieId,
      catId,
    });

    console.log(res);
  };

  const createWatchList = async (title, userId) => {
    const res = await client.post(`addWatchList`, {
      title,
      userId,
    });
    console.log(res);
    fetchWatchlist();
  };

  // Function to remove a movie from the watchlists
  const removeMovieFromWatchlist = (movieId) => {
    // removeFromWatchlist(movieId);
    setWatchlist(watchlists.filter((movie) => movie.id !== movieId));
  };

  // Function to get the watchlists
  const fetchWatchlist = async () => {
    if (!(user==null)) {
      const watchlists = await client.get(`getMyWatchLists?userId=${user.id}`);
      console.log("fetched watchlists", watchlists.data);
      setWatchlist(watchlists.data);
    } else {
      getUser().then(async (user) => {
        const watchlists = await client.get(
          `getMyWatchLists?userId=${user.id}`
        );
        console.log("fetched watchlists", watchlists.data);
        setWatchlist(watchlists.data);
        setUser(user);
        return watchlists;
      });
    }
  };

  const getMoviesInWatchList = async (watchlistId) => {
    const movies = await client.get(
    `getMoviesByCategories?id=${watchlistId}&toFilter=1&userId=${user.id}`
    );
    setMovies(movies.data);
    return movies.data;
  };

  useEffect(() => {
    fetchWatchlist();
  }, []);

  return (
    <WatchlistContext.Provider
      value={{
        watchlists,
        movies,
        getMoviesInWatchList,
        createWatchList,
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
    throw new Error("useWatchListContext must be used within a MovieProvider");
  }
  return context;
};
