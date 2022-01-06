import { useSelector } from "react-redux";

const Favorite = () => {
  const { favorites } = useSelector((state) => state.Favorite);
  console.log(favorites, "favorites");
  const favoriteDisplay = favorites.map((item) => {
    return (
      <div key={item.id}>
        <li>
          <h5>{item.cityName}</h5>
          <h6>{item.currentTemp}</h6>
          <h6>{item.weatherText}</h6>
        </li>
        <button>unfavorite</button>
      </div>
    );
  });
  return <h1>{favoriteDisplay}</h1>;
};

export default Favorite;
