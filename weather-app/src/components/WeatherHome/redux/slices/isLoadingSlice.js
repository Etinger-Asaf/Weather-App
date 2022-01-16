import { createSlice } from "@reduxjs/toolkit";

const isLoadingSlice = createSlice({
  name: "isLoading",
  initialState: { isLoading: false },
  reducers: {
    setIsLoading: (state) => {
      state.isLoading = !state.isLoading;
    },
  },
});

export const { setIsLoading } = isLoadingSlice.actions;
export default isLoadingSlice.reducer;
