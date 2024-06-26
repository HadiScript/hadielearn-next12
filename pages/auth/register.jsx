import axios from "axios";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineRollback } from "react-icons/ai";
import { AuthContext } from "../../context/auth";
import { API } from "../../config/API";

const Register = () => {
  // context
  const [auth, setAuth] = useContext(AuthContext);
  // hooks
  const router = useRouter();
  // state
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [name, setName] = useState("");

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

  const payloadValues = {
    name,
    email,
    password,
  };

  const onFinish = async () => {
    if (password != password2) {
      return toast.error("Password is not match");
    }
    try {
      setLoading(true);
      const { data } = await axios.post(`${API}/auth/register`, payloadValues);
      console.log(data);
      if (data.error) {
        toast.error(data.error);
        setLoading(false);
      } else {
        toast.success("Successfully Regisger");
        router.push("/auth/login");
        setLoading(false);
        // if (data.user?.role === "admin") {
        //   router.push("/admin");
        // } else if (data.user?.role === "author") {
        //   router.push("/employee");
        // } else if (data.user?.role === "cord") {
        //   router.push("/lms-test");
        // } else if (data.user?.role === "instructor") {
        //   router.push("/inst-test");
        // } else if (data.user?.role === "student") {
        //   router.push("/student-test");
        // } else {
        //   router.push("/");
        // }
      }
    } catch (err) {
      toast.error("SignIn failed. Try again.");
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (auth && auth?.token) {
      router.push("/");
    }
  }, [auth && auth?.token]);

  return (
    <>
      {/* start */}
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
                    <h2> Register </h2>
                    <br />
                    <div className="form-group py-3">
                      <label>
                        Name <span className="text-danger">*</span>
                      </label>
                      <input
                        required
                        type="text"
                        className="form-control"
                        placeholder="example@gmail.com"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>

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

                    <div className="row">
                      <div className="col-6 py-3">
                        <label>
                          Password<span className="text-danger">*</span>
                        </label>
                        <input
                          required
                          type="password"
                          className="form-control"
                          name="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                      <div className="col-6 py-3">
                        <label>
                          Confirm Password<span className="text-danger">*</span>
                        </label>
                        <input
                          required
                          type="password"
                          className="form-control"
                          name="password2"
                          value={password2}
                          onChange={(e) => setPassword2(e.target.value)}
                        />
                      </div>
                    </div>
                    <br />
                  </div>

                  {!password || !email ? (
                    <div className="col-12 d-flex justify-content-between align-items-start">
                      <div>
                        <button className="z-btn-disable">Register</button>
                        <br />
                        <br />
                        <span
                          role="button"
                          className="m-2"
                          onClick={() =>
                            router.push("/auth/request-forget-password")
                          }
                        >
                          Forgotten password?
                        </span>
                      </div>
                      <button
                        className="z-btn-register"
                        onClick={() => router.push("/auth/login")}
                      >
                        Login
                      </button>
                    </div>
                  ) : (
                    <div className="col-12 d-flex justify-content-between align-items-start">
                      <div>
                        <button className="z-btn mx-2 " onClick={onFinish}>
                          {loading ? "loading..." : "Register"}
                        </button>
                        <br />
                        <br />
                        <span
                          role="button"
                          className="m-2"
                          onClick={() =>
                            router.push("/auth/request-forget-password")
                          }
                        >
                          Forgotten password?
                        </span>
                      </div>
                      <button
                        className="z-btn-register"
                        onClick={() => router.push("/auth/login")}
                      >
                        Login
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
