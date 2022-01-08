import { configureStore } from "@reduxjs/toolkit";
import autocompleteReducer from "./slices/AutocompleteSlice";
import next5DaysForecastReducer from "./slices/Next5DaysForecastSlice";
import localLocationReducer from "./slices/LocalLocationSlice";
import localCityWeatherReducer from "./slices/LocalCityWeatherSlice";
import isUserClickedReducer from "./slices/isUserClickedSlice";
import favoriteSliceReducer from "./slices/favoriteSlice";

export default configureStore({
  reducer: {
    autocomplete: autocompleteReducer,
    next5DaysForecast: next5DaysForecastReducer,
    localLocation: localLocationReducer,
    localWeather: localCityWeatherReducer,
    isClicked: isUserClickedReducer,
    favorite: favoriteSliceReducer,
  },
});
