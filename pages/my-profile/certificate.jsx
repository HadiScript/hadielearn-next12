import React, { useState, useEffect, useContext } from "react";
import { Button, Card, List, Modal } from "antd";
import axios from "axios";
import { API } from "../../config/API";
import toast from "react-hot-toast";
import { AuthContext } from "../../context/auth";
import CertEditModal from "../../panel/profiling/CertEditModal";
import CertLists from "../../panel/profiling/CertList";
import EditProfileLayout from "../../panel/profiling/EditProfileLayout";

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

  const changesFormData = (e) => {
    if (e.target.name !== "current") {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    } else {
      setFormData({ ...formData, current: !formData.current });
    }
  };

  const addCerticate = async () => {
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
      const { data } = await axios.put(`${API}/edit-certificate`, newData);
      // console.log(data);
      if (data.ok) {
        toast.success("Updated");
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

  return (
    <EditProfileLayout>
      <Card title="Certificates">
        <div className="row">
          <div className="col-md-6">
            <div className="form-group py-2">
              <label> Title </label>
              <input
                type="text"
                className="form-control"
                placeholder="eg: ReactJs Mastery Course"
                name="title"
                value={formData.title}
                onChange={changesFormData}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group py-2">
              <label> Platform </label>
              <input
                type="email"
                className="form-control"
                placeholder="eg: hadielearning"
                name="platform"
                value={formData.platform}
                onChange={changesFormData}
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="form-group py-2">
              <label> From </label>
              <input
                type="date"
                className="form-control"
                placeholder="School"
                name="from"
                value={formData.from}
                onChange={changesFormData}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group py-2">
              <label> To </label>
              <input
                type="date"
                disabled={formData.current && true}
                className="form-control"
                placeholder="Degree"
                name="to"
                value={formData.to}
                onChange={changesFormData}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="d-flex align-items-center gap-2 form-group py-2">
              <label> Current </label>
              <input
                type="checkbox"
                name="current"
                checked={formData.current}
                onChange={changesFormData}
              />
            </div>
          </div>
        </div>

        <div className="text-end">
          <Button
            className="CardieBg text-light"
            loading={loading}
            onClick={addCerticate}
          >
            Submit
          </Button>
        </div>
      </Card>

      <CertLists
        certData={certList}
        deleteCertificate={deleteCertificate}
        setCurrent={setCurrent}
        setOpen={setOpen}
      />

      <CertEditModal
        open={open}
        setOpen={setOpen}
        current={current}
        editCertificate={editCertificate}
        loading={loading}
      />
    </EditProfileLayout>
  );
};

export default Certificate;
