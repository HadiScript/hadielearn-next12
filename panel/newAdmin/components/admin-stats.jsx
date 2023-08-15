import React from "react";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { Card, Col, Row, Statistic } from "antd";
import { MdOutlineGroups3, MdOutlinePlaylistAdd } from "react-icons/md";
import { TbFolders } from "react-icons/tb";
import { CgToolbarBottom } from "react-icons/cg";

const Stats = ({ data }) => {
  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} sm={24} md={6} lg={6}>
        <Card bordered={false}>
          <Statistic
            title="Enrollments"
            value={data.enrollments}
            valueStyle={{
              color: "#0f3f5d",
            }}
            prefix={<MdOutlinePlaylistAdd />}
          />
        </Card>
      </Col>
      <Col xs={24} sm={24} md={6} lg={6}>
        <Card bordered={false}>
          <Statistic
            title="Batches"
            value={data.batches}
            valueStyle={{
              color: "#0f3f5d",
            }}
            prefix={<MdOutlineGroups3 />}
          />
        </Card>
      </Col>
      <Col xs={24} sm={24} md={6} lg={6}>
        <Card bordered={false}>
          <Statistic
            title="Folders"
            value={data.folders}
            valueStyle={{
              color: "#0f3f5d",
            }}
            prefix={<TbFolders />}
          />
        </Card>
      </Col>
      <Col xs={24} sm={24} md={6} lg={6}>
        <Card bordered={false}>
          <Statistic
            title="Assets"
            value={data.assets}
            valueStyle={{
              color: "#0f3f5d",
            }}
            prefix={<CgToolbarBottom />}
          />
        </Card>
      </Col>
    </Row>
  );
};

export default Stats;
