import { useEffect, useState } from "react";
import classes from "./WeatherHeadLine.module.css";

const WeatherHeadLine = ({ cityName, todayForecast, isItCelsius }) => {
  const [displayCityName, setDisplayCityName] = useState();
  const [displayTodayForecast, setDisplayTodayForecast] = useState();
  const [displayIsItCelsius, setIsItCelsius] = useState();

  useEffect(() => {
    setDisplayCityName(cityName);
    setDisplayTodayForecast(todayForecast);
    setIsItCelsius(isItCelsius);
  }, [todayForecast, isItCelsius]);

  if (!displayCityName || !displayTodayForecast) {
    return <p></p>;
  }
  return (
    <div className={classes.displayWeatherContainer}>
      <h3
        className={classes.tempHeadline}
      >{`The Current Weather in  ${displayCityName} is ${
        displayIsItCelsius
          ? todayForecast.tempMetric
          : todayForecast.tempImperial
      }`}</h3>
      <h4
        className={classes.weatherHeadline}
      >{`${displayTodayForecast.weatherText}`}</h4>
    </div>
  );
};

export default WeatherHeadLine;
