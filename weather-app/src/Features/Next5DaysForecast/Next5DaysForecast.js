import { useSelector } from "react-redux";
import Next5DaysForecastDayTime from "./Next5DaysForecastDayTime";
import { Fragment } from "react";

const Next5DaysForecast = (props) => {
  const { forecast } = useSelector((state) => state.next5DaysForecast);

  return (
    <Fragment>
      {forecast && <Next5DaysForecastDayTime forecast={forecast} />}
    </Fragment>
  );
};

export default Next5DaysForecast;
