import { configureStore } from "@reduxjs/toolkit";
import autocompleteReducer from "./AutocompleteSlice/AutocompleteSlice";
import Next5DaysForecastReducer from "./Next5daysForecastSlice/Next5DaysForecastSlice";
import LocalLocationReducer from "./LocalLocationSlice/LocalLocationSlice";
import LocalCityWeatherReducer from "./LocalCityWeatherSlice/LocalCityWeatherSlice";

export default configureStore({
  reducer: {
    autocomplete: autocompleteReducer,
    Next5DaysForecast: Next5DaysForecastReducer,
    LocalLocation: LocalLocationReducer,
    LocalWeather: LocalCityWeatherReducer,
  },
});
