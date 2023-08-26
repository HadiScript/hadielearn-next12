import { Input } from "antd";
import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import { AiOutlineRollback } from "react-icons/ai";

const Step2 = ({
  previousButton,
  nextButton,
  handleChange,
  currentStep,
  city,
  address,
  idCard,
  setIdCard,
  MultiStepProgressBar,
}) => {
  const navigate = useRouter();

  const [show, setShow] = useState(false);
  if (currentStep !== 2) {
    return null;
  }

  const handleInputChange = (event) => {
    const cnicNumber = event.target.value;
    const formattedPhoneNumber = cnicNumber.replace(/[^0-9-]/g, ""); // Remove non-digit and non-hyphen characters

    if (/^\d{0,13}$/.test(cnicNumber)) {
      setIdCard(cnicNumber);
    }
    // if (/^(?:\d{5}-\d{7}-\d{1}|\d{13})$/.test(formattedPhoneNumber)) {
    //   setIdCard(formattedPhoneNumber);
    //   setShow(false); // Hide the alert if the number is correct
    // } else {
    //   setIdCard(formattedPhoneNumber);
    //   setShow(true); // Show the alert if the number is incorrect
    // }
  };

  return (
    <>
      <div className="col-md-8  col-sm-12 mb-4 ">
        <span
          className="d-flex align-items-center gap-2"
          onClick={() => navigate.back()}
        >
          <AiOutlineRollback /> <span>Back</span>
        </span>
      </div>
      <h2> Enrollment Application </h2>
      <br />
      <MultiStepProgressBar currentStep={currentStep} />

      <br />
      <h5>Locations</h5>
      <div className="form-group py-3">
        <label>
          City<span className="text-danger">*</span>{" "}
        </label>
        <input
          required
          type="text"
          className="form-control"
          name="city"
          value={city}
          onChange={handleChange}
        />
      </div>

      <div className="form-group py-3">
        <label>
          Address<span className="text-danger">*</span>{" "}
        </label>
        <input
          required
          type="text"
          className="form-control"
          name="address"
          value={address}
          onChange={handleChange}
        />
      </div>

      <div className="form-group py-3">
        <label>
          CNIC
          {show && (
            <span style={{ color: "red", marginLeft: "3px" }} className="ml-2">
              Please enter correct CNIC
            </span>
          )}
        </label>
        <input
          required
          type="text"
          className="form-control"
          name="idCard"
          value={idCard}
          onChange={handleInputChange}
        />
      </div>
      <div className="d-flex justify-content-between">
        <>{previousButton()}</>
        {!city || !address || show !== false ? (
          <button className="z-btn-disable mx-2">next</button>
        ) : (
          <>{nextButton()}</>
        )}
      </div>
    </>
  );
};

export default Step2;
