import { Button, Modal } from "antd";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { validateDates } from "../../utils/DatesValidations";

const EducationEditModal = ({ open, setOpen, current, EditEdu, loading }) => {
  const [formData, setFormData] = useState({
    school: "",
    degree: "",
    to: "",
    from: "",
    current: false,
    description: "",
  });

  const [formErrors, setFormErrors] = useState({
    from: "",
    to: "",
    current: "",
  });

  const changesCurrentData = (e) => {
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
      school: current.school,
      degree: current.degree,
      from: current.from,
      to: current.to,
      current: current.current,
      description: current.description,
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
    if (!formData.school || !formData.degree || !formData.from || !(formData.to || formData.current)) {
      toast.error("All fields are requried");
      return;
    }
    if (formErrors.from || formErrors.current || formErrors.to) {
      return;
    }
    EditEdu({ ...formData, _id: current._id });
  };

  return (
    <Modal title={formData.degree} centered open={open} onOk={() => setOpen(false)} onCancel={() => setOpen(false)} footer={null} width={1000}>
      {/* {JSON.stringify(formData)} */}
      <div className="row">
        <div className="col-md-6">
          <div className="form-group py-2">
            <label> School </label>
            <input type="text" className="form-control" placeholder="School" name="school" value={formData.school} onChange={changesCurrentData} />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group py-2">
            <label> Degree </label>
            <input type="email" className="form-control" placeholder="Degree" name="degree" value={formData.degree} onChange={changesCurrentData} />
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <div className="form-group py-2">
            <label> From </label>
            <input type="date" className="form-control" placeholder="School" name="from" value={formData.from?.slice(0, 10)} onChange={changesCurrentData} />
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
              onChange={changesCurrentData}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="d-flex align-items-center gap-2 form-group py-2">
            <label> Present </label>
            <input type="checkbox" name="current" checked={formData.current} onChange={changesCurrentData} />
          </div>
        </div>
        {formErrors.from && <div className="text-danger">{formErrors.from}</div>}
        {formErrors.to && <div className="text-danger">{formErrors.to}</div>}
      </div>

      <div className="col-md-12">
        <div className="form-group py-2">
          <label> Description </label>
          <textarea
            type="text"
            className="form-control"
            placeholder="Description"
            name="description" // Corrected typo here
            value={formData.description}
            onChange={changesCurrentData}
          />
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

export default EducationEditModal;
