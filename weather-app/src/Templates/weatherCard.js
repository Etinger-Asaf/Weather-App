import { Fragment } from "react";
import classes from "../components/Favorite/Favorite.module.css";
import UnFavoriteBtn from "../Templates/UnFavoriteBtn";

const WeatherCard = ({ data }) => {
  return (
    <Fragment>
      {data.map((item) => (
        <div key={item.id} className={classes.day}>
          {
            <li>
              <h5>{item.cityName}</h5>
              <h6>{`${item.currentTemp}°C`}</h6>
              <h6>{item.weatherText}</h6>
            </li>
          }
          <UnFavoriteBtn id={item.id} />
        </div>
      ))}
    </Fragment>
  );
};

export default WeatherCard;
