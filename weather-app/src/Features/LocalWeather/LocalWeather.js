import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const LocalWeather = () => {
  const { todayWeather, currentLocationWeather } = useSelector(
    (state) => state.localLocation
  );

  useEffect(() => {
    if (!todayWeather) {
      return;
    }
    console.log(todayWeather, "todayWeather");
  }, [todayWeather]);

  const weatherText = todayWeather[0].WeatherText;
  const currentWeather = todayWeather[0].Temperature.Metric.value;

  return (
    <div className={classes.displayWeatherContainer}>
      <h3 className={classes.tempHeadline}>
        {`The Current Weather in ${localCityName}  is ${currentWeather}°C`}
      </h3>
      <h1 className={classes.weatherHeadline}>{weatherText}</h1>
    </div>
  );
};
export default LocalWeather;
