import { useDispatch, useSelector } from "react-redux";
import { useEffect, Fragment, useState } from "react";
import classes from "./Home.module.css";

import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

import SearchBtn from "../SearchBtn";
import AddFavoriteCity from "../Favorite/AddFavoriteCity";
// new part
import { getCityLocationKey } from "../WeatherHome/redux/slices/cityLocationKey";

import WeatherHome from "../WeatherHome/WeatherHome";

const Home = () => {
  const dispatch = useDispatch();
  const [userInput, setUserInput] = useState("");
  const { citySuggestionArray } = useSelector((state) => state.cityLocationKey);

  useEffect(() => {
    try {
      if (!userInput) {
        return;
      }

      dispatch(getCityLocationKey(userInput));
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
        <SearchBtn />
        <AddFavoriteCity />
        {/* {isSearchBtnClicked && <AddFavoriteCity />}
      </div>
      <div>
      {isSearchBtnClicked && <DisplayLocalWeather />}
      {isSearchBtnClicked && <Next5DaysForecast />}
      {isSearchBtnClicked && <RechartWeather />}
    {isSearchBtnClicked && <DayAndNightBtn />} */}
      </div>
      <WeatherHome />
    </Fragment>
  );
};

export default Home;
