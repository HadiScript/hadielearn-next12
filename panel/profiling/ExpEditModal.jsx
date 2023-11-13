import { Button, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { validateDates } from "../../utils/DatesValidations";
import toast from "react-hot-toast";

const ExpEditModal = ({ open, setOpen, current, EditExp, loading }) => {
  const [formData, setFormData] = useState({
    title: "",
    to: "",
    from: "",
    current: false,
    typeOfJob: "",
    skills: "",
    location: "",
    company: "",
  });
  const [formErrors, setFormErrors] = useState({
    from: "",
    to: "",
    current: "",
  });

  // Similar functions for handling form changes and submitting the form go here
  // You can refer to your ExpEditModal component for these functions and adjust them accordingly for certificates

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
      company: current.company,
      skills: current.skills ? current.skills : "",
      from: current.from,
      to: current.to,
      current: current.current,
      typeOfJob: current.typeOfJob,
      location: current.location ? current.location : "",
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
    if (!formData.title || !formData.company || !formData.from || !(formData.to || formData.current)) {
      toast.error("All fields are requried");
      return;
    }
    if (formErrors.from || formErrors.current || formErrors.to) {
      return;
    }

    EditExp({ ...formData, _id: current._id });
  };

  return (
    <Modal Modal title={formData.title} centered open={open} onOk={() => setOpen(false)} onCancel={() => setOpen(false)} footer={null} width={1000}>
      {JSON.stringify(formData)}

      <div className="row">
        <div className="col-md-6">
          <div className="form-group py-2">
            <label> Title </label>
            <input type="text" className="form-control" placeholder="eg: Full Stack Developer" name="title" value={formData.title} onChange={changesFormData} />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group py-2">
            <label> Company </label>
            <input type="email" className="form-control" placeholder="Company" name="company" value={formData.company} onChange={changesFormData} />
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
            <label> Current </label>
            <input type="checkbox" name="current" checked={formData.current} onChange={changesFormData} />
          </div>
        </div>

        {formErrors.from && <div className="text-danger">{formErrors.from}</div>}
        {formErrors.to && <div className="text-danger">{formErrors.to}</div>}
      </div>

      <div className="col-md-12">
        <div className="form-group py-2">
          <label> Skills </label>
          <input type="text" className="form-control" name="skills" value={formData.skills} onChange={changesFormData} />
          <small>eg: ReactJs, AngularJs, VueJs</small>
        </div>
      </div>

      <div className="col-md-12">
        <div className="form-group py-2">
          <select className="form-select" name="typeOfJob" value={formData.typeOfJob} onChange={changesFormData}>
            <option value={""} defaultValue={""}>
              Choose type of job
            </option>
            <option value={"remote-part-time"}> Remote and part time </option>
            <option value={"remote-full-time"}> Remote and fill time </option>
            <option value={"onsite-part-time"}> Onsite Part time </option>
            <option value={"onsite-full-time"}> Onsite Full Time </option>
          </select>
        </div>
      </div>

      {formData?.typeOfJob?.includes("onsite") && (
        <div className="col-md-12">
          <div className="form-group py-2">
            <label> Location </label>
            <input type="text" className="form-control" name="location" value={formData.location} onChange={changesFormData} />
          </div>
        </div>
      )}

      <div className="text-end">
        <Button className="CardieBg text-light" loading={loading} onClick={edit}>
          Submit
        </Button>
      </div>
    </Modal>
  );
};

export default ExpEditModal;
