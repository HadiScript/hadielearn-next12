import { DatePicker } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineRollback } from "react-icons/ai";
import PhoneInput from "react-phone-input-2";

const Step1 = ({
  currentStep,
  email,
  firstName,
  lastName,
  dateOfBirth,
  phoneNumber,
  gender,
  handleCheckboxChange,
  nextButton,
  setdateOfBirth,
  handleChange,
  setPhoneNumber,
  previousButton,
  MultiStepProgressBar,
  whatsAppphoneNumber,
  setWhatsAppPhoneNumber,
}) => {
  const navigate = useRouter();

  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);

  if (currentStep !== 1) {
    return null;
  }

  if (dateOfBirth) {
    // const currentDate = new Date().toISOString().split("T")[0]; // Get the current date in YYYY-MM-DD format
    const currentDate = new Date(); // Get the current date in YYYY-MM-DD format

    if (dateOfBirth > currentDate) {
      toast.error("Please select a date in the past", {
        position: "bottom-center",
      });
      setdateOfBirth("");
    }
  }

  const handleInputChange = (event) => {
    const inputPhoneNumber = event.target.value;
    const formattedPhoneNumber = inputPhoneNumber.replace(/[^0-9+]/g, ""); // Remove non-digit and non-plus characters

    if (/^(?:\+92|0)?3\d{9}$/.test(formattedPhoneNumber)) {
      setPhoneNumber(formattedPhoneNumber);
      setShow(false);
    } else {
      setPhoneNumber(formattedPhoneNumber);
      setShow(true);
    }
  };

  const handleInputChange2 = (event) => {
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
      <h5>Basic Information</h5>
      <div className="row">
        <div className="col-md-6 col-sm-12 col-xs-12 py-3">
          <label>
            First Name<span className="text-danger">*</span>{" "}
          </label>
          <input
            required
            type="text"
            className="form-control"
            name="firstName"
            value={firstName}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6 col-sm-12 col-xs-12 py-3">
          <label>
            Last Name<span className="text-danger">*</span>{" "}
          </label>
          <input
            required
            type="text"
            className="form-control"
            name="lastName"
            value={lastName}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* <div className="form-group py-3">
        <label>
          Email<span className="text-danger">*</span>{" "}
        </label>
        <input
          required
          type="email"
          className="form-control"
          placeholder="example@gmail.com"
          name="email"
          value={email}
          onChange={handleChange}
        />
      </div> */}

      <div className="d-flex form-group py-3">
        <div className="form-check " style={{ marginRight: "20px" }}>
          <input
            className="form-check-input"
            type="checkbox"
            id="flexCheckDefault"
            value="female"
            checked={gender === "female"}
            onChange={handleCheckboxChange}
          />
          <label className="form-check-label" for="flexCheckDefault">
            Female
          </label>
        </div>

        <div className="form-check " style={{ marginRight: "20px" }}>
          <input
            className="form-check-input"
            type="checkbox"
            value="male"
            checked={gender === "male"}
            onChange={handleCheckboxChange}
            id="flexCheckDefault"
          />
          <label className="form-check-label" for="flexCheckDefault">
            Male
          </label>
        </div>
        <div className="form-check " style={{ marginRight: "20px" }}>
          <input
            className="form-check-input"
            type="checkbox"
            value="other"
            checked={gender === "other"}
            onChange={handleCheckboxChange}
            id="flexCheckDefault"
          />
          <label className="form-check-label" for="flexCheckDefault">
            Other
          </label>
        </div>
      </div>

      <div className="col-md-12 col-sm-12 col-xs-12 py-3">
        <label>
          Date of Birth<span className="text-danger">*</span>
        </label>
        <DatePicker
          required
          type="date"
          className="form-control"
          placeholder="Date of bith"
          name="dateOfBirth"
          value={dateOfBirth}
          onChange={(e) => setdateOfBirth(e)}
          // onChange={(e) => setdateOfBirth(e.target.value)}
        />
      </div>
      <div className="row">
        {/* <div className="col-md-6 col-sm-12 col-xs-12 py-3">
          <label>
            WhatsApp<span className="text-danger">*</span>
            {show2 && (
              <span
                style={{ color: "red", marginLeft: "3px" }}
                className="ml-2"
              >
                Please enter correct number
              </span>
            )}
          </label>
          <input
            required
            type="text"
            className="form-control"
            name="phoneNumber"
            value={whatsAppphoneNumber}
            onChange={(e) => handleInputChange2(e)}
          />
        </div> */}

        <div className="col-md-6 col-sm-12 col-xs-12 py-3">
          <label>WhatsApp<span className="text-danger">*</span></label>
          <PhoneInput
            country={"pk"} // Set a default country
            inputClass="form-control"
            inputStyle={{ width: "100%" }}
            placeholder="Enter whatsApp number"
            value={whatsAppphoneNumber}
            onChange={(value) => setWhatsAppPhoneNumber(value)}
          />
        </div>

        {/* <div className="col-md-6 col-sm-12 col-xs-12 py-3">
          <label>
            Phone<span className="text-danger">*</span>
            {show && (
              <span
                style={{ color: "red", marginLeft: "3px" }}
                className="ml-2"
              >
                Please enter correct number
              </span>
            )}{" "}
          </label>
          <input
            required
            type="text"
            className="form-control"
            name="phoneNumber"
            value={phoneNumber}
            onChange={(e) => handleInputChange(e)}
          />
        </div> */}
        <div className="col-md-6 col-sm-12 col-xs-12 py-3">
          <label>
            Phone<span className="text-danger">*</span>
          </label>
          <PhoneInput
            country={"pk"} // Set a default country
            inputClass="form-control"
            inputStyle={{ width: "100%" }}
            placeholder="Enter phone number"
            value={phoneNumber}
            onChange={(value) => setPhoneNumber(value)}
          />
        </div>
      </div>  

     

      <div className="d-flex justify-content-between">
        <>{previousButton()}</>
        {!(firstName.length >= 3) ||
        !(lastName.length >= 3) ||
        !gender ||
        !phoneNumber ||
        !whatsAppphoneNumber ||
        !dateOfBirth ? (
          <button className="z-btn-disable">next</button>
        ) : (
          <>{nextButton()}</>
        )}
      </div>
    </>
  );
};

export default Step1;
