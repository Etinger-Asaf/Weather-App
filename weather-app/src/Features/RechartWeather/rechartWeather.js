import { LineChart, Line, XAxis, YAxis } from "recharts";
import { useSelector } from "react-redux";
import classes from "./RechartWeather.module.css";

const RechartWeather = (props) => {
  const isItDayTime = props.isItDayTime;
  const { forecast } = useSelector((state) => state.next5DaysForecast);

  if (!forecast) {
    return;
  }

  const chartData = forecast.map((item) => ({
    name: item.date,
    uv: `${isItDayTime ? item.maximumTemp : item.minimumTemp}`,
  }));

  const renderLineChart = (
    <LineChart
      width={700}
      height={210}
      data={chartData}
      className={classes.chart}
      margin={{ top: 15, right: 50, bottom: 15, left: 15 }}
    >
      <Line type="monotone" dataKey="uv" stroke="#8884d8" />
      <XAxis dataKey="name" dy={12} />
      <YAxis dx={-7} domain={[-50, 50]} />
    </LineChart>
  );

  return <div>{renderLineChart}</div>;
};

export default RechartWeather;
