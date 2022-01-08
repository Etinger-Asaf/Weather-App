import { createSlice } from "@reduxjs/toolkit";
import { apiKey } from "../../ApiKey";

const localCityWeatherSlice = createSlice({
  name: "localCityWeatherSlice",
  initialState: { LocalWeather: null },
  reducers: {
    setLocalWeather: (state, action) => {
      state.LocalWeather = action.payload;
    },
  },
});

export const { setLocalWeather } = localCityWeatherSlice.actions;
export default localCityWeatherSlice.reducer;

export const getLocalCityWeather = (currentCity, apiKey) => {
  return async (dispatch) => {
    const getWeather = async () => {
      const response = await fetch(
        `http://dataservice.accuweather.com/currentconditions/v1/${currentCity}?apikey=${apiKey}`
      );

      const data = await response.json();
      const weatherText = data[0].WeatherText;

      dispatch(setLocalWeather(weatherText));
    };

    try {
      await getWeather();
    } catch (err) {
      console.log(err);
    }
  };
};
