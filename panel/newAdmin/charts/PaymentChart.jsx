import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import moment from "moment";

const PaymentChart = ({ data }) => {
  const renderTooltip = (props) => {
    const { active, payload } = props;
    if (active && payload && payload.length) {
      const dataPoint = payload[0].payload;
      const formattedDate = moment(dataPoint.createdAt).format("MMMM Do YYYY, h:mm:ss a");
      return (
        <div className="custom-tooltip">
          <p>
            {formattedDate} - {dataPoint.amount}
          </p>
        </div>
      );
    }
    return null;
  };

  const listPayments = data.slice(0, 5);

  return (
    <>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={data}
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
          <Line type="monotone" dataKey="amount" stroke="#0f3f5d" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
      {/* <Divider orientation="left">Recent Payments</Divider>
      <List
        itemLayout="horizontal"
        dataSource={listPayments}
        renderItem={(item, index) => (
          <List.Item>
            <List.Item.Meta title={item.amount} description={item.comment} />
          </List.Item>
        )}
      /> */}
    </>
  );
};

export default PaymentChart;
