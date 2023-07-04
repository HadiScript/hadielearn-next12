import { Card, Col, Row } from "antd";
import React from "react";
import BatchByCourse from "../charts/BatchByCourse";
import BatchFolderCount from "../charts/BatchFolderCount";

const data = [
  {
    count: 1,
    courseId: "64919002d387054cafdc1b51",
    courseTitle: "NodeJS Mastery Course",
  },
  {
    count: 1,
    courseId: "64912dd3efcd18b51e4f7803",
    courseTitle: "JS Mastery Course",
  },
  // Add more workshop data as needed
];

const dataFolder = [
  {
    count: 12,
    batchId: "64919028d387054cafdc1b5f",
    batchTitle: "b52312",
  },
  {
    count: 23,
    batchId: "64913d9da04ebf04a9d58c28",
    batchTitle: "b2",
  },
];

const BatchDetails = () => {
  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} sm={24} md={8} lg={8}>
        <Card bordered={false}>
          <small>batch count by course</small>
          <BatchByCourse
            _data={data}
            COLORS={["#0f3f5d", "#00C49F", "#FFBB28", "#FF8042"]}
          />
        </Card>
      </Col>
      <Col xs={24} sm={24} md={8} lg={8}>
        <Card bordered={false}>
          <small>folders count by batch</small>
          <BatchFolderCount _data={dataFolder} />
        </Card>
      </Col>
      <Col xs={24} sm={24} md={8} lg={8}>
        <Card bordered={false}>Batch Assets Count</Card>
      </Col>
    </Row>
  );
};

export default BatchDetails;
