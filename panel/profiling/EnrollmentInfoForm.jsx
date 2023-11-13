import React, { useState } from "react";
import { Button, Card, DatePicker } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import { AiOutlineRollback } from "react-icons/ai";
import PhoneInput from "react-phone-input-2";

const EnrollmentInfoForm = ({ enrollmentInfo, changeEnrollmentInfo, setEnrollmentInfo, submit, loading }) => {
  const { phoneNumber, whatsAppphoneNumber, dateOfBirth, gender, idCard, address, city, parentName, parentOccupations, parentPhoneNumber, interest, wantToAchieve } =
    enrollmentInfo;

  if (dateOfBirth) {
    const currentDate = new Date();

    if (dateOfBirth > currentDate) {
      toast.error("Please select a date in the past", {
        position: "bottom-center",
      });
      setEnrollmentInfo({ ...enrollmentInfo, dateOfBirth: "" });
    }
  }

  const handleInputChange = (event) => {
    const cnicNumber = event.target.value;
    const formattedPhoneNumber = cnicNumber.replace(/[^0-9-]/g, ""); // Remove non-digit and non-hyphen characters

    if (/^\d{0,13}$/.test(cnicNumber)) {
      setEnrollmentInfo({ ...enrollmentInfo, idCard: cnicNumber });
    }
  };

  return (
    <Card title="Enrollment Information">
      <div className="d-flex form-group py-3">
        <div className="form-check " style={{ marginRight: "20px" }}>
          <input className="form-check-input" type="checkbox" id="flexCheckDefault" name="gender" value="female" checked={gender === "female"} onChange={changeEnrollmentInfo} />
          <label className="form-check-label" for="flexCheckDefault">
            Female
          </label>
        </div>

        <div className="form-check " style={{ marginRight: "20px" }}>
          <input className="form-check-input" type="checkbox" name="gender" value="male" checked={gender === "male"} onChange={changeEnrollmentInfo} id="flexCheckDefault" />
          <label className="form-check-label" for="flexCheckDefault">
            Male
          </label>
        </div>
        <div className="form-check " style={{ marginRight: "20px" }}>
          <input className="form-check-input" type="checkbox" name="gender" value="other" checked={gender === "other"} onChange={changeEnrollmentInfo} id="flexCheckDefault" />
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
          format={"DD-MM-YYYY"}
          value={dateOfBirth}
          onChange={(e) => setEnrollmentInfo({ ...enrollmentInfo, dateOfBirth: e })}
        />
      </div>

      <div className="row">
        <div className="col-md-6 col-sm-12 col-xs-12 py-3">
          <label>
            WhatsApp<span className="text-danger">*</span>
          </label>
          <PhoneInput
            country={"pk"} // Set a default country
            inputClass="form-control"
            inputStyle={{ width: "100%" }}
            placeholder="Enter whatsApp number"
            value={whatsAppphoneNumber}
            onChange={(e) => setEnrollmentInfo({ ...enrollmentInfo, whatsAppphoneNumber: e })}
          />
        </div>

        <div className="col-md-6 col-sm-12 col-xs-12 py-3">
          <label>
            Phone<span className="text-danger">*</span>
          </label>
          <PhoneInput
            country={"pk"}
            inputClass="form-control"
            inputStyle={{ width: "100%" }}
            placeholder="Enter phone number"
            value={phoneNumber}
            onChange={(e) => setEnrollmentInfo({ ...enrollmentInfo, phoneNumber: e })}
          />
        </div>
      </div>

      <div className="form-group py-3">
        <label>
          City<span className="text-danger">*</span>{" "}
        </label>
        <input required type="text" className="form-control" name="city" value={city} onChange={changeEnrollmentInfo} />
      </div>

      <div className="form-group py-3">
        <label>
          Address<span className="text-danger">*</span>{" "}
        </label>
        <input required type="text" className="form-control" name="address" value={address} onChange={changeEnrollmentInfo} />
      </div>

      <div className="form-group py-3">
        <label>CNIC</label>
        <input required type="text" className="form-control" name="idCard" value={idCard} onChange={handleInputChange} />
      </div>

      <div className="form-group py-3">
        <label>
          Father's Name<span className="text-danger">*</span>{" "}
        </label>
        <input required type="text" className="form-control" name="parentName" value={parentName} onChange={changeEnrollmentInfo} />
      </div>
      <div className="form-group py-3">
        <label>
          Occupation<span className="text-danger">*</span>{" "}
        </label>
        <input required type="text" className="form-control" name="parentOccupations" value={parentOccupations} onChange={changeEnrollmentInfo} />
      </div>
      <div className="form-group py-3">
        <label>
          Phone
          {/* {show && (
            <span style={{ color: "red", marginLeft: "3px" }} className="ml-2">
              Please enter correct phone number
            </span>
          )} */}
        </label>

        <PhoneInput
          country={"pk"}
          inputClass="form-control"
          inputStyle={{ width: "100%" }}
          placeholder=""
          value={parentPhoneNumber}
          onChange={(e) => setEnrollmentInfo({ ...enrollmentInfo, parentPhoneNumber: e })}
        />
      </div>

      <div className="form-group py-3">
        <label>Your Interests</label>
        <textarea type="text" className="form-control" name="interest" value={interest} onChange={changeEnrollmentInfo} />
      </div>
      <div className="form-group py-3">
        <label>What do you want to achieve?</label>
        <textarea type="text" className="form-control" name="wantToAchieve" value={wantToAchieve} onChange={changeEnrollmentInfo} />
      </div>

      <div className="text-end">
        <Button className="CardieBg text-light" loading={loading} onClick={submit}>
          Submit
        </Button>
      </div>
    </Card>
  );
};

export default EnrollmentInfoForm;
