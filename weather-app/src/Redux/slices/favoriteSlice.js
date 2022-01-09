import { createSlice } from "@reduxjs/toolkit";

const favoriteSlice = createSlice({
  name: "favorite",
  initialState: { favorites: [] },
  reducers: {
    setAddFavoriteCity: (state, action) => {
      if (state.favorites.find((item) => item.id === action.payload.id)) {
        return;
      }

      state.favorites = [...state.favorites, action.payload];
    },
    setRemoveFavoriteCity: (state, action) => {
      state.favorites = state.favorites.filter(
        (item) => item.id !== action.payload
      );
    },
  },
});

export const { setAddFavoriteCity, setRemoveFavoriteCity } =
  favoriteSlice.actions;

export default favoriteSlice.reducer;
