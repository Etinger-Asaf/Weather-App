import classes from "../components/Home/Home.module.css";

import { setDayTime } from "../Redux/slices/isItDayTime";
import { useDispatch, useSelector } from "react-redux";

const DayAndNightBtn = () => {
  const dispatch = useDispatch();
  const { isItDayTime } = useSelector((state) => state.isItDayTime);

  const day = isItDayTime;

  return (
    <div className={classes.timeBtnContainer}>
      <button
        className={
          day
            ? [classes.timeBtnLeft] + " " + [classes.activeTimeBtn]
            : [classes.timeBtnLeft]
        }
        onClick={() => {
          dispatch(setDayTime());
        }}
      >
        Day
      </button>
      <button
        className={
          day
            ? [classes.timeBtnRight]
            : [classes.timeBtnRight] + " " + [classes.activeTimeBtn]
        }
        onClick={() => {
          dispatch(setDayTime());
        }}
      >
        Night
      </button>
    </div>
  );
};

export default DayAndNightBtn;
