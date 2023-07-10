import { Button, Modal } from "antd";
import React from "react";
import { useState } from "react";

const LessonUpdateModel = ({
  updateModalOpen,
  setUpdateModalOpen,
  current,
  updateLesson,
  title,
  setTitle,
  description,
  setDescription,
  updatesLoading,
}) => {
  return (
    <Modal
      title={current.title}
      centered
      width={500}
      open={updateModalOpen}
      onOk={() => {
        updateLesson(title, description, current._id);
        setUpdateModalOpen(false);
      }}
      onCancel={() => setUpdateModalOpen(false)}
    >
      {updatesLoading && <p>Loading...</p>}
      <form onSubmit={() => updateLesson(title, description, current._id)}>
        <label>Title</label>
        <input
          type="text"
          className="form-control"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <label>Description</label>
        <input
          type="text"
          className="form-control"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </form>
    </Modal>
  );
};

export default LessonUpdateModel;
