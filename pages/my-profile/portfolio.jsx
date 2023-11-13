import React, { useContext, useEffect, useState } from "react";
import EditProfileLayout from "../../panel/profiling/EditProfileLayout";
import { Button, Card } from "antd";
import ProjectList from "../../panel/profiling/ProjectList";
import toast from "react-hot-toast";
import axios from "axios";
import { API } from "../../config/API";
import { AuthContext } from "../../context/auth";
import ProjectEditModal from "../../panel/profiling/ProjectEditModal";
import { validateDates } from "../../utils/DatesValidations";
import ProfileForm from "../../panel/profiling/ProfileForm";

const Portfolio = () => {
  const [auth] = useContext(AuthContext);
  const [formData, setFormData] = useState({
    title: "",
    to: "",
    from: "",
    current: false,
    description: "",
    link: "",
  });

  const [projectData, setProjectData] = useState([]);
  const [loading, setLoading] = useState(false);
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

  const addProject = async () => {
    if (!formData.title) {
      toast.error("Title is requried");
      return;
    }
    if (formErrors.from) {
      return;
    }
    setLoading(true);

    try {
      const { data } = await axios.put(`${API}/add-project`, formData);
      // console.log(data);
      if (data.ok) {
        toast.success("Added");
        myPortfolio();
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

  const myPortfolio = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${API}/my-portfolio`);
      if (data.ok) {
        setProjectData(data.portfolio);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed, try again");
    } finally {
      setLoading(false);
    }
  };

  const deleteProject = async (x) => {
    setLoading(true);
    try {
      const { data } = await axios.put(`${API}/delete-project`, { _id: x });
      if (data.ok) {
        toast.success("Removed");
        setProjectData(projectData.filter((i) => i._id !== x));
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed, try again");
    } finally {
      setLoading(false);
    }
  };

  const EditProject = async (datas) => {
    setLoading(true);

    const newData = {
      ...datas,
      from: datas?.from ? datas?.from : current.from,
      to: datas?.to ? datas?.to : current.to,
    };
    try {
      const { data } = await axios.put(`${API}/edit-portfolio`, newData);
      // console.log(data);
      if (data.ok) {
        toast.success("Updated");
        setOpen(false);
        myPortfolio();
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
      myPortfolio();
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
      <ProfileForm title={"Portfolio"} loading={loading} formData={formData} changesFormData={changesFormData} addFunc={addProject} formErrors={formErrors} which={"port"} />

      <ProjectList projectData={projectData} from={"editing-page"} deleteProject={deleteProject} setCurrent={setCurrent} setOpen={setOpen} />

      <ProjectEditModal current={current} loading={loading} EditProject={EditProject} open={open} setOpen={setOpen} />
    </EditProfileLayout>
  );
};

export default Portfolio;
