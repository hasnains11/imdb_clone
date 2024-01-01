import client from "../api/client";
const IP_ADDRESS = "192.168.10.103"
export const getTopBannerMovies = () => client.get("getTopBannerMovies");
export const getFeaturedMovies = () => client.get("getFeaturedMovies");
export const getCommingSoonMovies = () => client.get("getCommingSoonMovies");

export const getMoviesByGenre = (genreId) =>
  client.get(`getMoviesByGenre?gid=${genreId}`);


export const addRatings = (ratings) => {
  client.post(`addMovieRate`, ratings);
};

export const getVideoDownloadLink = (video) =>
 `http://${IP_ADDRESS}/IM_DB_API/videos/${video}`;
export const getImagesDownloadLink = (image) =>
 `http://${IP_ADDRESS}/IM_DB_API/images/${image}`;