import { useDispatch, useSelector } from "react-redux";
import { Fragment, useCallback } from "react";
import classes from "./Home.module.css";

import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

import SearchBtn from "../SearchBtn";
import AddFavoriteCity from "../Favorite/AddFavoriteCity";

import { getCityLocationKey } from "../WeatherHome/redux/slices/cityLocationKey";

import WeatherHome from "../WeatherHome/WeatherHome";

const Home = () => {
  const dispatch = useDispatch();
  const { citySuggestionArray } = useSelector((state) => state.cityLocationKey);

  const debounceFunction = (func, delay) => {
    let timer;
    return function () {
      let self = this;
      let args = arguments;
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(self, args);
      }, delay);
    };
  };

  const dispatchingApiRequest = (value) => {
    dispatch(getCityLocationKey(value));
  };

  const optimizedFn = useCallback(
    debounceFunction((value) => dispatchingApiRequest(value), 600),
    []
  );

  return (
    <Fragment>
      <div className={classes.autocompleteContainer}>
        <Autocomplete
          className={classes.autocomplete}
          freeSolo
          options={citySuggestionArray}
          id="citySearchAutocomplete"
          onInputChange={(event, value) => {
            optimizedFn(value);
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
      </div>
      <WeatherHome />
    </Fragment>
  );
};

export default Home;
