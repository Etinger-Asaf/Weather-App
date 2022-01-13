import { createSlice } from "@reduxjs/toolkit";

const favoriteCitiesSlice = createSlice({
  name: "favoriteCities",
  initialState: { favoriteCities: [] },
  reducers: {
    addCity: (state, action) => {
      if (state.favoriteCities.find((item) => item.id === action.payload.id)) {
        return;
      }
      state.favoriteCities = [...state.favoriteCities, action.payload];
    },
    removeCity: (state, action) => {
      state.favoriteCities = state.favoriteCities.filter(
        (city) => city.id !== action.payload
      );
    },
  },
});

export const { addCity, removeCity } = favoriteCitiesSlice.actions;
export default favoriteCitiesSlice.reducer;
