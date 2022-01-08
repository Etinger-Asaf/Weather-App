import { useSelector, useDispatch } from "react-redux";
import { setRemoveFavoriteCity } from "../../Redux/slices/favoriteSlice";

import classes from "./Favorite.module.css";

const Favorite = () => {
  const dispatch = useDispatch();
  const { favorites } = useSelector((state) => state.favorite);
  console.log(favorites, "favorites");
  const favoriteDisplay = favorites.map((item) => {
    return (
      <div key={item.id} className={classes.day}>
        <li>
          <h5>{item.cityName}</h5>
          <h6>{`${item.currentTemp}°C`}</h6>
          <h6>{item.weatherText}</h6>
        </li>
        <button
          className={classes.btn}
          onClick={() => {
            dispatch(setRemoveFavoriteCity(item.id));
          }}
        >
          unfavorite
        </button>
      </div>
    );
  });
  return <div className={classes.container}>{favoriteDisplay}</div>;
};

export default Favorite;
