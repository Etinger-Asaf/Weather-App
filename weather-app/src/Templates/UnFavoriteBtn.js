import classes from "../components/Favorite/Favorite.module.css";
import { useDispatch } from "react-redux";
import { setRemoveFavoriteCity } from "../Redux/slices/favoriteSlice";

const UnFavoriteBtn = ({ id }) => {
  const dispatch = useDispatch();

  return (
    <button
      className={classes.btn}
      onClick={() => {
        dispatch(setRemoveFavoriteCity(id));
      }}
    >
      unfavorite
    </button>
  );
};

export default UnFavoriteBtn;
