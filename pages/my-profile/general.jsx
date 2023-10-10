import React, { useEffect, useState, useContext } from "react";
import { Button, Card, List } from "antd";
import EditProfileLayout from "../../panel/profiling/EditProfileLayout";
import { AuthContext } from "../../context/auth";
import axios from "axios";
import { API } from "../../config/API";
import toast from "react-hot-toast";

const EditProfile = () => {
  const [auth, setAuth] = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [profileLoading, setProfileLoading] = useState(false);
  // const [image, setImage] = React.useState()

  const gettingCurrentProfile = async () => {
    setProfileLoading(true);
    try {
      const { data } = await axios.get(`${API}/my-profile`);
      if (data._profile) {
        setBio(data._profile.bio);
        setWebsite(data._profile.website);
        setStatus(data._profile.status);
        setLocation(data._profile.location);
      }
    } catch (error) {
      toast.error("Failed, try again");
      console.log(error);
    } finally {
      setProfileLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    if (!name) {
      toast.error("Name is important");
    }

    try {
      const { data } = await axios.post(`${API}/_profile`, {
        id: auth?.user?._id,
        name,
        website,
        status,
        location,
        bio,
      });

      if (data?.error) {
        toast.error(data.error);
      } else {
        setAuth({ ...auth, user: { ...auth?.user, name: data.name } });
        let fromLocalStorage = JSON.parse(localStorage.getItem("auth"));
        fromLocalStorage.user = { ...fromLocalStorage.user, name: data.name };
        localStorage.setItem("auth", JSON.stringify(fromLocalStorage));

        setLoading(false);
        toast.success("User updated successfully");
        gettingCurrentProfile();
      }
    } catch (err) {
      console.log(err);
      toast.error("User update failed. Try again.");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (auth && auth?.token) {
      gettingCurrentProfile();
      setName(auth?.user?.name);
      setEmail(auth?.user?.email);
    }
  }, [auth && auth?.token]);

  return (
    <EditProfileLayout>
      <Card title={`General Info ${profileLoading ? "loading..." : ""}`}>
        <div className="form-group py-2">
          <label> Your Image </label>
          <input
            // onChange={handleImage}
            type="file"
            accept="images/*"
            className="form-control"
            id="exampleFormControlInput1"
          />
        </div>

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
                placeholder="Email"
                name="email"
                value={email}
                readOnly
              />
            </div>
          </div>
        </div>

        <div className="col-md-12">
          <div className="form-group py-2">
            <label> Bio </label>
            <textarea
              type="text"
              className="form-control"
              placeholder="About..."
              name="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="form-group py-2">
              <label> Status </label>
              <input
                type="text"
                className="form-control"
                placeholder="Student or deveoper and etc..."
                name="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group py-2">
              <label> location </label>
              <input
                type="email"
                className="form-control"
                placeholder="Your location"
                name="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="form-group py-2">
            <label> Website </label>
            <input
              type="email"
              className="form-control"
              placeholder="Any website you have?"
              name="website"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
          </div>
        </div>

        <div className="text-end">
          <Button
            className="CardieBg text-light"
            loading={loading}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </div>
      </Card>
    </EditProfileLayout>
  );
};

export default EditProfile;