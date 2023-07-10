import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import BatchLayout from "../../../../panel/newInstructor/layouts";
import { Card, Col, Descriptions, Row, Statistic, Tag } from "antd";
import { toast } from "react-hot-toast";
import axios from "axios";
import { API } from "../../../../config/API";
import { AuthContext } from "../../../../context/auth";

import { LuFileSpreadsheet, LuFolders } from "react-icons/lu";
import { FaRegComments } from "react-icons/fa";
import { MdOutlinePlayLesson } from "react-icons/md";

const SingleBatchDashboard = () => {
  const { id } = useRouter().query;
  const [auth] = useContext(AuthContext);

  const [batch, setBatch] = useState({});
  const [assets, setAssets] = useState(0);
  const [folders, setFolders] = useState(0);
  const [lessons, setLessons] = useState(0);
  const [comments, setComments] = useState(0);
  const [loading, setLoading] = useState(false);

  const gettingData = async (x) => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${API}/lms/batch-stats/${x}`, {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      });

      setBatch(data.batch);
      setAssets(data.assets);
      setFolders(data.folders);
      setLessons(data.lessons);
      setComments(data.comments);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("Failed, try again");
    }
  };

  useEffect(() => {
    if (auth && auth?.token && id) {
      gettingData(id);
    }
  }, [auth && auth?.token, id]);

  return (
    <BatchLayout BatchId={id}>
      <Card>
        {loading && <p> loading... </p>}
        <Descriptions
          title={id + "-" + batch.title + "-" + batch.courseDetails?.title}
          bordered
          column={{
            xxl: 4,
            xl: 4,
            lg: 4,
            md: 4,
            sm: 2,
            xs: 1,
          }}
        >
          <Descriptions.Item label="Conducting Days">
            {batch.monday && <Tag>Monday</Tag>}
            {batch.tuesday && <Tag>Tuesday</Tag>}
            {batch.wednesday && <Tag>Wednesday</Tag>}
            {batch.thursday && <Tag>Thursday</Tag>}
            {batch.friday && <Tag>Friday</Tag>}
            {batch.saturday && <Tag>Saturday</Tag>}
          </Descriptions.Item>
          <Descriptions.Item label="Dates">
            {batch.startDate?.substring(0, 10)} to{" "}
            {batch.endDate?.substring(0, 10)}{" "}
          </Descriptions.Item>
          <Descriptions.Item label="timing">{batch.timming}</Descriptions.Item>
          <Descriptions.Item label="Durations">
            {batch.duration}
          </Descriptions.Item>
          <Descriptions.Item label="Enrollment Limits">
            {batch.limit}
          </Descriptions.Item>
          <Descriptions.Item label="Completed">
            {batch.completed ? "Yes" : "No"}
          </Descriptions.Item>
          <Descriptions.Item label="Assigned Teachers">
            {batch.teachers?.length}
          </Descriptions.Item>
          <Descriptions.Item label="Assigned Teachers">
            {batch.enrolledStudents?.length}
          </Descriptions.Item>
        </Descriptions>
      </Card>
      <br />
      <Row gutter={16}>
        <Col sm={24} xs={24} md={6} lg={6}>
          <Card bordered={false}>
            <Statistic
              title="Folders"
              value={folders}
              valueStyle={{ color: "#0f3f5d" }}
              prefix={<LuFolders />}
            />
          </Card>
        </Col>
        <Col sm={24} xs={24} md={6} lg={6}>
          <Card bordered={false}>
            <Statistic
              title="Comments"
              value={comments}
              valueStyle={{ color: "#0f3f5d" }}
              prefix={<FaRegComments />}
            />
          </Card>
        </Col>
        <Col sm={24} xs={24} md={6} lg={6}>
          <Card bordered={false}>
            <Statistic
              title="Assets"
              value={assets}
              valueStyle={{ color: "#0f3f5d" }}
              prefix={<LuFileSpreadsheet />}
            />
          </Card>
        </Col>
        <Col sm={24} xs={24} md={6} lg={6}>
          <Card bordered={false}>
            <Statistic
              title="Lessons"
              value={lessons}
              valueStyle={{ color: "#0f3f5d" }}
              prefix={<MdOutlinePlayLesson />}
            />
          </Card>
        </Col>
      </Row>
    </BatchLayout>
  );
};

export default SingleBatchDashboard;
