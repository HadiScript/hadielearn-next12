import { Card, Col, Row } from "antd";
import React, { useContext, useEffect, useState } from "react";
import PaymentChart from "../charts/PaymentChart";
import EnrolledStudents from "../charts/EnrolledStudents";
import { toast } from "react-hot-toast";
import axios from "axios";
import { API } from "../../../config/API";
import { AuthContext } from "../../../context/auth";

const PaymentsEnrolledStudents = () => {
  const [auth] = useContext(AuthContext);
  const [paymentsData, setPaymentsData] = useState([]);
  const [enrlByStu, setEnrlByStu] = useState([]);

  const gettingPaymentsData = async () => {
    try {
      const { data } = await axios.get(`${API}/lms/all-payments`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      setPaymentsData(data);
    } catch (error) {
      console.log(error);
      toast.error("try again");
    }
  };

  const gettingStudentsPerStudents = async () => {
    try {
      const { data } = await axios.get(`${API}/lms/enrollments-batch`);
      setEnrlByStu(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth && auth.token) {
      gettingPaymentsData();
      gettingStudentsPerStudents();
    }
  }, [auth && auth.token]);

  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} sm={24} md={12} lg={12}>
        <Card bordered={false} title="Payments">
          {paymentsData && <PaymentChart data={paymentsData} />}
        </Card>
      </Col>
      <Col xs={24} sm={24} md={12} lg={12}>
        <Card bordered={false} title="Students Count By Each Course">
          {enrlByStu && <EnrolledStudents data={enrlByStu} />}
        </Card>
      </Col>
    </Row>
  );
};

export default PaymentsEnrolledStudents;
