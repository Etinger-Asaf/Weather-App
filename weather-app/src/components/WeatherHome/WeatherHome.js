import { Fragment } from "react";
import { useSelector } from "react-redux";
import Next5DaysForecast from "./Next5DaysForecast/Next5DaysForecast";
import WeatherHeadLine from "./WeatherHeadLine/WeatherHeadLine";
import Rechart from "./Rechart/Rechart";
import { setIsItCelsius } from "./redux/slices/isItCelsius";
import { setIsItDayTime } from "./redux/slices/isItDayTimeSlice";
import classes from "./WeatherHome.module.css";
import { useDispatch } from "react-redux";
const WeatherHome = () => {
  const dispatch = useDispatch();

  const { fiveDaysForecast } = useSelector((state) => state.next5daysForecast);
  const { currentWeather } = useSelector((state) => state.currentCityWeather);
  const { cityName } = useSelector((state) => state.cityLocationKey);
  const { isItDayTime } = useSelector((state) => state.isItDayTime);
  const { isItCelsius } = useSelector((state) => state.isItCelsius);

  if (!fiveDaysForecast || !currentWeather || !cityName) {
    return <p></p>;
  }

  return (
    <Fragment>
      <WeatherHeadLine
        cityName={cityName}
        todayForecast={currentWeather}
        isItCelsius={isItCelsius}
      />
      <Next5DaysForecast
        next5DaysForecast={fiveDaysForecast}
        isItDayTime={isItDayTime}
        isItCelsius={isItCelsius}
      />
      <Rechart
        next5DaysForecast={fiveDaysForecast}
        isItDayTime={isItDayTime}
        isItCelsius={isItCelsius}
      />{" "}
      <div className={classes.btnContainer}>
        <button
          className={classes.btn}
          onClick={() => {
            dispatch(setIsItCelsius());
          }}
        >
          {isItCelsius ? "Display In Fahrenheit" : "Display In Celsius"}
        </button>
        <button
          className={classes.btn}
          onClick={() => {
            dispatch(setIsItDayTime());
          }}
        >
          {isItDayTime ? "Display Night Time" : "Display Day Time"}
        </button>
      </div>
    </Fragment>
  );
};

export default WeatherHome;
