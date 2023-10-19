import React, { useContext, useEffect, useState } from "react";
import EditProfileLayout from "../../panel/profiling/EditProfileLayout";
import { Button, Card } from "antd";
import ProjectList from "../../panel/profiling/ProjectList";
import toast from "react-hot-toast";
import axios from "axios";
import { API } from "../../config/API";
import { AuthContext } from "../../context/auth";
import ProjectEditModal from "../../panel/profiling/ProjectEditModal";

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

  const changesFormData = (e) => {
    if (e.target.name !== "current") {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    } else {
      setFormData({ ...formData, current: !formData.current });
    }
  };

  const addProject = async () => {
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

  return (
    <EditProfileLayout>
      <Card title={"Portfolio"}>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group py-2">
              <label> Title </label>
              <input type="text" className="form-control" placeholder="eg: Full Stack Developer" name="title" value={formData.title} onChange={changesFormData} />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group py-2">
              <label> Link </label>
              <input type="email" className="form-control" placeholder="eg: hadiraza.com" name="link" value={formData.link} onChange={changesFormData} />
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
            <label> Description </label>
            <textarea type="text" className="form-control" name="description" value={formData.description} onChange={changesFormData} />
          </div>
        </div>

        <div className="text-end">
          <Button className="CardieBg text-light" loading={loading} onClick={addProject}>
            Submit
          </Button>
        </div>
      </Card>

      <ProjectList projectData={projectData} from={"editing-page"} deleteProject={deleteProject} setCurrent={setCurrent} setOpen={setOpen} />

      <ProjectEditModal current={current} loading={loading} EditProject={EditProject} open={open} setOpen={setOpen} />
    </EditProfileLayout>
  );
};

export default Portfolio;
