import { createSlice } from "@reduxjs/toolkit";

const next5daysForecastSlice = createSlice({
  name: "fiveDaysForecast",
  initialState: { fiveDaysForecast: [] },
  reducers: {
    set5DaysForecast: (state, action) => {
      state.fiveDaysForecast = action.payload;
    },
  },
});

export const { set5DaysForecast } = next5daysForecastSlice.actions;
export default next5daysForecastSlice.reducer;

export const getNext5DaysForecast = (cityKey, apiKey) => {
  return async (dispatch) => {
    const setNext5DaysForecast = async () => {
      const response = await fetch(
        `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${cityKey}?apikey=${apiKey}&metric=true`
      );
      const data = await response.json();

      const fiveDaysDatesArray = data.DailyForecasts.map((item) => item.Date);
      const weekDaysInNumbers = fiveDaysDatesArray.map(
        (item) => new Date(item)
      );
      const options = { weekday: "long" };
      const weekDaysInNames = weekDaysInNumbers.map((item) =>
        new Intl.DateTimeFormat("en-US", options).format(item)
      );

      const fiveDaysForecast = data.DailyForecasts.map((item) => ({
        id: item.Date,
        date: item.Date,
        maxTemp: item.Temperature.Maximum.Value,
        minTemp: item.Temperature.Minimum.Value,
        maxTempImperial: (item.Temperature.Maximum.Value * 1.8 + 32).toFixed(1),
        minTempImperial: (item.Temperature.Minimum.Value * 1.8 + 32).toFixed(1),
        dayWeatherText: item.Day.IconPhrase,
        nightWeatherText: item.Night.IconPhrase,
      }));

      for (let i = 0; i < fiveDaysForecast.length; i++) {
        fiveDaysForecast[i].date = weekDaysInNames[i];
      }

      dispatch(set5DaysForecast(fiveDaysForecast));
    };

    try {
      await setNext5DaysForecast();
    } catch (err) {
      console.log(err);
    }
  };
};
