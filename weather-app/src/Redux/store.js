import { configureStore } from "@reduxjs/toolkit";
import autocompleteReducer from "./slices/autocompleteSlice";
import next5DaysForecastReducer from "./slices/next5DaysForecastSlice";
import localLocationReducer from "./slices/localLocationSlice";
import localCityWeatherReducer from "./slices/localCityWeatherSlice";
import isUserClickedReducer from "./slices/isUserClickedSlice";
import favoriteSliceReducer from "./slices/favoriteSlice";
import isItDayTimeReducer from "./slices/isItDayTime";
export default configureStore({
  reducer: {
    autocomplete: autocompleteReducer,
    next5DaysForecast: next5DaysForecastReducer,
    localLocation: localLocationReducer,
    localWeather: localCityWeatherReducer,
    isClicked: isUserClickedReducer,
    favorite: favoriteSliceReducer,
    isItDayTime: isItDayTimeReducer,
  },
});
