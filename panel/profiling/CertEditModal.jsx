import { Button, Modal } from "antd";
import React, { useState, useEffect } from "react";

const CertEditModal = ({
  open,
  setOpen,
  current,
  editCertificate,
  loading,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    platform: "",
    from: "",
    to: "",
    current: false,
  });

  // Similar functions for handling form changes and submitting the form go here
  // You can refer to your ExpEditModal component for these functions and adjust them accordingly for certificates

  const changesFormData = (e) => {
    if (e.target.name !== "current") {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    } else {
      setFormData({ ...formData, current: !formData.current });
    }
  };

  useEffect(() => {
    setFormData({
      ...formData,
      title: current.title,
      platform: current.platform,
      from: current.from,
      to: current.to,
      current: current.current,
    });
  }, [current]);

  return (
    <Modal
      title={formData.title}
      centered
      open={open}
      onOk={() => setOpen(false)}
      onCancel={() => setOpen(false)}
      footer={null}
      width={1000}
    >
      <div className="row">
        <div className="col-md-6">
          <div className="form-group py-2">
            <label> Title </label>
            <input
              type="text"
              className="form-control"
              placeholder="eg: ReactJs Mastery Course"
              name="title"
              value={formData.title}
              onChange={changesFormData}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group py-2">
            <label> Platform </label>
            <input
              type="email"
              className="form-control"
              placeholder="eg: hadielearning"
              name="platform"
              value={formData.platform}
              onChange={changesFormData}
            />
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <div className="form-group py-2">
            <label> From </label>
            <input
              type="date"
              className="form-control"
              placeholder="School"
              name="from"
              value={formData.from}
              onChange={changesFormData}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group py-2">
            <label> To </label>
            <input
              type="date"
              disabled={formData.current && true}
              className="form-control"
              placeholder="Degree"
              name="to"
              value={formData.to}
              onChange={changesFormData}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="d-flex align-items-center gap-2 form-group py-2">
            <label> Current </label>
            <input
              type="checkbox"
              name="current"
              checked={formData.current}
              onChange={changesFormData}
            />
          </div>
        </div>
      </div>

      <div className="text-end">
        <Button
          className="CardieBg text-light"
          loading={loading}
          onClick={() => editCertificate({ ...formData, _id: current._id })}
        >
          Submit
        </Button>
      </div>
    </Modal>
  );
};

export default CertEditModal;
