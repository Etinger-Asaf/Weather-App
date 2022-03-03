import classes from "./Next5DaysForecast.module.css";

const Next5DaysForecast = ({ next5DaysForecast, isItDayTime, isItCelsius }) => {
  const temp = (item) => {
    if (isItDayTime && !isItCelsius) {
      return item.maxTempImperial;
    } else if (isItDayTime && isItCelsius) {
      return item.maxTemp;
    } else if (!isItDayTime && !isItCelsius) {
      return item.minTempImperial;
    } else if (!isItDayTime && isItCelsius) {
      return item.minTemp;
    }
  };

  return (
    <div className={classes.container}>
      {next5DaysForecast.map((item) => {
        return (
          <div key={item.id}>
            <li className={classes.day}>
              <h3>{item.date}</h3>
              <h4>{`${temp(item)}${isItCelsius ? "°C" : "°F"}`}</h4>
              <h4>
                {isItDayTime ? item.dayWeatherText : item.nightWeatherText}
              </h4>
            </li>
          </div>
        );
      })}
    </div>
  );
};
export default Next5DaysForecast;
