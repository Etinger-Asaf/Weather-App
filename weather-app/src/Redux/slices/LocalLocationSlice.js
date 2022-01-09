import { createSlice } from "@reduxjs/toolkit";

const localLocationSlice = createSlice({
  name: "localLocation",
  initialState: {
    currentLocationWeather: null,
  },
  reducers: {
    setCurrentLocationWeatherData: (state, action) => {
      state.currentLocationWeather = action.payload;
    },
  },
});

export const { setCurrentLocationWeatherData } = localLocationSlice.actions;

export default localLocationSlice.reducer;

export const getLocalWeather = (latitude, longitude, apiKey) => {
  return async (dispatch) => {
    const getWeather = async () => {
      const response = await fetch(
        `http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${apiKey}&q=${latitude}%2C${longitude}`
      );
      const data = await response.json();

      dispatch(setCurrentLocationWeatherData(data));
    };
    try {
      await getWeather();
    } catch (err) {
      console.log(err);
    }
  };
};
