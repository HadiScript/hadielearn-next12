import React from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Legend,
  Tooltip,
  Cell,
} from "recharts";

const BatchByCourse = ({ _data, COLORS }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={_data}
          dataKey="count"
          nameKey="courseTitle"
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          fill="#0f3f5d"
        >
          {_data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default BatchByCourse;
