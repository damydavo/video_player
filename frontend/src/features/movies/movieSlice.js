import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { TMDB_BASE_URL, API_KEY } from "../../components/misc/const";
import movieService from './movieService';

const initialState = {
    movies: [],
    isLoading: false,
    genres: [],
};

export const getGenres = createAsyncThunk("netflix/genres", async () => {
    return await movieService.getGenres()
});

export const fetchMovies = createAsyncThunk("netflix/trending", async ({ type }, thunkAPI) => {
    const { netflix: { genres }, } = thunkAPI.getState();

    return await movieService.getRawData(`${TMDB_BASE_URL}/trending/${type}/week?api_key=${API_KEY}`, genres, true)

})




const movieSlice = createSlice({
    name: "Netflix",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getGenres.fulfilled, (state, action) => {
            state.genres = action.payload;
            state.isLoading = true;
        });
        builder.addCase(fetchMovies.fulfilled, (state, action) => {
            state.movies = action.payload;
        });

    },
});

export default movieSlice.reducer
