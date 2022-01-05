import { createSlice } from "@reduxjs/toolkit";

const Next5DaysForecastSlice = createSlice({
  name: "Next5DaysForecast",
  initialState: { forecast: [] },
  reducers: {
    getNext5DaysForecast: (state, action) => {
      state.forecast = action.payload;
    },
  },
});

export const { getNext5DaysForecast } = Next5DaysForecastSlice.actions;
export default Next5DaysForecastSlice.reducer;

export const get5DaysForecast = (value, apiKey) => {
  return async (dispatch) => {
    const get5Forecast = async () => {
      const response = await fetch(
        `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${value}?apikey=${apiKey}&metric=true`
      );
      const data = await response.json();

      const next5DaysForecastData = data.DailyForecasts.map((item) => ({
        date: item.Date,
        maximumTemp: item.Temperature.Maximum.Value,
        minimumTemp: item.Temperature.Minimum.Value,
        id: item.Date,
      }));

      const next5DaysForecastDates = next5DaysForecastData.map(
        (item) => item.date
      );
      const weekDaysInNumbers = next5DaysForecastDates.map(
        (item) => new Date(item)
      );
      const options = { weekday: "long" };
      const weekDaysInNames = weekDaysInNumbers.map((item) =>
        new Intl.DateTimeFormat("en-US", options).format(item)
      );

      for (let i = 0; i < next5DaysForecastDates.length; i++) {
        next5DaysForecastData[i].date = weekDaysInNames[i];
      }

      dispatch(getNext5DaysForecast(next5DaysForecastData));
    };

    try {
      await get5Forecast();
    } catch (err) {
      console.log(err);
    }
  };
};
