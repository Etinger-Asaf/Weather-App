import { useSelector } from "react-redux";
import WeatherCard from "../../Templates/weatherCard";
import classes from "./Favorite.module.css";

const Favorite = () => {
  const { favorites } = useSelector((state) => state.favorite);

  return (
    <div className={classes.container}>
      <WeatherCard data={favorites} />
    </div>
  );
};

export default Favorite;
