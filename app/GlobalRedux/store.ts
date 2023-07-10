import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from './Features/movies/moviesSlice';
import loaderReducer from './Features/loader/loaderSlice';

export const store = configureStore({
    reducer: {
        movies: moviesReducer,
        loader: loaderReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;