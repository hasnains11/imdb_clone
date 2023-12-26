import { getCommingSoonMovies, getTopBannerMovies ,getFeaturedMovies} from "./api";
import React, { createContext, useContext, useReducer, useEffect} from 'react';

// Define the initial state
const initialState = {
    topBannerMovies: [],
    featuredMovies: [],
    comingSoonMovies: [],
    loading: false,
    error: null,
};

// Define actions
const ActionTypes = {
    FETCH_TOP_BANNER_MOVIES_REQUEST: 'FETCH_TOP_BANNER_MOVIES_REQUEST',
    FETCH_TOP_BANNER_MOVIES_SUCCESS: 'FETCH_TOP_BANNER_MOVIES_SUCCESS',
    FETCH_TOP_BANNER_MOVIES_FAILURE: 'FETCH_TOP_BANNER_MOVIES_FAILURE',
    FETCH_COMING_SOON_MOVIES: 'FETCH_FEATURED_MOVIES_REQUEST',
    FETCH_COMING_SOON_MOVIES_SUCCESS: 'FETCH_COMING_SOON_MOVIES_SUCCESS',
    FETCH_COMING_SOON_MOVIES_FAILURE: 'FETCH_COMING_SOON_MOVIES_FAILURE',
    FETCH_FEATURED_MOVIES_REQUEST: 'FETCH_FEATRURED_MOVIES_REQUEST',
    FETCH_FEATURED_MOVIES_SUCCESS: 'FETCH_FEATRURED_MOVIES_SUCCESS',
    FETCH_FEATURED_MOVIES_FAILURE: 'FETCH_FEATRURED_MOVIES_FAILURE',
};

// Reducer function to update the state based on actions
const movieReducer = (state, action) => {
    switch (action.type) {
        case ActionTypes.FETCH_TOP_BANNER_MOVIES_REQUEST:
            return { ...state, loading: true, error: null };

        case ActionTypes.FETCH_TOP_BANNER_MOVIES_SUCCESS:
            return { ...state, loading: false, topBannerMovies: action.payload, error: null };

        case ActionTypes.FETCH_TOP_BANNER_MOVIES_FAILURE:
            return { ...state, loading: false, error: action.payload };

        case ActionTypes.FETCH_COMING_SOON_MOVIES:
            return { ...state, loading: true, error: null };

        case ActionTypes.FETCH_COMING_SOON_MOVIES_SUCCESS:
            return { ...state, loading: false, comingSoonMovies: action.payload, error: null };

        case ActionTypes.FETCH_COMING_SOON_MOVIES_FAILURE:
            return { ...state, loading: false, error: action.payload };

        case ActionTypes.FETCH_FEATURED_MOVIES_REQUEST:
            return { ...state, loading: true, error: null };

        case ActionTypes.FETCH_FEATURED_MOVIES_SUCCESS:
            return { ...state, loading: false, featuredMovies: action.payload, error: null };

        case ActionTypes.FETCH_FEATURED_MOVIES_FAILURE:
            return { ...state, loading: false, error: action.payload };

        default:
            return state;
    }
};

const MovieContext = createContext();

// Create a custom hook to use the MovieContext
export const useMovieContext = () => {
  const context = useContext(MovieContext);
  if (!context) {
    throw new Error('useMovieContext must be used within a MovieProvider');
  }
  return context;
};

export const MovieProvider = ({ children }) => {
        const [state, dispatch] = useReducer(movieReducer, initialState);
    
        // Example: Fetch top banner movies from your API
        const fetchTopBannerMovies = async () => {
            dispatch({ type: ActionTypes.FETCH_TOP_BANNER_MOVIES_REQUEST });
    
            try {
                const response = await getTopBannerMovies();
                const data = await convertDataForFrontend(response.data);
    
                dispatch({ type: ActionTypes.FETCH_TOP_BANNER_MOVIES_SUCCESS, payload: data });
            } catch (error) {
                dispatch({ type: ActionTypes.FETCH_TOP_BANNER_MOVIES_FAILURE, payload: error.message });
            }
        }
    
        // Example: Fetch featured movies from your API
        const fetchCommingSoonMovies = async () => {
            dispatch({ type: ActionTypes.FETCH_COMING_SOON_MOVIES });
    
            try {
                const response = await getCommingSoonMovies();
                const data = await convertDataForFrontend(response.data);
                dispatch({ type: ActionTypes.FETCH_COMING_SOON_MOVIES_SUCCESS, payload: data });
            } catch (error) {
                dispatch({ type: ActionTypes.FETCH_COMING_SOON_MOVIES_FAILURE, payload: error.message });
            }
        };
    
        const fetchFeaturedMovies =async () => {
            dispatch({ type: ActionTypes.FETCH_FEATURED_MOVIES_REQUEST });
    
            try {
                // Replace this with your API call to fetch coming soon movies
                const response = await getFeaturedMovies();
                const data = await convertDataForFrontend(response.data);
    
                dispatch({ type: ActionTypes.FETCH_FEATURED_MOVIES_SUCCESS, payload: data });
            } catch (error) {
                dispatch({ type: ActionTypes.FETCH_FEATURED_MOVIES_FAILURE, payload: error.message });
            }
        };
    
   
        useEffect(() => {
            fetchTopBannerMovies();
            fetchFeaturedMovies();
            fetchCommingSoonMovies();
        }, []);

        const contextValue = {...state}
    
        return (
            <MovieContext.Provider value={contextValue}>
                {children}
            </MovieContext.Provider>
        );
    };
  
    function convertDataForFrontend(rawData) {
        if (!rawData || !Array.isArray(rawData) || rawData.length === 0) {
          return []; // Return an empty array if the input data is invalid or empty
        }
      
        return rawData.map(item => {
          return {
            id: item.id,
            title: item.title,
            ageLimit: item.ageLimit,
            releaseDate: new Date(item.releaseDate).toLocaleDateString(),
            isFeatured: item.isFeatured,
            breakTime: item.breakTime,
            runTime: item.runTime,
            videoURL: item.videoURL,
            genera: item.genera,
            actor: item.actor.map(actor => ({
              id: actor.id,
              name: actor.name,
              nationality: actor.nationality,
              dob: new Date(actor.dob).toLocaleDateString(),
              gender: actor.gender,
            })),
            director: item.director.map(director => ({
              id: director.id,
              name: director.name,
              nationality: director.nationality,
              dob: new Date(director.dob).toLocaleDateString(),
              gender: director.gender,
            })),
            summaryWriter: item.SummaryWriter.map(writer => ({
              id: writer.id,
              name: writer.name,
              nationality: writer.nationality,
              dob: new Date(writer.dob).toLocaleDateString(),
              gender: writer.gender,
            })),
            scriptWriter: item.ScriptWriter.map(writer => ({
              id: writer.id,
              name: writer.name,
              nationality: writer.nationality,
              dob: new Date(writer.dob).toLocaleDateString(),
              gender: writer.gender,
            })),
            description: item.description,
            imageURL: item.imageURL,
            rates: item.rates.map(rate => ({
              reviewId: rate.reviewId,
              rate: rate.rate,
              review: rate.review,
              userId: rate.userId,
              username: rate.username,
              usergender: rate.usergender,
            })),
          };
        });
      }
      

      