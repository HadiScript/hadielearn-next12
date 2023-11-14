import { Button, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { validateDates } from "../../utils/DatesValidations";
import toast from "react-hot-toast";

const ProjectEditModal = ({ open, setOpen, current, EditProject, loading }) => {
  const [formData, setFormData] = useState({
    title: "",
    to: "",
    from: "",
    current: false,
    description: "",
    link: "",
  });

  const [formErrors, setFormErrors] = useState({
    from: "",
    to: "",
    current: "",
  });

  const changesFormData = (e) => {
    if (e.target.name !== "current") {
      setFormData({ ...formData, [e.target.name]: e.target.value });
      setFormErrors((prevState) => ({
        ...prevState,
        [e.target.name]: "",
      }));
    } else {
      setFormData({ ...formData, current: !formData.current });
      setFormErrors((prevState) => ({
        ...prevState,
        [e.target.name]: "",
      }));
    }
  };
  useEffect(() => {
    setFormData({
      ...formData,
      title: current.title,
      link: current.link,
      from: current.from,
      to: current.to,
      current: current.current,
      description: current.description ? current.description : "",
    });
  }, [current]);

  useEffect(() => {
    const errorMsgs = validateDates(formData.from, formData.to, formData.current);
    if (Object.keys(errorMsgs).length > 0) {
      setFormErrors(errorMsgs);
      return;
    }

    if (formData.current) {
      setFormData({ ...formData, to: "" });
    }
  }, [formData.from, formData.to, formData.current]);

  const edit = () => {
    if (!formData.title || !formData.link || !formData.from || !(formData.to || formData.current)) {
      toast.error("All fields are requried");
      return;
    }
    if (formErrors.from || formErrors.current || formErrors.to) {
      return;
    }
    EditProject({ ...formData, _id: current._id });
  };

  return (
    <Modal title={formData.title} centered open={open} onOk={() => setOpen(false)} onCancel={() => setOpen(false)} footer={null} width={1000}>
      <div className="row">
        <div className="col-md-6">
          <div className="form-group py-2">
            <label> Title </label>
            <input type="text" className="form-control" placeholder="eg: Full Stack Developer" name="title" value={formData.title} onChange={changesFormData} />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group py-2">
            <label> Link </label>
            <input type="email" className="form-control" placeholder="eg: hadiraza.com" name="link" value={formData.link} onChange={changesFormData} />
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <div className="form-group py-2">
            <label> From </label>
            <input type="date" className="form-control" placeholder="School" name="from" value={formData.from?.slice(0, 10)} onChange={changesFormData} />
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
              value={formData.to?.slice(0, 10)}
              onChange={changesFormData}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="d-flex align-items-center gap-2 form-group py-2">
            <label> Present </label>
            <input type="checkbox" name="current" checked={formData.current} onChange={changesFormData} />
          </div>
        </div>
        {formErrors.from && <div className="text-danger">{formErrors.from}</div>}
        {formErrors.to && <div className="text-danger">{formErrors.to}</div>}
      </div>

      <div className="col-md-12">
        <div className="form-group py-2">
          <label> Description </label>
          <textarea type="text" className="form-control" name="description" value={formData.description} onChange={changesFormData} />
        </div>
      </div>

      <div className="text-end">
        <Button className="CardieBg text-light" loading={loading} onClick={edit}>
          Submit
        </Button>
      </div>
    </Modal>
  );
};

export default ProjectEditModal;
