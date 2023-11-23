import axios from "axios";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { AuthContext } from "../../../../context/auth";
import NewLayout from "../../../../panel/newStudent/layouts/NewLayout";
import { API } from "../../../../config/API";
import { useRouter } from "next/router";
import TimeCalendar from "../../../../panel/newStudent/components/TimeCalendar";
import { Col, Row } from "antd";

const BatchTimeTable = () => {
  const { id } = useRouter().query;
  const [auth] = useContext(AuthContext);
  const [timeTable, setTimeTable] = useState({});

  const fetchingTimeTableData = async (x) => {
    try {
      const { data } = await axios.get(`${API}/lms/my-single-batch/${x}`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });

      setTimeTable(data.myBatch);
    } catch (error) {
      console.log(error);
      toast.error("Failed, try again");
    }
  };

  useEffect(() => {
    if (auth && auth.token && id) {
      fetchingTimeTableData(id);
    }
  }, [auth && auth.token, id]);

  return (
    <NewLayout batchID={id}>
      <Row gutter={[16, 16]} className="mb-4">
        <Col xs={24} sm={24} md={12} lg={12}>
          <h3 style={{ color: "#0f3f5d" }}> {timeTable.title}</h3>
        </Col>
      </Row>
      {JSON.stringify(timeTable)}
      <TimeCalendar classSchedule={timeTable} />
    </NewLayout>
  );
};

export default BatchTimeTable;
