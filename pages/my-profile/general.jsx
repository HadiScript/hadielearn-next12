import React, { useEffect, useState, useContext } from "react";
import { Avatar, Button, Card } from "antd";
import EditProfileLayout from "../../panel/profiling/EditProfileLayout";
import { AuthContext } from "../../context/auth";
import axios from "axios";
import { API } from "../../config/API";
import toast from "react-hot-toast";
import { toImageUrl } from "../../utils/ImageURL";
import useMyProfile from "../../panel/profiling/hooks/useMyProfile";
import { FaEdit } from "react-icons/fa";
import EnrollmentInfoForm from "../../panel/profiling/EnrollmentInfoForm";
import { toastPositions } from "../../config/toastPosition";

const socailsLinks = {
  youtube: "",
  twitter: "",
  facebook: "",
  linkedin: "",
  instagram: "",
  behance: "",
  github: "",
};

const EditProfile = () => {
  const [auth, setAuth] = useContext(AuthContext);
  const { profile, refetch } = useMyProfile(auth);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [profileLoading, setProfileLoading] = useState(false);
  const [addSocials, setAddSocials] = useState(false);
  const [social, setSocial] = useState(socailsLinks);
  const [image, setImage] = useState();
  const [preImage, setPreImage] = useState();
  const [removeImage, setRemoveImage] = useState(false);

  const changeSocials = (e) => {
    setSocial({ ...social, [e.target.name]: e.target.value });
  };

  const gettingCurrentProfile = async () => {
    setProfileLoading(true);
    try {
      const { data } = await axios.get(`${API}/my-profile`);
      if (data._profile) {
        setBio(data._profile.bio);
        setWebsite(data._profile.website);
        setStatus(data._profile.status);
        setLocation(data._profile.location);
        setSocial(data._profile.social);
        setPreImage(data?._profile?.user?.image?.url);
      }
    } catch (error) {
      toast.error("Failed, try again", toastPositions);
      console.log(error);
    } finally {
      setProfileLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let _API;
    if (!profile) {
      _API = `${API}/_profile`;
    } else if (profile) {
      _API = `${API}/update/_profile`;
    }

    setLoading(true);

    if (!name) {
      toast.error("Name is important", toastPositions);
    }

    const _formData = new FormData();
    _formData.append("name", name);
    _formData.append("id", auth?.user?._id);
    _formData.append("bio", bio);
    _formData.append("website", website);
    _formData.append("location", location);
    _formData.append("image", image);
    _formData.append("status", status);
    // _formData.append(`social[${key}]`, value);
    if (!preImage && !image) {
      _formData.append("removeImage", removeImage);
    }

    if (social) {
      for (const [key, value] of Object.entries(social)) {
        _formData.append(`social[${key}]`, value);
        console.log(`social[${key}]`, value);
      }
    }

    // return;
    try {
      const { data } = await axios.post(_API, _formData);
      refetch();

      if (data?.error) {
        toast.error(data.error, toastPositions);
      } else {
        setAuth({ ...auth, user: { ...auth?.user, name: data.name } });
        let fromLocalStorage = JSON.parse(localStorage.getItem("auth"));
        fromLocalStorage.user = { ...fromLocalStorage.user, name: data.name, image: data.image };
        localStorage.setItem("auth", JSON.stringify(fromLocalStorage));

        setLoading(false);
        toast.success("User updated successfully", toastPositions);
        gettingCurrentProfile();
      }
    } catch (err) {
      console.log(err);
      toast.error("User update failed. Try again.", toastPositions);
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
        {image && !preImage && (
          <div className="form-group text-center py-2">
            <Avatar width="auto" style={{ height: "150px", width: "150px" }} src={window?.URL.createObjectURL(image)} onClick={() => setImage()} />
            <br />
            <small>Just click on image to remove.</small>
          </div>
        )}
        {!preImage && !image && (
          <div className="form-group py-2">
            <label> Your Image </label>
            <input onChange={(e) => setImage(e.target.files[0])} type="file" accept="images/*" className="form-control" id="exampleFormControlInput1" />
            <small className="form-text">Please upload image within 1mb, formet jpg,jpeg,webp</small>
          </div>
        )}

        {preImage && (
          <div className="form-group text-center py-2">
            <Avatar
              style={{ height: "150px", width: "150px" }}
              src={toImageUrl(preImage)}
              onClick={() => {
                setImage();
                setPreImage();
              }}
            />
            <br />
            <small>Just click on image to remove.</small>
          </div>
        )}

        <div className="row">
          <div className="col-md-6">
            <div className="form-group py-2">
              <label> Name </label>
              <input maxLength={40} type="text" className="form-control" placeholder="Company" name="name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group py-2">
              <label> Email </label>
              <input type="email" className="form-control" placeholder="Email" name="email" value={email} readOnly />
            </div>
          </div>
        </div>

        <div className="col-md-12">
          <div className="form-group py-2">
            <label> Bio </label>
            <textarea maxLength={500} type="text" className="form-control" placeholder="About..." name="bio" value={bio} onChange={(e) => setBio(e.target.value)} />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="form-group py-2">
              <label> Status </label>
              <input
                maxLength={100}
                type="text"
                className="form-control"
                placeholder="“Student, Developer or etc"
                name="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group py-2">
              <label> Location </label>
              <input
                maxLength={50}
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
              maxLength={50}
              type="email"
              className="form-control"
              placeholder="Any website you have?"
              name="website"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
          </div>
        </div>

        <div className="col-md-6">
          <div className="d-flex justify-content-start align-items-center  gap-2 form-group py-2">
            <label> Show Social Links </label>
            <input type="checkbox" checked={addSocials} onChange={() => setAddSocials(!addSocials)} />
          </div>
        </div>

        {/* <EnrollmentInfoForm enrollmentInfo={enrollmentInfo} changeEnrollmentInfo={changeEnrollmentInfo} /> */}

        {addSocials && (
          <>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group py-2">
                  <label> Facebook </label>
                  <input maxLength={60} type="text" className="form-control" placeholder="Facebook" name="facebook" value={social?.facebook} onChange={changeSocials} />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group py-2">
                  <label> Instagram </label>
                  <input maxLength={60} type="text" className="form-control" placeholder="Instagram" name="instagram" value={social?.instagram} onChange={changeSocials} />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className="form-group py-2">
                  <label> Twitter </label>
                  <input maxLength={60} type="text" className="form-control" placeholder="Twitter" name="twitter" value={social?.twitter} onChange={changeSocials} />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group py-2">
                  <label> Linkedin </label>
                  <input maxLength={60} type="text" className="form-control" placeholder="Linkedin" name="linkedin" value={social?.linkedin} onChange={changeSocials} />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className="form-group py-2">
                  <label> Youtube </label>
                  <input maxLength={60} type="text" className="form-control" placeholder="Youtube" name="youtube" value={social?.youtube} onChange={changeSocials} />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group py-2">
                  <label> Behance </label>
                  <input maxLength={60} type="text" className="form-control" placeholder="Behance" name="behance" value={social?.behance} onChange={changeSocials} />
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-group py-2">
                <label> Github </label>
                <input type="text" className="form-control" placeholder="Github" name="github" value={social?.github} onChange={changeSocials} />
              </div>
            </div>
          </>
        )}

        <div className="text-end">
          <Button className="CardieBg text-light" loading={loading} onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      </Card>
    </EditProfileLayout>
  );
};

export default EditProfile;
