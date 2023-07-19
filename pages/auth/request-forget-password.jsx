import React, { useEffect, useState, useContext } from "react";

import { useRouter } from "next/router";
import { AuthContext } from "../../context/auth";
import { AiOutlineRollback } from "react-icons/ai";
import { toast } from "react-hot-toast";
import axios from "axios";
import { API } from "../../config/API";

const RequestForgetPassword = () => {
  const [auth, setAuth] = useContext(AuthContext);

  const router = useRouter();
  // state
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [showOTPBox, setShowOTPBox] = useState(false);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

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

  const onFinish = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(`${API}/request-forget-password`, {
        email,
      });
      if (data.status === 404) {
        setLoading(false);
        return toast.error(data.error);
      } else if (data.message) {
        setLoading(false);
        setShowOTPBox(true);
        return toast.success(data.message);
      }
    } catch (err) {
      toast.error("User not found.");
      setLoading(false);
    }
  };

  const SendOTP = async () => {
    try {
      const res = await axios.post(`${API}/reset-password`, {
        email,
        otp,
        newPassword,
      });

      if (res.status === 200) {
        toast.success(res.data.message);
        router.push("/auth/login");
      }
    } catch (error) {
      console.log(error, "errasdasd");
      toast.error("Failed, Invalid OTP");
    }
  };

  useEffect(() => {
    if (auth && auth?.token) {
      router.push("/");
    }
  }, [auth && auth?.token]);

  return (
    <div id="enrollScreen" className="container-fluid ">
      <div className="row">
        <div className="col-lg-4 col-md-4 bg-danger" id="forImage" />
        <div className="col-lg-8 col-md-8 col-sm-12 col-xs-12" id="rightCol">
          <div className="form ">
            <div
              className="row d-flex justify-content-center align-items-center"
              style={{ height: "90vh" }}
            >
              <div className="col-md-8  col-sm-12 " id="startForm">
                <div>
                  <div className="col-md-8  col-sm-12 mb-4  ">
                    <span
                      className="d-flex align-items-center gap-2"
                      onClick={() => router.back()}
                    >
                      <AiOutlineRollback /> <span>Back</span>
                    </span>
                  </div>
                  <h2> Reset Password </h2>
                  <br />
                  <div className="form-group py-3">
                    <label>
                      Email <span className="text-danger">*</span>
                      {show && (
                        <small className="text-danger mx-3">
                          Invalid Email
                        </small>
                      )}
                    </label>
                    <input
                      required
                      type="email"
                      className="form-control"
                      placeholder="example@gmail.com"
                      name="email"
                      value={email}
                      onChange={handleEmail}
                    />
                  </div>

                  {showOTPBox && (
                    <>
                      <div className="form-group py-3">
                        <label>
                          OTP<span className="text-danger">*</span>
                        </label>
                        <input
                          required
                          type="number"
                          className="form-control"
                          name="otp"
                          value={otp}
                          onChange={(e) => setOtp(e.target.value)}
                        />
                      </div>
                      <div className="form-group py-3">
                        <label>
                          Password<span className="text-danger">*</span>
                        </label>
                        <input
                          required
                          type="password"
                          className="form-control"
                          name="otp"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                        />
                      </div>
                    </>
                  )}
                  <br />
                </div>

                {!email ? (
                  <div className="col-12 d-flex justify-content-between align-items-center">
                    <button className="z-btn-disable">Send OTP</button>
                  </div>
                ) : (
                  <>
                    {!showOTPBox ? (
                      <button className="z-btn mx-2 " onClick={onFinish}>
                        {loading ? "loading..." : "Send OTP"}
                      </button>
                    ) : (
                      <button className="z-btn mx-2 " onClick={SendOTP}>
                        {loading ? "loading..." : "Reset Password"}
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestForgetPassword;
