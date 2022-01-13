import classes from "./Rechart.module.css";
import { LineChart, Line, XAxis, YAxis } from "recharts";
const Rechart = ({ next5DaysForecast, isItDayTime, isItCelsius }) => {
  const chartData = next5DaysForecast.map((item) => ({
    name: item.date,
    uv: `${isItDayTime ? item.maxTemp : item.minTemp}`,
  }));

  return (
    <div>
      <LineChart
        width={700}
        height={210}
        data={chartData}
        className={classes.chart}
        margin={{ top: 15, right: 50, bottom: 15, left: 15 }}
      >
        <Line type="monotone" dataKey="uv" stroke="#8884d8" />
        <XAxis dataKey="name" dy={12} />
        <YAxis dx={-7} domain={isItCelsius ? [-50, 50] : [-58, 122]} />
      </LineChart>
    </div>
  );
};

export default Rechart;
