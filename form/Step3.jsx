import { useRouter } from "next/router";
import React, { useState } from "react";
import { AiOutlineRollback } from "react-icons/ai";
import PhoneInput from "react-phone-input-2";

const Step3 = ({ currentStep, handleChange, nextButton, previousButton, parentName, parentPhoneNumber, parentOccupations, setParentPhoneNumber, MultiStepProgressBar }) => {
  const navigate = useRouter();

  const [show, setShow] = useState(false);
  if (currentStep !== 3) {
    return null;
  }

  const handleInputChange = (event) => {
    const inputPhoneNumber = event.target.value;
    const formattedPhoneNumber = inputPhoneNumber.replace(/[^0-9+]/g, ""); // Remove non-digit and non-plus characters

    if (/^(?:\+92|0)?3\d{9}$/.test(formattedPhoneNumber)) {
      setParentPhoneNumber(formattedPhoneNumber);
      setShow(false);
    } else {
      setParentPhoneNumber(formattedPhoneNumber);
      setShow(true);
    }
  };

  return (
    <>
      <div className="col-md-8  col-sm-12 mb-4 ">
        <span className="d-flex align-items-center gap-2" onClick={() => navigate.back()}>
          <AiOutlineRollback /> <span>Back</span>
        </span>
      </div>
      <h2> Enrollment Application </h2>
      <br />
      <MultiStepProgressBar currentStep={currentStep} />
      <br />
      <h5>Parents Information</h5>
      <div className="form-group py-3">
        <label>
          Father's Name<span className="text-danger">*</span>{" "}
        </label>
        <input required type="text" className="form-control" name="parentName" value={parentName} onChange={handleChange} />
      </div>
      <div className="form-group py-3">
        <label>
          Occupation<span className="text-danger">*</span>{" "}
        </label>
        <input required type="text" className="form-control" name="parentOccupations" value={parentOccupations} onChange={handleChange} />
      </div>
      <div className="form-group py-3">
        <label>
          Phone
          {show && (
            <span style={{ color: "red", marginLeft: "3px" }} className="ml-2">
              Please enter correct phone number
            </span>
          )}
        </label>
        {/* <input
          type="text"
          className="form-control"
          placeholder=""
          name="parentPhoneNumber"
          value={parentPhoneNumber}
          onChange={(e) => handleInputChange(e)}
        /> */}
        <PhoneInput
          country={"pk"} // Set a default country
          inputClass="form-control"
          inputStyle={{ width: "100%" }}
          placeholder=""
          value={parentPhoneNumber}
          onChange={(value) => setParentPhoneNumber(value)}
        />
      </div>
      <div className="d-flex justify-content-between">
        <>{previousButton()}</>
        {!(parentName.length >= 3) || !parentOccupations ? <button className="z-btn-disable mx-2">next</button> : <>{nextButton()}</>}
      </div>
    </>
  );
};

export default Step3;
