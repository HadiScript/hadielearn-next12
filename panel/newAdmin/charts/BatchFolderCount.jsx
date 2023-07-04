import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const BatchFolderCount = ({ _data }) => {
  const COLORS = ["#0f3f5d", "#FF8042"];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={_data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
        barSize={20}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="batchTitle" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#0f3f5d" background={{ fill: "#eee" }} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BatchFolderCount;
