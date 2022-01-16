import { createSlice } from "@reduxjs/toolkit";
import { apiKey } from "../../../../ApiKey";
import { setHasError } from "./errorHandlingSlice";
import { setIsLoading } from "../slices/isLoadingSlice";
const cityLocationKeySlice = createSlice({
  name: "cityLocationKey",
  initialState: { cityKey: null, citySuggestionArray: [], cityName: null },
  reducers: {
    setCityKey: (state, action) => {
      state.cityKey = action.payload;
    },
    setCitySuggestionArray: (state, action) => {
      state.citySuggestionArray = action.payload;
    },
    setCityName: (state, action) => {
      state.cityName = action.payload;
    },
  },
});

export const { setCityKey, setCitySuggestionArray, setCityName } =
  cityLocationKeySlice.actions;
export default cityLocationKeySlice.reducer;

export const getCityLocationKey = (userInput) => {
  return async (dispatch) => {
    const getKey = async () => {
      dispatch(setIsLoading());
      const response = await fetch(
        `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${apiKey}&q=${userInput}`
      );
      if (!response.ok) {
        throw new Error("We could not make a fetch");
      }

      const data = await response.json();

      if (data.length === 0) {
        throw new Error("We could not find this city, Please search again");
      }
      dispatch(setHasError(null));
      dispatch(setIsLoading());
      const cityLocationKey = data[0].Key;
      const cityName = data[0].LocalizedName;

      let citySuggestionArray = [];

      for (let i = 0; i < data.length; i++) {
        if (citySuggestionArray.includes(data[i].LocalizedName)) {
          continue;
        } else {
          citySuggestionArray.push(data[i].LocalizedName);
        }
      }
      dispatch(setCitySuggestionArray([]));
      dispatch(setCitySuggestionArray(citySuggestionArray));
      dispatch(setCityKey(cityLocationKey));
      dispatch(setCityName(cityName));
    };
    try {
      await getKey();
    } catch (err) {
      console.log(err);
      dispatch(setIsLoading());
      dispatch(setHasError(err.message));
    }
  };
};
