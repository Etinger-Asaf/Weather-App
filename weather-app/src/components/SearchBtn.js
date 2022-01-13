import { useDispatch, useSelector } from "react-redux";
import { apiKey } from "../ApiKey";
import { getNext5DaysForecast } from "./WeatherHome/redux/slices/next5DayWeatherSlice";
import { getCurrentCityWeather } from "./WeatherHome/redux/slices/currentCityWeather";
import { setCitySuggestionArray } from "./WeatherHome/redux/slices/cityLocationKey";
import classes from "./Home/Home.module.css";

const SearchBtn = () => {
  const dispatch = useDispatch();
  const { cityKey } = useSelector((state) => state.cityLocationKey);

  const onSearchClickHandler = () => {

    if (!cityKey) {
      return;
    }

    dispatch(getNext5DaysForecast(cityKey, apiKey));
    dispatch(getCurrentCityWeather(cityKey, apiKey));
    dispatch(setCitySuggestionArray([]));
  };

  return (
    <button className={classes.searchBtn} onClick={onSearchClickHandler}>
      Search
    </button>
  );
};

export default SearchBtn;
