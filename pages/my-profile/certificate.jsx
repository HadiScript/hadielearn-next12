import React, { useState, useEffect, useContext } from "react";
import { Button, Card } from "antd";
import axios from "axios";
import { API } from "../../config/API";
import toast from "react-hot-toast";
import { AuthContext } from "../../context/auth";
import CertEditModal from "../../panel/profiling/CertEditModal";
import CertLists from "../../panel/profiling/CertList";
import EditProfileLayout from "../../panel/profiling/EditProfileLayout";
import { validateDates } from "../../utils/DatesValidations";
import ProfileForm from "../../panel/profiling/ProfileForm";

const Certificate = () => {
  const [auth] = useContext(AuthContext);
  const [formData, setFormData] = useState({
    title: "",
    platform: "",
    from: "",
    to: "",
    current: false,
  });

  const [loading, setLoading] = useState(false);
  const [certList, setCertList] = useState([]);
  const [current, setCurrent] = useState({});
  const [open, setOpen] = useState(false);

  const [formErrors, setFormErrors] = useState({
    from: "",
    to: "",
    current: "",
  });

  const changesFormData = (e) => {
    if (e.target.name !== "current") {
      setFormData({ ...formData, [e.target.name]: e.target.value });
      setFormErrors((prevState) => ({
        ...prevState,
        [e.target.name]: "",
      }));
    } else {
      setFormData({ ...formData, current: !formData.current });
      setFormErrors((prevState) => ({
        ...prevState,
        [e.target.name]: "",
      }));
    }
  };

  const addCerticate = async () => {
    if (!formData.title || !formData.platform) {
      toast.error("Title and platform is requried");
      return;
    }
    if (formErrors.from) {
      return;
    }
    setLoading(true);

    try {
      const { data } = await axios.put(`${API}/add-certificate`, formData);
      // console.log(data);
      if (data.ok) {
        toast.success("Added");
        myCertificate();
      } else if (data.error) {
        toast.error(data.error);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed, try again");
    } finally {
      setLoading(false);
    }
  };

  const myCertificate = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${API}/my-certificates`);
      if (data.ok) {
        setCertList(data.certificates);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed, try again");
    } finally {
      setLoading(false);
    }
  };

  const deleteCertificate = async (x) => {
    setLoading(true);
    try {
      const { data } = await axios.put(`${API}/delete-certificate`, { _id: x });
      if (data.ok) {
        toast.success("Removed");
        setCertList(certList.filter((i) => i._id !== x));
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed, try again");
    } finally {
      setLoading(false);
    }
  };

  const editCertificate = async (datas) => {
    setLoading(true);

    const newData = {
      ...datas,
      from: datas?.from ? datas?.from : current.from,
      to: datas?.to ? datas?.to : current.to,
    };

    try {
      const { data } = await axios.put(`http://localhost:5000/api/edit-certificate`, newData);
      // console.log(data);
      if (data.ok) {
        toast.success("Updated");
        setOpen(false);
        myCertificate();
      } else if (data.error) {
        toast.error(data.error);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed, try again");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (auth && auth?.token) {
      myCertificate();
    }
  }, [auth && auth?.token]);

  useEffect(() => {
    const errorMsgs = validateDates(formData.from, formData.to, formData.current);
    if (Object.keys(errorMsgs).length > 0) {
      setFormErrors(errorMsgs);
      return;
    }
  }, [formData.from, formData.to, formData.current]);

  return (
    <EditProfileLayout>
      <ProfileForm
        setFormData={setFormData}
        title="Certificates"
        loading={loading}
        addFunc={addCerticate}
        formErrors={formErrors}
        which={"cert"}
        formData={formData}
        changesFormData={changesFormData}
      />

      <CertLists from="editing-page" certData={certList} deleteCertificate={deleteCertificate} setCurrent={setCurrent} setOpen={setOpen} />

      <CertEditModal open={open} setOpen={setOpen} current={current} editCertificate={editCertificate} loading={loading} />
    </EditProfileLayout>
  );
};

export default Certificate;
