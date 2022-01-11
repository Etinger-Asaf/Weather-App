import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import classes from "./DisplayLocalWeather.module.css";
import { getLocalCityWeather } from "../../Redux/slices/localCityWeatherSlice";
import { apiKey } from "../../ApiKey";

const DisplayLocalWeather = () => {
  const dispatch = useDispatch();
  const { forecast } = useSelector((state) => state.next5DaysForecast);
  const { cityInfo } = useSelector((state) => state.autocomplete);
  const { LocalWeather } = useSelector((state) => state.localWeather);

  const [currentWeather, setCurrentWeather] = useState();
  const [localCityName, setLocalCityName] = useState();
  const [weatherText, setWeatherText] = useState();

  // useEffect(() => {
  //   try {
  //     if (cityInfo) {
  //       const cityLocationKey = cityInfo.locationKey;

  //       dispatch(getLocalCityWeather(cityLocationKey, apiKey));
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }, [cityInfo]);

  useEffect(() => {
    if (forecast && cityInfo && LocalWeather) {
      const localTemp = forecast[0].maximumTemp;
      setCurrentWeather(localTemp);
    }

    setLocalCityName(cityInfo.cityName);

    setWeatherText(LocalWeather);
  }, [forecast, cityInfo, LocalWeather]);

  return (
    <div className={classes.displayWeatherContainer}>
      <h3 className={classes.tempHeadline}>
        {`The Current Weather in ${localCityName}  is ${currentWeather}°C`}
      </h3>
      <h1 className={classes.weatherHeadline}>{weatherText}</h1>
    </div>
  );
};

export default DisplayLocalWeather;
