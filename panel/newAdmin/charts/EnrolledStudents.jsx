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

import { Divider, List } from "antd";

const data2 = [
  {
    title: "Ant Design Title 1",
  },
  {
    title: "Ant Design Title 2",
  },
  {
    title: "Ant Design Title 3",
  },
  {
    title: "Ant Design Title 4",
  },
];

const data = [
  {
    title: "Check",
    enrolledStudentsCount: 53,
  },
  {
    title: "b52312",
    enrolledStudentsCount: 29,
  },
  {
    title: "Mern Stack ",
    enrolledStudentsCount: 0,
  },
  {
    title: "b2",
    enrolledStudentsCount: 10,
  },
  {
    title: "b2",
    enrolledStudentsCount: 14,
  },
  {
    title: "b2",
    enrolledStudentsCount: 98,
  },
  {
    title: "b2",
    enrolledStudentsCount: 53,
  },
];
const EnrolledStudents = () => {
  return (
    <>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          barSize={20}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="title" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="enrolledStudentsCount"
            fill="#0f3f5d"
            background={{ fill: "#eee" }}
          />
        </BarChart>
      </ResponsiveContainer>
      <Divider orientation="left">Recent Activites</Divider>
      <List
        itemLayout="horizontal"
        dataSource={data2}
        renderItem={(item, index) => (
          <List.Item>
            <List.Item.Meta
              title={<a href="https://ant.design">{item.title}</a>}
              description="Ant Design, a design language for background applications, is refined by Ant UED Team"
            />
          </List.Item>
        )}
      />
    </>
  );
};

export default EnrolledStudents;
