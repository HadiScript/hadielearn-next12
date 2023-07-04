import { Divider, List, Modal, Tag } from "antd";
import React, { useState } from "react";

const CompletedBatchesModel = ({
  completedBatchesModel,
  setCompletedBatchesModel,
  current,
}) => {
  const [currentBatch, setCurrentBatch] = useState({});
  const [open, setOpen] = useState(false);
  const paymentDetails =
    current?.payments &&
    current?.payments?.find((x) => x.batch === currentBatch._id);

  return (
    <>
      <Modal
        title={`${current.name}`}
        centered
        open={completedBatchesModel}
        onOk={() => setCompletedBatchesModel(false)}
        onCancel={() => setCompletedBatchesModel(false)}
        width={1000}
      >
        <Divider orientation="left">Completed Batches</Divider>
        <List
          size="small"
          bordered
          dataSource={current?.completedBatches}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta title={item.title} description={item._id} />
              <Tag>
                {current.payments.find((x) => x.batch === item._id)?.completed
                  ? "Yes"
                  : "No"}
              </Tag>
              <Tag
                color="blue"
                role="button"
                onClick={() => {
                  setCurrentBatch(item);
                  setOpen(true);
                }}
              >
                {item.payments?.length > 0
                  ? " Payment Details"
                  : "Payment is not added yet"}
              </Tag>
            </List.Item>
          )}
        />
      </Modal>

      {paymentDetails && (
        <Modal
          title={`${currentBatch.title}`}
          centered
          open={open}
          onOk={() => setOpen(false)}
          onCancel={() => setOpen(false)}
          width={300}
        >
          <Tag className="my-1"> Amount: {paymentDetails?.amount} </Tag>
          <br />
          <Tag className="my-1">
            {" "}
            Is Completed : {paymentDetails?.completed ? "Yes" : "No"}{" "}
          </Tag>
          <br />
          <Tag className="my-1"> Comment : {paymentDetails?.comment} </Tag>
        </Modal>
      )}
    </>
  );
};

export default CompletedBatchesModel;
