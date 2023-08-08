import { Card, Col, Row, Statistic } from "antd";
import React, { useContext, useState } from "react";
import { AiOutlineDownload } from "react-icons/ai";
import { BsFolderSymlink } from "react-icons/bs";
import { FaComments } from "react-icons/fa";
import { MdOutlinePlayLesson } from "react-icons/md";
import { AuthContext } from "../../../context/auth";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import axios from "axios";
import { API } from "../../../config/API";
import { useEffect } from "react";

const StatsBatch = ({ id, from }) => {
  const [auth] = useContext(AuthContext);
  const router = useRouter();

  const [assets, setAssets] = useState(0);
  const [folders, setFolders] = useState(0);
  const [comments, setComments] = useState(0);
  const [lessons, setLessons] = useState(0);
  const [batch, setBatch] = useState("");

  const fetchingAllStatsForBatch = async (x) => {
    try {
      const { data } = await axios.get(`${API}/lms/stu-batch-stats/${x}`);
      setAssets(data.assets);
      setFolders(data.folders);
      setLessons(data.lessons);
      setComments(data.comments);
      setBatch(data.batch.title);
    } catch (error) {
      console.log(error);
      toast.error("Failed, Try Again");
    }
  };

  useEffect(() => {
    if (auth && auth.token && id) {
      fetchingAllStatsForBatch(id);
    }
  }, [auth && auth.token && id]);

  return (
    <>
      <Row gutter={[16, 16]} className="mb-4">
        <Col xs={24} sm={24} md={12} lg={12}>
          <h3 style={{ color: "#0f3f5d" }}>{batch}</h3>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={6} lg={6}>
          <Card
            style={{
              border: `${from === "lessons" && "2px solid #0f3f5d"}`,
            }}
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
            style={{
              border: `${from === "folders" && "2px solid #0f3f5d"}`,
            }}
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
            style={{
              border: `${from === "assets" && "2px solid #0f3f5d"}`,
            }}
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
            style={{
              border: `${from === "comments" && "2px solid #0f3f5d"}`,
            }}
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
    </>
  );
};

export default StatsBatch;
