import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import DateTimePicker from "react-datetime-picker";

// import Editor from "react-quill";

import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { useMemo } from "react";
import { Button, Card, Select } from "antd";
import { API } from "../../../config/API";
import { AuthContext } from "../../../context/auth";
import CMSLayout from "../../../panel/newCMS/layouts";
import Btn from "../../../components/ui/Btn";
const AddWorkshops = () => {
  const Editor = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );

  const [auth] = useContext(AuthContext);

  const [title, setTitle] = useState("");
  const [breadTitle, setBreadTitle] = useState("");
  const [content, setContent] = useState();
  const [outlines, setOutlines] = useState();
  const [image, setImage] = useState({});
  const [conclusion, setConclusion] = useState("");
  const [dateAndTime, setDateAndTime] = useState(new Date());
  const [instructor, setInstructor] = useState("");

  const [teachers, setTeachers] = useState([]);
  const [teachersLoading, setTeachersLoading] = useState(false);

  const [zoomLink, setZoomLink] = useState("");
  const [meetingId, setMeetingId] = useState("");
  const [pascodeId, setPascodeId] = useState("");
  const [meetingTiming, setMeetingTiming] = useState("");

  const [loading, setloading] = useState(false);
  const [loadingImage, setLoadingImage] = useState(false);

  const [tags, setTags] = useState("");
  const [loadCategories, setLoadCategories] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCats = async () => {
      const { data } = await axios.get(`${API}/categories`);
      setLoadCategories(data);
    };
    fetchCats();
  }, []);

  // upload image
  const handleImage = async (e) => {
    const file = e.target.files[0];
    let formData = new FormData();

    formData.append("image", file);
    setLoadingImage(true);

    try {
      const { data } = await axios.post(`${API}/upload-image`, formData, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      setImage({
        url: data.url,
        public_id: data.public_id,
      });

      setLoadingImage(false);
    } catch (error) {
      console.log(error);
      setLoadingImage(false);
    }
  };

  const payloadData = {
    breadTitle,
    title,
    content,
    outlines,
    image,
    conclusion,
    dateAndTime,
    instructor,
    zoomLink,
    meetingId,
    pascodeId,
    meetingTiming,
    tags,
    categories,
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (
      !breadTitle ||
      !title ||
      !content ||
      !outlines ||
      !image ||
      !conclusion ||
      !dateAndTime ||
      !instructor ||
      !zoomLink ||
      !meetingId ||
      !pascodeId ||
      !meetingTiming ||
      !tags ||
      !categories
    ) {
      toast.error("All Fields are required**", { position: "bottom-center" });
      return;
    }

    try {
      setloading(true);

      const { data } = await axios.post(`${API}/create-workshop`, payloadData);

      if (data.error) {
        toast.error(data.error, { position: "bottom-center" });
        setloading(false);
      } else {
        toast.success("Course created successfully", {
          position: "bottom-center",
        });
        setloading(false);
      }
    } catch (error) {
      setloading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchingTeachers = async () => {
      try {
        setTeachersLoading(true);
        const { data } = await axios.get(`${API}/get-all-instructors`, {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        });
        setTeachers(data);

        setTeachersLoading(false);
      } catch (error) {
        setTeachersLoading(false);
        console.log(error);
        toast.error("Try Again");
      }
    };

    if (auth && auth.token) fetchingTeachers();
  }, [auth && auth.token]);

  return (
    <CMSLayout>
      <Card>
        <div className="form-group py-2">
          <h5 for="exampleFormControlInput1"> Breadcrumb Title</h5>
          <input
            type="text"
            className="form-control"
            id="exampleFormControlInput1"
            name="breadTitle"
            placeholder="Breadcrumb Title"
            value={breadTitle}
            onChange={(e) => setBreadTitle(e.target.value)}
          />
        </div>

        <div className="form-group py-2">
          <h5 for="exampleFormControlInput1"> Course Title</h5>
          <input
            type="text"
            className="form-control"
            id="exampleFormControlInput1"
            name="title"
            placeholder="Workshop Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="form-group py-2">
          <h5 for="exampleFormControlInput1"> Workshop Image</h5>
          <input
            onChange={handleImage}
            type="file"
            accept="images/*"
            // hidden
            className="form-control"
            id="exampleFormControlInput1"
          />
        </div>
        {loadingImage && "loading..."}

        {image && image?.url && (
          <img width="auto" height={300} src={image?.url} />
        )}

        <hr />

        <div className="form-group py-2">
          <h5 for="exampleFormControlInput1">Overview</h5>
          <Editor
            placeholder="Overview"
            value={content}
            onChange={(e) => setContent(e)}
          />
        </div>

        <div className="form-group py-2">
          <h5 for="exampleFormControlInput1">Outlines</h5>
          <Editor
            placeholder="Overview"
            value={outlines}
            onChange={(e) => setOutlines(e)}
          />
        </div>

        <div className="form-group py-2">
          <h5 for="exampleFormControlInput1">Conclusion</h5>
          <textarea
            className="form-control"
            type="text"
            id="exampleFormControlInput1"
            name="conclusion"
            value={conclusion}
            onChange={(e) => setConclusion(e.target.value)}
          />
        </div>

        <div className="form-group py-2">
          <h5 for="exampleFormControlInput1">Date And Time</h5>
          <DateTimePicker
            type="date"
            className="form-control"
            //   id="exampleFormControlInput1"
            name="dateAndTime"
            //   placeholder="Date And Time"
            value={dateAndTime}
            onChange={setDateAndTime}
          />
        </div>

        {teachersLoading && "loading..."}
        <div className="form-group py-2">
          <h5 for="exampleFormControlInput1">Select Instructor</h5>
          <select
            value={instructor}
            onChange={(e) => setInstructor(e.target.value)}
            className="form-control"
            name="status"
          >
            <option>* Select Instructor</option>
            {teachers?.map((x, index) => (
              <option key={index} value={x._id}>
                {x.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group py-2">
          <h5 for="exampleFormControlInput1">Poplar Tags</h5>
          <input
            type="text"
            className="form-control"
            placeholder="Tags"
            name="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
          <small className="form-text">
            Please use comma separated values (eg.
            #TREND,#DESIGNING,#JAVSSCRIPT,#EARNING,#EDUCATION)
          </small>
        </div>

        <hr />

        <div className="form-group py-2">
          <h5 for="exampleFormControlInput1">Zoom Link</h5>
          <input
            className="form-control"
            type="text"
            id="exampleFormControlInput1"
            name="zoomLink"
            value={zoomLink}
            onChange={(e) => setZoomLink(e.target.value)}
          />
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="form-group py-2">
              <h5 for="exampleFormControlInput1">Meeting Id</h5>
              <input
                className="form-control"
                type="text"
                id="exampleFormControlInput1"
                name="meetingId"
                value={meetingId}
                onChange={(e) => setMeetingId(e.target.value)}
              />
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-group py-2">
              <h5 for="exampleFormControlInput1">Pascode Id</h5>
              <input
                className="form-control"
                type="text"
                id="exampleFormControlInput1"
                name="pascodeId"
                value={pascodeId}
                onChange={(e) => setPascodeId(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="form-group py-2">
          <h5 for="exampleFormControlInput1">Meeting Timing And Date</h5>
          <input
            className="form-control"
            type="text"
            id="exampleFormControlInput1"
            placeholder="May 22nd, 2023 | 7:00 PM"
            name="meetingTiming"
            value={meetingTiming}
            onChange={(e) => setMeetingTiming(e.target.value)}
          />
        </div>

        <div className="form-group py-2">
          <h5 for="exampleFormControlInput1">Categories</h5>
          <Select
            mode="multiple"
            allowClear
            style={{ width: "100%" }}
            placeholder="Please select"
            onChange={(v) => setCategories(v)}
          >
            {loadCategories.map((item) => (
              <Select.Option key={item.name}>{item.name}</Select.Option>
            ))}
          </Select>
        </div>

        <br />
        <br />
        <Btn  onClick={submitHandler} loading={loading}>
          Submit
        </Btn>
      </Card>
    </CMSLayout>
  );
};

export default AddWorkshops;
