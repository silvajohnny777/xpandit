import { GenreTypes, MovieTypes } from '../../../../app/page';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface MoviesState {
    movies: Array<MovieTypes>,
    topRevenue: Array<MovieTypes>,
    topRevenueByYear: Array<MovieTypes>,
    genres: Array<GenreTypes>,
    movieDetails: MovieDetailTypes | null
}

export interface MovieDetailTypes {
    title: string
    release_date: string
    genres: Array<GenreTypes>
    overview: string
    runtime: number
    vote_average: number
    vote_count: number
    revenue: number
}

const initialState: MoviesState = {
    movies: [],
    topRevenue: [],
    topRevenueByYear: [],
    genres: [],
    movieDetails: null
}

export const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    addMoviesList: (state, action: PayloadAction<Array<MovieTypes>>) => {
      state.movies = action.payload;
    },
    addTopRevenues: (state, action: PayloadAction<Array<MovieTypes>>) => {
      state.topRevenue = action.payload;
    },
    addTopRevenuesByYear: (state, action: PayloadAction<Array<MovieTypes>>) => {
      state.topRevenueByYear = action.payload;
    },
    addMovieDetail: (state, action: PayloadAction<MovieDetailTypes | null>) => {
      state.movieDetails = action.payload;
    },        
  }
})

export const { addMoviesList, addTopRevenues, addTopRevenuesByYear, addMovieDetail } = moviesSlice.actions;

export default moviesSlice.reducer;