import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import moment from "moment";
import { Divider, List } from "antd";

const data = [
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

const paymentLogs = [
  {
    _id: "1",
    from: "user1",
    amount: 100,
    comment: "Payment 1",
    addedBy: "admin1",
    createdAt: "2023-06-25T09:00:00.000Z",
  },
  {
    _id: "2",
    from: "user2",
    amount: 150,
    comment: "Payment 2",
    addedBy: "admin2",
    createdAt: "2023-06-26T10:30:00.000Z",
  },
  {
    _id: "3",
    from: "user2",
    amount: 15,
    comment: "Payment 2",
    addedBy: "admin2",
    createdAt: "2023-06-26T10:30:00.000Z",
  },
  {
    _id: "3",
    from: "user2",
    amount: 135,
    comment: "Payment 2",
    addedBy: "admin2",
    createdAt: "2023-06-26T10:30:00.000Z",
  },
  {
    _id: "3",
    from: "user2",
    amount: 195,
    comment: "Payment 2",
    addedBy: "admin2",
    createdAt: "2023-06-26T10:30:00.000Z",
  },
  {
    _id: "3",
    from: "user2",
    amount: 135,
    comment: "Payment 2",
    addedBy: "admin2",
    createdAt: "2023-06-26T10:30:00.000Z",
  },
  // Add more payment logs as needed
];

const PaymentChart = () => {
  const renderTooltip = (props) => {
    const { active, payload } = props;
    if (active && payload && payload.length) {
      const dataPoint = payload[0].payload;
      const formattedDate = moment(dataPoint.createdAt).format(
        "MMMM Do YYYY, h:mm:ss a"
      );
      return (
        <div className="custom-tooltip">
          <p>{formattedDate}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={paymentLogs}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="createdAt" />
          <YAxis dataKey="amount" />
          <Tooltip content={renderTooltip} />
          <Legend />
          <Line
            type="monotone"
            dataKey="amount"
            stroke="#0f3f5d"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
      <Divider orientation="left">Recent Payments</Divider>
      <List
        itemLayout="horizontal"
        dataSource={data}
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

export default PaymentChart;
