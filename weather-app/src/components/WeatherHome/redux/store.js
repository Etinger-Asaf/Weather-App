import { configureStore } from "@reduxjs/toolkit";
import cityLocationLeyReducer from "./slices/cityLocationKey";
import next5daysForecastReducer from "./slices/next5DayWeatherSlice";
import currentCityWeatherReducer from "./slices/currentCityWeather";
import isItDayTimeReducer from "./slices/isItDayTimeSlice";
import isItCelsiusReducer from "./slices/isItCelsius";
import favoriteCitiesReducer from "./slices/favoriteCitiesSlice";
import errorHandlingReducer from "./slices/errorHandlingSlice";
import isLoadingReducer from "./slices/isLoadingSlice";
export default configureStore({
  reducer: {
    cityLocationKey: cityLocationLeyReducer,
    next5daysForecast: next5daysForecastReducer,
    currentCityWeather: currentCityWeatherReducer,
    isItDayTime: isItDayTimeReducer,
    isItCelsius: isItCelsiusReducer,
    favoriteCities: favoriteCitiesReducer,
    hasError: errorHandlingReducer,
    isLoading: isLoadingReducer,
  },
});
