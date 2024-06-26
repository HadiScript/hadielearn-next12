import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import { AiOutlineRollback } from "react-icons/ai";

import PhoneInput from "react-phone-input-2";
import { tempData } from "../data/tempData";
import { Checkbox } from "antd";


const Step0 = ({
  email,

  currentStep,
  handleChange,
  setEmail,

  nextButton,
  submit,

  singleData,
  ok,
  singleDataLoading,

  enrollTo,
  _enroll_to,
  setCourse,
  course,
  workshop,
  setWorkshop,
  whatsAppphoneNumber,
  setWhatsAppPhoneNumber,
  fetchCoursesData,
  fetchWorkshopsData,
  policyAccepted,
  setPolicyAccepted
}) => {
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);

  const navigate = useRouter();

  if (currentStep !== 0) {
    return null;
  }

  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  const handleEmail = (event) => {
    if (!isValidEmail(event.target.value)) {
      setShow(true);
    } else {
      setShow(false);
    }

    setEmail(event.target.value);
  };

  const handleInputChange = (event) => {
    const inputPhoneNumber = event.target.value;
    const formattedPhoneNumber = inputPhoneNumber.replace(/[^0-9+]/g, ""); // Remove non-digit and non-plus characters

    if (/^(?:\+92|0)?3\d{9}$/.test(formattedPhoneNumber)) {
      setWhatsAppPhoneNumber(formattedPhoneNumber);
      setShow2(false);
    } else {
      setWhatsAppPhoneNumber(formattedPhoneNumber);
      setShow2(true);
    }
  };


  return (
    <div>
      <div className="col-md-8  col-sm-12 mb-4  ">
        <span className="d-flex align-items-center gap-2" onClick={() => navigate.back()}>
          <AiOutlineRollback /> <span>Back</span>
        </span>
      </div>
      <h2> Enrollment Application </h2>
      <br />
      <h5>Basic information</h5>
      <div className="form-group py-3">
        <label>
          Email<span className="text-danger">*</span>
          {show && <small className="text-danger mx-3"> Invalid Email</small>}
          {singleDataLoading && "Loading..."}
        </label>
        <input required type="email" className="form-control" placeholder="example@gmail.com" name="email" value={email} onChange={handleEmail} />
      </div>


      {ok && singleData && (
        <div className="row">
          <div className="col-md-12 col-sm-12 col-xs-12 py-3">
            <label>
              WhatsApp<span className="text-danger">*</span>
            </label>

            <PhoneInput
              country={"pk"} // Set a default country
              inputClass="form-control"
              inputStyle={{ width: "100%" }}
              placeholder="Enter whatsApp number"
              value={whatsAppphoneNumber}
              onChange={(value) => setWhatsAppPhoneNumber(value)}
            />
            <small style={{ fontSize: "12px" }}>Could you please confirm your WhatsApp Number</small>
          </div>

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
          {/* {JSON.stringify(_enroll_to)} */}
          {_enroll_to === "program" && (
            <div className="col-md-6 col-sm-12 col-xs-12 py-3">
              <label>
                Choose Course<span className="text-danger">*</span>
              </label>
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

          <div className="col-md-12 col-sm-12 col-xs-12 py-3">
            <Checkbox onChange={(e) => setPolicyAccepted(e.target.checked)}>
              I accept Hadi E-learning's{" "}
              <a className="text-primary" target="_" href="https://hadielearning.com/terms-and-conditions/">Terms and Conditions</a> {" "}
              and{" "}
              <a className="text-primary" target="_" href="https://hadielearning.com/privacy-and-policy/">Privacy Policy</a>

            </Checkbox>
          </div>
        </div>


      )}





      <br />

      {!ok && show ? <button className="z-btn-disable">Next</button> : !email && !ok && <button className="z-btn-disable">Next</button>}

      {singleData && ok && (
        <div className="col-md-12">{!(course || workshop) || !whatsAppphoneNumber || !policyAccepted || show !== false ? <button className="z-btn-disable">Submit</button> : <>{submit()}</>}</div>
      )}

      {!singleDataLoading && !singleData && !ok && (
        <div className="col-md-12">
          {!email || show !== false ? (
            <></>
          ) : (
            <>{nextButton()}</>
          )}
        </div>
      )}
    </div>
  );
};

export default Step0;
