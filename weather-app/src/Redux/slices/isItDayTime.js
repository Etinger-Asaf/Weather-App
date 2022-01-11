import { createSlice } from "@reduxjs/toolkit";

const isItDayTimeSlice = createSlice({
  name: "dayTime",
  initialState: { isItDayTime: true },
  reducers: {
    setDayTime: (state) => {
      state.isItDayTime = !state.isItDayTime;
    },
  },
});

export const { setDayTime } = isItDayTimeSlice.actions;
export default isItDayTimeSlice.reducer;
