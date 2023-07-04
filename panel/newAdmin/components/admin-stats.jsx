import React from "react";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { Card, Col, Row, Statistic } from "antd";
const Stats = () => {
  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} sm={24} md={6} lg={6}>
        <Card bordered={false}>
          <Statistic
            title="Active"
            value={11.28}
            precision={2}
            valueStyle={{
              color: "#0f3f5d",
            }}
            prefix={<ArrowUpOutlined />}
          />
        </Card>
      </Col>
      <Col xs={24} sm={24} md={6} lg={6}>
        <Card bordered={false}>
          <Statistic
            title="Idle"
            value={9.3}
            precision={2}
            valueStyle={{
              color: "#0f3f5d",
            }}
            prefix={<ArrowDownOutlined />}
            suffix="%"
          />
        </Card>
      </Col>
      <Col xs={24} sm={24} md={6} lg={6}>
        <Card bordered={false}>
          <Statistic
            title="Idle"
            value={9.3}
            precision={2}
            valueStyle={{
              color: "#0f3f5d",
            }}
            prefix={<ArrowDownOutlined />}
            suffix="%"
          />
        </Card>
      </Col>
      <Col xs={24} sm={24} md={6} lg={6}>
        <Card bordered={false}>
          <Statistic
            title="Idle"
            value={9.3}
            precision={2}
            valueStyle={{
              color: "#0f3f5d",
            }}
            prefix={<ArrowDownOutlined />}
            suffix="%"
          />
        </Card>
      </Col>
    </Row>
  );
};

export default Stats;
