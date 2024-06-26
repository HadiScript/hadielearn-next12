import { useRouter } from "next/router";
import React from "react";
import { AiOutlineRollback } from "react-icons/ai";
import { tempData } from "../data/tempData";
import { Checkbox } from "antd";

const Step4 = ({
  currentStep,
  handleChange,
  submit,
  previousButton,
  education,
  interest,
  wantToAchieve,
  setEducation,
  setCourse,
  enrollTo,
  course,
  workshop,
  setWorkshop,
  _enroll_to,
  fetchCoursesData,
  fetchWorkshopsData,
  MultiStepProgressBar,
  policyAccepted,
  setPolicyAccepted
}) => {
  const navigate = useRouter();

  if (currentStep !== 4) {
    return null;
  }

  return (
    <>
      <div className="col-md-8  col-sm-12 mb-4 pt-5 ">
        <span className="d-flex align-items-center gap-2" onClick={() => navigate.back()}>
          <AiOutlineRollback /> <span>Back</span>
        </span>
      </div>
      <h2> Enrollment Application </h2>
      <br />
      <MultiStepProgressBar currentStep={currentStep} />
      <br />
      <h5>Education & Interest</h5>
      <div className="form-group py-3">
        <label>
          Education<span className="text-danger">*</span>
        </label>
        <select
          required
          className="form-select"
          value={education}
          onChange={(e) => {
            setEducation(e.target.value);
          }}
        >
          <option value="">Choose</option>
          <option value="matric">Matric</option>
          <option value="intermediate">Intermediate</option>
          <option value="bachelor">Bachelor </option>
          <option value="masters">Masters</option>
        </select>
      </div>
      <div className="row">
        <div className="col-md-6 col-sm-12 col-xs-12 py-3">
          <label>
            Enroll To<span className="text-danger">*</span>
          </label>
          <select required className="form-select" value={enrollTo}>
            <option value="enrollTo">
              {enrollTo === "workshop" && "Workshop"} {enrollTo === "program" && "Program"}
            </option>
          </select>
        </div>

        {_enroll_to === "program" && (
          <div className="col-md-6 col-sm-12 col-xs-12 py-3">
            <label>
              Choose Course<span className="text-danger">*</span>
            </label>
            {/* <select
              required
              className="form-select"
              value={course}
              onChange={(e) => {
                setCourse(e.target.value);
              }}
            >
              <option value="">Choose</option>
              <option value="freelancing">Freelancing</option>
              <option value="shopify-and-wordpress">
                Shopify and WordPress
              </option>
              <option value="digital-marketing">Digital Merketing</option>
              <option value="3ds-max-and-autocad">3Ds Max and AutoCAD</option>
              <option value="mean-stack">MEAN Stack</option>
              <option value="mern-stack">MERN Stack</option>

              <option value="amazon-va">Amazon VA</option>
              <option value="video-editing">Video Editing</option>
              <option value="seo">Search Engine Optimization (SEO)</option>
              <option value="graphics-designing">Graphic Designing </option> */}
            <select
              required
              className="form-select"
              value={course}
              onChange={(e) => {
                setCourse(e.target.value);
              }}
            >
              <option value="">Choose</option>
              {fetchCoursesData?.map((x) => (
                <option key={x._id} value={x.slug}>
                  {x.title}
                </option>
              ))}
            </select>
          </div>
        )}

        {_enroll_to === "workshop" && (
          <div className="col-md-6 col-sm-12 col-xs-12 py-3">
            <label>
              Choose Workshop<span className="text-danger">*</span>
            </label>
            <select
              required
              className="form-select"
              value={workshop}
              onChange={(e) => {
                setWorkshop(e.target.value);
              }}
            >
              <option value="">Choose</option>
              {fetchWorkshopsData.map((x) => (
                <option key={x._id} value={x.slug}>
                  {x.title}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
      <div className="form-group py-3">
        <label>Your Interests</label>
        <textarea type="text" className="form-control" name="interest" value={interest} onChange={handleChange} />
      </div>
      <div className="form-group py-3">
        <label>What do you want to achieve?</label>
        <textarea type="text" className="form-control" name="wantToAchieve" value={wantToAchieve} onChange={handleChange} />
      </div>

      <div className="col-md-12 col-sm-12 col-xs-12 py-3">
        <Checkbox onChange={(e) => setPolicyAccepted(e.target.checked)}>
          I accept Hadi E-learning's{" "}
          <a className="text-primary" target="_" href="https://hadielearning.com/terms-and-conditions/">Terms and Conditions</a> {" "}
          and{" "}
          <a className="text-primary" target="_" href="https://hadielearning.com/privacy-and-policy/">Privacy Policy</a>

        </Checkbox>
      </div>

      <div className="d-flex justify-content-between">
        <>{previousButton()}</>
        {!education || !policyAccepted || !enrollTo || !(course || workshop) ? <button className="z-btn-disable mx-2">submit</button> : <>{submit()}</>}
      </div>
    </>
  );
};

export default Step4;
