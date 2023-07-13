import { Modal } from "antd";
import React from "react";

const BatchNotification = ({ notice, open, setOpen, batchName }) => {
  return (
    <Modal
      top={20}
      width={500}
      open={open}
      onOk={() => {
        setOpen(false);
      }}
      onCancel={() => setOpen(false)}
      className="modal-notifications"
      footer={""}
    >
      <div
        className={`alert alert-${notice?.variant} `}
        style={{ marginTop: "20px" }}
        role="alert"
      >
        <h4 className="alert-heading">{notice?.heading}</h4>
        <p>{notice?.text}</p>
        <hr />
        <p className="mb-0">{notice?.createdAt.substring(0, 10)}</p>
      </div>
    </Modal>
  );
};

export default BatchNotification;
