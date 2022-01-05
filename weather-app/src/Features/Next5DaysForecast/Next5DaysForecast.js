import { useSelector } from "react-redux";
import Next5DaysForecastDayTime from "./Next5DaysForecastDayTime";
import { Fragment, useEffect } from "react";

const Next5DaysForecast = (props) => {
  const { forecast } = useSelector((state) => state.Next5DaysForecast);
  const isItDayTime = props.day;

  if (!forecast) {
    console.log(forecast, "forecast is inside the if check");
    return;
  }

  return (
    <Fragment>
      <Next5DaysForecastDayTime forecast={forecast} isItDayTime={isItDayTime} />
    </Fragment>
  );
};

export default Next5DaysForecast;
