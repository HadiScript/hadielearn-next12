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

  const [loading, setLoading] = useState(false);
  const [expList, setExpList] = useState([]);
  const [current, setCurrent] = useState({});
  const [open, setOpen] = useState(false);

  const changesFormData = (e) => {
    if (e.target.name !== "current") {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    } else {
      setFormData({ ...formData, current: !formData.current });
    }
  };

  const addExperience = async () => {
    setLoading(true);
    try {
      const { data } = await axios.put(`${API}/add-exp`, formData);
      // console.log(data);
      if (data.ok) {
        toast.success("Added");
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

  return (
    <EditProfileLayout>
      <Card title="Experience">
        <div className="row">
          <div className="col-md-6">
            <div className="form-group py-2">
              <label> Title </label>
              <input type="text" className="form-control" placeholder="eg: Full Stack Developer" name="title" value={formData.title} onChange={changesFormData} />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group py-2">
              <label> Company </label>
              <input type="email" className="form-control" placeholder="Company" name="company" value={formData.company} onChange={changesFormData} />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="form-group py-2">
              <label> From </label>
              <input type="date" className="form-control" placeholder="School" name="from" value={formData.from} onChange={changesFormData} />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group py-2">
              <label> To </label>
              <input type="date" disabled={formData.current && true} className="form-control" placeholder="Degree" name="to" value={formData.to} onChange={changesFormData} />
            </div>
          </div>
          <div className="col-md-6">
            <div className="d-flex align-items-center gap-2 form-group py-2">
              <label> Current </label>
              <input type="checkbox" name="current" checked={formData.current} onChange={changesFormData} />
            </div>
          </div>
        </div>

        <div className="col-md-12">
          <div className="form-group py-2">
            <label> Skills </label>
            <input type="text" className="form-control" name="skills" value={formData.skills} onChange={changesFormData} />
            <small>eg: ReactJs, AngularJs, VueJs</small>
          </div>
        </div>

        <div className="col-md-12">
          <div className="form-group py-2">
            <select className="form-select" name="typeOfJob" value={formData.typeOfJob} onChange={changesFormData}>
              <option value={""} defaultValue={""}>
                Choose type of job
              </option>
              <option value={"remote-part-time"}> Remote and part time </option>
              <option value={"remote-full-time"}> Remote and fill time </option>
              <option value={"onsite-part-time"}> Onsite Part time </option>
              <option value={"onsite-full-time"}> Onsite Full Time </option>
            </select>
          </div>
        </div>

        {formData.typeOfJob.includes("onsite") && (
          <div className="col-md-12">
            <div className="form-group py-2">
              <label> Location </label>
              <input type="text" className="form-control" name="location" value={formData.location} onChange={changesFormData} />
            </div>
          </div>
        )}

        <div className="text-end">
          <Button className="CardieBg text-light" loading={loading} onClick={addExperience}>
            Submit
          </Button>
        </div>
      </Card>

      <ExpLists from="editing-page" expData={expList} deleteExperience={deleteExperience} setCurrent={setCurrent} setOpen={setOpen} />

      <ExpEditModal open={open} setOpen={setOpen} current={current} EditExp={EditExp} loading={loading} />
    </EditProfileLayout>
  );
};

export default Experience;
