import client from "../api/client";
export const BASE_URL = "192.168.0.120"

export const getTopBannerMovies = () => client.get("getTopBannerMovies");
export const getFeaturedMovies = () => client.get("getFeaturedMovies");
export const getCommingSoonMovies = () => client.get("getCommingSoonMovies");

export const getMoviesByGenre = (genreId) =>
  client.get(`getMoviesByGenre?gid=${genreId}`);

export const addRatings = (ratings) => {
  client.post(`addMovieRate`, ratings);
};

export const getVideoDownloadLink = (video) =>
 `http://${BASE_URL}/IM_DB_API/videos/${video}`;

export const getImagesDownloadLink = (image) =>
 `http://${BASE_URL}/IM_DB_API/images/${image}`;
 
export const getUserImageLink= (image) =>
  `http://${BASE_URL}/IM_DB_API/userImages/${image}`;