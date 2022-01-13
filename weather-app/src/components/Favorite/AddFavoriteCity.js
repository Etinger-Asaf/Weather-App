import { useDispatch, useSelector } from "react-redux";
import {
  addCity,
  removeCity,
} from "../WeatherHome/redux/slices/favoriteCitiesSlice";
import heart from "../../Icons/heart.svg";
import redHeart from "../../Icons/redHeart.svg";
import classes from "../Home/Home.module.css";

const AddFavoriteCity = () => {
  const dispatch = useDispatch();

  const { fiveDaysForecast } = useSelector((state) => state.next5daysForecast);
  const { cityName } = useSelector((state) => state.cityLocationKey);
  const { favoriteCities } = useSelector((state) => state.favoriteCities);

  if (fiveDaysForecast.length === 0 || !cityName) {
    return <p></p>;
  }

  const favoriteCityData = {
    maxTemp: fiveDaysForecast[0].maxTemp,
    maxTempImperial: fiveDaysForecast[0].maxTempImperial,
    dayWeatherText: fiveDaysForecast[0].dayWeatherText,
    cityName: cityName,
    id: cityName,
  };

  const isThisCityIsFavorite = favoriteCities
    .map((item) => item.cityName)
    .includes(cityName);

  return (
    <div>
      {
        <button
          className={classes.favoriteBtn}
          onClick={() => {
            {
              !isThisCityIsFavorite
                ? dispatch(addCity(favoriteCityData))
                : dispatch(removeCity(favoriteCityData.id));
            }
          }}
        >
          <img src={isThisCityIsFavorite ? redHeart : heart} />
        </button>
      }
    </div>
  );
};

export default AddFavoriteCity;
