import React from "react";
import PanelHeader from "../../../panel/common/PanelHeader";
import AdminLayout from "../../../panel/admin/AdminLayout";
import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-hot-toast";
import { API } from "../../../config/API";

const createAccount = () => {
  const [show, setShow] = useState(false);
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

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
  const values = {
    email,
    password,
    role,
    name,
    status, // as currently working
  };
  const RegisterationSubmits = async (e) => {
    e.preventDefault();

    if (!email || !password || !role || !name) {
      toast.error("Please fill all fields", { position: "bottom-center" });
      return;
    }
    try {
      setLoading(true);
      const { data } = await axios.post(`${API}/register`, values);
      if (data.error) {
        return toast.error(data.error);
      } else {
        setLoading(false);
        toast.success(`${name} is registered as ${role} `);
      }

      //   router("/");
    } catch (err) {
      console.log("err => ", err);
      setLoading(false);
      toast.error("Register failed. Try again.");
    }
  };

  return (
    <>
      <PanelHeader />
      <AdminLayout>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group py-2">
              <h5 for="exampleFormControlInput1"> Email</h5>
              <input
                type="text"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="example@hadielearning.com "
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group py-2">
              <h5 for="exampleFormControlInput1">Name</h5>
              <input
                type="text"
                className="form-control"
                id="exampleFormControlInput1"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="form-group py-2">
              <h5 for="exampleFormControlInput1">
                Password<span className="text-danger">*</span>
              </h5>
              <input
                type="password"
                className="form-control"
                id="exampleFormControlInput1"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-group py-2">
              <label>
                Choose Role<span className="text-danger">*</span>
              </label>
              <select
                required
                value={role}
                onChange={(e) => {
                  setRole(e.target.value);
                }}
                className="form-select"
              >
                <option value="">Choose</option>
                <option value="admin">Admin</option>
                <option value="author">Author (Employee)</option>
                <option value="instructor">Course Instructor</option>
              </select>
            </div>
          </div>
        </div>

        <div className="form-group py-2">
          <h5 for="exampleFormControlInput1">
            Working<span className="text-danger">*</span>
          </h5>
          <input
            type="text"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Working"
            name="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          />
        </div>

        <br />
        <br />
        <button className="z-btn " onClick={RegisterationSubmits}>
          {loading ? "loading..." : "Register"}
        </button>
      </AdminLayout>
    </>
  );
};

export default createAccount;
