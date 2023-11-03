import { Button, Card } from "antd";
import React from "react";

const ProfileForm = ({ formData, changesFormData, addFunc, loading, which, formErrors, title }) => {
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
                <input type="email" className="form-control" placeholder="Degree" name="degree" value={formData.degree} onChange={changesFormData} />
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
              <label> Platform </label>
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
            <label> Current </label>
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
              <option value={"remote-part-time"}> Remote and part time </option>
              <option value={"remote-full-time"}> Remote and fill time </option>
              <option value={"onsite-part-time"}> Onsite Part time </option>
              <option value={"onsite-full-time"}> Onsite Full Time </option>
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
