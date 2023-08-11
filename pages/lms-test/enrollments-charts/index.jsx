import React, { useState } from "react";
import { Card, Col, Row } from "antd";
import LMSLayout from "../../../panel/newLMS/layouts";
import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  Legend,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Line,
  BarChart,
  Bar,
  Cell,
  ScatterChart,
  Scatter,
} from "recharts";
import { toast } from "react-hot-toast";
import axios from "axios";
import { API } from "../../../config/API";
import { useContext } from "react";
import { AuthContext } from "../../../context/auth";
import { useEffect } from "react";
import {
  Document,
  Page,
  PDFViewer,
  PDFDownloadLink,
} from "@react-pdf/renderer";

const EnrollmentsCharts = () => {
  const [auth] = useContext(AuthContext);
  const [enrollmentsData, setEnrollmentsData] = useState([]);

  const fetchingEnrollmentsData = async () => {
    try {
      const { data } = await axios.get(`${API}/fetch_data`);
      setEnrollmentsData(data.allApplications);
    } catch (error) {
      console.log(Error);
      toast.error("Try again");
    }
  };

  useEffect(() => {
    if (auth && auth.token) fetchingEnrollmentsData();
  }, [auth && auth.token]);

  const genderData = enrollmentsData?.reduce((acc, enrollment) => {
    const { gender } = enrollment;
    acc[gender] = (acc[gender] || 0) + 1;
    return acc;
  }, {});

  const transformedData = Object.keys(genderData).map((gender) => ({
    gender,
    count: genderData[gender],
  }));

  // Transform data to group enrollments by date
  const groupedData = enrollmentsData?.reduce((acc, enrollment) => {
    const dateStr = enrollment.createdAt?.split("T")[0];
    acc[dateStr] = (acc[dateStr] || 0) + 1;
    return acc;
  }, {});

  // Format data for Recharts
  const transformedDataOfGroupedData = Object.keys(groupedData).map((date) => ({
    date,
    count: groupedData[date],
  }));

  const groupedDataForCourses = enrollmentsData?.reduce((acc, enrollment) => {
    const { course } = enrollment;
    acc[course] = (acc[course] || 0) + 1;
    return acc;
  }, {});

  // Format data for Recharts
  const transformedDataForGroupedDataForCourses = Object.keys(
    groupedDataForCourses
  ).map((course) => ({
    course,
    count: groupedDataForCourses[course],
  }));

  const groupedDataForCity = enrollmentsData?.reduce((acc, enrollment) => {
    const { city } = enrollment;
    const cleanedCity = city.trim().toLowerCase(); // Clean up city name
    acc[cleanedCity] = (acc[cleanedCity] || 0) + 1;
    return acc;
  }, {});

  // Format data for Recharts
  const transformedData_groupedDataForCity = Object.keys(
    groupedDataForCity
  ).map((city) => ({
    city,
    count: groupedDataForCity[city],
  }));

  const COLORS = [
    "#0f3f5d",
    "#FF8042",
    "#0088FE",
    "#FFBB28",
    "#00C49F",
    "#FF5555",
  ];

  return (
    <LMSLayout>
      <Row>
        <Col lg={24} sm={24} md={24} xs={24} className="mb-3">
          <Card title="ENROLLMENTS TREND">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={transformedDataOfGroupedData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="#0f3f5d"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={8} lg={8}>
          <Card title="GENDER DATA" bordered={false}>
            {/* {JSON.stringify(enrollmentsData)} */}
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  dataKey="count"
                  nameKey="gender"
                  data={transformedData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#0f3f5d"
                  label
                >
                  {transformedData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Col>
        <Col xs={24} sm={24} md={16} lg={16}>
          <Card title="BY COURSE DATA" bordered={false}>
            <div style={{ height: "100%", overflowY: "scroll" }}>
              <div style={{ height: "550px" }}>
                <ResponsiveContainer width="100%" height={500}>
                  <BarChart
                    data={transformedDataForGroupedDataForCourses}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="course"
                      interval={0}
                      angle={-45}
                      textAnchor="end"
                    />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#0f3f5d" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      {/* <ScatterChart
                margin={{
                  top: 20,
                  right: 20,
                  bottom: 20,
                  left: 20,
                }}
              >
                <CartesianGrid />
                <XAxis dataKey="city" type="category" />
                <YAxis dataKey="count" />
                <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                <Scatter
                  name="city"
                  data={transformedData_groupedDataForCity}
                  fill="#0f3f5d"
                  size={6}
                />
              </ScatterChart> */}

      <Card className="my-3" title="ENROLLMENTS BY CITIES">
        <div style={{ height: "100%", overflowY: "auto" }}>
          <div style={{ height: "450px" }}>
            <ResponsiveContainer width="100%" height={7000}>
              <BarChart
                layout="vertical"
                data={transformedData_groupedDataForCity}
                margin={{
                  top: 20,
                  right: 20,
                  bottom: 20,
                  left: 20,
                }}
              >
                <CartesianGrid />
                <YAxis dataKey="city" type="category" />{" "}
                <XAxis dataKey="count" type="number" /> {/* Y-axis for count */}
                <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                <Bar dataKey="count" fill="#0f3f5d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </Card>
    </LMSLayout>
  );
};

export default EnrollmentsCharts;
