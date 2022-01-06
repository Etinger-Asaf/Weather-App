import { createSlice } from "@reduxjs/toolkit";

const FavoriteSlice = createSlice({
  name: "Favorite",
  initialState: { favorites: [] },
  reducers: {
    setAddFavoriteCity: (state, action) => {
      console.log(action.payload, "action.payload");
      state.favorites = [...state.favorites, action.payload];
      console.log(state.favorites, "state.favorites");
    },
    setRemoveFavoriteCity: (state, action) => {
      state.favorites = state.favorites.filter(
        (item) => item.id !== action.payload
      );
    },
  },
});

export const { setAddFavoriteCity, setRemoveFavoriteCity } =
  FavoriteSlice.actions;

export default FavoriteSlice.reducer;
