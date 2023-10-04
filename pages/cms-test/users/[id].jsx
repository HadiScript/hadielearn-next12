import React from "react";
import { useRouter } from "next/router";
import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { API } from "../../../config/API";
import { AuthContext } from "../../../context/auth";
import Btn from "../../../components/ui/Btn";
import CMSLayout from "../../../panel/newCMS/layouts";
import { Card } from "antd";
import { toImageUrl } from "../../../utils/ImageURL";

const EditUser = () => {
  const router = useRouter();
  const { id } = router.query;

  // context
  const [auth, setAuth] = useContext(AuthContext);
  // state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");
  const [image, setImage] = useState();
  const [previousImage, setPreviousImage] = useState();
  const [password, setPassword] = useState();
  const [password2, setPassword2] = useState();
  const [exp, setExp] = useState("");

  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  // hooks

  useEffect(() => {
    const currentUser = async () => {
      try {
        const { data } = await axios.get(`${API}/single-user/${id}`);

        console.log("current_user", data);
        setName(data.name);
        setEmail(data.email);
        setStatus(data.status);
        setRole(data.role);
        setPreviousImage(data.image);
        setExp(data.exp);
      } catch (err) {
        console.log(err);
      }
    };
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

  const deleteImage = async (e) => {
    try {
      setImageLoading(true);
      const { data } = await axios.post(
        `${API}/delete-image-admin`,
        { _id: id },
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );

      if (data.ok) {
        setPreviousImage();
        setImageLoading(false);
      }
    } catch (error) {
      console.log(error);
      setImageLoading(false);

      toast.error("Error while deleting image.");
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

    const formData = new FormData();
    formData.append("id", id);
    formData.append("name", name);
    formData.append("password", password);
    formData.append("status", status);
    formData.append("image", image); // Assuming `image` is the File object from an input type="file"
    formData.append("exp", exp);

    setLoading(true);

    try {
      const { data } = await axios.put(
        `${API}/update-user-by-admin`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
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

  return (
    <>
      <CMSLayout>
        <Card>
          {imageLoading && "loading..."}
          {!image && !previousImage && (
            <div className="form-group py-2">
              <h5 for="exampleFormControlInput1"> Your Image</h5>
              <input
                // onChange={handleImage}
                onChange={(e) => setImage(e.target.files[0])}
                type="file"
                accept="images/*"
                // hidden
                className="form-control"
                id="exampleFormControlInput1"
              />
            </div>
          )}

          {image && !previousImage && (
            <div className="row pb-3">
              <div className="col-md-12 text-center">
                <img
                  className="text-center bg-red"
                  src={image && URL.createObjectURL(image)}
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                  }}
                />
                <div className="col-md-12  text-center">
                  <small className="text-danger" onClick={() => setImage()}>
                    delete
                  </small>
                </div>
              </div>
            </div>
          )}

          {previousImage && (
            <div className="row pb-3">
              <div className="col-md-12 text-center">
                <img
                  className="text-center bg-red"
                  src={toImageUrl(previousImage.url)}
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                  }}
                />
                <div className="col-md-12  text-center">
                  <small className="text-danger" onClick={deleteImage}>
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
                  onChange={(e) => setEmail(e.target.value)}
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

          <div className="form-group py-2">
            <label>
              {" "}
              Working<span className="text-danger">*</span>{" "}
            </label>
            <input
              type="text"
              className="form-control"
              name="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            />
          </div>

          <div className="form-group py-2">
            <label>
              Experience <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleFormControlInput1"
              name="exp"
              value={exp}
              onChange={(e) => setExp(e.target.value)}
            />
          </div>

          <Btn onClick={(e) => handleSubmit(e)} loading={loading}>
            Submit
          </Btn>
        </Card>
      </CMSLayout>
    </>
  );
};

export default EditUser;
