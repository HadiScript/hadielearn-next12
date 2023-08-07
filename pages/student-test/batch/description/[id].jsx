import React from "react";
import { Card, Descriptions } from "antd";
import HooksLayout from "../../../../panel/newStudent/layouts/components/HooksLayout";
import { FaChalkboardTeacher } from "react-icons/fa";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../../../../context/auth";
import { toast } from "react-hot-toast";
import axios from "axios";
import { API } from "../../../../config/API";
import { useState } from "react";

const DescriptionBatch = () => {
  const [auth] = useContext(AuthContext);
  const router = useRouter();
  const { id } = router.query;

  const [assets, setAssets] = useState(0);
  const [folders, setFolders] = useState(0);
  const [lessons, setLessons] = useState(0);
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    const gettingStatsBatch = async () => {
      try {
        const { data } = await axios.get(`${API}/lms/stu-batch-stats/${id}`);
        // console.log(data, "from batch statsasdsad");
        setAssets(data.assets);
        setFolders(data.folders);
        setLessons(data.lessons);
        setTeachers(data.instuctors);
      } catch (error) {
        console.log(error);
        toast.error("Try Again");
      }
    };

    gettingStatsBatch();
  }, [auth && auth.user && id]);

  return (
    <HooksLayout>
      <Card>
        <Descriptions
          title=""
          bordered
          column={{
            xxl: 3,
            xl: 2,
            lg: 2,
            md: 2,
            sm: 2,
            xs: 1,
          }}
        >
          <Descriptions.Item label="Lessons">{lessons}</Descriptions.Item>
          <Descriptions.Item label="Assets">{assets}</Descriptions.Item>
          <Descriptions.Item label="Folders">{folders}</Descriptions.Item>
        </Descriptions>
      </Card>
    </HooksLayout>
  );
};

export default DescriptionBatch;
