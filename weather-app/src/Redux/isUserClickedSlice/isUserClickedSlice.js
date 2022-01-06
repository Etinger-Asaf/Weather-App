import { createSlice } from "@reduxjs/toolkit";

const isUserClickedSlice = createSlice({
  name: "isUserClicked",
  initialState: { isClicked: false },
  reducers: {
    setIsUserClicked: (state, action) => {
      state.isClicked = action.payload;
    },
  },
});

export const { setIsUserClicked } = isUserClickedSlice.actions;
export default isUserClickedSlice.reducer;

export const userIsClicked = (value) => {
  return async (dispatch) => {
    await dispatch(setIsUserClicked(value));
  };
};
