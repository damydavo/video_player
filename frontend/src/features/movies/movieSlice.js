import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { TMDB_BASE_URL, API_KEY } from "../../components/misc/const";
import movieService from './movieService';

const initialState = {
    movies: [],
    genres: [],
    genresLoaded: false,
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: ''

};

export const getGenres = createAsyncThunk("netflix/genres", async () => {
    return await movieService.getGenres()
});

export const fetchMovies = createAsyncThunk("netflix/trending", async ({ type }, thunkAPI) => {
    try {
        const { netflix: { genres } } = thunkAPI.getState();
        return await movieService.getRawData(`${TMDB_BASE_URL}/trending/${type}/week?api_key=${API_KEY}`, genres, true)
    }
    catch (error) {
        const message = (error.response && error.response.data && error.response.data.message)
            || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }


})

const movieSlice = createSlice({
    name: "Netflix",
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder.addCase(getGenres.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(getGenres.fulfilled, (state, action) => {
            state.genres = action.payload;
            state.genresLoaded = true;
            state.isSuccess = true;
            state.isLoading = false
        });
        builder.addCase(getGenres.rejected, (state, action) => {
            state.isLoading = false;
        })
        builder.addCase(fetchMovies.fulfilled, (state, action) => {
            state.movies = action.payload;
            state.isSuccess = true;
            state.isLoading = false

        });
        builder.addCase(fetchMovies.rejected, (state, action) => {
            state.isLoading = false
            state.isSuccess = false
            state.message = action.payload
        })
    },
})

export const { reset } = movieSlice.actions
export default movieSlice.reducer
