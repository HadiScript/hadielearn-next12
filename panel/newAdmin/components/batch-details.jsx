import { Card, Col, Row } from "antd";
import React from "react";
import BatchByCourse from "../charts/BatchByCourse";
import BatchFolderCount from "../charts/BatchFolderCount";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../../context/auth";
import { useEffect } from "react";
import { useState } from "react";
import { API } from "../../../config/API";

const BatchDetails = () => {
  const [auth] = useContext(AuthContext);
  const [batchCount, setBatchCount] = useState([]);
  const [foldersCount, setFoldersCount] = useState([]);

  const courseByBatch = async () => {
    try {
      const { data } = await axios.get(
        // "http://localhost:5000/api/lms/course-by-batch"
        `${API}/lms/course-by-batch`
      );
      setBatchCount(data);
    } catch (error) {
      toast.error(error);
    }
  };

  const gettingFoldersCount = async () => {
    try {
      const { data } = await axios.get(
        // "http://localhost:5000/api/lms/folders-by-batch"
        `${API}/lms/folders-by-batch`
      );
      setFoldersCount(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth && auth.token) {
      gettingFoldersCount();
      courseByBatch();
    }
  }, [auth && auth.token]);

  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} sm={24} md={8} lg={8}>
        <Card bordered={false} title="Batch Count By Courses">
          {batchCount && (
            <BatchByCourse
              _data={batchCount}
              COLORS={["#0f3f5d", "#00C49F", "#FFBB28", "#FF8042"]}
            />
          )}
        </Card>
      </Col>
      <Col xs={24} sm={24} md={8} lg={8}>
        <Card bordered={false} title="Folders Count By Batch">
          {foldersCount && <BatchFolderCount _data={foldersCount} />}
        </Card>
      </Col>
      <Col xs={24} sm={24} md={8} lg={8}>
        <Card bordered={false}>Batch Assets Count</Card>
      </Col>
    </Row>
  );
};

export default BatchDetails;
