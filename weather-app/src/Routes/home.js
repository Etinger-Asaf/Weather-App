import { useDispatch, useSelector } from "react-redux";
import { useEffect, Fragment, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { sendUserInput } from "../Redux/slices/AutocompleteSlice";
import { get5DaysForecast } from "../Redux/slices/Next5DaysForecastSlice";
import Next5DaysForecast from "../Features/Next5DaysForecast/Next5DaysForecast";
import RechartWeather from "../Features/RechartWeather/rechartWeather";
import LocalWeather from "../Features/LocalWeather/LocalWeather";
import DisplayLocalWeather from "../Features/LocalWeather/DisplayLocalWeather";
import classes from "./home.module.css";
import heart from "../Icons/heart.svg";
import { apiKey } from "../ApiKey";
import { userIsClicked } from "../Redux/slices/isUserClickedSlice";
import { setAddFavoriteCity } from "../Redux/slices/favoriteSlice";
const Home = () => {
  const dispatch = useDispatch();

  const [userInput, setUserInput] = useState("");
  const [citySuggestion, setCitySuggestion] = useState([]);
  const [day, setDays] = useState(true);

  const { forecast } = useSelector((state) => state.next5DaysForecast);
  const { citySuggestionArray, cityInfo } = useSelector(
    (state) => state.autocomplete
  );
  const { isClicked } = useSelector((state) => state.isClicked);
  const { LocalWeather } = useSelector((state) => state.localWeather);

  const setItIsDayTimeHandler = () => {
    setDays(true);
  };

  const setItIsNightTimeHandler = () => {
    setDays(false);
  };

  const setUserInputHandler = (value) => {
    setUserInput(value);
  };

  const onSearchClickHandler = () => {
    console.log(cityInfo, "cityInfo");
    const cityLocationKey = cityInfo.locationKey;

    if (!cityLocationKey) {
      return;
    }

    dispatch(get5DaysForecast(cityLocationKey, apiKey));
    dispatch(userIsClicked(true));
  };

  useEffect(() => {
    try {
      if (!userInput) {
        return;
      }
      dispatch(sendUserInput(userInput));

      if (!citySuggestionArray) {
        return;
      }
      setCitySuggestion(citySuggestionArray);
    } catch (err) {
      console.log(err);
    }
  }, [userInput]);

  const localWeatherDisplay = () => {
    if (forecast.length > 0) {
      return <DisplayLocalWeather />;
    }
  };

  const favoriteHandler = () => {
    // i need the city name today temp and weather text
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
    <Fragment>
      <div className={classes.autocompleteContainer}>
        <Autocomplete
          className={classes.autocomplete}
          freeSolo
          options={citySuggestion}
          id="citySearchAutocomplete"
          onInputChange={(event, value) => {
            setUserInputHandler(value);
          }}
          clearOnBlur
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search for a City"
              variant="outlined"
            />
          )}
        />
        <button className={classes.searchBtn} onClick={onSearchClickHandler}>
          Search
        </button>
        {isClicked && (
          <button className={classes.favoriteBtn} onClick={favoriteHandler}>
            <img src={heart} />
          </button>
        )}
      </div>
      <div>
        {/* <LocalWeather /> */}
        {localWeatherDisplay()}
        <div>
          <Next5DaysForecast day={day} />
        </div>
        {isClicked && <RechartWeather isItDayTime={day} />}
        {isClicked && (
          <div className={classes.timeBtnContainer}>
            <button
              className={
                day
                  ? [classes.timeBtnLeft] + " " + [classes.activeTimeBtn]
                  : [classes.timeBtnLeft]
              }
              onClick={setItIsDayTimeHandler}
            >
              Day
            </button>
            <button
              className={
                day
                  ? [classes.timeBtnRight]
                  : [classes.timeBtnRight] + " " + [classes.activeTimeBtn]
              }
              onClick={setItIsNightTimeHandler}
            >
              Night
            </button>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default Home;
