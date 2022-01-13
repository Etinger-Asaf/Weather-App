import { createSlice } from "@reduxjs/toolkit";
const isItCelsius = createSlice({
  name: "isItCelsius",
  initialState: { isItCelsius: true },
  reducers: {
    setIsItCelsius: (state) => {
      state.isItCelsius = !state.isItCelsius;
    },
  },
});

export const { setIsItCelsius } = isItCelsius.actions;
export default isItCelsius.reducer;
