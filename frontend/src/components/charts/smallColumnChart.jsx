import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Jan", value: 30 },
  { name: "Feb", value: 50 },
  { name: "Mar", value: 40 },
  { name: "Apr", value: 70 },
];

const SmallColumnChart = () => {
  return (
    <ResponsiveContainer width={200} height={100}>
      <BarChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
        <XAxis dataKey="name" />
        <YAxis hide={true} /> {/* Hides the Y-axis */}
        <Tooltip />
        <Bar dataKey="value" fill="#f39915" barSize={30} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default SmallColumnChart;
