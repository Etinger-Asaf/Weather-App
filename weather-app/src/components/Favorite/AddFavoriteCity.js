import { useDispatch, useSelector } from "react-redux";
import { setAddFavoriteCity } from "../../Redux/slices/favoriteSlice";
import heart from "../../Icons/heart.svg";
import classes from "../Home/Home.module.css";

const AddFavoriteCity = () => {
  const dispatch = useDispatch();
  const { LocalWeather } = useSelector((state) => state.localWeather);
  const { forecast } = useSelector((state) => state.next5DaysForecast);
  const { cityInfo } = useSelector((state) => state.autocomplete);

  const addingFavoriteCityHandler = () => {
    if (cityInfo && LocalWeather && forecast) {
      const favoriteDisplay = {
        cityName: cityInfo.cityName,
        id: cityInfo.locationKey,
        weatherText: LocalWeather,
        currentTemp: forecast[0].maximumTemp,
      };

      dispatch(setAddFavoriteCity(favoriteDisplay));
    }
  };

  return (
    <div>
      {
        <button
          className={classes.favoriteBtn}
          onClick={addingFavoriteCityHandler}
        >
          <img src={heart} />
        </button>
      }
    </div>
  );
};

export default AddFavoriteCity;
