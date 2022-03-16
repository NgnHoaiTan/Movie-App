import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import MovieApi from '../../common/apis/MovieApi.js';
import {ApiKey} from '../../common/apis/MovieApiKey';

const initialState={
    movies:{},
    Selectedmovie:{},
    Recommendations:{},
    SearchMovies:{}
};
export const fetchAsyncPopularMovies = createAsyncThunk('movies/fetchAsyncPopularMovies',async()=>{   
    
    const response = await MovieApi.get(`/movie/popular?api_key=${ApiKey}&language=en-US&page=1`)
        return response.data;
});


export const fetchAsyncMoviesBySearch = createAsyncThunk('movies/fetchAsyncMovies',async(term)=>{
    const response = await MovieApi.get(`/search/movie?api_key=${ApiKey}&query=${term}&language=en-US&page=1&include_adult=false`)
        return response.data;
});


export const fetchAsyncMoviesByID = createAsyncThunk('movies/fetchAsyncMoviesByID',async(imdbID)=>{
    const response = await MovieApi.get(`/movie/${imdbID}?api_key=${ApiKey}&language=en-US`)
        return response.data;
});
export const fetchAsyncRecommendationMovies = createAsyncThunk('movies/fetchAsyncRecommendationMovies',async(imdbID)=>{
    const response = await MovieApi.get(`/movie/${imdbID}/recommendations?api_key=${ApiKey}&language=en-US&page=1`)
        return response.data;
});
const movieSlice = createSlice({
    name:"movies",
    initialState,
    reducers:{
        removeSelectedMovie:(state)=>{
            state.Selectedmovie ={}
        }
    },
    extraReducers:{
        [fetchAsyncPopularMovies.pending]:()=>{
            console.log("Pending");
        },
        [fetchAsyncPopularMovies.fulfilled]:(state,{payload})=>{
            console.log("Fetched Succesfully");

            return {
                ...state,
                movies: payload
            }
        },
        [fetchAsyncMoviesByID.fulfilled]:(state,{payload})=>{
            console.log("Fetched Succesfully");
            return {
                ...state,
                Selectedmovie: payload
            }
        },
        [fetchAsyncRecommendationMovies.fulfilled]:(state,{payload})=>{
            console.log("Fetched Succesfully");
            return {
                ...state,
                Recommendations: payload
            }
        },
        
        [fetchAsyncMoviesBySearch.fulfilled]:(state,{payload})=>{
            console.log("Fetched Succesfully");
            console.log(payload)
            return {
                ...state,
                movies: payload
            }
        },
        [fetchAsyncPopularMovies.rejected]:()=>{
            console.log("Rejected");
        },
        
        
        
    },

});
export const {removeSelectedMovie} = movieSlice.actions;
export const getAllMovies = (state) => state.movies.movies;
export const getSelectedMovie =(state)=> state.movies.Selectedmovie;
export const getRecommendations =(state)=> state.movies.Recommendations;
export const getSearchMovies=(state)=>state.movies.movies;
export default movieSlice.reducer;