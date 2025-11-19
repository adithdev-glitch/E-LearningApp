import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import axios from "axios";
import { server } from "../../main";
import './charts.css';

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const CoursePieChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const { data } = await axios.get(`${server}/api/courses-by-category`);
        const formattedData = data.courses.map((course) => ({
          name: course._id, // Category name
          value: course.count, // Number of courses in the category
        }));
        setData(formattedData);
      } catch (error) {
        console.error("Error fetching course data:", error);
      }
    };

    fetchCourseData();
  }, []);

  return (
    <div className="chart-container">
      <PieChart width={350} height={350}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={120}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};

export default CoursePieChart;