// Experience
import React, { useState } from "react";
import EditProfileLayout from "../../panel/profiling/EditProfileLayout";
import { Button, Card, List, Modal } from "antd";
import toast from "react-hot-toast";
import axios from "axios";
import { API } from "../../config/API";
import { useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/auth";
import { BsPen } from "react-icons/bs";
import ExpEditModal from "../../panel/profiling/ExpEditModal";
import ExpLists from "../../panel/profiling/ExpLists";
import { validateDates } from "../../utils/DatesValidations";
import ProfileForm from "../../panel/profiling/ProfileForm";

const Experience = () => {
  const [auth] = useContext(AuthContext);
  const [formData, setFormData] = useState({
    title: "",
    to: "",
    from: "",
    current: false,
    typeOfJob: "",
    skills: "",
    location: "",
    company: "",
  });
  const [formErrors, setFormErrors] = useState({
    from: "",
    to: "",
    current: "",
  });

  const [loading, setLoading] = useState(false);
  const [expList, setExpList] = useState([]);
  const [current, setCurrent] = useState({});
  const [open, setOpen] = useState(false);

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

  const addExperience = async () => {
    if (formErrors.from) {
      return;
    }

    if (!formData.title || !formData.company || !formData.typeOfJob) {
      toast.error("Title, company and type of job is requried");
      return;
    }
    setLoading(true);

    try {
      const { data } = await axios.put(`${API}/add-exp`, formData);
      // console.log(data);
      if (data.ok) {
        toast.success("Added", { position: "bottom-center" });
        myExperience();
      } else if (data.error) {
        toast.error(data.error, { position: "bottom-center" });
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed, try again");
    } finally {
      setLoading(false);
    }
  };

  const myExperience = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${API}/my-exp`);
      if (data.ok) {
        setExpList(data.experience);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed, try again");
    } finally {
      setLoading(false);
    }
  };

  const deleteExperience = async (x) => {
    setLoading(true);
    try {
      const { data } = await axios.put(`${API}/delete-exp`, { _id: x });
      if (data.ok) {
        toast.success("Removed");
        setExpList(expList.filter((i) => i._id !== x));
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed, try again");
    } finally {
      setLoading(false);
    }
  };

  const EditExp = async (datas) => {
    setLoading(true);

    const newData = {
      ...datas,
      from: datas?.from ? datas?.from : current.from,
      to: datas?.to ? datas?.to : current.to,
    };
    try {
      const { data } = await axios.put(`${API}/edit-exp`, newData);
      // console.log(data);
      if (data.ok) {
        toast.success("Updated");
        setOpen(false);
        myExperience();
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
      myExperience();
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
      <ProfileForm title={"Experience"} formData={formData} which={"exp"} changesFormData={changesFormData} addFunc={addExperience} loading={loading} formErrors={formErrors} />

      <ExpLists from="editing-page" expData={expList} deleteExperience={deleteExperience} setCurrent={setCurrent} setOpen={setOpen} />

      <ExpEditModal open={open} setOpen={setOpen} current={current} EditExp={EditExp} loading={loading} />
    </EditProfileLayout>
  );
};

export default Experience;
