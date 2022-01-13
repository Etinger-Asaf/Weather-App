import { useSelector, useDispatch } from "react-redux";
import classes from "./Favorite.module.css";
const Favorite = ({ isItCelsius }) => {
  const { favoriteCities } = useSelector((state) => state.favoriteCities);

  const favoriteCitiesArray = favoriteCities.map((item) => {
    return (
      <div key={item.id} className={classes.day}>
        <h3>{item.cityName}</h3>
        <h4>{isItCelsius ? item.maxTemp : item.maxTempImperial}</h4>
        <h4>{item.dayWeatherText}</h4>
      </div>
    );
  });

  return <div className={classes.container}>{favoriteCitiesArray}</div>;
};
export default Favorite;
