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
      height={350}
      data={chartData}
      className={classes.chart}
      margin={{ top: 15, right: 40, bottom: 15, left: 15 }}
    >
      <Line type="monotone" dataKey="uv" stroke="#8884d8" />
      <XAxis dataKey="name" dy={10} />
      <YAxis dx={-7} />
    </LineChart>
  );

  return <div>{renderLineChart}</div>;
};

export default RechartWeather;
