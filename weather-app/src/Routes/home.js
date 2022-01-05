import { useDispatch, useSelector } from "react-redux";
import { useEffect, Fragment, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { sendUserInput } from "../Redux/AutocompleteSlice/AutocompleteSlice";
import { get5DaysForecast } from "../Redux/Next5daysForecastSlice/Next5DaysForecastSlice";
import Next5DaysForecast from "../Features/Next5DaysForecast/Next5DaysForecast";
import RechartWeather from "../Features/RechartWeather/rechartWeather";
import LocalWeather from "../Features/LocalWeather/LocalWeather";
import DisplayLocalWeather from "../Features/LocalWeather/DisplayLocalWeather";
import classes from "./home.module.css";
import heart from "../Icons/heart.svg";
import { apiKey } from "../ApiKey";

const Home = () => {
  const [userInput, setUserInput] = useState("");
  const [citySuggestion, setCitySuggestion] = useState([]);
  const [day, setDays] = useState(true);
  const dispatch = useDispatch();
  const { forecast } = useSelector((state) => state.Next5DaysForecast);

  const { citySuggestionArray } = useSelector((state) => state.autocomplete);
  const { cityInfo } = useSelector((state) => state.autocomplete);

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
        <button className={classes.favoriteBtn}>
          <img src={heart} />
        </button>
      </div>
      <div>
        {/* <LocalWeather /> */}
        {localWeatherDisplay()}
        <div>
          <Next5DaysForecast day={day} />
        </div>
        <RechartWeather isItDayTime={day} />
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
      </div>
    </Fragment>
  );
};

export default Home;
