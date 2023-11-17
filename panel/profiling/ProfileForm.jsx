import { Button, Card, Select } from "antd";
import React, { useEffect } from "react";
import { degrees } from "../../data/degrees";

const ProfileForm = ({ formData, setFormData, changesFormData, addFunc, loading, which, formErrors, title }) => {
  useEffect(() => {
    if (formData.current) {
      setFormData({ ...formData, to: "" });
    }
  }, [formData.current]);

  return (
    <Card title={title}>
      <div className="row">
        {which === "edu" && (
          <>
            <div className="col-md-6">
              <div className="form-group py-2">
                <label> School </label>
                <input type="text" className="form-control" placeholder="School" name="school" value={formData.school} onChange={changesFormData} />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group py-2">
                <label> Degree </label>
                <Select mode="multiple" allowClear style={{ width: "100%" }} placeholder="Please select" onChange={(v) => setFormData({ ...formData, degree: v })}>
                  {degrees.map((item) => (
                    <Select.Option key={item.value}>{item.title}</Select.Option>
                  ))}
                </Select>

                {/* <input type="email" className="form-control" placeholder="Degree" name="degree" value={formData.degree} onChange={changesFormData} /> */}
              </div>
            </div>
          </>
        )}

        {which !== "edu" && (
          <div className="col-md-6">
            <div className="form-group py-2">
              <label> Title </label>
              <input type="text" className="form-control" placeholder="eg: Full Stack Developer" name="title" value={formData.title} onChange={changesFormData} />
            </div>
          </div>
        )}
        {which === "exp" && (
          <div className="col-md-6">
            <div className="form-group py-2">
              <label> Company </label>
              <input type="email" className="form-control" placeholder="Company" name="company" value={formData.company} onChange={changesFormData} />
            </div>
          </div>
        )}

        {which === "cert" && (
          <div className="col-md-6">
            <div className="form-group py-2">
              <label> Institute </label>
              <input type="email" className="form-control" placeholder="eg: hadielearning" name="platform" value={formData.platform} onChange={changesFormData} />
            </div>
          </div>
        )}

        {which === "port" && (
          <div className="col-md-6">
            <div className="form-group py-2">
              <label> Link </label>
              <input type="email" className="form-control" placeholder="eg: hadiraza.com" name="link" value={formData.link} onChange={changesFormData} />
            </div>
          </div>
        )}
      </div>

      <div className="row">
        <div className="col-md-6">
          <div className="form-group py-2">
            <label> From </label>
            <input type="date" className="form-control" placeholder="School" name="from" value={formData.from} onChange={changesFormData} />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group py-2">
            <label> To </label>
            <input type="date" disabled={formData.current && true} className="form-control" placeholder="Degree" name="to" value={formData.to} onChange={changesFormData} />
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
      {which === "exp" && (
        <div className="col-md-12">
          <div className="form-group py-2">
            <label> Skills </label>
            <input type="text" className="form-control" name="skills" value={formData.skills} onChange={changesFormData} />
            <small>eg: ReactJs, AngularJs, VueJs</small>
          </div>
        </div>
      )}

      {which === "exp" && (
        <div className="col-md-12">
          <div className="form-group py-2">
            <select className="form-select" name="typeOfJob" value={formData.typeOfJob} onChange={changesFormData}>
              <option value={""} defaultValue={""}>
                Choose type of job
              </option>
              <option value={"Remote - Part-Time"}> Remote - Part-Time </option>
              <option value={"Remote - Full-Time"}> Remote - Full-Time </option>
              <option value={"Onsite - Part-Time"}> Onsite - Part-Time </option>
              <option value={"Onsite - Full-Time"}> Onsite - Full-Time </option>
            </select>
          </div>
        </div>
      )}

      {which === "exp" && formData.typeOfJob.includes("onsite") && (
        <div className="col-md-12">
          <div className="form-group py-2">
            <label> Location </label>
            <input type="text" className="form-control" name="location" value={formData.location} onChange={changesFormData} />
          </div>
        </div>
      )}

      {(which === "edu" || which === "port") && (
        <div className="col-md-12">
          <div className="form-group py-2">
            <label> Description </label>
            <textarea type="text" className="form-control" placeholder="Description" name="description" checked={formData.description} onChange={changesFormData} />
          </div>
        </div>
      )}

      <div className="text-end">
        <Button className="CardieBg text-light" loading={loading} onClick={addFunc}>
          Submit
        </Button>
      </div>
    </Card>
  );
};

export default ProfileForm;
