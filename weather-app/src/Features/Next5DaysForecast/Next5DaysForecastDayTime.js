import classes from "./Next5DaysForecastDayTime.module.css";
const Next5DaysForecastDayTime = (props) => {
  const forecastData = props.forecast;

  const isItDayTime = props.isItDayTime;
  const forecastDisplay = forecastData.map((item) => {
    return (
      <li key={item.id} className={classes.day}>
        <h3>{item.date}</h3>
        <h4>{isItDayTime ? item.maximumTemp : item.minimumTemp}</h4>
      </li>
    );
  });

  return <div className={classes.container}>{forecastDisplay}</div>;
};

export default Next5DaysForecastDayTime;
