import { createSlice } from "@reduxjs/toolkit";

const errorHandlingSlice = createSlice({
  name: "errorHandling",
  initialState: { hasError: null },
  reducers: {
    setHasError: (state, action) => {
      state.hasError = action.payload;
    },
  },
});

export const { setHasError } = errorHandlingSlice.actions;
export default errorHandlingSlice.reducer;
