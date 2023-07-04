import { Card, Col, Row } from "antd";
import React from "react";
import PaymentChart from "../charts/PaymentChart";
import EnrolledStudents from "../charts/EnrolledStudents";

const PaymentsEnrolledStudents = () => {
  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} sm={24} md={12} lg={12}>
        <Card bordered={false}>
          <PaymentChart />
        </Card>
      </Col>
      <Col xs={24} sm={24} md={12} lg={12}>
        <Card bordered={false}>
          <EnrolledStudents />
        </Card>
      </Col>
    </Row>
  );
};

export default PaymentsEnrolledStudents;
