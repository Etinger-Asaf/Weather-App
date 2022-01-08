import { createSlice } from "@reduxjs/toolkit";
import { apiKey } from "../../ApiKey";
export const autocompleteSlice = createSlice({
  name: "autocomplete",
  initialState: {
    userInputSearch: "",
    citySuggestionArray: [],
    cityInfo: null,
  },
  reducers: {
    getUserInputSearch: (state, action) => {
      state.userInputSearch = action.payload;
    },
    setCitySuggestionArray: (state, action) => {
      state.citySuggestionArray = action.payload;
    },
    setCityInfo: (state, action) => {
      state.cityInfo = action.payload;
    },
  },
});

export const { getUserInputSearch, setCitySuggestionArray, setCityInfo } =
  autocompleteSlice.actions;

export default autocompleteSlice.reducer;

export const sendUserInput = (userInput) => {
  return async (dispatch) => {
    const sendInput = async () => {
      const response = await fetch(
        `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${apiKey}&q=${userInput}`
      );
      const data = await response.json();
      const citySuggestionArray = data.map((item) => item.LocalizedName);

      const cityInformation = data.map((item) => ({
        cityName: item.LocalizedName,
        id: item.Key,
        locationKey: item.Key,
      }));

      const currentCity = cityInformation.find(
        (item) => item.cityName === userInput
      );

      dispatch(setCitySuggestionArray(citySuggestionArray));
      dispatch(setCityInfo(currentCity));
    };

    try {
      await sendInput();
    } catch (err) {
      console.log(err);
    }
  };
};
