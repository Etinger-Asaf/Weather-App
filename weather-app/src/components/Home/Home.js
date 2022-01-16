import { useDispatch, useSelector } from "react-redux";
import { Fragment, useCallback } from "react";
import classes from "./Home.module.css";
import { BallTriangle } from "react-loader-spinner";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import SearchBtn from "../SearchBtn";
import AddFavoriteCity from "../Favorite/AddFavoriteCity";

import { getCityLocationKey } from "../WeatherHome/redux/slices/cityLocationKey";

import WeatherHome from "../WeatherHome/WeatherHome";

const Home = () => {
  const dispatch = useDispatch();
  const { citySuggestionArray } = useSelector((state) => state.cityLocationKey);
  const { hasError } = useSelector((state) => state.hasError);
  const { isLoading } = useSelector((state) => state.isLoading);

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
    debounceFunction((value) => dispatchingApiRequest(value), 500),
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
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search for a City"
              variant="outlined"
            />
          )}
        />
        <SearchBtn />
        {!hasError && <AddFavoriteCity />}
      </div>
      {isLoading && (
        <div className={classes.loading}>
          <BallTriangle color="#e602b8" height={80} width={80} />
        </div>
      )}
      <div className={classes.error}>{hasError}</div>
      {!hasError && <WeatherHome />}
    </Fragment>
  );
};

export default Home;
