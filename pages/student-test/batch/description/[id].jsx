import React from "react";
import { Card, Col, Row, Statistic } from "antd";
import { FaComments } from "react-icons/fa";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../../../../context/auth";
import { toast } from "react-hot-toast";
import axios from "axios";
import { API } from "../../../../config/API";
import { useState } from "react";
import StuLayout from "../../../../panel/newStudent/layouts";
import NewLayout from "../../../../panel/newStudent/layouts/NewLayout";
import { ArrowDownOutlined } from "@ant-design/icons";
import { BsFolderSymlink } from "react-icons/bs";
import { MdOutlinePlayLesson } from "react-icons/md";
import { AiOutlineDownload } from "react-icons/ai";
import BatchByCourse from "../../../../panel/newAdmin/charts/BatchByCourse";
import moment from "moment";

const DescriptionBatch = () => {
  const router = useRouter();
  const [auth] = useContext(AuthContext);
  const { id } = router.query;

  const [assets, setAssets] = useState(0);
  const [folders, setFolders] = useState(0);
  const [lessons, setLessons] = useState(0);
  const [teachers, setTeachers] = useState([]);
  const [comments, setComments] = useState(0);
  const [notice, setNotice] = useState({});

  const gettingStatsBatch = async () => {
    try {
      const { data } = await axios.get(`${API}/lms/stu-batch-stats/${id}`);
      setAssets(data.assets);
      setFolders(data.folders);
      setLessons(data.lessons);
      setComments(data.comments);
      setTeachers(data.instuctors);
      setNotice(data.notice);
    } catch (error) {
      console.log(error);
      toast.error("Try Again");
    }
  };

  const data = [
    {
      count: assets,
      courseId: "64919002d387054cafdc1b51",
      courseTitle: "Assets",
    },
    {
      count: folders,
      courseId: "64912dd3efcd18b51e4f7803",
      courseTitle: "Folders",
    },
    {
      count: comments,
      courseId: "64912dd3efcd18b51e4f7803",
      courseTitle: "Comments",
    },
    {
      count: lessons,
      courseId: "64912dd3efcd18b51e4f7803",
      courseTitle: "lessons",
    },
    // Add more workshop data as needed
  ];

  useEffect(() => {
    if (auth && auth.token && id) {
      gettingStatsBatch();
    }
  }, [auth && auth.token && id]);

  return (
    <NewLayout batchID={id}>
      <Row gutter={[16, 16]} className="mb-4">
        <Col xs={24} sm={24} md={12} lg={12}>
          <h3 style={{ color: "#0f3f5d" }}>React JS Mastery Course</h3>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={6} lg={6}>
          <Card
            role="button"
            onClick={() => router.push(`/student-test/batch/lessons/${id}`)}
            bordered={false}
          >
            <Statistic
              // title="Lessons"
              value={`Lessons ${lessons}`}
              valueStyle={{
                color: "#0f3f5d",
              }}
              prefix={<MdOutlinePlayLesson />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={24} md={6} lg={6}>
          <Card
            role="button"
            onClick={() => router.push(`/student-test/batch/folders/${id}`)}
            bordered={false}
          >
            <Statistic
              value={`folders ${folders}`}
              valueStyle={{
                color: "#0f3f5d",
              }}
              prefix={<BsFolderSymlink />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={24} md={6} lg={6}>
          <Card
            role="button"
            onClick={() => router.push(`/student-test/batch/assets/${id}`)}
            bordered={false}
          >
            <Statistic
              value={`Assets ${assets}`}
              valueStyle={{
                color: "#0f3f5d",
              }}
              prefix={<AiOutlineDownload />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={24} md={6} lg={6}>
          <Card
            role="button"
            onClick={() => router.push(`/student-test/batch/comments/${id}`)}
            bordered={false}
          >
            <Statistic
              value={`Comments ${comments}`}
              valueStyle={{
                color: "#0f3f5d",
              }}
              prefix={<FaComments />}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} className="my-4">
        <Col xs={24} sm={24} md={8} lg={8}>
          <Card bordered={false} title="Total Content">
            <BatchByCourse
              _data={data}
              COLORS={["#0f3f5d", "#00C49F", "#FFBB28", "#FF8042"]}
            />
          </Card>
        </Col>
        {notice && (
          <Col xs={24} sm={24} md={16} lg={16}>
            <Card bordered={false}>
              <div className="alert alert-success" role="alert">
                <h4 className="alert-heading">{notice.heading}</h4>
                <p>{notice.text}</p>
                <hr />
                <p className="mb-0">{moment(notice.createdAt).fromNow()}</p>
              </div>
            </Card>
          </Col>
        )}
      </Row>
    </NewLayout>
  );
};

export default DescriptionBatch;
