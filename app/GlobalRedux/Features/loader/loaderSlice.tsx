import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface MoviesState {
    isLoading: boolean
}

const initialState: MoviesState = {
    isLoading: false
}

export const loaderSlice = createSlice({
    name: 'loader',
    initialState,
    reducers: {
        setIsLoading: (state, action: PayloadAction<boolean>) => {
          state.isLoading = action.payload;
        },
    }
})

export const { setIsLoading } = loaderSlice.actions;

export default loaderSlice.reducer;