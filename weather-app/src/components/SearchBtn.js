import { useDispatch, useSelector } from "react-redux";
import { userIsClicked } from "../Redux/slices/isUserClickedSlice";
import { get5DaysForecast } from "../Redux/slices/next5DaysForecastSlice";
import { apiKey } from "../ApiKey";
import { getLocalCityWeather } from "../Redux/slices/localCityWeatherSlice";
import classes from "./Home/Home.module.css";

const SearchBtn = () => {
  const dispatch = useDispatch();
  const { cityInfo } = useSelector((state) => state.autocomplete);

  const onSearchClickHandler = () => {
    console.log(cityInfo, "cityInfo");

    const locationKey = cityInfo.locationKey;

    if (!locationKey) {
      return;
    }
    dispatch(get5DaysForecast(locationKey, apiKey));
    dispatch(getLocalCityWeather(locationKey, apiKey));
    dispatch(userIsClicked(true));
  };

  return (
    <button className={classes.searchBtn} onClick={onSearchClickHandler}>
      Search
    </button>
  );
};

export default SearchBtn;
