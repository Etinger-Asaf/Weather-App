import { createSlice } from "@reduxjs/toolkit";

const currentCityWeather = createSlice({
  name: "currentCityWeather",
  initialState: { currentWeather: null },
  reducers: {
    setCurrentCityWeather: (state, action) => {
      state.currentWeather = action.payload;
    },
  },
});

export const { setCurrentCityWeather } = currentCityWeather.actions;
export default currentCityWeather.reducer;

export const getCurrentCityWeather = (cityLocationKey, apiKey) => {
  return async (dispatch) => {
    const getCurrentWeather = async () => {
      const response = await fetch(
        `http://dataservice.accuweather.com/currentconditions/v1/${cityLocationKey}?apikey=${apiKey}`
      );
      const data = await response.json();
      const currentCityWeather = {
        weatherText: data[0].WeatherText,
        tempMetric: data[0].Temperature.Metric.Value,
        tempImperial: data[0].Temperature.Imperial.Value,
      };
      dispatch(setCurrentCityWeather(currentCityWeather));
    };
    try {
      await getCurrentWeather();
    } catch (err) {
      console.log(err);
    }
  };
};
