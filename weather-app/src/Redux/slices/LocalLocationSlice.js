import { createSlice } from "@reduxjs/toolkit";

const localLocationSlice = createSlice({
  name: "localLocation",
  initialState: {
    currentLocationWeather: null,
    localCoords: null,
    todayWeather: null,
  },
  reducers: {
    setCurrentLocationWeatherData: (state, action) => {
      state.currentLocationWeather = action.payload;
    },
    setLocalCoords: (state, action) => {
      state.localCoords = action.payload;
    },
    setTodayWeather: (state, action) => {
      state.todayWeather = action.payload;
    },
  },
});

export const {
  setCurrentLocationWeatherData,
  setLocalCoords,
  setTodayWeather,
} = localLocationSlice.actions;

export default localLocationSlice.reducer;

export const getLocalCoords = () => {
  return (dispatch) => {
    navigator.geolocation.getCurrentPosition((position) => {
      const getLatitude = position.coords.latitude;
      const getLongitude = position.coords.longitude;
      const latitudeFix = getLatitude.toFixed(1);
      const longitudeFix = getLongitude.toFixed(1);

      dispatch(setLocalCoords({ lat: latitudeFix, long: longitudeFix }));
    });
  };
};

export const getLocalWeather = (lat, long, apiKey) => {
  return async (dispatch) => {
    const getWeather = async () => {
      const response = await fetch(
        `http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${apiKey}&q=${lat}%2C${long}`
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

export const localWeatherToday = (cityKey, apiKey) => {
  return async (dispatch) => {
    const todayWeather = async () => {
      const response = await fetch(
        `http://dataservice.accuweather.com/currentconditions/v1/${cityKey}?apikey=${apiKey}`
      );
      const data = await response.json();
      console.log(data, "data");
      dispatch(setTodayWeather(data));
    };
    try {
      todayWeather();
    } catch (err) {
      console.log(err);
    }
  };
};
