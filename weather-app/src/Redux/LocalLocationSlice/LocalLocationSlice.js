import { createSlice } from "@reduxjs/toolkit";
import { apiKey } from "../../ApiKey";
const LocalLocationSlice = createSlice({
  name: "LocalLocation",
  initialState: {
    // geoLocation: {
    //   latitude: "",
    //   longitude: "",
    // },
    currentLocationWeather: null,
  },
  reducers: {
    // setLocalLatitude: (state, action) => {
    //   state.geoLocation.latitude = action.payload;
    // },
    // setLocalLongitude: (state, action) => {
    //   state.geoLocation.longitude = action.payload;
    // },
    setCurrentLocationWeatherData: (state, action) => {
      state.currentLocationWeather = action.payload;
    },
  },
});

export const {
  setCurrentLocationWeatherData,
  // setLocalLatitude,
  // setLocalLongitude,
} = LocalLocationSlice.actions;

export default LocalLocationSlice.reducer;

// export const getLocalCoords = (latitude, longitude) => {
//   return async (dispatch) => {
//     dispatch(setLocalLatitude(latitude));
//     dispatch(setLocalLongitude(longitude));
//   };
// };

export const getLocalWeather = (latitude, longitude, apiKey) => {
  return async (dispatch) => {
    const getWeather = async () => {
      const response = await fetch(
        `http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${apiKey}&q=${latitude}%2C${longitude}`
      );
      const data = await response.json();
      console.log(data);
      dispatch(setCurrentLocationWeatherData(data));
    };
    try {
      await getWeather();
    } catch (err) {
      console.log(err);
    }
  };
};
