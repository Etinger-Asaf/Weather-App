import { createSlice } from "@reduxjs/toolkit";

const isItDayTime = createSlice({
  name: "isItDayTime",
  initialState: { isItDayTime: true },
  reducers: {
    setIsItDayTime: (state) => {
      state.isItDayTime = !state.isItDayTime;
    },
  },
});

export const { setIsItDayTime } = isItDayTime.actions;
export default isItDayTime.reducer;
