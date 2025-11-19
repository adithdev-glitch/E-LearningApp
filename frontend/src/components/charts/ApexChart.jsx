import React, { useEffect, useState } from "react";
import {
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import axios from "axios";
import { server } from "../../main";

const CustomLineChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchUserStats = async () => {
      try {
        const { data } = await axios.get(`${server}/api/user-registration-stats`);
        const formattedData = data.stats.map((stat) => ({
          date: stat._id, // Date of registration
          value: stat.count, // Number of users registered on that date
        }));
        setData(formattedData);
      } catch (error) {
        console.error("Error fetching user stats:", error);
      }
    };

    fetchUserStats();
  }, []);

  return (
    <ResponsiveContainer width="100%" height={350}>
      <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        {/* Gradient Definition */}
        <defs>
          <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#f39915" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#f39915" stopOpacity={0} />
          </linearGradient>
        </defs>

        <XAxis dataKey="date" tick={{ fill: "#6C7383" }} />
        <YAxis hide={true} />
        <Tooltip />

        {/* Line */}
        <Line
          type="monotone"
          dataKey="value"
          stroke="#f39915"
          strokeWidth={2}
          dot={false}
        />

        {/* Area for Gradient Fill */}
        <Area
          type="monotone"
          dataKey="value"
          stroke="#f39915"
          fillOpacity={1}
          fill="url(#colorSales)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default CustomLineChart;