import React from "react";
import { Divider, List, Modal } from "antd";

const Certification_Model = ({
  certificationModel,
  setCertificationModel,
  current,
}) => {
  return (
    <>
      <Modal
        title={`${current.name}`}
        centered
        open={certificationModel}
        onOk={() => setCertificationModel(false)}
        onCancel={() => setCertificationModel(false)}
        width={1000}
      >
        <Divider orientation="left">certified Batches</Divider>
        <List
          size="small"
          bordered
          dataSource={current?.certifications}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta title={item.title} description={item._id} />
            </List.Item>
          )}
        />
      </Modal>
    </>
  );
};

export default Certification_Model;
