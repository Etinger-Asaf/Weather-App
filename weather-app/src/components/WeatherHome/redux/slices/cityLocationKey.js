import { createSlice } from "@reduxjs/toolkit";
import { apiKey } from "../../../../ApiKey";
// this will get the cityName from the geoLocation or the input and will send api request to get the city key
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
      const response = await fetch(
        `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${apiKey}&q=${userInput}`
      );
      const data = await response.json();

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
    }
  };
};
