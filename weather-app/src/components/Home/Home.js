import { useDispatch, useSelector } from "react-redux";
import { useEffect, Fragment, useState, useCallback } from "react";
import classes from "./Home.module.css";
import { apiKey } from "../../ApiKey";

import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

import AddFavoriteCity from "../Favorite/AddFavoriteCity";
import SearchBtn from "../SearchBtn";
import DayAndNightBtn from "../../Templates/DayAndNightBtn";

import Next5DaysForecast from "../../Features/Next5DaysForecast/Next5DaysForecast";
import RechartWeather from "../../Features/RechartWeather/RechartWeather";
import DisplayLocalWeather from "../../Features/LocalWeather/DisplayLocalWeather";

import { sendUserInput } from "../../Redux/slices/autocompleteSlice";
import {
  getLocalCoords,
  getLocalWeather,
  localWeatherToday,
} from "../../Redux/slices/localLocationSlice";

const Home = () => {
  const dispatch = useDispatch();

  const [userInput, setUserInput] = useState("");
  const { citySuggestionArray } = useSelector((state) => state.autocomplete);
  const { isSearchBtnClicked } = useSelector((state) => state.isClicked);
  const { localCoords, currentLocationWeather } = useSelector(
    (state) => state.localLocation
  );

  const innerFunction = useCallback(() => {
    dispatch(getLocalCoords());
  }, []);

  useEffect(() => {
    innerFunction();
  }, [innerFunction]);

  useEffect(() => {
    if (!localCoords) {
      return;
    }

    const { lat, long } = localCoords;
    dispatch(getLocalWeather(lat, long, apiKey));
  }, [localCoords]);

  const getData = useCallback(() => {
    if (!currentLocationWeather) {
      return;
    }

    dispatch(localWeatherToday(currentLocationWeather.Key, apiKey));
  }, [apiKey]);

  useEffect(() => {
    getData();
  }, [getData]);

  useEffect(() => {
    try {
      if (!userInput) {
        return;
      }

      dispatch(sendUserInput(userInput));
    } catch (err) {
      console.log(err);
    }
  }, [userInput]);

  return (
    <Fragment>
      <div className={classes.autocompleteContainer}>
        <Autocomplete
          className={classes.autocomplete}
          freeSolo
          options={citySuggestionArray}
          id="citySearchAutocomplete"
          onInputChange={(event, value) => {
            setUserInput(value);
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
        {<SearchBtn />}
        {isSearchBtnClicked && <AddFavoriteCity />}
      </div>
      <div>
        {isSearchBtnClicked && <DisplayLocalWeather />}
        {isSearchBtnClicked && <Next5DaysForecast />}
        {isSearchBtnClicked && <RechartWeather />}
        {isSearchBtnClicked && <DayAndNightBtn />}
      </div>
    </Fragment>
  );
};

export default Home;
