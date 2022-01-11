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
      console.log(data, "data");

      let citySuggestionArray = [];

      for (let i = 0; i < data.length; i++) {
        if (citySuggestionArray.includes(data[i].LocalizedName)) {
          continue;
        } else {
          citySuggestionArray.push(data[i].LocalizedName);
        }
      }
      console.log(citySuggestionArray, "citySuggestionArray");

      if (data) {
        const cityInformation = {
          cityName: data[0].LocalizedName,
          id: data[0].Key,
          locationKey: data[0].Key,
        };
        dispatch(setCityInfo(cityInformation));
      }
      dispatch(setCitySuggestionArray(citySuggestionArray));
    };

    try {
      await sendInput();
    } catch (err) {
      console.log(err);
    }
  };
};
