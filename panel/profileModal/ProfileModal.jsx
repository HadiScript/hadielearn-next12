import React from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/auth";
import { useState } from "react";
import axios from "axios";
import { API } from "../../config/API";
import { toast } from "react-hot-toast";
import { useEffect } from "react";
import { Modal } from "antd";
import Btn from "../../components/ui/Btn";

const ProfileModal = ({ open, setOpen, id }) => {
  // context
  const [auth, setAuth] = useContext(AuthContext);
  // state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");
  const [image, setImage] = useState({});
  const [password, setPassword] = useState();
  const [password2, setPassword2] = useState();

  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);

  const currentUser = async () => {
    try {
      const { data } = await axios.get(`${API}/single-user/${id}`);
      // console.log("current_user", data);
      setName(data.name);
      setEmail(data.email);
      setStatus(data.status);
      setRole(data.role);
      setImage(data.image);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (auth?.token) currentUser();
  }, [auth && auth.token]);

  //   handling profile image
  const handleImage = async (e) => {
    const file = e.target.files[0];
    let formData = new FormData();

    formData.append("image", file);
    setImageLoading(true);

    try {
      const { data } = await axios.post(`${API}/upload-image`, formData, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      // console.log('uploaded image data', data)
      setImage({
        url: data.url,
        public_id: data.public_id,
      });

      setImageLoading(false);
    } catch (error) {
      console.log(error);
      setImageLoading(false);
    }
  };

  // function
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== password2) {
      toast.error("Password is not matched");
      return;
    }

    setLoading(true);

    try {
      const { data } = await axios.put(`${API}/update-user-by-user`, {
        id: auth?.user?._id,
        name,
        password,
        status,
        role,
        image,
      });
      // console.log("update_user", data);
      if (data?.error) {
        toast.error(data.error);
      } else {
        // udpate context and local storage for current user only
        if (auth?.user?._id === data._id) {
          setAuth({ ...auth, user: data });
          let fromLocalStorage = JSON.parse(localStorage.getItem("auth"));
          fromLocalStorage.user = data;
          localStorage.setItem("auth", JSON.stringify(fromLocalStorage));
        }

        setLoading(false);
        toast.success("User updated successfully");
      }
    } catch (err) {
      console.log(err);
      toast.error("User update failed. Try again.");
      setLoading(false);
    }
  };

  const removeImage = async (x) => {
    try {
      setImageLoading(true);

      const { data } = await axios.post(`${API}/delete-image`, { filepath: x });
      if (data) {
        toast.success("Your image has been removed");
        currentUser();
        setImageLoading(false);
      }
    } catch (error) {
      console.log(error);
      setImageLoading(false);
    }
  };

  return (
    <Modal
      title={name}
      centered
      open={open}
      onOk={() => setOpen(false)}
      onCancel={() => setOpen(false)}
      width={500}
      footer={null}
    >
      {imageLoading && "loading..."}
      {!image && (
        <div className="form-group py-2">
          <h5 for="exampleFormControlInput1"> Your Image</h5>
          <input
            onChange={handleImage}
            type="file"
            accept="images/*"
            className="form-control"
            id="exampleFormControlInput1"
          />
        </div>
      )}
      {image && (
        <div className="row pb-3">
          <div className="col-md-12 text-center">
            <img
              className="text-center bg-red"
              src={image?.url}
              style={{ width: "100px", height: "100px", borderRadius: "50%" }}
            />
            <div className="col-md-12  text-center">
              <small
                className="text-danger"
                onClick={() => removeImage(image?.public_id)}
              >
                delete
              </small>
            </div>
          </div>
        </div>
      )}
      <div className="row">
        <div className="col-md-6">
          <div className="form-group py-2">
            <label> Name </label>
            <input
              type="text"
              className="form-control"
              placeholder="Company"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group py-2">
            <label> Email </label>
            <input
              type="email"
              className="form-control"
              placeholder="Company"
              name="email"
              value={email}
              readOnly
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <div className="form-group py-2">
            <label> Password </label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group py-2">
            <label> Confirm Password </label>
            <input
              type="password"
              className="form-control"
              name="password2"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="form-group py-2">
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="form-control"
          name="status"
        >
          <option>* Select Professional Status</option>
          <option value="Developer">Developer</option>
          <option value="Junior Developer">Junior Developer</option>
          <option value="Senior Developer">Senior Developer</option>
          <option value="Manager">Manager</option>
          <option value="Student or Learning">Student or Learning</option>
          <option value="Instructor">Instructor or Teacher</option>
          <option value="Intern">Intern</option>
          <option value="Other">Other</option>
        </select>
        <small className="form-text">
          Give us an idea of where you are at in your career
        </small>
      </div>
      <Btn onClick={(e) => handleSubmit(e)} loading={loading}>
        Submit
      </Btn>
    </Modal>
  );
};

export default ProfileModal;
