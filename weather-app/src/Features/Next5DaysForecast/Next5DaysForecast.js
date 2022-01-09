import { useSelector } from "react-redux";
import Next5DaysForecastDayTime from "./Next5DaysForecastDayTime";
import { Fragment } from "react";

const Next5DaysForecast = (props) => {
  const { forecast } = useSelector((state) => state.next5DaysForecast);
  const isItDayTime = props.day;

  if (!forecast) {
    return;
  }

  return (
    <Fragment>
      <Next5DaysForecastDayTime forecast={forecast} isItDayTime={isItDayTime} />
    </Fragment>
  );
};

export default Next5DaysForecast;
